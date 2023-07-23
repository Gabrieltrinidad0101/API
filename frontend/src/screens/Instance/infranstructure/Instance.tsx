import React, { useEffect, useRef, useState } from 'react'
import type IInstance from '../../../../../share/domain/instance'
import { customFecth, wait } from '../../../share/infranstruture/dependencies'
import InstanceCss from './Instance.module.css'
import QRCode from 'qrcode'
import type IHttpResult from '../../../../../share/domain/httpResult'
import { type IInstanceQRStatus } from '../../../../../share/domain/instance'
import InstanceUrlData from './components/instanceUrlData/InstanceUrlData'
import InstanceTools from './components/instanceTools/InstanceTools'
import { instanceApp } from './dependencies'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import InstanceName from './components/instanceName/InstanceName'
import InstanceStateControl from './components/instanceStateControl/InstanceStateControl'
import APIURL from '../../../share/application/Api'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const initialState: IInstance = {
  _id: '',
  status: 'pending',
  token: '',
  userId: '',
  name: ''
}

export default function Instance (): JSX.Element {
  const instanceId = new URLSearchParams(window.location.search).get('id') ?? ''
  const [instanceState, setInstanceState] = useState<IInstance>(initialState)
  const [instanceIsNotFound, setInstanceIsNotFound] = useState<boolean>(false)
  const qrRef = useRef<HTMLDivElement>(null)
  const navigation = useNavigate()

  const createQr = async (qr: string): Promise<void> => {
    const res = await QRCode.toCanvas(qr)
    if (qrRef.current === null) return
    const qrOld = qrRef.current.firstChild
    if (qrOld !== null) qrRef.current.removeChild(qrOld)
    qrRef.current.appendChild(res)
  }

  const goToHome = (): void => {
    navigation('/home')
  }

  const getQr = async ({ _id }: IInstance): Promise<void> => {
    while (window.location.pathname === '/instance') {
      const url = APIURL.getQr(_id)
      const res = await customFecth.get<IHttpResult<IInstanceQRStatus>>(url, {
        token: instanceState?.token
      }, {
        showErrors: false,
        showLoader: false
      })
      const { status, qr } = res?.message ?? { status: 'pending' }
      setInstanceState(prevState => ({ ...prevState, status }))
      if (!isEmptyNullOrUndefined(qr) && qr !== undefined) {
        createQr(qr)
          .catch(error => {
            console.log(error)
          })
      }
      await wait(3000)
    }
  }

  useEffect((): void => {
    instanceApp.findById(instanceId)
      .then(async (res) => {
        if (res === undefined) {
          setInstanceIsNotFound(true)
          return
        }
        setInstanceState(res)
        await getQr(res)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  if (instanceIsNotFound) {
    return <div className='center-screen'>
      <Button variant='contained' onClick={goToHome} >Go To Home</Button>
    </div>
  }

  if (instanceState._id === '') { return <h1>Loading</h1> }

  return (
    <>
      <div className={InstanceCss.container}>
        <div className={InstanceCss.section1}>
          <InstanceName Prop={instanceState} />
          <InstanceTools Prop={instanceState} />
        </div>
        <InstanceUrlData Prop={instanceState} />
        <InstanceStateControl Prop={{ instance: instanceState, qrRef }} />
      </div>
    </>
  )
}
