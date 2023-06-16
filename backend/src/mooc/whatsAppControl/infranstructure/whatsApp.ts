import { Client, LocalAuth, WAState, type Message } from 'whatsapp-web.js'
import type IInstance from '../../../../../share/domain/instance'
import type IInstanceRepository from '../../instance/domian/InstanceRepository'
import { type ISendMessage } from '../../messages/domian/messages'
import type IWhatsAppController from '../domian/whatsAppController'
import wait from '../../../../../share/application/wait'
import sendReceiveMessage from './sendReceiveMessage'
import { type TypeInstanceStart } from '../../../../../share/domain/instance'

const clients = new Map<string, Client>()
export default class WhatsAppController implements IWhatsAppController {
  constructor (private readonly instanceRepository: IInstanceRepository) { }

  async sendMessage (sendMessage: ISendMessage): Promise<void> {
    try {
      const instanceKey = `${sendMessage._id ?? ''}${sendMessage.token ?? ''}`
      const exist = clients.has(instanceKey)
      if (!exist || sendMessage.to === undefined) return
      const client = clients.get(instanceKey)
      await client?.sendMessage(`${sendMessage.to}@c.us`, sendMessage.body ?? '')
    } catch (error: any) {
      console.log(error)
    }
  }

  onQr = (client: Client, id: string): void => {
    client.on('qr', (qr: string) => {
      this.instanceRepository.updateStatus(id, 'pending')
        .catch(err => {
          console.log(err)
        })
      this.instanceRepository.updateQr(id, qr)
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
        // this.instanceRepository.updateStatus(instance._id, 'pending')
        //   .catch(err => {
        //     console.log(err)
        //   })
        // this.start(instance, "disconnected").catch(error => {
        //   console.log(error)
        // })
      } catch (ex) {
        console.log(ex)
      }
    })
  }

  onScreenLoad = async (client: Client, instance: IInstance): Promise<void> => {
    for (let i = 0; (i < 10 || client.pupPage === null); i++) await wait(1000)
    console.log('Screen ready')
    client.pupPage?.on('close', (): void => {
      console.log('Close')
      client?.removeAllListeners()
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
      if (userId === undefined) {
        console.log('Error user without id')
        return
      }
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

  getClientId = (instance: IInstance): string | undefined => {
    const id = instance._id
    const token = instance.token
    if (id === undefined || token === undefined) return
    const clientId = `${id}${token}`
    return clientId
  }

  restart = async (instance: IInstance): Promise<void> => {
    const clientId = this.getClientId(instance)
    if (clientId === undefined) return
    await this.destroy(clientId)
  }

  destroy = async (clientId: string): Promise<void> => {
    try {
      const client = clients.get(clientId)
      if (client === undefined) return
      await client.destroy()
    } catch {

    }
  }

  getStatus = async (clientId: string): Promise<WAState | undefined> => {
    try {
      const client = clients.get(clientId)
      if (client === undefined) return
      const status = await client.getState()
      return status ?? client.pupPage !== undefined ? WAState.OPENING : undefined
    } catch (error) {
      return undefined
    }
  }

  start = async (instance: IInstance, instanceStart: TypeInstanceStart): Promise<void> => {
    try {
      const { _id } = instance
      const clientId = this.getClientId(instance)
      if (clientId === undefined) return
      const status = await this.getStatus(clientId)
      console.log(status, ' ', instanceStart)
      if (status === WAState.CONNECTED || status === WAState.OPENING) return
      const client = new Client({
        authStrategy: new LocalAuth({ clientId }),
        puppeteer: {
          headless: false
        }
      })
      client.destroy()
      clients.set(clientId, client)
      this.onMessage(client, instance)
      this.onQr(client, _id)
      this.onAuthenticated(client, _id)
      this.onDisconnected(client, instance)
      this.onScreenLoad(client, instance)
        .catch(error => {
          console.log(error)
        })
      client.on('change_state', (state) => {
        console.log(state)
      })
      await client.initialize()
    } catch (error: any) {
      console.log('Any error')
      await wait(10000)
      await this.start(instance, 'error')
    }
  }
}
