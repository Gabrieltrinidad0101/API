import { type ISubscriptionFromApi, type IPaymentRepository } from '../../domian/payment'
import { SuscriptionModal } from './paymentSchema'

export default class PaymentRepository implements IPaymentRepository {
  saveSubscription = async (subscription: ISubscriptionFromApi): Promise<void> => {
    const suscriptionModal = new SuscriptionModal({
      ...subscription,
      paymentLink: subscription.links[0].href,
      links: subscription.links.toString()
    })
    await suscriptionModal.save()
  }

  findOneSubscription = async (filter: object): Promise<ISubscriptionFromApi | null> => {
    const subscriptionFromApi = await SuscriptionModal.findOne<ISubscriptionFromApi>(filter)
    return subscriptionFromApi
  }

  updateStatus = async (_id: string,status: string): Promise<void> => {
    await SuscriptionModal.updateOne({_id},{status})
  }
}
