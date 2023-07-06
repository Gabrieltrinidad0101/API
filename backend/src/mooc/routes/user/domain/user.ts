import { type TypeValidation } from '../../../share/domain/Validator'
import type IEncrypt from './encrypt'
import type IUserRepository from './IUserRepository'
import type IToken from './token'

export interface IUserApp {
  token: IToken
  encrypt: IEncrypt
  userRepository: IUserRepository
  userSignUpValidator: TypeValidation
  userSignInValidator: TypeValidation
  userUpdateValidator: TypeValidation
}

export interface IUpdateUser {
  name: string
  cellPhone: string
  email: string
  _id?: string
}
