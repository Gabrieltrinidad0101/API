import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Nav/infranstructure/Menu'
import Nav, { Logo } from './Nav/infranstructure/Nav'

export default function MenuDashboard (): JSX.Element {
  const session = (): void => {
    localStorage.setItem('token', '')
  }
  return (
    <Menu>
      <Logo>
        ChatPlus+
      </Logo>
      <Nav text="Home" to='/home' icon={<i className={'fas fa-home'}></i>} />
      <Nav text='Message' icon={<i className={'fa-solid fa-message'}></i>}>
        <Link to="/docs/sendMessage">
          <i className="fa-regular fa-message ml-5"></i>
          Send Message
        </Link>
        <Link to="/docs/sendFile" >
          <i className="fa-regular fa-file ml-5"></i>
          Send File
        </Link>
      </Nav>
      <Nav text='Instance' icon={<i className={'fa-solid fa-layer-group'}></i>}>
        <Link to="/docs/instanceTools">
          <i className="fa-solid fa-screwdriver-wrench ml-5"></i>
          Instance Tools
        </Link>
      </Nav>
      <Nav text='Users' to='/users' icon={<i className={'fa-solid fa-user'}></i>}></Nav>
      <Nav text='Sign out' onClick={session} to='/login' icon={<i className={'fa-solid fa-right-from-bracket'}></i>}>
      </Nav>
    </Menu>
  )
}
