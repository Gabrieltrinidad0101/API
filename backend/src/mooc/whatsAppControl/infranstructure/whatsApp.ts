import { Client } from 'whatsapp-web.js'
import { type IInstanceAuthentication } from '../../../../../share/domain/instance'
import type IInstanceRepository from '../../instance/domian/InstanceRepository'
import { ISendMessage } from '../../messages/domian/messages'
import type IWhatsAppController from '../domian/whatsAppController'
const clients = new Map<string, Client>()
export default class InstanceController implements IWhatsAppController {
  constructor (private readonly instanceRepository: IInstanceRepository) {}

  async sendMessage (sendMessage: ISendMessage): Promise<void> {
    const instanceKey = `${sendMessage._id}${sendMessage.token}`
    const exist = clients.has(instanceKey)
    if (!exist) return
    const client = clients.get(instanceKey)
    client?.sendMessage('18094436276', 'prueba')
  }

  async start (instanceAuthentication: IInstanceAuthentication): Promise<void> {
    const id = instanceAuthentication._id
    const token = instanceAuthentication.token
    if (id === undefined || token === undefined) return
    const client = new Client({})
    client.on('qr', (qr: string) => {
      this.instanceRepository.updateQr(id, qr)
    })
    client.initialize()
    clients.set(`${id}${token}`, client)
  }
}
