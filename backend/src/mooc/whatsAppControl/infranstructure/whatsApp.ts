import { Client, LocalAuth } from 'whatsapp-web.js'
import { type IInstanceAuthentication } from '../../../../../share/domain/instance'
import type IInstanceRepository from '../../instance/domian/InstanceRepository'
import { type ISendMessage } from '../../messages/domian/messages'
import type IWhatsAppController from '../domian/whatsAppController'

const clients = new Map<string, Client>()
export default class WhatsAppController implements IWhatsAppController {
  constructor (private readonly instanceRepository: IInstanceRepository) { }

  async sendMessage (sendMessage: ISendMessage): Promise<void> {
    const instanceKey = `${sendMessage._id ?? ''}${sendMessage.token ?? ''}`
    const exist = clients.has(instanceKey)
    if (!exist) return
    const client = clients.get(instanceKey)
    await client?.sendMessage(`${sendMessage.to}@c.us`, sendMessage.body ?? '')
  }

  async start (instanceAuthentication: IInstanceAuthentication): Promise<void> {
    const id = instanceAuthentication._id
    const token = instanceAuthentication.token
    if (id === undefined || token === undefined) return
    const clientId = `${id}${token}`
    const client = new Client({ authStrategy: new LocalAuth({ clientId }) })
    client.on('qr', (qr: string) => {
      this.instanceRepository.updateQr(id, qr)
        .catch(error => {
          console.log(error)
        })
    })

    client.on('ready', () => {
      console.log('ok')
    })

    client.on('authenticated', (session) => {
      this.instanceRepository.updateStatus(id, 'authenticated')
        .catch(error => {
          console.log(error)
        })
    })

    client.initialize()
    clients.set(clientId, client)
  }
}
