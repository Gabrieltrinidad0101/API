import React, { useState } from 'react'
import MenuCss from './Menu.module.css'
import type INav from '../domian/menu'
import { useNavigate } from 'react-router-dom'
import { isEmptyNullOrUndefined } from '../../../../../../../../../share/application/isEmptyNullUndefiner'

interface PropLogo {
  children: React.ReactNode
  onClick?: () => void
}

export default function Nav ({ onClick, text, children, icon, to }: INav<React.ReactNode>): JSX.Element {
  const [navIsClose, setNavIsClose] = useState<boolean>(true)
  const navigate = useNavigate()
  const clickNav = (): void => {
    setNavIsClose(prev => !prev)
    onClick?.()
  }

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>): void => {
    e.stopPropagation()
  }

  const goTo = (): void => {
    isEmptyNullOrUndefined(to) && to !== undefined && navigate(to)
  }

  return (
    <li className={MenuCss.item} onClick={clickNav}>
      <div onClick={goTo} className={MenuCss.title}>
          {icon}
          <span>{text}</span>
          {
            isEmptyNullOrUndefined(children) &&
            <i className={`fa-solid fa-chevron-up fa-rotate-${navIsClose ? '270' : '180'}`}></i>
          }
      </div>
      <div className={`${MenuCss.subMenu} ${navIsClose ? 'd-none' : ''}`} onClick={stopPropagation}>
          {children}
      </div>
    </li>
  )
}

export function Logo ({ children, onClick }: PropLogo): JSX.Element {
  return <div className={MenuCss.logo} onClick={onClick}>
    {children}
  </div>
}
