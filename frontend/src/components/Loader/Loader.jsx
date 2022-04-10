import React from 'react'
import {Container} from '@mui/material'
import {ReactComponent as LoadingIcon} from '../../static/assets/LoadingIcon.svg'

function Loader() {
  return (
    <Container>
        <LoadingIcon></LoadingIcon>
    </Container>
  )
}

export default Loader