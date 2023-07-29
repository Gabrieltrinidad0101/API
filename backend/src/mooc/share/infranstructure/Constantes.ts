import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { type TypekeyOfIConstantes, type IConstantes } from '../domain/constantes'

const HOST = process.env.SERVER_URL ?? 'http://localhost'
const PORT = process.env.PORT !== undefined ? Number(process.env.PORT) : 4000
const SERVERURL = `${HOST}:${PORT}`
const COMPANYNAME = 'Chat Plus'
const PAYMENTURL = process.env.PAYMENT_URL ?? ''
const PAYMENTSECRET = process.env.PAYMENT_SECRET ?? ''
const PAYMENTPRODUCTURL = `${PAYMENTURL ?? ''}/v1/catalogs/products`
const PAYMENTPLANURL = `${PAYMENTURL ?? ''}/v1/billing/plans`
const PAYMENTSUBSCRIPTIONSURL = `${PAYMENTURL ?? ''}/v1/billing/subscriptions`
const CLIENTPAYMENTID = process.env.CLIENT_PAYMENT_ID ?? ''
const USERADMIN = process.env.USER_ADMIN ?? ''
const PASSWORDADMIN = process.env.PASSWORD_ADMIN ?? ''
const EMAILADMIN = process.env.EMAIL_ADMIN ?? ''
const SENTRYDNS = process.env.SENTRY_DNS ?? ''
const FRONTENDURL = process.env.FRONTEND_URL ?? ''
const SERVEREMAIL = process.env.SERVER_EMAIL ?? ''
const SERVEREMAILPASSWORD = process.env.SERVER_EMAIL_PASSWORD ?? ''
const ENCRYPTTOKEN = process.env.ENCRYPT_TOKEN ?? ''
const COMPANYLOGO = process.env.COMPANY_LOGO ?? ''

const constantes: IConstantes = {
  HOST,
  PORT,
  SERVERURL,
  COMPANYNAME,
  PAYMENTPRODUCTURL,
  PAYMENTURL,
  PAYMENTSECRET,
  CLIENTPAYMENTID,
  PAYMENTPLANURL,
  PAYMENTSUBSCRIPTIONSURL,
  USERADMIN,
  PASSWORDADMIN,
  EMAILADMIN,
  SENTRYDNS,
  FRONTENDURL,
  SERVEREMAIL,
  SERVEREMAILPASSWORD,
  ENCRYPTTOKEN,
  COMPANYLOGO
}

// If any property is undefined stop the server
if (Object.values(constantes).some(constante => constante === undefined)) {
  const keys = Object.keys(constantes) as TypekeyOfIConstantes[]
  const listOfValuesNoExist = keys.filter(key => isEmptyNullOrUndefined(constantes[key])).join(',')
  console.log('Obejct: ')
  console.log(constantes)
  console.log(`Values not found: [${listOfValuesNoExist}]`)
  throw new Error('Error incomplete data')
}

export default constantes
