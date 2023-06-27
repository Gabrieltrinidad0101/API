import UserRepository from './Database/userRepository'
import User from '../application/userApp'
import UserControl from './userControl'
import JWT from './jwt'
import Encrypt from './encrypt'
import { userSignUpValidator, userSignInValidator, userUpdateValidator } from './userValidation'
const jwt = new JWT()
const encrypt = new Encrypt()
const userRepository = new UserRepository()
const user = new User({
  token: jwt,
  encrypt,
  userRepository,
  userSignUpValidator,
  userSignInValidator,
  userUpdateValidator
})
export const userControl = new UserControl(user)
