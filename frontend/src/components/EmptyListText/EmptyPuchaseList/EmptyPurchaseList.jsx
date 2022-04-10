import React from 'react'
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { Container, Grid, Typography } from '@mui/material'

const EmptyPurchaseList = () => {
    return (
        <Container sx={{
            height: '100vh',
            paddingTop: '30vh',
            '& span' :{
                textAlign: 'center'
            }
        }}>
            <span><Typography variant='h3' fontWeight='bold'><MoneyOffIcon style={{fontSize:'1.3em', verticalAlign: 'middle'}} /> No Purchases</Typography></span>
        </Container>
    )
}

export default EmptyPurchaseList