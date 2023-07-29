import UserRepository from './Database/userRepository'
import UserApp from '../application/userApp'
import UserControl from './userControl'
import JWT from './jwt'
import Encrypt from './encrypt'
import { userSignUpValidator, userSignInValidator, userUpdateValidator } from './userValidation'
import { email } from '../../../share/infranstructure/dependecies'
const jwt = new JWT()
const encrypt = new Encrypt()
export const userRepository = new UserRepository()

const userApp = new UserApp({
  token: jwt,
  encrypt,
  userRepository,
  userSignUpValidator,
  userSignInValidator,
  userUpdateValidator,
  email
})
userApp.createUserAdmin()
  .catch(error => {
    console.log(error)
  })
export const userControl = new UserControl(userApp)
