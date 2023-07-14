import { type IPaymentRepository, type IProductFromApi } from '../../domian/payment'
import { PaymentProductModal } from './paymentSchema'

export default class PaymentRepository implements IPaymentRepository {
  saveProduct = async (product: IProductFromApi): Promise<void> => {
    const paymentProductModal = new PaymentProductModal({
      name: product.name,
      description: product.description,
      create_time: product.create_time,
      links: JSON.stringify(product.links)
    })
    await paymentProductModal.save()
  }

  findById = async (id: number): Promise<IProductFromApi> => {
    const paymentProduct = await PaymentProductModal.findById({ _id: id })
    return paymentProduct as IProductFromApi
  }
}
