import React, { useContext, useState } from 'react'
import type IDashboard from '../domian/Dashboard'
import DashboardCss from './Dashboard.module.css'
import { type IDashboardState, type IDashboardContext } from '../domian/Dashboard'
import HeaderDashboard from "./components/header/HeaderDashboard"
import MenuDashboard from './components/Menu/MenuDashboard'
import { Outlet } from 'react-router-dom'

const initialState: IDashboardState = {
  hideMenu: false
}

const AuthContext = React.createContext<IDashboardContext>({
  setDashboardState: () => {},
  dashboardState: initialState
})

export default function Dashboard (): JSX.Element {
  const [dashboardState, setDashboardState] = useState<IDashboardState>(initialState)

  const changeDashboard = (_dashboardState: IDashboardState): void => {
    setDashboardState({ ...dashboardState, ..._dashboardState })
  }

  return (
    <AuthContext.Provider value={{
      setDashboardState: changeDashboard,
      dashboardState
    }}>
      <div className={`${DashboardCss.container} ${dashboardState.hideMenu ? DashboardCss.hideMenu : ""} `}>
        <HeaderDashboard/>
        <MenuDashboard/>
        <div className={DashboardCss.main} >
          <Outlet/>
        </div>
      </div>
    </AuthContext.Provider>
  )
}

export const useDashboardContext = (): IDashboardContext => {
  return useContext<IDashboardContext>(AuthContext)
}
