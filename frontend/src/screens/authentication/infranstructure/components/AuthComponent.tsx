import React from 'react'
import imagesContainer from '../../../../share/application/imagesContainer'
import type Prop from '../../../../share/domian/prop'
import { Toast } from '../../../../share/infranstruture/toast'
import type IAuthenticationComponent from '../../domian/IAuthenticaction'
import { type IAuthentication } from '../../domian/IAuthenticaction'
import { customFecth } from '../../../../share/infranstruture/dependencies'
import { Link, useNavigate } from 'react-router-dom'
import type IUser from '../../../../../../share/domain/user'
import { useAuthenticationContext } from '../../../../share/infranstruture/AuthenticationContext'
import UserComponent from '../../../../components/user/insfratructure/User'

const Footer = ({ Prop: isRegister }: Prop<boolean>): JSX.Element => {
  return <Link to={isRegister ? '/login' : '/register'}>
    {isRegister ? 'Login' : 'Register'}
  </Link>
}

export default function AuthComponent ({ Prop: authenticationComponent }: Prop<IAuthenticationComponent>): JSX.Element {
  const isRegister = authenticationComponent.isRegister
  const navigation = useNavigate()
  const { user, setUser } = useAuthenticationContext()

  const clickAuth = async (user: IUser): Promise<void> => {
    const _user: IUser = { ...user, isRegister: authenticationComponent.isRegister }
    const authentication: IAuthentication = {
      user: _user,
      toast: Toast,
      customFecth,
      navigation: (path: string) => { navigation(path) },
      setUser
    }
    await authenticationComponent.onSubmit(authentication)
  }

  const typeOfAuthentication = isRegister ? 'Register' : 'Login'
  const logo = <img src={imagesContainer.logo} alt="designCreate" />
  const submitButtonName = typeOfAuthentication

  return <UserComponent
    logo={logo}
    submitButtonName={submitButtonName}
    user={user}
    hidenInputs={
      {
        cellPhone: !isRegister,
        username: !isRegister
      }
    }
    onSubmit={clickAuth}
    footer={<Footer Prop={isRegister} />}
  />
}
