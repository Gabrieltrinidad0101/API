import React from 'react'
import type Prop from '../../../../../share/domian/prop'
import type IInstance from '../../../../../../../share/domain/instance'
import InstanceUrlDataCss from './InstanceUrlData.module.css'
import { serverUrl } from '../../../../../share/infranstruture/dependencies'

export default function InstanceUrlData ({ Prop: instance }: Prop<IInstance | undefined>): JSX.Element {
  return (
        <div className={InstanceUrlDataCss.container}>
            <div className={InstanceUrlDataCss.section}>
                <div>Estado de autenticación</div>
                <div>{instance?.status.toUpperCase()}</div>
            </div>
            <div className={InstanceUrlDataCss.section}>
                <div>Api de Url</div>
                <div className={InstanceUrlDataCss.inputContainer}>
                    <input type="text" value={`${serverUrl}/${instance?._id ?? ''}`} disabled />
                    <button>
                        <i className="fa-regular fa-copy"></i>
                    </button>
                </div>
            </div>
            <div className={InstanceUrlDataCss.section}>
                <div>Token</div>
                <div className={InstanceUrlDataCss.inputContainer}>
                    <input type="text" value={instance?.token ?? ''} disabled />
                    <button>
                        <i className="fa-regular fa-copy"></i>
                    </button>
                </div>
            </div>
        </div>
  )
}
