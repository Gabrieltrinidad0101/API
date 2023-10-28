import { Client, LocalAuth, MessageMedia, WAState, type Message } from 'whatsapp-web.js'
import type IInstance from '../../../../../share/domain/instance'
import type IInstanceRepository from '../../routes/instance/domian/InstanceRepository'
import type IWhatsAppController from '../domian/whatsAppController'
import wait from '../../../../../share/application/wait'
import sendReceiveMessage from './sendReceiveMessage'
import { type TypeInstanceStart } from '../../../../../share/domain/instance'
import { type ISendMessageUserId } from '../../../../../share/domain/Send'
import getMessageMediaExtension from './getMediaFileExtension'
import { getScreenId } from '../../share/application/getScreenId'
import { Logs } from '../../../logs'
import { type TypeOpenWithError } from '../domian/whatsAppController'
import { type MessageQueue } from './messageQueue'
import fs from 'fs'
import crypto from 'crypto'
import deleteOldFiles from './deleteOldFiles'
const screens = new Map<string, Client>()

export default class WhatsAppController implements IWhatsAppController {
  constructor (
    private readonly instanceRepository: IInstanceRepository,
    private readonly messageQueue: MessageQueue
  ) { }

  async send (instance: IInstance, message: ISendMessageUserId): Promise<string | undefined> {
    try {
      const screenId = getScreenId({
        _id: message.instanceId,
        token: message.token
      })
      if (instance.messageLimit === 0) {
        this.instanceRepository.updateStatus({_id: instance._id},"unpayment");
        screens.get(screenId)?.destroy();
        return 'you exceeded the limit of messages'
      }
      const screen = screens.get(screenId)
      if (message.body !== undefined && message.to !== undefined) {
        await screen?.sendMessage(`${message.to}@c.us`, message.body)
      } else if (message.document !== undefined) {
        const extension = getMessageMediaExtension(message.filename ?? '')
        if (extension === false) return 'Error in extension file'
        const media = await MessageMedia.fromUrl(message.document)
        await screen?.sendMessage(`${message.to ?? ''}@c.us`, media)
      }
      if (message.isQueue) { await this.messageQueue.delete(message) }
      const newLimit = instance.messageLimit - 1
      if (newLimit !== Infinity) { await this.instanceRepository.updateMessageLimit(instance._id, newLimit) }
    } catch (error: any) {
      Logs.Error(error)
      const messageQueue = { ...message, isQueue: true }
      await this.messageQueue.insert(messageQueue)
    }
  }

  private readonly onQrAsync = async (qr: string, id: string): Promise<void> => {
    await this.instanceRepository.updateStatus({ _id: id }, 'pending')
    await this.instanceRepository.updateQr(id, qr)
  }

  onQr = (client: Client, id: string): void => {
    client.on('qr', (qr: string) => {
      this.onQrAsync(qr, id)
        .catch(error => {
          Logs.Exception(error)
        })
    })
  }

  onAuthenticated = (client: Client, id: string): void => {
    client.on('authenticated', (session) => {
      this.instanceRepository.updateStatus({ _id: id }, 'authenticated')
        .catch(error => {
          Logs.Exception(error)
        })
    })
  }

  onDisconnected = (client: Client, instance: IInstance): void => {
    client.on('disconnected', (): void => {
      try {
        if (instance._id === undefined) return
        this.instanceRepository.updateStatus({ _id: instance._id }, 'pending')
          .catch(err => {
            console.log(err)
          })
      } catch (error) {
        Logs.Exception(error)
      }
    })
  }

  onScreenLoad = async (client: Client, instance: IInstance): Promise<void> => {
    for (let i = 0; (i < 10 || client.pupPage === null); i++) await wait(1000)
    client.pupPage?.on('close', (): void => {
      this.start(instance, 'windowClose')
        .catch((error) => {
          Logs.Exception(error)
        })
    })
  }

  onAuthfailure = (client: Client, instance: IInstance): void => {
    client.on('auth_failure', (): void => {
      Logs.Error(`Auth failure ${instance._id}`)
    })
  }

