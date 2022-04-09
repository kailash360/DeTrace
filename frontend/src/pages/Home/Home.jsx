import { Container } from '@mui/material'
import React from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import {AuthContext} from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()
  const { authenticated, account, role } = React.useContext(AuthContext)

  React.useEffect(() => {
    console.log(authenticated, account, role)
    if(authenticated) navigate(`/${role}/dashboard`)
  },[account, authenticated])

  return (
    <Container>
      <RegisterForm />
    </Container>
  )
}

export default Home