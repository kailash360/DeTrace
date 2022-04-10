import React from 'react'
import { Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Constants from '../../Constants'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function DashboardButtons() {

  const navigate = useNavigate()
  const { role } = React.useContext(AuthContext)

  return (
    <Stack spacing={1} sx={{ marginTop: '30px' }} direction='row'>
      <Button startIcon={<TravelExploreIcon />} size='large' color='orange' variant='outlined' onClick={() => { navigate(`/${role}/products`) }} >Explore all products</Button>
      <Button startIcon={<ShoppingCartIcon />} size='large' color='orange' variant='outlined' onClick={() => { navigate(`/${role}/${role == Constants.ROLE[2] ? 'purchases' : 'inventory'}`) }} >See my products</Button>
    </Stack>
  )

}

export default DashboardButtons