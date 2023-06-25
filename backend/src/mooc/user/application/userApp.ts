import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type IUserRepository from '../domain/IUserRepository'
import type IToken from '../domain/token'
import type IEncrypt from '../domain/encrypt'
import { type IUserApp } from '../domain/user'
import type IUser from '../../../../../share/domain/user'
import { type TypeValidation } from '../../share/domain/Validator'

export default class UserApp {
  private readonly token: IToken
  private readonly encrypt: IEncrypt
  private readonly userRepository: IUserRepository
  private readonly userSignUpValidator: TypeValidation
  private readonly userSignInValidator: TypeValidation
  constructor (userApp: IUserApp) {
    this.token = userApp.token
    this.encrypt = userApp.encrypt
    this.userRepository = userApp.userRepository
    this.userSignUpValidator = userApp.userSignUpValidator
    this.userSignInValidator = userApp.userSignInValidator
  }

  async register (user: IUser): Promise<IHttpStatusCode> {
    const error = this.userSignUpValidator(user)
    if (error !== undefined) {
      return {
        error,
        statusCode: 422,
        message: 'Complete all the data is required'
      }
    }
    const userExist = await this.userRepository.findByEmail(user.name)
    if (userExist !== null) {
      return {
        message: 'The user exists',
        statusCode: 409
      }
    }
    user.password = await this.encrypt.enCode(user?.password ?? '')
    const userSave = await this.userRepository.insert(user)
    return {
      message: this.token.sign({ _id: userSave?._id })
    }
  }

  async login (user: IUser): Promise<IHttpStatusCode> {
    const error = this.userSignInValidator(user)
    if (error !== undefined) {
      return {
        error,
        statusCode: 422
      }
    }
    const userExist = await this.userRepository.findByEmail(user.email)
    const validateUser = (userExist !== null) && await this.encrypt.validate(user?.password ?? '', userExist?.password ?? '')
    if (validateUser) {
      return {
        message: this.token.sign({ _id: userExist._id })
      }
    }
    return {
      message: 'The email or password is incorrect',
      statusCode: 404
    }
  }

  async update (user: IUser): Promise<IHttpStatusCode> {
    const error = this.userSignUpValidator(user)
    if (error !== undefined) {
      return {
        error,
        statusCode: 422,
        message: 'Complete all the data is required'
      }
    }
    const userExist = await this.userRepository.findByEmail(user.name)
    if (userExist !== null) {
      return {
        message: 'The user exists',
        statusCode: 409
      }
    }
    await this.userRepository.update(user)

    return {
      message: this.token.sign({ _id: user._id })
    }
  }

  async searchUserById (_id: string | undefined): Promise<IHttpStatusCode> {
    try {
      if (_id === undefined) {
        return {
          message: "Error User's ID is undefined",
          statusCode: 500
        }
      }
      const user = await this.userRepository.findById(_id, { password: 0 })
      return {
        message: user
      }
    } catch (ex) {
      return {
        message: 'Error try later',
        statusCode: 500
      }
    }
  }
}
