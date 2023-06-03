import React from 'react'
import HomeHeader from "./Components/Header/HomeHeader"
import { instanceApp } from './dependencies'
import HomeCss from "./Home.module.css"
import Instances from "./Components/Instances/Instances"
export default function Home() {
  return (
    <div className={HomeCss.container}>
      <HomeHeader Prop={
        {
          createNewInstance: async () => instanceApp.createNewInstance(),
          searchInstance: "",
          setSearchInstance: (searchInstance: string) => { },
          search: () => { }
        }
      } />
      <Instances/>
    </div>
  )
}