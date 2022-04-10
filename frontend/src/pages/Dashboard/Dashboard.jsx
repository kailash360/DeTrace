import { Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ProfileView from '../../components/ProfileView/ProfileView'
import MyProducts from '../../components/MyProducts/MyProducts'
import { AuthContext } from '../../context/AuthContext'
import { ContractContext } from '../../context/ContractContext'
import AddProduct from '../../components/AddProduct/AddProduct'
import Constants from '../../Constants'
import DashboardText from '../../components/DashboardText/DashboardText'
import DashboardButtons from '../../components/DashboardButtons/DashboardButtons'
import { Grid } from '@mui/material'
import Loader from '../../components/Loader/Loader'

const Dashboard = () => {

  const { name, role, authenticated, account } = React.useContext(AuthContext)
  const { Services } = React.useContext(ContractContext)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  const getUserDetails = async () => {
    setLoading(true);
    if (!account) return;

    let userDetailsResponse;
    switch (role) {
      case Constants.ROLE[0]:
        userDetailsResponse = await Services.getManufacturer(account);
        if (!userDetailsResponse.success) return;
        setUser(userDetailsResponse.data.manufacturer);
        break;
      case Constants.ROLE[1]:
        userDetailsResponse = await Services.getRetailer(account);
        if (!userDetailsResponse.success) return;
        setUser(userDetailsResponse.data.retailer);
        break;
      case Constants.ROLE[2]:
        userDetailsResponse = await Services.getCustomer(account);
        if (!userDetailsResponse.success) return;
        setUser(userDetailsResponse.data.customer);
        break;

    }
    setLoading(false);
  }
  useEffect(() => {

    getUserDetails()

  }, [account, Services])

  console.log(user);

  return (
    loading ? <Loader />
      :
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <ProfileView name={name} role={role} user={user} />
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