import React from 'react'
import { type GridCellParams, type GridColDef } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { type IDataGridInstance } from '../../../domian/instance'
import formatDate from '../../../../../../../share/application/date'
import type IInstance from '../../../../../../../share/domain/instance'
import InstanceStateComponent from '../../../../../components/InstanceStateComponent/InstanceStateComponent'
import type IProp from '../../../../../share/domian/prop'
export const DataGridColumns = ({ onClickManage }: IDataGridInstance): GridColDef[] => {
  const DateComponent = (dateString: unknown): JSX.Element =>
    <p>{formatDate(dateString as string ?? '')}</p>

  const PaymentButton = ({ Prop: instance }: IProp<IInstance>): JSX.Element =>
    <Button color="success" variant="contained">
      <a id="payInstancelink" target="_blank" href={instance.paymentLink} className='remove-style-link' rel="noreferrer">
        Pay
      </a>
    </Button>

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
        <InstanceStateComponent Prop={params.value} />
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params: GridCellParams) => {
        const instance = params.row as IInstance
        return (
          <>
            {
              (instance.status === 'unpayment')
                ? <PaymentButton Prop={instance}/>
                : <Button variant="contained" onClick={() => { onClickManage?.(params.id.toString()) }} >Manager</Button>
            }
          </>
        )
      }
    }
  ]

  return columns
}
