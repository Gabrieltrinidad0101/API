import React from 'react'
import UserComponent from '../../../components/user/insfratructure/User'

export default function ChangePassword () {
  const Title = <h1><i className="fa-solid fa-key"></i>  New Password</h1>

  return (
    <div className='vh-100 background-blue'>
      <div className='center-screen'>
        <UserComponent
          logo={Title}
          onSubmit={async (): Promise<void> => { }}
          submitButtonName="Save"
          hidenInputs={{
            cellPhone: true,
            email: true,
            username: true
          }}
        />
      </div>
    </div>
  )
}
