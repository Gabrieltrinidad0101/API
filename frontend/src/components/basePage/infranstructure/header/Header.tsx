import React from 'react'
import { useDashboardContext } from '../../../../components/Dashboard/infranstructure/Dashboard'
import HeaderCss from "./Header.module.css"
export default function Header() {
    const { dashboardState, setDashboardState } = useDashboardContext()

    const hideMenu = (): void => {
        setDashboardState({
            hideMenu: !(dashboardState.hideMenu ?? false)
        })
    }

    return (
        <div className={HeaderCss.container}>
            <i className={`fa-solid fa-bars cursor-p ${HeaderCss.menu}`} onClick={hideMenu}></i>
        </div>
    )
}
