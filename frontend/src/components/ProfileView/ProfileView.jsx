import React from 'react'
import Paper from '@mui/material/Paper'
import {Typography, Chip} from '@mui/material'

const ProfileView = ({name, role}) => {
  return (
    <Paper elevation={3}
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
        vaiant='outlined'
        sx={{
          marginTop: '1em'
        }}
        label={
          <Typography variant='h5'>
            <div>{role.charAt(0).toUpperCase() + role.slice(1)}</div>
          </Typography>
        }
      />      
    </Paper>
  )
}

export default ProfileView