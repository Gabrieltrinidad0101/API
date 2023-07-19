import type IUser from '../../../share/domain/user'
import { type TypeRol } from '../../../share/domain/user'

export default interface ITestUser {
  name?: string
  password?: string
  cellPhone?: string
  email?: string
  typeAuthentication?: 'login' | 'register'
  rol?: TypeRol
  _id?: string
}

export const User = ({
  name = 'juan',
  password = '1234',
  typeAuthentication = 'login',
  cellPhone = '180999999',
  email = 'juan@gmail.com',
  rol = 'user',
  _id = undefined
}: ITestUser): IUser => {
  return {
    name,
    password,
    typeAuthentication,
    cellPhone,
    rol,
    email,
    _id
  }
}

export const pedroUser: IUser =
{
  name: 'pedro',
  email: 'pedro@gmail.com',
  password: 'pedro123',
  cellPhone: '11111111111',
  _id: '122@34',
  rol: 'user'
}

export const pedroUserModify: IUser =
{
  name: 'pedroModify',
  email: 'pedroModify@gmail.com',
  password: 'pedro123',
  cellPhone: '12222222222',
  _id: '122@34Modify',
  rol: 'user'
}

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
