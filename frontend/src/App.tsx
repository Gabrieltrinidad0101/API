import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Authentication from './screens/authentication/infranstructure/Authentication'
import './App.css'
import { AuthenticationProvider } from './share/infranstruture/AuthenticationContext'
import Loading from './components/loading/Loading'
import Home from './screens/Home/infranstructure/Home'
import Users from './screens/users/infranstructure/Users'
import Instance from './screens/Instance/infranstructure/Instance'
import Dashboard from './components/Dashboard/infranstructure/Dashboard'
import Documentation from './screens/docs/infranstructure/Documentation'
import SendFile from './screens/docs/infranstructure/components/sendFile/SendFile'
import SendMessage from './screens/docs/infranstructure/components/sendMessage/sendMessage'
import GeneralDocs from './screens/docs/infranstructure/components/generalDocs/GeneralDocs.module'
import ChangePassword from './screens/changePassword/infranstructure/ChangePassword'
import { Payment } from './screens/payment/infranstructure/Payment'
import Page404 from './screens/404/Page404'

export default function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Authentication typeAuthentication='Register' />}></Route>
        <Route path="/login" element={<Authentication typeAuthentication='Login' />}></Route>
        <Route element={<AuthenticationProvider />} >
          <Route element={<Dashboard />}>
            <Route path='/home' element={<Home />} />
            <Route path="/instance" element={<Instance />} />
            <Route path="/docs" element={<GeneralDocs/>} ></Route>
            <Route path="/docs" element={<Documentation/>}>
              <Route path="sendFile" element={<SendFile/>} ></Route>
              <Route path="sendMessage" element={<SendMessage/>} ></Route>
            </Route>
            <Route path="/users" element={<Users/>} ></Route>
          </Route>
        </Route>
        <Route element={<ChangePassword />} path="changePassword" />
        <Route path="/payment" element={<Payment/>} ></Route>
        <Route path="/*" element={<Page404 />}></Route>
      </Routes>
      <ToastContainer />
      <Loading />
    </BrowserRouter>
  )
}
