import { Logs } from '../../../../logs'
import { type IConstantes } from '../../../share/domain/constantes'
import { type IHttpRequest } from '../../../share/domain/httpRequest'
import { type TypeValidation } from '../../../share/domain/Validator'
import { type IPaymentLinkOrError, type IPaymentRepository, type ISubscription, type ISubscriptionFromApi, type IUserSubscriber, type IPaymentApp } from '../domian/payment'
import { generateObjectSubscription } from './jsonPayment'

export class PaymentApp implements IPaymentApp {
  constructor (
    private readonly httpRequest: IHttpRequest,
    private readonly constantes: IConstantes,
    private readonly paymentRepository: IPaymentRepository,
    private readonly paymentSubscriptionValidator: TypeValidation
  ) { }

  private readonly makeHttpRequest = async (url: string, productoToCreate: ISubscription): Promise<any> => {
    const response = await this.httpRequest({
      method: 'POST',
      url,
      body: productoToCreate,
      auth: {
        user: this.constantes.CLIENTPAYMENTID,
        pass: this.constantes.PAYMENTSECRET
      }
    })
    return response.body
  }

  generateSubscription = async (userSubscriber: IUserSubscriber): Promise<IPaymentLinkOrError> => {
    const subscription = generateObjectSubscription(userSubscriber)
    return await this.createSubscription(subscription)
  }

  createSubscription = async (subscriptionToCreate: ISubscription): Promise<IPaymentLinkOrError> => {
    const { PAYMENTPLANID, PAYMENTSUBSCRIPTIONSURL } = this.constantes
    subscriptionToCreate.plan_id = PAYMENTPLANID
    const result = await this.makeHttpRequest(PAYMENTSUBSCRIPTIONSURL, subscriptionToCreate) as ISubscriptionFromApi
    const error = this.paymentSubscriptionValidator(result)
    if (error !== undefined) {
      Logs.Error(`Error creating susbscription ${JSON.stringify(error)}`)
      return {
        error: 'Error creating susbscription'
      }
    }
    await this.paymentRepository.saveSubscription(result)
    return {
      paymentLink: result.links[0].href
    }
  }
}
