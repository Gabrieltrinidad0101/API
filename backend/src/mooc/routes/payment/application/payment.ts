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

  configurationPayment = async (productoToCreate: IProduct, planToCreate: IPlan): Promise<IHttpStatusCode> => {
    const product = await this.paymentRepository.findOneProduct({})
    if (product !== null) {
      return {
        statusCode: 201,
        message: 'Product was created'
      }
    }
    const productFromApi = await this.makeHttpRequest(productoToCreate, this.constantes.PAYMENTPRODUCTURL) as IProductFromApi
    if (productFromApi === undefined) {
      return {
        statusCode: 500,
        error: 'Error creating payment product API return undefined',
        message: 'Error creating product'
      }
    }
    await this.paymentRepository.saveProduct(productFromApi)

    planToCreate.product_id = productFromApi._id ?? ''
    const result = await this.makeHttpRequest(planToCreate, this.constantes.PAYMENTPLANURL) as IPlanFromApi
    if (result === undefined) {
      return {
        statusCode: 500,
        error: 'Error creating plan API return undefined',
        message: 'Error creating plan'
      }
    }
    await this.paymentRepository.savePlan(result)
    return {
      message: 'Plan and Product created successfully'
    }
  }

  createSubscription = async (subscriptionToCreate: ISubscription): Promise<IHttpStatusCode> => {
    const plan = await this.paymentRepository.findLastPlan()
    subscriptionToCreate.plan_id = plan.id
    const result = await this.makeHttpRequest(subscriptionToCreate, this.constantes.PAYMENTSUBSCRIPTIONSURL) as ISubscription
    if (result === undefined) { throw new Error('Error creating subscription API return undefined') }
    return {
      message: 'Plan created successfully'
    }
  }

  listOfPlans = async (): Promise<IHttpStatusCode> => {
    const result = await this.makeHttpRequest(null, this.constantes.LISTPLANSURL)
    return {
      message: result
    }
  }
}
