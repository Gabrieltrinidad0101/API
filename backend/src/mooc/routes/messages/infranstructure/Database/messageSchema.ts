import { model, Schema } from 'mongoose'

const messageSchema = new Schema({
  userId: String,
  instanceId: String,
  to: String,
  body: String,
  filename: String,
  token: String,
  document: String,
  isQueue: Boolean
})

export const MessageModal = model('message', messageSchema)
