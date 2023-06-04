import React from 'react'
import Menu from './Nav/infranstructure/Menu'
import Nav, { Logo } from './Nav/infranstructure/Nav'

export default function MenuDashboard() {
  return (
    <Menu>
      <Logo>
        ChatPlus+
      </Logo>
      <Nav text="Home" to='/home'>
        <i className={'fas fa-home'}></i>
      </Nav>
      <Nav text='Message' to='/explore' >
        <i className="fa-solid fa-message"></i>
      </Nav>
      <Nav text='Instance' to='/explore' >
        <i className="fa-solid fa-layer-group"></i>
      </Nav>
      <Nav text='Sign out' to='/likes' >
        <i className="fa-solid fa-right-from-bracket"></i>
      </Nav>
    </Menu>
  )
}
