import React from 'react'
import { Button, Stack } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import Constants from '../../Constants'

function DashboardButtons() {

  const navigate = useNavigate()
  const { role } = React.useContext(AuthContext)

  return (
    <Stack spacing={1}>
      <Button variant='outlined' onClick={()=>{navigate(`/${role}/products`)}} >Explore all products</Button>
      <Button variant='outlined' onClick={()=>{navigate(`/${role}/${role == Constants.ROLE[2] ? 'purchases' : 'inventory' }`)}} >See my products</Button>
    </Stack>
  )

}

export default DashboardButtons