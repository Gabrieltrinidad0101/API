import UserRepository from './Database/userRepository'
import Authentication from '../application/auth'
import AuthControl from './authControl'
import JWT from './jwt'
import Encrypt from './encrypt'

const jwt = new JWT()
const encrypt = new Encrypt()
const userRepository = new UserRepository()
const authentication = new Authentication(jwt, encrypt, userRepository)
export const authControl = new AuthControl(authentication)
