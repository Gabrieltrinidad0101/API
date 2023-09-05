import React, { useEffect, useState } from 'react'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import InvoicesCss from './Invoices.module.css'
import { invoicesApp } from './dependecies'
import { TextField } from '@mui/material'
import { useUserContext } from '../../../share/infranstruture/AuthenticationContext'
export default function Invoices (): JSX.Element {
  const [invoices, setInvoices] = useState<any[]>([])
  const { user } = useUserContext()
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Paypal Sucription Id', flex: 1 },
    { field: 'instanceId', headerName: 'Instance Id', flex: 1 },
    { field: 'paymentDate', headerName: 'Payment Date', flex: 1 },
    { field: 'instanceName', headerName: 'Instance Name', flex: 1 },
    { field: 'userName', headerName: 'User Name', flex: 1 }
  ]

  useEffect((): void => {
    document.title = 'Invoices'
    invoicesApp.get()
      .then((res: any) => {
        setInvoices(res)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className={InvoicesCss.container} >
      <div
        className={InvoicesCss.dataGrid}
      >
        <DataGrid
          rows={invoices}
          columns={columns}
          pageSizeOptions={[5, 30]}
        />
        {
          user.rol === 'admin' &&
          <div className={InvoicesCss.input}>
            <TextField variant="outlined" label="Total Quantity" focused value={invoices.length * 25} disabled />
          </div>
        }
      </div>
    </div>
  )
}
