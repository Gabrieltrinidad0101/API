import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import { type IProduct } from '../../../payment/domian/payment'
import { type IConstantes } from '../../../share/domain/constantes'
import { type IHttpRequest } from '../../../share/domain/httpRequest'
import { type IProductFromApi } from '../domian/payment'

export class PaymentApp {
  constructor (
    private readonly httpRequest: IHttpRequest,
    private readonly constantes: IConstantes
  ) { }

  createProduct = async (productoToCreate: IProduct): Promise<IHttpStatusCode> => {
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
    const productFromApi = response.body as IProductFromApi
    return {
      message: productFromApi.id
    }
  }
}
