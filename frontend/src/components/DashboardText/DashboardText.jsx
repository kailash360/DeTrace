import React from 'react'
import {Container, Grid, Typography} from '@mui/material'
import DashboardTextImage from '../../static/assets/DashboardText.jpg'

function DashboardText(){

    return(
        <Container fullWidth>
            <Grid container>
                <Grid item md={9}>
                    <Typography fontSize = 'large'>
                        <b>DeTrace</b> is a decentralized supply chain management system that allows you to efficiently manage the product distribution chain efficiently yet easily. 
                        <br />
                        It begins at the root level where the manufacturer registers a product with the system. When the product is released in the market, it is sold to a retailer for a predefined price. A customer can then purchase this product from the retailer. All of these transactions are recorded in the blockchain and this makes the product flow more transparent.
                        <br />
                        The entire history of a product is also displayed to the users, where they can see how the product has been handed along since the product was manufactured. This prevents the introduction of counterfeit products in the market. This can be especially useful for keeping track of medicines and branded products.
                    </Typography>
                </Grid>
                <Grid md={3}>
                    <img src={DashboardTextImage} alt="" style={{width: '400px'}} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default DashboardText