import { Container, Grid } from '@mui/material'
import React from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';

const CustomGridItem = styled(Grid)`
  textDecoration: none;
  color: white;
`
const Home = () => {

  const navigate = useNavigate()
  const { authenticated, account, role } = React.useContext(AuthContext)

  React.useEffect(() => {
    console.log(authenticated, account, role)
    if (authenticated) navigate(`/${role}/dashboard`)
  }, [account, authenticated])

  return (
    <div >
      <Grid container sx={{ height: '95vh', width: '100%' }} spacing={2} justifyContent="center" alignItems="center" margin="auto" width="100%">
        <Grid item xs={6} sx={{ backgroundColor: '#ff7043', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
          <RegisterForm />
        </Grid>
        <Grid item xs={6} sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/register.png" alt="register" style={{ height: "700px", width: "auto" }} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Home