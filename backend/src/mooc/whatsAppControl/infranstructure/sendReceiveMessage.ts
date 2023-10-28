import { type Message } from 'whatsapp-web.js'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import type IInstance from '../../../../../share/domain/instance'
import { httpRequet } from '../../share/infranstructure/httpRequest'

const sendReceiveMessage = async (message: Message, instance: IInstance): Promise<void> => {
  try {
    const { webhookUrl } = instance
    if (isEmptyNullOrUndefined(webhookUrl) || webhookUrl === undefined) return
    await httpRequet({
      method: 'POST',
      body: message,
      url: webhookUrl
    })
  } catch (error) {
    console.log(error)
  }
}

export default sendReceiveMessage
