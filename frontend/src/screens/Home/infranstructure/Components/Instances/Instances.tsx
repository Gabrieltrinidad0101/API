import React from 'react'
import InstancesCss from './Instances.module.css'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { type IPropInstance } from '../../../domian/instance'

export default function Instances ({ instancesData }: IPropInstance): JSX.Element {
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'createdAt', headerName: 'Created at', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 }
  ]

  // const navigation = useNavigate()
  // const goToInstances = (idInstance: string | undefined): void => {
  //   if (idInstance === undefined) { alert('Error try later'); return }
  //   navigation(`/instance?id=${idInstance}`)
  // }

  return (
    <div className={InstancesCss.wrapper}>
      <DataGrid
        rows={instancesData}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        pageSizeOptions={[5, 30]}
      />
    </div>
  )
}
