import type IUser from '../../../../../../share/domain/user'
import { type IUserLogin, type IUserRegister, type IUserUpdate } from '../../../../../../share/domain/user'

export const dtoUserRegister = (user: IUserRegister): IUserRegister => ({
  name: user.name,
  password: user.password,
  cellPhone: user.cellPhone,
  email: user.email,
  rol: user.rol
})

export const dtoUserLogin = (user: IUserLogin): IUserLogin => ({
  email: user.email,
  password: user.password
})

export const getUserDto = (user: IUser): IUser => {
  return {
    name: user.name,
    password: user.password,
    cellPhone: user.cellPhone,
    email: user.email,
    rol: 'user'
  }
}

export const dtoUserUpdate = (user: IUserUpdate): IUserUpdate => {
  return {
    name: user.name,
    cellPhone: user.cellPhone,
    email: user.email,
    _id: user._id
  }
}
