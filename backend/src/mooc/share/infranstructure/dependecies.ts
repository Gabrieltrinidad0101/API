import JWT from '../../routes/user/infranstructure/jwt'
import VerifyAuthentication from './verifyAuthentication'
import validator from './Validator'
import { Email } from './sendEmail/email'
import { getGenerateInvoiceTemplate } from './sendEmail/templates'
import { createInvoicePdf } from './sendEmail/pdf/invoice'
const jwt = new JWT()
const verifyAuthentication = new VerifyAuthentication(jwt)
const email = new Email()
export {
  verifyAuthentication,
  validator,
  email,
  getGenerateInvoiceTemplate,
  createInvoicePdf
}
