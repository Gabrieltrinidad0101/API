import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmptyNullOrUndefined } from '../../../../../../../share/application/isEmptyNullUndefiner'
import type IInstance from '../../../../../../../share/domain/instance'
import { instanceApp } from '../../dependencies'
import InstancesCss from './Instances.module.css'

export default function Instances (): JSX.Element {
  const [instancesData, setInstancesData] = useState<IInstance[]>([])
  const navigation = useNavigate()

  useEffect(() => {
    instanceApp.get({ limit: 10, skip: 0, search: '' })
      .then(instances => {
        if (isEmptyNullOrUndefined(instances) || instances === undefined) return
        setInstancesData(instances)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const goToInstances = (idInstance: string | undefined): void => {
    if (idInstance === undefined) { alert('Error try later'); return }
    navigation(`/instance?id=${idInstance}`)
  }

  return (
        <div className={InstancesCss.wrapper}>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>WhatsApp name</th>
                        <th>Create Date</th>
                        <th>Expire Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        instancesData.map((instanceData) => {
                          console.log(instanceData.createdAt)
                          return <tr key={instanceData._id} onClick={() => { goToInstances(instanceData._id) }}>
                                <td data-column="#">{instanceData._id}</td>
                                <td data-column="WhatsApp name">{instanceData.name}</td>
                                <td data-column="Create Date">{instanceData.createdAt?.substring(0, 10)}</td>
                                <td data-column="Expire Date">Prubea</td>
                                <td data-column="Status">{instanceData.status}</td>
                                <td>1111111</td>
                            </tr>
                        }
                        )
                    }

                </tbody>
            </table>
        </div>
  )
}
