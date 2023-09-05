import { type ISubscriptionAndInstance } from '../../../../../../../share/domain/instance'
import { type TypeRol } from '../../../../../../../share/domain/user'
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

  findSubscriptions = async (filter: object): Promise<ISubscriptionFromApi[]> => {
    const subscriptionFromApi = await SuscriptionModal.find<ISubscriptionFromApi>(filter)
    return subscriptionFromApi
  }

  updateStatus = async (_id: string, status: string): Promise<void> => {
    await SuscriptionModal.updateOne({ _id }, { status })
  }

  findPaymentsWithInstance = async (userId: string, userRol: TypeRol): Promise<ISubscriptionAndInstance[]> => {
    return await SuscriptionModal.aggregate<ISubscriptionAndInstance>([
      {
        $lookup: {
          from: 'instances', // The name of the target collection (case-sensitive)
          foreignField: 'subscriptionId', // The field in the 'instances' collection
          localField: 'id', // The field in the 'suscription' collection
          as: 'instance' // The alias for the joined data
        }
      }, {
        $match: {
          'instances.userId': userRol === 'admin' ? {} : { $eq: userId }
        }
      }
    ])
  }
}
