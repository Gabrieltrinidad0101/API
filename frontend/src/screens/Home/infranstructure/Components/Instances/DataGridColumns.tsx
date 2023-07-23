import React from 'react'
import { type GridCellParams, type GridColDef } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { type IDataGridInstance } from '../../../domian/instance'
export const DataGridColumns = ({ userRol, onClickManage }: IDataGridInstance): GridColDef[] => {
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'userName', headerName: 'User Name', flex: 1, hideable: userRol !== 'admin' },
    { field: 'name', headerName: 'Instance  Name', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'endService', headerName: 'End Service', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params: GridCellParams) => (
                <Button variant="contained" onClick={() => { onClickManage?.(params.id.toString()) }} >Manager</Button>
      )
    }
  ]

  return columns
}
