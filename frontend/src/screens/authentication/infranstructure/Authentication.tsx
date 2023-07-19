import React, { useEffect } from 'react'
import AuthComponent from './components/AuthComponent'
import { Auth } from '../application/Auth'
import 'react-toastify/dist/ReactToastify.css'
import type IAuthenticationComponent from '../domian/IAuthenticaction'
import type IAuthenticationPage from '../../../share/domian/authentication'
import AuthenticationCss from './Authentication.module.css'
export default function Authentication ({ typeAuthentication }: IAuthenticationPage): JSX.Element {
  const authenticationComponent: IAuthenticationComponent = {
    onSubmit: Auth,
    typeAuthentication
  }

  useEffect(() => {
    document.title = typeAuthentication
  })

  return (
    <div className={AuthenticationCss.loginScreen}>
      <AuthComponent Prop={authenticationComponent} />
    </div>
  )
}
