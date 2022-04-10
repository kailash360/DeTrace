import React from 'react'
import { Button, Container, Grid, Paper } from '@mui/material'
import { AuthContext } from '../../context/AuthContext'
import { ContractContext } from '../../context/ContractContext'
import { useParams } from 'react-router-dom'
import Constants from '../../Constants'
import {useNavigate} from 'react-router-dom'

const ProductDetails = () => {

  const params = useParams()
  const navigate = useNavigate()
  const { Services } = React.useContext(ContractContext)
  const { account, role } = React.useContext(AuthContext)
  const [product, setProduct] = React.useState({})
  const [stage, setStage] = React.useState(Constants.ROLE[0])
  console.log(product);

  const getProductDetails = async () => {

    if(!account) return

    const productResponse = await Services.getProduct(params.product_id)
    console.log({ productResponse })
    setProduct(productResponse.data)
    setStage(Constants.STAGE[productResponse.data.details.stage]);
  }

  const handleBuy = async () => {

    if(!product.details) return
    console.log('Starting buy ', product)

    let buyProductResponse;
    switch(Constants.STAGE[product.details.stage]){
      case Constants.STAGE[0]:
        buyProductResponse = await Services.releaseProduct(params.product_id)
        console.log({ buyProductResponse })
        break;
      case Constants.STAGE[1]:
        buyProductResponse = await Services.buyProduct(params.product_id)
        console.log({ buyProductResponse })
        break;    
      default:
        console.log('Invalid stage ')
    }
    console.log({ buyProductResponse })
    if(!buyProductResponse.success) return

    navigate(role == Constants.ROLE[2]?`/${role}/purchases`: `/${role}/inventory`)
  }

  React.useEffect(() => {
    getProductDetails()
  }, [account])

  return (product.details ?
    <Container>
      <Grid spacing={6} container justifyContent='center' alignItems='center' sx={{ m: 10 }}>
        <Grid item md={4} sm={6} justifyContent='center'>
          <Paper elevation={4}>
            <img src={`https://ipfs.io/ipfs/${product.details.ipfs_hash}`} style={{ width: '400px' }} />
          </Paper>
        </Grid>
            <Grid container md={8} sm={12} justifyContent='center'>
              <Grid item md={8} sm={12}>
                <h1>Product Details</h1>
                <p><b>Product Name:</b> {product.details.name}</p>
                <p><b>Price:</b> {product.details.price}</p>
                <p><b>Stage:</b> {Constants.STAGE[product.details.stage].charAt(0).toUpperCase() + Constants.STAGE[product.details.stage].slice(1)}</p>
              </Grid>
              <Grid item md={8} sm={12}>
                <h1>Manufacturer</h1>
                <p><b>Name:</b> {product.manufacturer.name}</p>
                <p><b>Address:</b> {product.manufacturer.id}</p>
              </Grid>
              {
                stage == Constants.ROLE[1] ?
                  <Grid item md={8} sm={12}>
                    <h1>Retailers</h1>
                    {product.retailers.map(product => <li>
                      <p><b>Name:</b> {product.manufacturer.name}</p>
                      <p><b>Address:</b> {product.manufacturer.id}</p>
                    </li>
                    )}
                  </Grid>
                  : ''}
              {
                stage == Constants.ROLE[1] ?
                  <Grid item md={8} sm={12}>
                    <h1>Customer</h1>
                    <p><b>Name:</b> {product.customer.name}</p>
                    <p><b>Address:</b> {product.customer.id}</p>
                  </Grid>
                  : ''
              }
            </Grid>
            <Grid item>
              { product.details.currentOwner.toLowerCase() != account && <Button variant='contained' color="lightOrange" onClick={handleBuy} type='button'>Buy Product</Button>}
            </Grid>
      </Grid>
    </Container>
    : <p>Loading...</p>
  )
}

export default ProductDetails