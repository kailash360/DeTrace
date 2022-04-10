import React, { useState } from 'react'
import { FormControl, TextField, InputLabel, Input, Select, MenuItem, FormHelperText, Button, Grid, Typography } from '@mui/material'
import { AuthContext } from '../../context/AuthContext'
import { ContractContext } from '../../context/ContractContext'
import { useNavigate } from 'react-router-dom'
import Constants from '../../Constants'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material'

const RegisterForm = () => {

  const { updateAuth, account } = React.useContext(AuthContext)
  const { Services } = React.useContext(ContractContext)
  const navigate = useNavigate()

  const [type, setType] = useState(2)
  const [name, setName] = useState('')

  console.log(account)
  const handleRegister = async (_name, _type) => {
    console.log({ _name, _type })
    try {
      let registrationResponse;
      switch (_type) {
        case 0:
          registrationResponse = await Services.registerManufacturer(_name)
          break;
        case 1:
          registrationResponse = await Services.registerRetailer(_name)
          break;
        case 2:
          registrationResponse = await Services.registerCustomer(_name)
          break;
      }

      console.log(registrationResponse);

      if (registrationResponse.success) {
        updateAuth({
          authenticated: true,
          name: registrationResponse.data.name,
          role: Constants.ROLE[_type]
        })
        // navigate(`/${Constants.ROLE[_type]}/dashboard`)
        window.location.reload()
      }

    } catch (err) {
      console.log("Error in registering: ", err)
    }
  }


  return (
    <Box sx={{ padding: '80px 40px', borderRadius: '20px', backgroundColor: 'white', maxWidth: '500px' }}>
      <Typography variant='h3' fontWeight='bold' sx={{ marginBottom: '20px', color: '#ff7043' }}>
        Let's get started
      </Typography>
      <FormControl>
        <Grid container spacing={4}>
          <Grid item xs={12} fullWidth>
            <Select
              labelId="userType"
              id="userType"
              label="Role"
              value={type}
              onChange={(e) => { setType(e.target.value) }}
              fullWidth
            >
              <MenuItem value={0}>Manufacturer</MenuItem>
              <MenuItem value={1}>Retailer</MenuItem>
              <MenuItem value={2}>Customer</MenuItem>
            </Select>

          </Grid>
          <Grid item xs={12} >
            <InputLabel id="userType">I'm a</InputLabel>
            <TextField fullWidth label={'UserName'} id="margin-none" value={name} onChange={(e) => { setName(e.target.value) }} />

          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant='outlined' type='button' color="orange" onClick={() => { handleRegister(name, type) }}>Register</Button>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  )
}

export default RegisterForm