  onMessageAsnyc = async (instance: IInstance, message: Message): Promise<void> => {
    const { _id, userId } = instance
    if (_id === undefined || userId === undefined) {
      Logs.Warning('On message with instance without id and userId')
      return
    }
    const instanceDb = await this.instanceRepository.findByIdAndUserId(_id, userId)
    if (instanceDb === null) {
      Logs.Warning(`On message to instance not found in db id = ${_id} userId = ${userId}`)
      return
    }

    if (message.hasMedia) {
      const media = await message.downloadMedia()
      const filename = `${crypto.randomUUID()}.${media.mimetype.split('/')[1]}`
      const pathFile = `public/${filename}`

      const fileStream = fs.createWriteStream(pathFile)
      fileStream.write(media.data, 'base64')
      fileStream.end()
    }

    await sendReceiveMessage(message, instance)
    deleteOldFiles()
  }

  onMessage = (client: Client, instance: IInstance): void => {
    client.on('message', (message: Message) => {
      this.onMessageAsnyc(instance, message)
        .catch(error => {
          Logs.Exception(error)
        })
    })
  }

  // when instance is destroy automatically restart
  // only when a instance was not paymented is destroyed
  restart = async (instance: IInstance): Promise<void> => {
    const screenId = getScreenId(instance)
    await this.destroy(screenId)
  }

  // The catch do nothing because sometimes
  // the library return a exception
  destroy = async (screenId: string): Promise<void> => {
    try {
      const client = screens.get(screenId)
      if (client === undefined) return
      await client.destroy()
    } catch {

    }
  }

  getStatus = async (screenId: string): Promise<WAState | undefined> => {
    try {
      const client = screens.get(screenId)
      if (client === undefined) return
      const status = await Promise.race([
        client.getState(),
        wait(10000).then(() => { throw new Error('setTimeout getting status of instance') })
      ])
      const screenIsOpen = client.pupPage !== undefined ? WAState.OPENING : undefined
      return status ?? screenIsOpen
    } catch (error) {

    }
  }

  logout = async (instanceId: string, token: string): Promise<void> => {
    try {
      await this.instanceRepository.updateStatus({ _id: instanceId }, 'pending')
      const client = screens.get(`${instanceId}${token}`)
      await client?.logout()
    } catch {

    }
  }

  waitInstanceStatus = async (instance: IInstance, status: WAState): Promise<WAState | TypeOpenWithError | undefined> => {
    const screenId = getScreenId(instance)
    if (screenId === undefined) return
    const getInstanceStatus = async (): Promise<WAState | TypeOpenWithError | undefined> => await this.getStatus(screenId)
    for (let i = 0; i < 20 || await getInstanceStatus() !== status; i++) { await wait(1000) }
    const instanceStatus = await getInstanceStatus()
    return instanceStatus
  }

  start = async (instanceRef: IInstance, instanceStart: TypeInstanceStart): Promise<void> => {
    try {
      const instance = await this.instanceRepository.findOne({ _id: instanceRef?._id })
      if (instance === null) {
        Logs.Error(`Start Instance null TypeInstanceStart ${instanceStart}`)
        return
      }
      const { _id, status } = instance
      if (status === 'unpayment') return
      const screenId = getScreenId(instance)
      const instanceStatus = await this.getStatus(screenId)
      if (instanceStatus === WAState.CONNECTED || instanceStatus === WAState.OPENING) return
      Logs.Info(`Start instance id = ${_id}, start by ${instanceStart}`)
      const client = new Client({
        authStrategy: new LocalAuth({ clientId: screenId }),
        puppeteer: {
          headless: false
        }
      })
      screens.set(screenId, client)
      // await this.instanceRepository.updateStatus({ _id }, 'initial')
      // await this.instanceRepository.updateQr(_id, '')
      // await this.destroy(screenId)
      // this.onMessage(client, instance)
      // this.onQr(client, _id)
      // this.onAuthfailure(client, instance)
      // this.onAuthenticated(client, _id)
      // this.onDisconnected(client, instance)
      // this.onScreenLoad(client, instance)
      //   .catch(error => {
      //     Logs.Exception(error)
      //   })
      await client.initialize()
    } catch (error: any) {
      Logs.Exception(error)
      await this.destroy(getScreenId(instanceRef) ?? '')
      await wait(10000)
      await this.start(instanceRef, 'error')
    }
  }
}
