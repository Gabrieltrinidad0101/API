import React from 'react'
import type IUser from '../../../../../../../share/domain/user'
import UserComponent from '../../../../user/insfratructure/User'
import { AvatarComponent } from '../../../../AvatarComponent/AvatarComponent'
import { useUserContext } from '../../../../../share/infranstruture/AuthenticationContext'
import HeaderCss from './Header.module.css'
import { type IChangePassword } from '../../../domian/Dashboard'
import { userApp } from '../../../../../screens/users/infranstructure/dependencies'

export function ModifyUser ({ goBack }: IChangePassword): JSX.Element {
  const { user, setUser } = useUserContext()

  const onSubmit = async (user: IUser): Promise<void> => {
    const thereIsAnyError = await userApp.updateUser(user)
    if (thereIsAnyError) return
    setUser(user)
  }

  return (
        <UserComponent
            logo={<AvatarComponent width={75} height={75} name={user.name} />}
            onSubmit={onSubmit}
            submitButtonName="Save"
            user={user}
            hidenInputs={{
              password: true,
              repeatPassword: true
            }}
            footer={
                <p className={HeaderCss.changePassword} onClick={goBack} >Change Password</p>
            }
        />
  )
}
