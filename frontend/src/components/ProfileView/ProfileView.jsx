import React from 'react'
import Paper from '@mui/material/Paper'
import {Typography, Chip} from '@mui/material'
import { styled } from '@mui/material/styles';

const OrangePaper = styled(Paper)`
  background: #ff7043 !important;
  color: white;
`

// const CustomChip = 
const ProfileView = ({name, role}) => {
  return (
    <OrangePaper elevation={1}
      sx={{
        width: '100%',
        margin: '2em auto',
        padding: '2em'
      }}
    >
      <Typography variant='h3'>
        <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
      </Typography>
      <Chip 
        variant='outlined'
        sx={{
          marginTop: '1em',     
          
        }}
        style={{color: '#ffffff'}}
        label={
          <Typography variant='h5'>
            <div>{role.charAt(0).toUpperCase() + role.slice(1)}</div>
          </Typography>
        }
      />      
    </OrangePaper>
  )
}

export default ProfileView