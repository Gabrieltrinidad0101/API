import type IUser from '../../../../../share/domain/user'

export const getUserDto = (user: IUser): IUser => {
  return {
    name: user.name,
    password: user.password,
    cellPhone: user.cellPhone,
    email: user.email
  }
}

export const getUserUpdateDto = (user: IUser): IUser => {
  return {
    name: user.name,
    password: user.password,
    cellPhone: user.cellPhone,
    email: user.email,
    _id: user._id
  }
}