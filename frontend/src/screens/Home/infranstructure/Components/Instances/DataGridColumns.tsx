import React from 'react'
import { type GridCellParams, type GridColDef } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { type IDataGridInstance } from '../../../domian/instance'
import formatDate from '../../../../../../../share/application/date'
import type IInstance from '../../../../../../../share/domain/instance'
import InstancesCss from './Instances.module.css'

export const DataGridColumns = ({ userRol, onClickManage }: IDataGridInstance): GridColDef[] => {
  const DateComponent = (dateString: unknown): JSX.Element =>
    <p>{formatDate(dateString as string ?? '')}</p>

  const InstanceStateComponent = (status: unknown): JSX.Element =>
    <p className={`${InstancesCss.baseStatus} ${InstancesCss[status as string]}`}>{status as string}</p>

  const columns: Array<GridColDef<IInstance>> = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'userName', headerName: 'User Name', flex: 1, hideable: userRol !== 'admin' },
    { field: 'name', headerName: 'Instance  Name', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      renderCell: (params: GridCellParams) =>
        DateComponent(params?.value)
    },
    {
      field: 'endService',
      headerName: 'End Service',
      flex: 1,
      renderCell: (params: GridCellParams) =>
        DateComponent(params?.value)
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridCellParams) =>
        InstanceStateComponent(params.value)
    },
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
