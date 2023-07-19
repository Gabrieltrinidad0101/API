import React, { useEffect, useState } from 'react'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import type IUser from '../../../../../share/domain/user'
import UserCss from './Users.module.css'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { userApp } from './dependencies'

export default function Users (): JSX.Element {
  const [users, setUsers] = useState<IUser[]>([])

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'cellPhone', headerName: 'Cell Phone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 }
  ]

  const getUsers = async (): Promise<void> => {
    const users = await userApp.getUsers()
    if (isEmptyNullOrUndefined(users) || users === undefined || users === null) return
    setUsers(users)
  }

  useEffect(() => {
    getUsers()
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="center-screen">
      <div className={UserCss.wrapper}>
        <DataGrid
          rows={users}
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
    </div>
  )
}
