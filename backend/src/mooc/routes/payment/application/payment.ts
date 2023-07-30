import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { Logs } from '../../../../logs'
import { type IPlan, type ISubscription, type TCreateSubscription, type IProduct } from '../../../payment/domian/payment'
import { type IConstantes } from '../../../share/domain/constantes'
import { type IHttpRequest } from '../../../share/domain/httpRequest'
import { type TypeValidation } from '../../../share/domain/Validator'
import { type IPlanFromApi, type IPaymentRepository, type IProductFromApi, type IPaymentApp } from '../domian/payment'

export class PaymentApp implements IPaymentApp {
  constructor (
    private readonly httpRequest: IHttpRequest,
    private readonly constantes: IConstantes,
    private readonly paymentRepository: IPaymentRepository,
    private readonly paymentProductValidator: TypeValidation
  ) { }

  private readonly makeHttpRequest = async (productoToCreate: TCreateSubscription, url: string | undefined): Promise<any> => {
    if (url === undefined) {
      throw new Error('Payment url not specified')
    }

    const response = await this.httpRequest({
      method: productoToCreate === null ? 'GET' : 'POST',
      url,
      body: productoToCreate ?? {},
      auth: {
        user: this.constantes.CLIENTPAYMENTID,
        pass: this.constantes.PAYMENTSECRET
      }
    })
    return response.body
  }

  configurationPayment = async (productoToCreate: IProduct, planToCreate: IPlan): Promise<void> => {
    const product = await this.paymentRepository.findOneProduct({})
    if (product !== null) {
      Logs.Info('Payment Product was created')
      return
    }
    const productFromApi = await this.makeHttpRequest(productoToCreate, this.constantes.PAYMENTPRODUCTURL) as IProductFromApi
    const error = this.paymentProductValidator(productFromApi)
    if (error !== undefined) {
      Logs.Error(`Object =${JSON.stringify(productFromApi)},Error = ${error !== null ? JSON.stringify(error) : 'Empty Object'}`)
      return
    }
    await this.paymentRepository.saveProduct(productFromApi)
    planToCreate.product_id = productFromApi.id ?? ''
    const result = await this.makeHttpRequest(planToCreate, this.constantes.PAYMENTPLANURL) as IPlanFromApi

    await this.paymentRepository.savePlan(result)
  }

  createSubscription = async (subscriptionToCreate: ISubscription): Promise<IHttpStatusCode> => {
    const plan = await this.paymentRepository.findLastPlan()
    subscriptionToCreate.plan_id = plan.id
    const result = await this.makeHttpRequest(subscriptionToCreate, this.constantes.PAYMENTSUBSCRIPTIONSURL)
    if (result === undefined) { throw new Error('Error creating subscription API return undefined') }
    return {
      message: result
    }
  }

  listOfPlans = async (): Promise<IHttpStatusCode> => {
    const result = await this.makeHttpRequest(null, this.constantes.LISTPLANSURL)
    return {
      message: result
    }
  }
}
