import React from 'react'
import HomeHeader from './Components/Header/HomeHeader'
import { instanceApp } from './dependencies'
import HomeCss from './Home.module.css'
import Instances from './Components/Instances/Instances'
// import type IInstance from '../../../../../share/domain/instance'

export default function Home (): JSX.Element {
  // const [instancesData, setInstancesData] = useState<IInstance[]>([])

  return (
    <div className={HomeCss.container}>
      <HomeHeader Prop={
        {
          createNewInstance: async () => { await instanceApp.createNewInstance() },
          searchInstance: '',
          setSearchInstance: (searchInstance: string) => { },
          search: () => { }
        }
      } />
      <Instances/>
    </div>
  )
}
