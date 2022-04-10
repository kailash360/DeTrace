import { Container } from '@mui/material'
import React from 'react'
import ProfileView from '../../components/ProfileView/ProfileView'
import MyProducts from '../../components/MyProducts/MyProducts'
import { AuthContext } from '../../context/AuthContext'
import { ContractContext } from '../../context/ContractContext'
import AddProduct from '../../components/AddProduct/AddProduct'
import Constants from '../../Constants'
import DashboardText from '../../components/DashboardText/DashboardText'
import DashboardButtons from '../../components/DashboardButtons/DashboardButtons'
import { Grid } from '@mui/material'

const Dashboard = () => {

  const { name, role, authenticated } = React.useContext(AuthContext)

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <ProfileView name={name} role={role} />
        </Grid>
          <Grid item xs={12}>
            <DashboardText />
            <DashboardButtons />
          </Grid>
          <Grid item xs={12}>
            {role == Constants.ROLE[0] ? <AddProduct /> : ''}
          </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard