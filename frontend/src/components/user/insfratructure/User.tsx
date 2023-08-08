import React, { useState } from 'react'
import type IUser from '../../../../../share/domain/user'
import { Button, TextField } from '@mui/material'
import UserCss from './User.module.css'
import type IUserComponent from '../domian/User'

const initialUser: IUser = {
  name: '',
  cellPhone: '',
  email: '',
  password: '',
  rol: 'user'
}

export default function UserComponent (userComponent: IUserComponent<JSX.Element>): JSX.Element {
  const [user, setUser] = useState<IUser>(userComponent.user ?? initialUser)
  const hidenInputs = userComponent.hidenInputs ?? {}

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const onClick = (): void => {
    userComponent.onSubmit(user)
      .catch((error) => {
        console.log(error)
      })
  }

  const isHiden = (value: boolean | undefined): boolean => {
    return value === undefined || !value
  }

  return (
    <div className={UserCss.screenOne}>
      <div className={UserCss.logo}>
        <div>
          {
            userComponent.logo
          }
        </div>
      </div>
      {isHiden(hidenInputs.username) && <TextField id="standard-basic" onChange={inputChange} value={user?.name} name="name" label="Username" variant="standard" />}
      {isHiden(hidenInputs.email) && <TextField id="standard-basic" onChange={inputChange} value={user?.email} name="email" type="email" label="Email" variant="standard" />}
      {isHiden(hidenInputs.cellPhone) && <TextField id="standard-basic" onChange ={inputChange} value={user?.cellPhone} name="cellPhone" type="number" label="Cell Phone  " variant="standard" />}
      {isHiden(hidenInputs.password) && <TextField id="standard-basic" onChange={inputChange} value={user?.password} name="password" type="password" label="Password" variant="standard" autoComplete='off' />}
      {isHiden(hidenInputs.repeatPassword) && <TextField id="standard-basic" onChange={inputChange} value={user?.repeatPassword} name="repeatPassword" type="password" label="Repeat Password" variant="standard" />}
      <Button onClick={onClick} variant='contained'>{userComponent.submitButtonName}</Button>
      {
        userComponent.footer
      }
    </div>
  )
}
