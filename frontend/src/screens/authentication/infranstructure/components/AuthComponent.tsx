import React, { useState } from 'react'
import './AuthComponent.css'
import imagesContainer from '../../../../share/application/imagesContainer'
import type Prop from '../../../../share/domian/prop'
import { Toast } from '../../../../share/infranstruture/toast'
import type IAuthenticationComponent from '../../domian/IAuthenticaction'
import { type IAuthentication } from '../../domian/IAuthenticaction'
import { customFecth } from '../../../../share/infranstruture/dependencies'
import { Link, useNavigate } from 'react-router-dom'
import type IUser from '../../../../../../share/domain/user'
import { useAuthenticationContext } from '../../../../share/infranstruture/AuthenticationContext'
import { TextField } from '@mui/material'

export default function AuthComponent ({ Prop: authenticationComponent }: Prop<IAuthenticationComponent>): JSX.Element {
  const [user, setUser] = useState<IUser>({
    name: '',
    password: '',
    isRegister: authenticationComponent.isRegister
  })

  const navigation = useNavigate()
  const userState = useAuthenticationContext()

  const clickAuth = (): void => {
    const _user: IUser = { ...user, isRegister: authenticationComponent.isRegister }
    const authentication: IAuthentication = {
      user: _user,
      toast: Toast,
      customFecth,
      navigation: (path: string) => { navigation(path) },
      userState
    }
    authenticationComponent.onSubmit(authentication)
      .catch((error: DOMException) => {
        console.error(error)
      })
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  return (
    <div className="screen-1">
      <div className="logo">
        <div>
          <img src={imagesContainer.logo} alt="designCreate" />
        </div>
      </div>
      <TextField id="standard-basic" onChange={inputChange} name="name" label="Username" variant="standard" />
      <TextField id="standard-basic" onChange={inputChange} name="cellPhone" type="number" label="Cell Phone  " variant="standard" />
      <TextField id="standard-basic" onChange={inputChange} name="email" type="email" label="Email" variant="standard" />
      <TextField id="standard-basic" onChange={inputChange} name="password" type="password" label="Password" variant="standard" />
      <button id="auth-button" className="login" onClick={clickAuth}>{!authenticationComponent.isRegister ? 'Login' : 'Register'}</button>
      <Link to={authenticationComponent.isRegister ? '/login' : '/register'}>
        {authenticationComponent.isRegister ? 'Login' : 'Register'}
      </Link>
    </div>
  )
}
