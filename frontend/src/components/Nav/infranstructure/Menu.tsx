import React from 'react'
import MenuCss from './Menu.module.css'

interface Prop {
  children: React.ReactNode
}

export default function Menu({ children }: Prop): JSX.Element {
  return (
    <nav className={MenuCss.nav}>
      <ul className={MenuCss.listItems}>
        {children}
      </ul>
    </nav >
  )
}
