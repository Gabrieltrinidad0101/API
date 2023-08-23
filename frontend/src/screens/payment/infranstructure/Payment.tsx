import React, { useEffect, useState } from 'react'
import PaymentCss from './Payment.module.css'
import { Button } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { paymentApp } from './dependecies'
export function Payment (): JSX.Element {
  const [errorOrSucess, setErrorOrSucess] = useState<boolean>(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const subscriptionId = queryParams.get('subscription_id')
  const verifySubscription = async (): Promise<void> => {
    const error = await paymentApp.verifySubscription(subscriptionId ?? '')
    setErrorOrSucess(error)
  }

  useEffect(() => {
    verifySubscription()
      .catch(error => {
        console.log(error)
      })
  }, [])

  const iconClassName = errorOrSucess ? 'fa-solid fa-xmark' : 'fa-solid fa-check'
  const errorOrSucessClassName = errorOrSucess ? 'error' : 'sucess'

  return (
    <div className={PaymentCss.container}>
      <div className={`${PaymentCss.animation} ${PaymentCss[errorOrSucessClassName]} `}>
        <div className={PaymentCss.loader}></div>
        <div className={PaymentCss.icon}>
          <i className={iconClassName}></i>
        </div>
      </div>
      <div className={PaymentCss.button}>
        <Button variant="outlined">
          <Link to="/home" className='r-link' >
            GO TO HOME
          </Link>
        </Button>
      </div>
    </div>
  )
}
