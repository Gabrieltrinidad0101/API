import React, { useEffect, useState } from 'react'
import HomeHeader from './Components/Header/HomeHeader'
import { instanceApp } from './dependencies'
import HomeCss from './Home.module.css'
import Instances from './Components/Instances/Instances'
import type IInstance from '../../../../../share/domain/instance'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { useUserContext } from '../../../share/infranstruture/AuthenticationContext'

export default function Home (): JSX.Element {
  const [instancesData, setInstancesData] = useState<IInstance[]>([])
  const { user } = useUserContext()
  const [search, setSearch] = useState<string>('')

  const getInstance = async (): Promise<void> => {
    const instances = await instanceApp.get({ limit: 10000, skip: 0, search })
    if (isEmptyNullOrUndefined(instances) || instances === undefined) return
    setInstancesData(instances)
  }

  useEffect(() => {
    document.title = 'Home'
    getInstance()
      .catch(error => {
        console.log(error)
      })
  }, [])

  const createNewInstance = async (): Promise<void> => {
    const newInstance = await instanceApp.createNewInstance(user.name)
    if (newInstance === undefined) return
    setInstancesData((prevInstancesData) => [newInstance, ...prevInstancesData])
  }

  return (
    <div className={HomeCss.container}>
      <HomeHeader Prop={
        {
          createNewInstance,
          searchInstance: search,
          setSearchInstance: (searchInstance: string) => { setSearch(searchInstance) },
          search: () => { getInstance().catch(error => { console.log(error) }) }
        }
      } />
      <Instances instancesData={instancesData} />
    </div>
  )
}
