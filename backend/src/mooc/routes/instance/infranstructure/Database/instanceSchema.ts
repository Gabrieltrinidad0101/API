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
  createdIn: {
    type: Date,
    default: Date.now()
  },
  endService: Date
})

const InstanceModal = model('instance', instanceSchema)

export default InstanceModal
