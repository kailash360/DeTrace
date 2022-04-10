import React from 'react'
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { Container, Grid, Typography } from '@mui/material'

const EmptyPurchaseList = () => {
    return (
        <Container container justifyContent="center" alignItems="center" sx={{height: '100vh', marginTop: '50vw'}}>
            <><MoneyOffIcon /> No Purchases</>
        </Container>
    )
}

export default EmptyPurchaseList