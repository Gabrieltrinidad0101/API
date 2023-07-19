import { type IPlanFromApi, type IPaymentRepository, type IProductFromApi } from '../../domian/payment'
import { PaymentPlanModal, PaymentProductModal } from './paymentSchema'

export default class PaymentRepository implements IPaymentRepository {
  saveProduct = async (paymentProduct: IProductFromApi): Promise<void> => {
    const paymentProductModal = new PaymentProductModal({
      id: paymentProduct.id,
      name: paymentProduct.name,
      description: paymentProduct.description,
      create_time: paymentProduct.create_time,
      links: JSON.stringify(paymentProduct.links)
    })
    await paymentProductModal.save()
  }

  findById = async (_id: number): Promise<IProductFromApi | undefined> => {
    const paymentProduct = await PaymentProductModal.findById<IProductFromApi>({ _id })
    if (paymentProduct === null) return
    return paymentProduct
  }

  savePlan = async (plan: IPlanFromApi): Promise<void> => {
    const paymentProductModal = new PaymentPlanModal({
      ...plan,
      links: JSON.stringify(plan.links)
    })
    await paymentProductModal.save()
  }
}
