import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { type IPlan, type ISubscription, type TCreateSubscription, type IProduct } from '../../../payment/domian/payment'
import { type IConstantes } from '../../../share/domain/constantes'
import { type IHttpRequest } from '../../../share/domain/httpRequest'
import { type IPlanFromApi, type IPaymentRepository, type IProductFromApi } from '../domian/payment'

export class PaymentApp {
  constructor (
    private readonly httpRequest: IHttpRequest,
    private readonly constantes: IConstantes,
    private readonly paymentRepository: IPaymentRepository
  ) { }

  private readonly makeHttpRequest = async (productoToCreate: TCreateSubscription, url: string | undefined): Promise<any> => {
    if (url === undefined) {
      throw new Error('Payment url not specified')
    }

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

  createProduct = async (productoToCreate: IProduct): Promise<IHttpStatusCode> => {
    const productFromApi = await this.makeHttpRequest(productoToCreate, this.constantes.PAYMENTPRODUCTURL) as IProductFromApi
    if (productFromApi === undefined) { throw new Error('Error creating payment product API return undefined') }
    await this.paymentRepository.saveProduct(productFromApi)
    return {
      message: 'Product created successfully'
    }
  }

  createPlan = async (planToCreate: IPlan): Promise<IHttpStatusCode> => {
    const result = await this.makeHttpRequest(planToCreate, this.constantes.PAYMENTPLANURL) as IPlanFromApi
    if (result === undefined) { throw new Error('Error creating subscription API return undefined') }
    await this.paymentRepository.savePlan(result)
    return {
      message: 'Plan created successfully'
    }
  }

  createSubscription = async (subscriptionToCreate: ISubscription): Promise<IHttpStatusCode> => {
    const result = await this.makeHttpRequest(subscriptionToCreate, this.constantes.PAYMENTSUBSCRIPTIONSURL) as ISubscription
    if (result === undefined) { throw new Error('Error creating subscription API return undefined') }
    console.log(result)
    return {
      message: 'Plan created successfully'
    }
  }
}
