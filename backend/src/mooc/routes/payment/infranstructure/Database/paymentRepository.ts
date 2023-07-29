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

  findOneProduct = async (filter: object): Promise<IProductFromApi | null> => {
    const paymentProduct = await PaymentProductModal.findOne<IProductFromApi>(filter)
    return paymentProduct
  }

  findLastPlan = async (): Promise<IPlanFromApi> => {
    const plan = await PaymentPlanModal.find<IPlanFromApi>({}).sort({ _id: -1 }).limit(1)
    return plan[0]
  }

  savePlan = async (plan: IPlanFromApi): Promise<void> => {
    const paymentProductModal = new PaymentPlanModal({
      ...plan,
      links: JSON.stringify(plan.links)
    })
    await paymentProductModal.save()
  }
}
