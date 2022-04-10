import React from 'react'
import CategoryIcon from '@mui/icons-material/Category';
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
            <span><Typography variant='h3' fontWeight='bold'><CategoryIcon style={{fontSize:'1.3em', verticalAlign: 'middle'}} /> No products here</Typography></span>
        </Container>
    )
}

export default EmptyPurchaseList