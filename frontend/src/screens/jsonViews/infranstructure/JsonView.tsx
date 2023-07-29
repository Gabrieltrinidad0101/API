import { Button } from '@mui/material'
import React, { useState } from 'react'
import ReactJson from 'react-json-view'
import JsonViewCss from './JsonView.module.css'
import { jsonViewsApp } from './dependencies'
export default function JsonView (): JSX.Element {
  const [object, setObject] = useState<object>({})

  const listOfPlan = (): void => {
    jsonViewsApp.listOfPlan()
      .then(object => {
        setObject(object ?? {})
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className={JsonViewCss.container}>
      <div className={JsonViewCss.buttons}>
        <div>
          <Button variant='contained' onClick={listOfPlan}>List Of Plan In PayPal</Button>
        </div>
      </div>
      <ReactJson src={object} theme="monokai" />
    </div>
  )
}
