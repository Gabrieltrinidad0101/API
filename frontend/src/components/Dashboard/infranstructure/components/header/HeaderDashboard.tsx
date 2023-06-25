import { Avatar, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useDashboardContext } from '../../Dashboard'
import HeaderCss from './Header.module.css'
import { useAuthenticationContext } from '../../../../../share/infranstruture/AuthenticationContext'
import UserComponent from '../../../../user/insfratructure/User'
import type IUser from '../../../../../../../share/domain/user'
import { type IIAvatar } from '../../../domian/Dashboard'

const AvatarComponent = (avatar: IIAvatar): JSX.Element => {
  const name = avatar.name
  return <Avatar sx={{ width: avatar.width, height: avatar.height }} alt={name} onClick={() => avatar.onClick?.()} src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} />
}

export default function HeaderDashboard (): JSX.Element {
  const { dashboardState, setDashboardState } = useDashboardContext()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const hideMenu = (): void => {
    setDashboardState({
      hideMenu: !(dashboardState.hideMenu ?? false)
    })
  }
  const { user } = useAuthenticationContext()
  if (user === undefined) return <p> Error loading </p>
  const showEditUser = (): void => {
    setModalOpen(true)
  }

  const closeModal = (): void => {
    setModalOpen(false)
  }

  return (
    <div className={HeaderCss.header}>
      <div className={HeaderCss.container}>
        <i className={`fa-solid fa-bars cursor-p ${HeaderCss.menu}`} onClick={hideMenu}></i>
        <div className={HeaderCss.containerAvata}>
          {<AvatarComponent name={user.name} onClick={showEditUser} />}
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={HeaderCss.containerUser}
      >
        <UserComponent
          logo={<AvatarComponent width={75} height={75} name={user.name} />}
          onSubmit={async (user: IUser): Promise<void> => { }}
          submitButtonName="Save"
          user={user}
          hidenInputs={{
            password: true
          }}
        />
      </Modal >
    </div >
  )
}
