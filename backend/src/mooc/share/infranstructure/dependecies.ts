import JWT from '../../routes/user/infranstructure/jwt'
import VerifyAuthentication from './verifyAuthentication'
import validator from './Validator'
const jwt = new JWT()
const verifyAuthentication = new VerifyAuthentication(jwt)
export {
  verifyAuthentication,
  validator
}
