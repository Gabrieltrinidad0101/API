import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { isEmptyNullOrUndefined } from '../../../../../../../share/application/isEmptyNullUndefiner';
import IInstance from '../../../../../../../share/domain/instance';
import {instanceApp} from '../../dependencies'
import InstancesCss from "./Instances.module.css"

export default function Instances() {
    const [instancesData,setInstancesData] = useState<IInstance[]>([]);
    const navigation = useNavigate()

    useEffect(()=>{
        instanceApp.get({limit: 10,skip: 0,search: ""})
            .then(instances=>{
                if(isEmptyNullOrUndefined(instances) || instances === undefined) return
                setInstancesData(instances)
            })
    },[])

    const goToInstances = (idInstance: string | undefined)=>{
        if(idInstance === undefined) return alert("Error try later")
        navigation(`/instance?id=${idInstance}`)
    }

    return (
        <div className={InstancesCss.wrapper}>
            <table>
                <caption>
                    Instances
                </caption>
                <thead>
                    <tr className={InstancesCss.headerTable}>
                        <th>Instance</th>
                        <th>WhatsApp name</th>
                        <th>Create Date</th>
                        <th>Expire Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        instancesData.map((instanceData)=>
                        <tr key={instanceData._id} onClick={()=>goToInstances(instanceData._id)}>
                            <td data-cell="name">{instanceData._id}</td>
                            <td data-cell="name">{instanceData.name}</td>
                            <td data-cell="name">Prubea</td>
                            <td data-cell="name">Prubea</td>
                            <td data-cell="name">{instanceData.status}</td>
                            <td data-cell="name">1111111</td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
