import React from 'react'
import {Container, Grid} from '@mui/material'
import {AuthContext} from '../../context/AuthContext'
import {ContractContext} from '../../context/ContractContext'
import {useParams} from 'react-router-dom'

const ProductDetails = () => {
  
  const params = useParams()
  const { Services } = React.useContext(ContractContext)
  const { account } = React.useContext(AuthContext)
  const [product, setProduct] = React.useState({})

  const getProductDetails = async() =>{
    const productResponse = await Services.getProduct(params.product_id)
    console.log({productResponse})
    setProduct(productResponse.data)
  }

  React.useEffect(()=>{
    getProductDetails()
  },[account])
  
  return (product.details ?
    <Container>
      <Grid container>
        <Grid item md={4} sm={12}>
          <img src={`https://ipfs.io/ipfs/${product.details.ipfs_hash}`} style={{width:'400px'}} />
        </Grid>
        <Grid item md={8} sm={12}>
          <p>ProductDetails</p>
          <p>{product.details.name}</p>
          <p>{product.details.price}</p>
        </Grid>
      </Grid>
      <Container>
        <h3>Manufacturer</h3>
        <p>Name: {product.manufacturer.name}</p>
        <p>Address: {product.manufacturer.id}</p>
      </Container>
      <Container>
        <h3>Retailers</h3>
        {product.retailers.map(product => <li>
          <p>Name: {product.manufacturer.name}</p>
          <p>Address: {product.manufacturer.id}</p>
          </li>  
        )}
      </Container>
      <Container>
        <h3>Customer</h3>
        <p>Name: {product.customer.name}</p>
        <p>Address: {product.customer.id}</p>
      </Container>

    </Container>
    : <p>Loading...</p>
  )
}

export default ProductDetails