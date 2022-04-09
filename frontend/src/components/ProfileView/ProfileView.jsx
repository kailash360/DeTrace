import React from 'react'

const profile = {
        name: 'Robin',
        role: 'Manufacterer'
}

const ProfileView = () => {
  return (
    <div>
        <div>NAME: {profile.name}</div>
        <div>ROLE: {profile.role}</div>
    </div>
  )
}

export default ProfileView