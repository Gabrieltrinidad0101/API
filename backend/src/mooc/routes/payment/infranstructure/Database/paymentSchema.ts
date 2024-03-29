import { model, Schema } from 'mongoose'

const SubscriptionSchema = new Schema({
  status: String,
  id: String,
  create_time: Date,
  paymentLink: String,
  links: String
})

export const SuscriptionModal = model('subscriptionpayment', SubscriptionSchema)
