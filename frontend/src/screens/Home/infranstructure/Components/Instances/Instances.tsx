import React from 'react'
import InstancesCss from './Instances.module.css'
import { DataGrid } from '@mui/x-data-grid'
import { type IPropInstance } from '../../../domian/instance'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../../../share/infranstruture/AuthenticationContext'
import { DataGridColumns } from './DataGridColumns'
import { instanceApp } from '../../dependencies'
import type IInstance from '../../../../../../../share/domain/instance'
import { isEmptyNullOrUndefined } from '../../../../../../../share/application/isEmptyNullUndefiner'

export default function Instances ({ instancesData }: IPropInstance): JSX.Element {
  const navigation = useNavigate()
  const goToInstances = (idInstance: string): void => {
    navigation(`/instance?id=${idInstance}`)
  }

  const onPayment = async (instance: IInstance): Promise<void> => {
    const link = await instanceApp.reCreateSubscription(instancesData, instance._id)
    if (isEmptyNullOrUndefined(link)) return
    window.open(link, '_black')
  }

  const { user } = useUserContext()
  return (
    <div className={InstancesCss.wrapper}>
      <DataGrid
        rows={instancesData}
        columns={DataGridColumns({ onClickManage: goToInstances, onPayment })}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          },
          columns: {
            columnVisibilityModel: {
              userName: user.rol === 'admin'
            }
          }
        }}
        pageSizeOptions={[5, 30]}
      />
    </div>
  )
}
