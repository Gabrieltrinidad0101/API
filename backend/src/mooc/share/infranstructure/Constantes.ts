import { type IConstantes } from '../domain/constantes'

const HOST = process.env.SERVER_URL ?? 'http://localhost'
const PORT = process.env.PORT !== undefined ? Number(process.env.PORT) : 4000
const SERVERURL = `${HOST}:${PORT}`
const COMPANYNAME = 'Chat Plus'
const PAYMENTURL = process.env.PAYMENT_URL
const PAYMENTSECRET = process.env.PAYMENT_SECRET
const PAYMENTPRODUCTURL = `${PAYMENTURL ?? ''}/v1/catalogs/products`
const PAYMENTPLANURL = `${PAYMENTURL ?? ''}/v1/billing/plans`
const PAYMENTSUBSCRIPTIONSURL = `${PAYMENTURL ?? ''}/v1/billing/subscriptions`
const CLIENTPAYMENTID = process.env.CLIENT_PAYMENT_ID
const USERADMIN = process.env.USER_ADMIN
const PASSWORDADMIN = process.env.PASSWORD_ADMIN
const EMAILADMIN = process.env.EMAIL_ADMIN

const constantes: IConstantes = {
  HOST,
  PORT,
  SERVERURL,
  COMPANYNAME,
  PAYMENTURL,
  PAYMENTSECRET,
  PAYMENTPRODUCTURL,
  CLIENTPAYMENTID,
  PAYMENTPLANURL,
  PAYMENTSUBSCRIPTIONSURL,
  USERADMIN,
  PASSWORDADMIN,
  EMAILADMIN
}

export default constantes
