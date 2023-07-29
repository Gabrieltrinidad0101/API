import { type IHttpStatusCode } from '../../../../../../share/domain/httpResult'
import type IUserRepository from '../domain/IUserRepository'
import type IToken from '../domain/token'
import type IEncrypt from '../domain/encrypt'
import { type IUserForgotPassword, type IUserApp } from '../domain/user'
import { type TypeValidation } from '../../../share/domain/Validator'
import { dtoUserLogin, dtoUserRegister, dtoUserUpdate } from './dto'
import { type IUserLogin, type IUserRegister, type IUserUpdate, type TypeRol } from '../../../../../../share/domain/user'
import constantes from '../../../share/infranstructure/Constantes'
import { isEmptyNullOrUndefined } from '../../../../../../share/application/isEmptyNullUndefiner'
import { type IEmail } from '../../../share/domain/email'
import { getResetPasswordTemplate } from '../../../share/infranstructure/sendEmail/templates'

export default class UserApp {
  private readonly token: IToken
  private readonly encrypt: IEncrypt
  private readonly userRepository: IUserRepository
  private readonly userSignUpValidator: TypeValidation
  private readonly userSignInValidator: TypeValidation
  private readonly userUpdateValidator: TypeValidation
  private readonly email: IEmail

  constructor (userApp: IUserApp) {
    this.token = userApp.token
    this.encrypt = userApp.encrypt
    this.userRepository = userApp.userRepository
    this.userSignUpValidator = userApp.userSignUpValidator
    this.userSignInValidator = userApp.userSignInValidator
    this.userUpdateValidator = userApp.userUpdateValidator
    this.email = userApp.email
  }

  async register (user: IUserRegister): Promise<IHttpStatusCode> {
    const userDto = dtoUserRegister(user)
    const error = this.userSignUpValidator(userDto)
    if (error !== undefined) {
      return {
        error,
        statusCode: 422,
        message: 'Complete all the data is required'
      }
    }
    const userExist = await this.userRepository.findOne({ email: userDto.email })
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

  async login (user: IUserLogin): Promise<IHttpStatusCode> {
    const userDto = dtoUserLogin(user)
    const error = this.userSignInValidator(userDto)
    if (error !== undefined) {
      return {
        error,
        statusCode: 422
      }
    }
    const userExist = await this.userRepository.findOne({ email: user.email })
    const isValidUser = userExist !== null && await this.encrypt.validate(user.password, userExist?.password ?? '')
    if (isValidUser) {
      return {
        message: this.token.sign({ _id: userExist._id })
      }
    }
    return {
      message: 'The email or password is incorrect',
      statusCode: 422
    }
  }

  async update (user: IUserUpdate): Promise<IHttpStatusCode> {
    const userDto = dtoUserUpdate(user)
    const error = this.userUpdateValidator(userDto)
    if (error !== undefined) {
      return {
        error,
        statusCode: 422,
        message: 'Complete all the data is required'
      }
    }
    const userExist = await this.userRepository.existUserByEmailAndId(userDto.email, userDto._id)
    if (userExist !== null) {
      return {
        message: 'The user exists',
        statusCode: 409
      }
    }
    await this.userRepository.update(userDto)

    return {
      message: 'User is updated successfully'
    }
  }

  async searchUserById (_id: string | undefined): Promise<IHttpStatusCode> {
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
  }

  getUsers = async (rol: TypeRol): Promise<IHttpStatusCode> => {
    if (rol !== 'admin') {
      return {
        message: []
      }
    }

    const user = await this.userRepository.find({}, { password: 0, __v: 0 })
    return {
      message: user
    }
  }

  createUserAdmin = async (): Promise<void> => {
    const user = await this.userRepository.findOne({
      email: constantes.EMAILADMIN
    }, { password: 0, __v: 0 })

    if (user !== null) return
    const password = await this.encrypt.enCode(constantes.PASSWORDADMIN ?? '')
    await this.userRepository.insert({
      name: constantes.USERADMIN ?? '',
      cellPhone: '111111',
      email: constantes.EMAILADMIN ?? '',
      password,
      rol: 'admin'
    })
  }

  updatePassword = async (_id: string, newPassword: string | undefined): Promise<IHttpStatusCode> => {
    if (isEmptyNullOrUndefined(newPassword) || newPassword === undefined) {
      return {
        statusCode: 422,
        error: `Password cannot be ${typeof newPassword}`,
        message: 'The new password is required'
      }
    }
    const encryptPassword = await this.encrypt.enCode(newPassword)
    await this.userRepository.updatePassword({ _id }, encryptPassword)
    return {
      message: 'Password changed successfully'
    }
  }

  sendResetPassword = async (email: string): Promise<void> => {
    const token = this.token.sign({ email, time: new Date().getTime() })
    const { FRONTENDURL, COMPANYLOGO } = constantes
    const linkResetPassword = `${FRONTENDURL}/changePassword?tokenResetPassword=${token}`
    const template = getResetPasswordTemplate(COMPANYLOGO, linkResetPassword)
    await this.email.send({
      subject: 'Email Reset Password',
      to: email,
      template
    })
  }

  forgotPassword = async (token: string, newPassword: string): Promise<IHttpStatusCode> => {
    const userForgotPassword = this.token.verify<IUserForgotPassword>(token)
    if (userForgotPassword === null) {
      return {
        statusCode: 422,
        error: 'token does not have a correct format',
        message: 'Token is not valid'
      }
    }
    const timeOfLive = userForgotPassword.time - new Date().getTime()
    const fiveMinutes = 1000 * 60 * 60
    if (timeOfLive > fiveMinutes) {
      return {
        statusCode: 422,
        error: 'Token expired',
        message: 'Token cannot be less than five minutes'
      }
    }
    const encryptPassword = await this.encrypt.enCode(newPassword)
    await this.userRepository.updatePassword({ email: userForgotPassword.email }, encryptPassword)

    return {
      message: 'We send you email successfully'
    }
  }
}
