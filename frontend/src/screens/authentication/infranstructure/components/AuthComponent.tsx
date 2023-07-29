import React from 'react'
import imagesContainer from '../../../../share/application/imagesContainer'
import type Prop from '../../../../share/domian/prop'
import { Toast } from '../../../../share/infranstruture/toast'
import type IAuthenticationComponent from '../../domian/IAuthenticaction'
import { type IAuthentication } from '../../domian/IAuthenticaction'
import { customFecth } from '../../../../share/infranstruture/dependencies'
import { Link, useNavigate } from 'react-router-dom'
import type IUser from '../../../../../../share/domain/user'
import { useUserContext } from '../../../../share/infranstruture/AuthenticationContext'
import UserComponent from '../../../../components/user/insfratructure/User'
import { type TypeAuthentication } from '../../../../../../share/domain/user'

const Footer = ({ Prop: authentication }: Prop<TypeAuthentication>): JSX.Element => {
  return <Link to={authentication === 'Login' ? '/register' : '/login'}>
    {authentication === 'Login' ? 'Register' : 'Login'}
  </Link>
}

export default function AuthComponent ({ Prop: authenticationComponent }: Prop<IAuthenticationComponent>): JSX.Element {
  const typeAuthentication = authenticationComponent.typeAuthentication
  const navigation = useNavigate()
  const { user, setUser } = useUserContext()

  const clickAuth = async (user: IUser): Promise<void> => {
    const _user: IUser = { ...user, typeAuthentication }
    const authentication: IAuthentication = {
      user: _user,
      toast: Toast,
      customFecth,
      navigation: (path: string) => { navigation(path) },
      setUser
    }
    await authenticationComponent.onSubmit(authentication)
  }

  const logo = <img src={imagesContainer.logo} alt="designCreate" />

  return <UserComponent
    logo={logo}
    submitButtonName={typeAuthentication}
    user={user}
    hidenInputs={
      {
        cellPhone: typeAuthentication === 'Login',
        username: typeAuthentication === 'Login',
        repeatPassword: true
      }
    }
    onSubmit={clickAuth}
    footer={<Footer Prop={typeAuthentication} />}
  />
}
