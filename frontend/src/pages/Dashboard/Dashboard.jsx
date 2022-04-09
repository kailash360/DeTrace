import { Container } from '@mui/material'
import React from 'react'
import ProfileView from '../../components/ProfileView/ProfileView'
import MyProducts from '../../components/MyProducts/MyProducts'
import AddProduct from '../../components/AddProduct/AddProduct'

const Dashboard = () => {
  return (
    <Container>
       <ProfileView />
       <MyProducts />
       <AddProduct />
    </Container>
  )
}

export default Dashboard