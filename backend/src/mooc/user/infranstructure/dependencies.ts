import UserRepository from './Database/userRepository'
import User from '../application/userApp'
import UserControl from './userControl'
import JWT from './jwt'
import Encrypt from './encrypt'
import { userSignUpValidator, userSignInValidator, updateUserValidator } from './userValidation'
const jwt = new JWT()
const encrypt = new Encrypt()
const userRepository = new UserRepository()
const user = new User({
  token: jwt,
  encrypt,
  userRepository,
  userSignUpValidator,
  userSignInValidator,
  updateUserValidator
})
export const userControl = new UserControl(user)
