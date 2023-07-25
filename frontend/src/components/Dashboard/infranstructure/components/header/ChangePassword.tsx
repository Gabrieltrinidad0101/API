import React from 'react'
import HeaderCss from './Header.module.css'
import { type IChangePassword } from '../../../domian/Dashboard'
import { AvatarComponent } from '../../../../AvatarComponent/AvatarComponent'
import UserComponent from '../../../../user/insfratructure/User'
import type IUser from '../../../../../../../share/domain/user'
import { Toast } from '../../../../../share/infranstruture/toast'
import { useUserContext } from '../../../../../share/infranstruture/AuthenticationContext'

export const ChangePassword = ({ goBack }: IChangePassword): JSX.Element => {
  const { user } = useUserContext()
  const onSubmitChangePassword = async (user: IUser): Promise<void> => {
    if (user.password !== user.repeatedPassword) {
      Toast.error('The passwords are not the same')
    }
  }

  return (
        <UserComponent
            logo={<AvatarComponent width={75} height={75} name={user.name} />}
            onSubmit={onSubmitChangePassword}
            submitButtonName="Save"
            hidenInputs={{
              cellPhone: true,
              email: true,
              username: true
            }}
            footer={
                <p className={HeaderCss.changePassword} onClick={goBack} >Go Back</p>
            }
        />
  )
}
