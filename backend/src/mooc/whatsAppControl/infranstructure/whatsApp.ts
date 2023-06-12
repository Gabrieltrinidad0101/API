import { Client, LocalAuth, type Message } from 'whatsapp-web.js'
import { type IInstanceAuthentication } from '../../../../../share/domain/instance'
import type IInstanceRepository from '../../instance/domian/InstanceRepository'
import { type ISendMessage } from '../../messages/domian/messages'
import type IWhatsAppController from '../domian/whatsAppController'
import wait from '../../../../../share/application/wait'
import sendReceiveMessage from './sendReceiveMessage'

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

  onDisconnected = (client: Client, instanceAuthentication: IInstanceAuthentication): void => {
    client.on('disconnected', (): void => {
      try {
        this.instanceRepository.updateStatus(instanceAuthentication._id, 'pending')
          .catch(err => {
            console.log(err)
          })
        this.start(instanceAuthentication).catch(error => {
          console.log(error)
        })
      } catch (ex) {
        console.log(ex)
      }
    })
  }

  onReady = async (client: Client, instanceAuthentication: IInstanceAuthentication): Promise<void> => {
    for (let i = 0; (i < 10 || client.pupPage === null); i++) await wait(1000)
    client.pupPage?.on('close', (): void => {
      this.start(instanceAuthentication)
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

  onMessage = (client: Client, instanceAuthentication: IInstanceAuthentication): void => {
    client.on('message', (message: Message) => {
      const { _id, userId } = instanceAuthentication
      if (userId === undefined) {
        console.log('Error user without id')
        return
      }
      this.instanceRepository.findById(_id, userId)
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

  async start (instanceAuthentication: IInstanceAuthentication): Promise<void> {
    try {
      const id = instanceAuthentication._id
      const token = instanceAuthentication.token
      if (id === undefined || token === undefined) return
      const clientId = `${id}${token}`
      const client = new Client({
        authStrategy: new LocalAuth({ clientId }),
        puppeteer: {
          headless: false
        }
      })
      clients.set(clientId, client)
      this.onMessage(client, instanceAuthentication)
      this.onQr(client, id)
      this.onAuthenticated(client, id)
      this.onDisconnected(client, instanceAuthentication)
      this.onReady(client, instanceAuthentication)
        .catch(error => {
          console.log(error)
        })
      await client.initialize()
    } catch (error: any) {
      await wait(10000)
      await this.start(instanceAuthentication)
    }
  }
}
