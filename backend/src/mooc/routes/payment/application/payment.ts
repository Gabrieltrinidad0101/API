import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { type IProduct } from '../../../payment/domian/payment'
import { type IConstantes } from '../../../share/domain/constantes'
import { type IHttpRequest } from '../../../share/domain/httpRequest'
import { type IPaymentRepository, type IProductFromApi } from '../domian/payment'

export class PaymentApp {
  constructor (
    private readonly httpRequest: IHttpRequest,
    private readonly constantes: IConstantes,
    private readonly paymentRepository: IPaymentRepository
  ) { }

  private readonly createProductHttpRequest = async (productoToCreate: IProduct): Promise<IProductFromApi | undefined> => {
    if (this.constantes.PAYMENTPRODUCTURL === undefined) {
      throw new Error('Payment url not specified')
    }

    const response = await this.httpRequest({
      method: 'POST',
      url: this.constantes.PAYMENTPRODUCTURL,
      body: productoToCreate,
      auth: {
        user: this.constantes.CLIENTPAYMENTID,
        pass: this.constantes.PAYMENTSECRET
      }
    })
    return response.body as IProductFromApi
  }

  createProduct = async (productoToCreate: IProduct): Promise<IHttpStatusCode> => {
    const productFromApi = await this.createProductHttpRequest(productoToCreate)
    if (productFromApi === undefined) { throw new Error('Error creating payment product API return undefined') }
    await this.paymentRepository.saveProduct(productFromApi)
    return {
      message: 'Product created successfully'
    }
  }
}
