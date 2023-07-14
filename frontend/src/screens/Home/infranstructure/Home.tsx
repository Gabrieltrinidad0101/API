import React, { useEffect, useState } from 'react'
import HomeHeader from './Components/Header/HomeHeader'
import { instanceApp } from './dependencies'
import HomeCss from './Home.module.css'
import Instances from './Components/Instances/Instances'
import type IInstance from '../../../../../share/domain/instance'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'

export default function Home (): JSX.Element {
  const [instancesData, setInstancesData] = useState<IInstance[]>([])

  useEffect(() => {
    document.title = 'Home'
    instanceApp.get({ limit: 10000, skip: 0, search: '' })
      .then(instances => {
        if (isEmptyNullOrUndefined(instances) || instances === undefined) return
        setInstancesData(instances)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const createNewInstance = async (): Promise<void> => {
    const newInstance = await instanceApp.createNewInstance()
    if (newInstance === undefined) return
    setInstancesData((prevInstancesData) => [newInstance, ...prevInstancesData])
  }

  return (
    <div className={HomeCss.container}>
      <HomeHeader Prop={
        {
          createNewInstance,
          searchInstance: '',
          setSearchInstance: (searchInstance: string) => { },
          search: () => { }
        }
      } />
      <Instances instancesData={instancesData} />
    </div>
  )
}
