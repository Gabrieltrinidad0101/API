import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { type TypekeyOfIConstantes, type IConstantes } from '../domain/constantes'

const HOST = process.env.SERVER_URL ?? 'http://localhost'
const PORT = process.env.PORT !== undefined ? Number(process.env.PORT) : 4000
const SERVER_URL = `${HOST}:${PORT}`
const COMPANY_NAME = 'Chat Plus'
const PAYMENT_URL = process.env.PAYMENT_URL ?? ''
const PAYMENT_SECRET = process.env.PAYMENT_SECRET ?? ''
const PAYMENT_SUBSCRIPTIONS_URL = `${PAYMENT_URL ?? ''}/v1/billing/subscriptions`
const CLIENT_PAYMENT_ID = process.env.CLIENT_PAYMENT_ID ?? ''
const USER_ADMIN = process.env.USER_ADMIN ?? ''
const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN ?? ''
const EMAIL_ADMIN = process.env.EMAIL_ADMIN ?? ''
const SENTRY_DNS = process.env.SENTRY_DNS ?? ''
const FRONTEND_URL = process.env.FRONTEND_URL ?? ''
const SERVER_EMAIL = process.env.SERVER_EMAIL ?? ''
const SERVER_EMAIL_PASSWORD = process.env.SERVER_EMAIL_PASSWORD ?? ''
const ENCRYPT_TOKEN = process.env.ENCRYPT_TOKEN ?? ''
const COMPANY_LOGO = process.env.COMPANY_LOGO ?? ''
const PAYMENT_PLAN_ID = process.env.PAYMENT_PLAN_ID ?? ''
const CELLPHONE_ADMIN = process.env.CELLPHONE_ADMIN ?? ''

const constantes: IConstantes = {
  HOST,
  PORT,
  SERVER_URL,
  COMPANY_NAME,
  PAYMENT_URL,
  PAYMENT_SECRET,
  CLIENT_PAYMENT_ID,
  PAYMENT_SUBSCRIPTIONS_URL,
  USER_ADMIN,
  CELLPHONE_ADMIN,
  PASSWORD_ADMIN,
  EMAIL_ADMIN,
  SENTRY_DNS,
  FRONTEND_URL,
  SERVER_EMAIL,
  SERVER_EMAIL_PASSWORD,
  ENCRYPT_TOKEN,
  COMPANY_LOGO,
  PAYMENT_PLAN_ID
}

// If any property is undefined stop the server
if (Object.values(constantes).some(constante => isEmptyNullOrUndefined(constante))) {
  const keys = Object.keys(constantes) as TypekeyOfIConstantes[]
  const listOfValuesNoExist = keys.filter(key => isEmptyNullOrUndefined(constantes[key])).join(',')
  console.log('Obejct: ')
  console.log(constantes)
  console.log(`Values not found: [${listOfValuesNoExist}]`)
  process.exit(1)
}

export default constantes
