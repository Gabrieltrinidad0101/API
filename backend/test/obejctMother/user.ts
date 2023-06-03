interface IUser {
  name?: string
  password?: string
  isRegister?: boolean
}

export const User = ({ name = 'juan', password = '1234', isRegister = false }: IUser): IUser => {
  return {
    name,
    password,
    isRegister
  }
}
