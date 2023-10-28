import { type IEmail } from '../../../share/domain/email'
import { type TypeValidation } from '../../../share/domain/Validator'
import type IEncrypt from './encrypt'
import type IUserRepository from './IUserRepository'
import type IToken from './token'

export interface IUserApp {
  token: IToken
  encrypt: IEncrypt
  userRepository: IUserRepository
  email: IEmail
  userSignUpValidator: TypeValidation
  userSignInValidator: TypeValidation
  userUpdateValidator: TypeValidation
}

export interface IUserForgotPassword {
  email: string
  time: number
}
