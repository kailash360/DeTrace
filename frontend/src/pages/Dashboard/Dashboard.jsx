import { Container } from '@mui/material'
import React from 'react'
import ProfileView from '../../components/ProfileView/ProfileView'
import MyProducts from '../../components/MyProducts/MyProducts'
import {AuthContext} from '../../context/AuthContext'
import {ContractContext} from '../../context/ContractContext'
import AddProduct from '../../components/AddProduct/AddProduct'

const Dashboard = () => {

  const { name, role, authenticated } = React.useContext(AuthContext)

  return (
    <Container>
       <ProfileView name={name} role={role}/>
       <MyProducts />
       <AddProduct />
    </Container>
  )
}

export default Dashboard