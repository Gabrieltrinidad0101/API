import React from 'react'
import InstancesCss from './Instances.module.css'
import { DataGrid } from '@mui/x-data-grid'
import { type IPropInstance } from '../../../domian/instance'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../../../share/infranstruture/AuthenticationContext'
import { DataGridColumns } from './DataGridColumns'
export default function Instances ({ instancesData }: IPropInstance): JSX.Element {
  const navigation = useNavigate()
  const goToInstances = (idInstance: string): void => {
    navigation(`/instance?id=${idInstance}`)
  }
  const { user } = useUserContext()
  return (
    <div className={InstancesCss.wrapper}>
      <DataGrid
        rows={instancesData}
        columns={DataGridColumns({ onClickManage: goToInstances })}
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
