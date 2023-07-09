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
const clients = new Map<string, Client>()

export default class WhatsAppController implements IWhatsAppController {
  constructor (private readonly instanceRepository: IInstanceRepository) { }

  async send (send: ISend): Promise<void> {
    try {
      const instanceKey = `${send._id}${send.token}`
      const client = clients.get(instanceKey)
      if (send.body !== undefined && send.to !== undefined) {
        await client?.sendMessage(`${send.to}@c.us`, send.body)
      } else if (send.document !== undefined) {
        const extension = getMessageMediaExtension(send.filename ?? '')
        if (extension === false) return
        const media = await MessageMedia.fromUrl(send.document)
        await client?.sendMessage(`${send.to ?? ''}@c.us`, media)
      }
    } catch (error: any) {
      console.log(error)
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
          console.log(error)
        })
    })
  }

  onAuthenticated = (client: Client, id: string): void => {
    client.on('authenticated', (session) => {
      this.instanceRepository.updateStatus(id, 'authenticated')
        .catch(error => {
          console.log(error)
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
      } catch (ex) {
        console.log(ex)
      }
    })
  }

  onScreenLoad = async (client: Client, instance: IInstance): Promise<void> => {
    for (let i = 0; (i < 10 || client.pupPage === null); i++) await wait(1000)
    client.pupPage?.on('close', (): void => {
      this.start(instance, 'windowClose')
        .catch(() => {
          console.log('ok')
        })
    })
  }

  onAuthfailure = (client: Client): void => {
    client.on('auth_failure', (): void => {
      console.log('Error')
    })
  }

  onMessage = (client: Client, instance: IInstance): void => {
    client.on('message', (message: Message) => {
      const { _id, userId } = instance
      if (_id === undefined || userId === undefined) return
      this.instanceRepository.findByIdAndUserId(_id, userId)
        .then(instance => {
          if (instance === null) {
            console.log('On message to instance not found')
            return
          }
          sendReceiveMessage(message, instance)
            .catch(() => {
              console.log('error')
            })
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  restart = async (screenId: string | undefined): Promise<void> => {
    if (screenId === undefined) return
    await this.destroy(screenId)
  }

  destroy = async (screenId: string): Promise<void> => {
    try {
      const client = clients.get(screenId)
      if (client === undefined) return
      await client.destroy()
    } catch {

    }
  }

  getStatus = async (screenId: string): Promise<WAState | undefined> => {
    try {
      const client = clients.get(screenId)
      if (client === undefined) return
      const status = await client.getState()
      const screenIsOpen = client.pupPage !== undefined ? WAState.OPENING : undefined
      return status ?? screenIsOpen
    } catch (error) {
      return undefined
    }
  }

  logout = async (instanceId: string, token: string): Promise<void> => {
    try {
      await this.instanceRepository.updateStatus(instanceId, 'pending')
      const client = clients.get(`${instanceId}${token}`)
      await client?.logout()
    } catch {

    }
  }

  waitInstanceStatus = async (instance: IInstance, status: WAState): Promise<WAState | undefined> => {
    const screenId = getScreenId(instance)
    if (screenId === undefined) return
    const getInstanceStatus = async (): Promise<WAState | undefined> => await this.getStatus(screenId)
    for (let i = 0; i < 20 || await getInstanceStatus() !== status; i++) { await wait(1000) }
    const instanceStatus = await getInstanceStatus()
    return instanceStatus
  }

  start = async (instance: IInstance, instanceStart: TypeInstanceStart): Promise<void> => {
    try {
      const { _id } = instance
      if (_id === undefined) return
      const screenId = getScreenId(instance)
      if (screenId === undefined) return
      await this.instanceRepository.updateStatus(_id, 'initial')
      const status = await this.getStatus(screenId)
      if (status === WAState.CONNECTED || status === WAState.OPENING) return
      const client = new Client({
        authStrategy: new LocalAuth({ clientId: screenId }),
        puppeteer: {
          headless: false
        }
      })
      await this.destroy(screenId)
      clients.set(screenId, client)
      this.onMessage(client, instance)
      this.onQr(client, _id)
      this.onAuthenticated(client, _id)
      this.onDisconnected(client, instance)
      this.onScreenLoad(client, instance)
        .catch(error => {
          console.log(error)
        })
      await client.initialize()
    } catch (error: any) {
      await wait(10000)
      await this.start(instance, 'error')
    }
  }
}
