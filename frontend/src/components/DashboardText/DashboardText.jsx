import React from 'react'
import {Container, Grid, Typography} from '@mui/material'
import DashboardTextImage from '../../static/assets/DashboardText.jpg'

function DashboardText(){

    return(
        <Container fullWidth>
            <Grid container>
                <Grid item md={9}>
                    <Typography fontSize = 'large'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit qui cupiditate, adipisci nostrum quam quo sit praesentium tenetur autem accusamus fugit, eligendi impedit magnam illo quos architecto, corporis amet ipsa.
                        Amet laboriosam labore atque, at praesentium odio perspiciatis tempora placeat quidem? Laboriosam hic exercitationem quo repellat aspernatur necessitatibus, autem consectetur nostrum veritatis soluta recusandae quidem aut saepe modi deserunt in.
                        Blanditiis, soluta. 
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit qui cupiditate, adipisci nostrum quam quo sit praesentium tenetur autem accusamus fugit, eligendi impedit magnam illo quos architecto, corporis amet ipsa.
                        Amet laboriosam labore atque, at praesentium odio perspiciatis tempora placeat quidem? Laboriosam hic exercitationem quo repellat aspernatur necessitatibus, autem consectetur nostrum veritatis soluta recusandae quidem aut saepe modi deserunt in.
                        Blanditiis, soluta. 
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