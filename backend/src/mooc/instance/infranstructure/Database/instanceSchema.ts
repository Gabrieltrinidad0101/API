import { model, Schema } from 'mongoose'
import formatDate from '../../../../../../share/application/date'
const instanceSchema = new Schema({
  name: String,
  userId: String,
  status: String,
  plan: String,
  token: String,
  qr: String,
  createdAt: {
    type: String,
    default: formatDate
  }
})

const InstanceModal = model('instance', instanceSchema)

export default InstanceModal
