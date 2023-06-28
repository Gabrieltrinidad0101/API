import type IUser from '../../../share/domain/user'

export default interface ITestUser {
  name?: string
  password?: string
  cellPhone?: string
  email?: string
  isRegister?: boolean
  _id?: string
}

export const User = ({
  name = 'juan',
  password = '1234',
  isRegister = false,
  cellPhone = '180999999',
  email = 'juan@gmail.com',
  _id = undefined
}: ITestUser): IUser => {
  return {
    name,
    password,
    isRegister,
    cellPhone,
    email,
    _id
  }
}

export const pedroUser = User(
  {
    name: 'pedro',
    email: 'pedro@gmail.com',
    password: 'pedro123',
    _id: '122@34'
  })

export const joseUser = User(
  {
    name: 'jose',
    email: 'jose@gmail.com',
    password: 'jose123',
    _id: '##2244$$'
  })

export const carlosUser = User(
  {
    name: 'carlos',
    email: 'carlos@gmail.com',
    password: 'carlos123',
    _id: '@#$'
  })

export const emptyUser = User(
  {
    name: '',
    email: '',
    password: '',
    _id: '123#$'
  })
