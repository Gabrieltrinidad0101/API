import { model, Schema } from 'mongoose'

const SubscriptionSchema = new Schema({
  status: String,
  id: String,
  create_time: Date,
  paymentLink: String,
  links: String,
  userId: String,
  instanceId: {
    type: Schema.Types.ObjectId,
    ref: 'instances' // Optional, for referencing another model
  }
})

export const SuscriptionModal = model('subscriptionpayment', SubscriptionSchema)
