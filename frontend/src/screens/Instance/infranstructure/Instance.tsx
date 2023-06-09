import React, { useEffect, useRef, useState } from 'react'
import type IInstance from '../../../../../share/domain/instance'
import { customFecth, wait } from '../../../share/infranstruture/dependencies'
import InstanceCss from './Instance.module.css'
import QRCode from 'qrcode'
import type IHttpResult from '../../../../../share/domain/httpResult'
import { type IInstanceQRStatus } from '../../../../../share/domain/instance'
import InstanceActive from './components/instanceActive/InstanceActive'
import InstanceUrlData from './components/instanceUrlData/InstanceUrlData'
import { instanceApp } from './dependencies'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'

export default function Instance (): JSX.Element {
  const instance = new URLSearchParams(window.location.search).get('id') ?? ''
  const [instanceState, setInstanceState] = useState<IInstance>()
  const containerQr = useRef<HTMLDivElement>(null)

  const createQr = async (qr: string): Promise<void> => {
    const res = await QRCode.toCanvas(qr)
    if (containerQr.current === null) return
    const qrOld = containerQr.current.firstChild
    if (qrOld !== null) containerQr.current.removeChild(qrOld)
    containerQr.current.appendChild(res)
  }

  const getQr = async (instance: IInstance): Promise<void> => {
    while (window.location.pathname === '/instance') {
      const res = await customFecth.get<IHttpResult<IInstanceQRStatus>>(`${instance?._id ?? ''}/instance/qr`, {
        token: instance.token
      })
      const qrAndStatus = res?.message
      setInstanceState(prevState => ({ ...prevState, status: qrAndStatus?.status ?? 'pending' }))
      if (!isEmptyNullOrUndefined(qrAndStatus?.qr) && qrAndStatus?.qr !== undefined) {
        createQr(qrAndStatus?.qr)
          .catch(error => {
            console.log(error)
          })
      }

      await wait(qrAndStatus?.status === 'pending' ? 1000 : 10000)
    }
  }

  useEffect((): void => {
    instanceApp.findById(instance)
      .then(async (res) => {
        if (res === undefined) return
        setInstanceState(res)
        await getQr(res)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div className={InstanceCss.container}>
        <InstanceUrlData Prop={instanceState}/>
        {
          instanceState?.status === 'pending'
            ? <div ref={containerQr}></div>
            : <InstanceActive Prop={instanceState} />
        }
      </div>
    </>
  )
}
