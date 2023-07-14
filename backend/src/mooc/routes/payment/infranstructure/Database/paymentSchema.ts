import { model, Schema } from 'mongoose'

const paymentProductSchema = new Schema({
  id: String,
  name: String,
  description: String,
  create_time: String,
  links: String
})

const PaymentProductModal = model('paymentProduct', paymentProductSchema)

export {
  PaymentProductModal
}
