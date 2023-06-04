import React from 'react'
import { useDashboardContext } from '../../../../Dashboard'
import MenuCss from './Menu.module.css'

interface Prop {
  children: React.ReactNode
}

export default function Menu({ children }: Prop): JSX.Element {
  const { dashboardState } = useDashboardContext()

  return (
    <div className={`${MenuCss.menu} ${dashboardState.hideMenu ? 'd-none' : 'd-block'} `} >
      <nav className={MenuCss.nav}>
        <ul className={MenuCss.listItems}>
          {children}
        </ul>
      </nav >
    </div>
  )
}
