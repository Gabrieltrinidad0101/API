import React, { useEffect } from 'react'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import InvoicesCss from './Invoices.module.css'
import { invoicesApp } from './dependecies'
export default function Invoices (): JSX.Element {
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'Paypal Sucription Id', flex: 1 },
    { field: 'instanceID', headerName: 'Instance Id', flex: 1 },
    { field: 'paymentDate', headerName: 'Payment Date', flex: 1 },
    { field: 'instanceName', headerName: 'Instance Name', flex: 1 }
  ]

  useEffect((): void => {
    invoicesApp.get()
      .catch(error => {
        console.log(error)
      })
  })

  return (
    <div className={InvoicesCss.container} >
      <div
        className={InvoicesCss.dataGrid}
      >
        <DataGrid
          rows={[]}
          columns={columns}
          pageSizeOptions={[5, 30]}
        />
      </div>
    </div>
  )
}
