import { Container } from '@mui/material'
import React from 'react'
import MyPurchasesList from '../../components/MyPurchasesList/MyPurchasesList'
import { AuthContext } from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import Constants from '../../Constants'

const MyPurchases = () => {

  const navigate = useNavigate()
  const {role, account} = React.useContext(AuthContext)

  React.useEffect(() => {
    if(!account) return

    if(role != Constants.ROLE[2] && role != Constants.ROLE[3]) navigate(`/${role}/inventory`)
  },[account])

  return (
    <Container>
      <MyPurchasesList />
    </Container>
  )
}

export default MyPurchases