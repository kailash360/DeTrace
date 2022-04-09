import { Container } from '@mui/material'
import React from 'react'
import ProfileView from '../../components/ProfileView/ProfileView'
import MyProducts from '../../components/MyProducts/MyProducts'

const Dashboard = () => {
  return (
    <Container>
       <ProfileView />
       <MyProducts />
    </Container>
  )
}

export default Dashboard