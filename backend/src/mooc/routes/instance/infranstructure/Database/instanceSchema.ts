import { model, Schema } from 'mongoose'
const instanceSchema = new Schema({
  name: String,
  userId: String,
  status: String,
  plan: String,
  token: String,
  qr: String,
  webhookUrl: String,
  userName: String,
  initialDate: Date,
  paymentLink: String,
  messageLimit: Number,
  createdIn: Date,
  endService: Date,
  subscriptionId: String
})

const InstanceModal = model('instance', instanceSchema)

export default InstanceModal
