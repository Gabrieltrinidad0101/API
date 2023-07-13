import { type IConstantes } from '../domain/constantes'

const HOST = process.env.SERVER_URL ?? 'http://localhost'
const PORT = process.env.PORT !== undefined ? Number(process.env.PORT) : 4000
const SERVERURL = `${HOST}:${PORT}`
const COMPANYNAME = 'Chat Plus'
const PAYMENTURL = process.env.PAYMENT_URL
const PAYMENTSECRET = process.env.PAYMENT_SECRET
const PAYMENTPRODUCTURL = `${PAYMENTURL ?? ''}/v1/catalogs/products`
const CLIENTPAYMENTID = process.env.CLIENT_PAYMENT_ID

const constantes: IConstantes = {
  HOST,
  PORT,
  SERVERURL,
  COMPANYNAME,
  PAYMENTURL,
  PAYMENTSECRET,
  PAYMENTPRODUCTURL,
  CLIENTPAYMENTID
}

export default constantes
