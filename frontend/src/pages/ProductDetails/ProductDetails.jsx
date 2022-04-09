import React from 'react'
import { Button, Container, Grid, Paper } from '@mui/material'
import { AuthContext } from '../../context/AuthContext'
import { ContractContext } from '../../context/ContractContext'
import { useParams } from 'react-router-dom'
import Constants from '../../Constants'

const ProductDetails = () => {

  const params = useParams()
  const { Services } = React.useContext(ContractContext)
  const { account } = React.useContext(AuthContext)
  const [product, setProduct] = React.useState({})
  const [stage, setStage] = React.useState(Constants.ROLE[0])
  console.log(product);
  const getProductDetails = async () => {
    const productResponse = await Services.getProduct(params.product_id)
    console.log({ productResponse })
    setProduct(productResponse.data)
    setStage(Constants.STAGE[productResponse.data.details.stage]);
  }

  const handleBuy = () => {

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
              <Button variant='contained' color="lightOrange" onClick={handleBuy}>Buy Product</Button>
            </Grid>
      </Grid>
    </Container>
    : <p>Loading...</p>
  )
}

export default ProductDetails