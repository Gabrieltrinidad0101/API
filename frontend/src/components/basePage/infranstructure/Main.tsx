import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard from "../../Dashboard/infranstructure/Dashboard"
import HomeMenu from './Menu/MainMenu'
import Header from "./header/Header"
export default function Main() {
    return <Dashboard
        header={<Header/>}
        menu={<HomeMenu />}
        main={<Outlet/>}
    />
}
