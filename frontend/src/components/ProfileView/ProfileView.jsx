import React from 'react'

const ProfileView = ({name, role}) => {
  return (
    <div>
        <div>NAME: {name}</div>
        <div>ROLE: {role}</div>
    </div>
  )
}

export default ProfileView