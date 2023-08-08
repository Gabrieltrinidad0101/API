import { Client, LocalAuth, MessageMedia, WAState, type Message } from 'whatsapp-web.js'
import type IInstance from '../../../../../share/domain/instance'
import type IInstanceRepository from '../../routes/instance/domian/InstanceRepository'
import type IWhatsAppController from '../domian/whatsAppController'
import wait from '../../../../../share/application/wait'
import sendReceiveMessage from './sendReceiveMessage'
import { type TypeInstanceStart } from '../../../../../share/domain/instance'
import type ISend from '../../../../../share/domain/Send'
import getMessageMediaExtension from './getMediaFileExtension'
import { getScreenId } from './getScreenId'
import { Logs } from '../../../logs'
import { type TypeOpenWithError } from '../domian/whatsAppController'

const screens = new Map<string, Client>()

export default class WhatsAppController implements IWhatsAppController {
  constructor (private readonly instanceRepository: IInstanceRepository) { }

  async send (instance: IInstance, send: ISend): Promise<string | undefined> {
    try {
      const screenId = getScreenId({
        _id: send._id,
        token: send.token
      })
      if (instance.messageLimit === 0) {
        return 'you exceeded the limit of messages'
      }
      const client = screens.get(screenId)
      if (send.body !== undefined && send.to !== undefined) {
        await client?.sendMessage(`${send.to}@c.us`, send.body)
      } else if (send.document !== undefined) {
        const extension = getMessageMediaExtension(send.filename ?? '')
        if (extension === false) return
        const media = await MessageMedia.fromUrl(send.document)
        await client?.sendMessage(`${send.to ?? ''}@c.us`, media)
      }
      const newLimit = instance.messageLimit - 1
      if (newLimit !== Infinity) {
        await this.instanceRepository.updateMessageLimit(instance._id, newLimit)
      }
    } catch (error: any) {
      Logs.Error(error)
    }
  }

  private readonly onQrAsync = async (qr: string, id: string): Promise<void> => {
    await this.instanceRepository.updateStatus(id, 'pending')
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
      this.instanceRepository.updateStatus(id, 'authenticated')
        .catch(error => {
          Logs.Exception(error)
        })
    })
  }

  onDisconnected = (client: Client, instance: IInstance): void => {
    client.on('disconnected', (): void => {
      try {
        if (instance._id === undefined) return
        this.instanceRepository.updateStatus(instance._id, 'pending')
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
    await sendReceiveMessage(message, instance)
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
      await this.instanceRepository.updateStatus(instanceId, 'pending')
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

  start = async (instance: IInstance, instanceStart: TypeInstanceStart): Promise<void> => {
    try {
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
      await this.instanceRepository.updateStatus(_id, 'initial')
      await this.instanceRepository.updateQr(_id, '')
      await this.destroy(screenId)
      screens.set(screenId, client)
      this.onMessage(client, instance)
      this.onQr(client, _id)
      this.onAuthfailure(client, instance)
      this.onAuthenticated(client, _id)
      this.onDisconnected(client, instance)
      this.onScreenLoad(client, instance)
        .catch(error => {
          Logs.Exception(error)
        })
      await client.initialize()
    } catch (error: any) {
      Logs.Exception(error)
      await this.destroy(getScreenId(instance) ?? '')
      await wait(10000)
      await this.start(instance, 'error')
    }
  }
}
