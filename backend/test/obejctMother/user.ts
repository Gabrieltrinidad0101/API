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
  email = 'juan@gmail.com'
}: ITestUser): IUser => {
  return {
    name,
    password,
    isRegister,
    cellPhone,
    email
  }
}
