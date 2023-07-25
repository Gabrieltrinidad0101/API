import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useDashboardContext } from '../../Dashboard'
import HeaderCss from './Header.module.css'
import { useUserContext } from '../../../../../share/infranstruture/AuthenticationContext'
import { AvatarComponent } from '../../../../AvatarComponent/AvatarComponent'
import { ModifyUser } from './ModifyUser'
import { ChangePassword } from './ChangePassword'

export default function HeaderDashboard (): JSX.Element {
  const { dashboardState, setDashboardState } = useDashboardContext()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false)

  const hideMenu = (): void => {
    setDashboardState({
      hideMenu: !(dashboardState.hideMenu ?? false)
    })
  }
  const { user } = useUserContext()
  if (user === undefined) return <p> Error loading </p>
  const showEditUser = (): void => {
    setModalOpen(true)
  }

  const closeModal = (): void => {
    setModalOpen(false)
  }

  const goBack = (): void => {
    setIsChangePassword((prevIsChangePassword) => !prevIsChangePassword)
  }

  return (
    <div className={HeaderCss.header}>
      <div className={HeaderCss.container}>
        <div className={HeaderCss.containerAvata}>
          {<AvatarComponent name={user.name} onClick={showEditUser} />}
        </div>
        <i className={`fa-solid fa-bars cursor-p ${HeaderCss.menu}`} onClick={hideMenu}></i>
      </div>
      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={HeaderCss.containerUser}
      >
        <Box className="outline-border-none">
          {
           isChangePassword ? <ChangePassword goBack={goBack} /> : <ModifyUser goBack={goBack}/>
          }
        </Box>
      </Modal >
    </div >
  )
}
