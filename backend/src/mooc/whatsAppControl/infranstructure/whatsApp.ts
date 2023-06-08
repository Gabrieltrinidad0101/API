import { Client, LocalAuth } from 'whatsapp-web.js'
import { type IInstanceAuthentication } from '../../../../../share/domain/instance'
import type IInstanceRepository from '../../instance/domian/InstanceRepository'
import { type ISendMessage } from '../../messages/domian/messages'
import type IWhatsAppController from '../domian/whatsAppController'
import wait from '../../../../../share/application/wait'
const clients = new Map<string, Client>()
export default class WhatsAppController implements IWhatsAppController {
  constructor (private readonly instanceRepository: IInstanceRepository) { }

  async sendMessage (sendMessage: ISendMessage): Promise<void> {
    const instanceKey = `${sendMessage._id ?? ''}${sendMessage.token ?? ''}`
    const exist = clients.has(instanceKey)
    if (!exist || sendMessage.to === undefined) return
    const client = clients.get(instanceKey)
    await client?.sendMessage(`${sendMessage.to}@c.us`, sendMessage.body ?? '')
  }

  onQr = (client: Client, id: string): void => {
    client.on('qr', (qr: string) => {
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

  onDisconnected = (client: Client, id: string): void => {
    client.on('disconnected', (): void => {
      try {
        this.instanceRepository.updateStatus(id, 'pending')
          .catch(err => {
            console.log(err)
          })
        client.initialize()
          .catch(err => {
            console.log(err)
          })
      } catch (ex) {
        console.log(ex)
      }
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
      this.onQr(client, id)
      this.onAuthenticated(client, id)
      this.onDisconnected(client, id)
      await client.initialize()
    } catch (error: any) {
      await wait(10000)
      await this.start(instanceAuthentication)
    }
  }
}
