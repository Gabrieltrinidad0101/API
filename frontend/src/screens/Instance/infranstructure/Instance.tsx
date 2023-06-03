import React, { useEffect, useRef, useState } from 'react'
import IInstance from '../../../../../share/domain/instance'
import { customFecth, serverUrl, Toast, wait } from '../../../share/infranstruture/dependencies'
import InstanceApp from '../application/instanceApp'
import InstanceCss from './Instance.module.css'
import QRCode from 'qrcode'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import IHttpResult from '../../../../../share/domain/httpResult'
const instanceApp = new InstanceApp({
  customFecth,
  toast: Toast
})

export default function Instance() {
  const instance = new URLSearchParams(window.location.search).get('id') ?? ''
  const [instanceState,setInstanceState] =  useState<IInstance | undefined>();
  const containerQr = useRef<HTMLDivElement>(null);
  
  const createQr = async (qr: string )=>{
    const res = await QRCode.toCanvas(qr)
    if(containerQr.current === null) return
    const qrOld = containerQr.current.firstChild
    if(qrOld !== null) containerQr.current.removeChild(qrOld)
    containerQr.current.appendChild(res);
  }

  const getQr = async (instance: IInstance) => { 
    while(true){
      await wait(10000)
      const res = await customFecth.get<IHttpResult<string>>(`${instance?._id}/instance/qr`,{
        token: instance.token
      })
      if(isEmptyNullOrUndefined(res?.message) || res?.message === undefined) continue;
      createQr(res?.message);
    }
  }


  useEffect(()=>{
    instanceApp.findById(instance)
      .then(res=>{
        if(res === undefined) return
        setInstanceState(res)
        getQr(res);
      })
  },[])


  return (
    <>
      <div className={InstanceCss.container}>
        <div className={InstanceCss.section}>
            <div>Estado de autenticación</div>
            <div>{instanceState?.status.toUpperCase()}</div>
        </div>
        <div className={InstanceCss.section}>
            <div>Api de Url</div>
            <div className={InstanceCss.inputContainer}>
                <input type="text" value={`${serverUrl}/${instanceState?._id}`} disabled />
                <button>
                  <i className="fa-regular fa-copy"></i>
                </button>
            </div>
        </div>
        <div className={InstanceCss.section}>
            <div>Api de Url</div>
            <div className={InstanceCss.inputContainer}>  
                <input type="text" value={`${instanceState?.token || ""}`} disabled />
                <button>
                  <i className="fa-regular fa-copy"></i>
                </button>
            </div>
        </div>
    </div>
    <div ref={containerQr}></div> 
    </>
    )
}
