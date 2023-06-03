import { model, Schema } from 'mongoose'

const instanceSchema = new Schema({
  name: String,
  userId: String,
  status: String,
  plan: String,
  token: String,
  qr: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const InstanceModal = model('instance', instanceSchema)

export default InstanceModal
