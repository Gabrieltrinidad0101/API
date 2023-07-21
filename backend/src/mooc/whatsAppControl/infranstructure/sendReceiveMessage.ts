import { type Message } from 'whatsapp-web.js'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import type IInstance from '../../../../../share/domain/instance'

const sendReceiveMessage = async (message: Message, instance: IInstance): Promise<void> => {
  try {
    const { webhookUrl } = instance
    if (isEmptyNullOrUndefined(webhookUrl) || webhookUrl === undefined) return
    const postData = JSON.stringify(message)
    console.log(postData)
    // await axios(webhookUrl, {
    //   method: 'POST',
    //   data: postData
    // })
  } catch (error) {
    console.log(error)
  }
}

export default sendReceiveMessage
