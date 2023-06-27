import React, { useEffect } from 'react'
import AuthComponent from './components/AuthComponent'
import { Auth } from '../application/Auth'
import 'react-toastify/dist/ReactToastify.css'
import type IAuthenticationComponent from '../domian/IAuthenticaction'
import type IAuthenticationPage from '../../../share/domian/authentication'
import AuthenticationCss from './Authentication.module.css'
export default function Authentication ({ isRegister }: IAuthenticationPage): JSX.Element {
  const authenticationComponent: IAuthenticationComponent = {
    onSubmit: Auth,
    isRegister,
    hidenInputs: {
      cellPhone: !isRegister,
      username: !isRegister
    }
  }

  useEffect(() => {
    document.title = isRegister ? 'Register' : 'Login'
  })

  return (
    <div className={AuthenticationCss.loginScreen}>
      <AuthComponent Prop={authenticationComponent} />
    </div>
  )
}
