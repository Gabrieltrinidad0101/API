import React from 'react'
import MenuCss from './Menu.module.css'
import type INav from '../domian/menu'
import { Link } from 'react-router-dom'

interface PropLogo {
  children: React.ReactNode
  onClick?: () => void
}

export default function Nav ({ onClick, text, children, to }: INav<React.ReactNode>): JSX.Element {
  return (
    <li className={MenuCss.item} onClick={onClick}>
      <Link to={to}>
          {children}
          <span className="">{text}</span>
      </Link>
    </li>
  )
}

export function Logo ({ children, onClick }: PropLogo): JSX.Element {
  return <div className={MenuCss.logo} onClick={onClick}>
    {children}
  </div>
}
