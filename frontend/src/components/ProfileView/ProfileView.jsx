import React from 'react'
import Paper from '@mui/material/Paper'
import { Typography, Chip } from '@mui/material'
import { styled } from '@mui/material/styles';
import Constants from '../../Constants'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material';

const OrangePaper = styled(Paper)`
  background: #ff7043 !important;
  color: white;
`

// const CustomChip = 
const ProfileView = ({ name, role, user }) => {
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
      <Typography variant='h7'>
        <div>
          <Button onClick={() => { navigator.clipboard.writeText(user.id) }} sx={{ color: 'white' }} variant='text' endIcon={<ContentCopyIcon />}>{user.id} </Button>
        </div>
      </Typography>
      <Chip
        variant='outlined'
        sx={{
          marginTop: '1em',
          marginRight: '10px',
          backgroundColor: 'white',
        }}
        style={{ color: '#000000' }}
        label={
          <Typography variant='h6'>
            <div>{role.charAt(0).toUpperCase() + role.slice(1)}</div>
          </Typography>
        }
      />

      <Chip
        variant='outlined'
        sx={{
          marginTop: '1em',
          backgroundColor: 'white',
        }}
        style={{ color: '#000000' }}
        label={
          <Typography variant='h6'>
            {
              role == Constants.ROLE[2] ?
                `Total Purchases: ${user.total_orders}`
                : `Total Products: ${user.total_products}`
            }
          </Typography>
        }
      />
    </OrangePaper>
  )
}

export default ProfileView