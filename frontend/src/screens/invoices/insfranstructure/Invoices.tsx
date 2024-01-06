import React, { useEffect, useState } from 'react'
import { DataGrid, type GridCellParams, type GridColDef } from '@mui/x-data-grid'
import InvoicesCss from './Invoices.module.css'
import { invoicesApp } from './dependecies'
import { Button, TextField } from '@mui/material'
import { useUserContext } from '../../../share/infranstruture/AuthenticationContext'

const DownloadButton = async (params: GridCellParams): Promise<JSX.Element> => {
  await invoicesApp.downloadPdfSubscriptionInvoice(params.id.toString())
  return <Button variant='text' color='success' > <i className="fa-solid fa-download mr-5"></i> Download</Button>
}

export default function Invoices (): JSX.Element {
  const [invoices, setInvoices] = useState<any[]>([])
  const { user } = useUserContext()
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Paypal Sucription Id', flex: 1 },
    { field: 'instanceId', headerName: 'Instance Id', flex: 1 },
    { field: 'paymentDate', headerName: 'Payment Date', flex: 1 },
    { field: 'instanceName', headerName: 'Instance Name', flex: 1 },
    { field: 'userName', headerName: 'User Name', flex: 1 },
    { field: 'download', headerName: 'Download', flex: 1, renderCell: DownloadButton }
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
