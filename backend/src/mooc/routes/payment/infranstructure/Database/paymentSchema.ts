import { model, Schema } from 'mongoose'

const paymentProductSchema = new Schema({
  id: String,
  name: String,
  description: String,
  create_time: String,
  links: String
})

const paymentPlanSchema = new Schema({
  id: String,
  product_id: String,
  name: String,
  status: String,
  usage_type: String,
  create_time: String,
  links: String
})

const PaymentProductModal = model('paymentProduct', paymentProductSchema)
const PaymentPlanModal = model('paymentPlan', paymentPlanSchema)

export {
  PaymentProductModal,
  PaymentPlanModal
}
