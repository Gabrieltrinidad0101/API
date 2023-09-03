import React from 'react'
import { type GridCellParams, type GridColDef } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { type IDataGridInstance } from '../../../domian/instance'
import formatDate from '../../../../../../../share/application/date'
import type IInstance from '../../../../../../../share/domain/instance'
import { type TypeStatusInstance } from '../../../../../../../share/domain/instance'
import InstanceStateComponent from '../../../../../components/InstanceStateComponent/InstanceStateComponent'
export const DataGridColumns = ({ onClickManage }: IDataGridInstance): GridColDef[] => {
  const goTo = (url: string): void => {
    window.open(url, '_blank')
  }

  const DateComponent = (dateString: unknown): JSX.Element =>
    <p>{formatDate(dateString as string ?? '')}</p>

  const columns: Array<GridColDef<IInstance>> = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'userName', headerName: 'User Name', flex: 1 },
    { field: 'name', headerName: 'Instance  Name', flex: 1 },
    {
      field: 'createdIn',
      headerName: 'Created In',
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
      <InstanceStateComponent Prop={params.value}/>
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params: GridCellParams) => {
        const status = params.row.status as TypeStatusInstance
        const url = params.row.paymentLink as string
        return (
          <>
            {
              status === 'unpayment'
                ? <Button color="success" variant="contained" onClick={() => { goTo(url) }} >Pay</Button>
                : <Button variant="contained" onClick={() => { onClickManage?.(params.id.toString()) }} >Manager</Button>
            }
          </>
        )
      }
    }
  ]

  return columns
}
