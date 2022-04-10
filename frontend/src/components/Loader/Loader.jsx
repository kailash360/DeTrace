import React from 'react'
import {Container} from '@mui/material'
import {ReactComponent as LoadingIcon} from '../../static/assets/LoadingIcon.svg'

function Loader() {
  return (
    <Container
      sx={{
        height: '100vh',
        '& svg':{
          marginTop: '40vh !important'
        }
      }}
    >
        <LoadingIcon></LoadingIcon>
    </Container>
  )
}

export default Loader