import { type IHttpStatusCode } from '../../../../../share/domain/httpResult'
import type IUserRepository from '../domain/IUserRepository'
import type IToken from '../domain/token'
import type IEncrypt from '../domain/encrypt'
import { type IUserApp } from '../domain/user'
import type IUser from '../../../../../share/domain/user'
import { type TypeValidation } from '../../share/domain/Validator'
import { getUserDto } from './dto'

export default class UserApp {
  private readonly token: IToken
  private readonly encrypt: IEncrypt
  private readonly userRepository: IUserRepository
  private readonly userSignUpValidator: TypeValidation
  private readonly userSignInValidator: TypeValidation
  private readonly userUpdateValidator: TypeValidation
  constructor (userApp: IUserApp) {
    this.token = userApp.token
    this.encrypt = userApp.encrypt
    this.userRepository = userApp.userRepository
    this.userSignUpValidator = userApp.userSignUpValidator
    this.userSignInValidator = userApp.userSignInValidator
    this.userUpdateValidator = userApp.userUpdateValidator
  }

  async register (user: IUser): Promise<IHttpStatusCode> {
    const userDto = getUserDto(user)
    const error = this.userSignUpValidator(userDto)
    if (error !== undefined) {
      return {
        error,
        statusCode: 422,
        message: 'Complete all the data is required'
      }
    }
    const userExist = await this.userRepository.findByEmail(userDto.email)
    if (userExist !== null) {
      return {
        message: 'The user exists',
        statusCode: 409
      }
    }
    userDto.password = await this.encrypt.enCode(userDto?.password ?? '')
    const userSave = await this.userRepository.insert(userDto)
    return {
      message: this.token.sign({ _id: userSave?._id })
    }
  }

  async login (user: IUser): Promise<IHttpStatusCode> {
    const userDto = getUserDto(user)
    const error = this.userSignInValidator(userDto)
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
    const error = this.userUpdateValidator(user)
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
      message: 'User is updated successfully'
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
      const user = await this.userRepository.findById(_id, { password: 0, __v: 0 })
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
