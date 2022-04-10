import React from 'react'
import { Button, Container, Grid, Paper } from '@mui/material'
import { AuthContext } from '../../context/AuthContext'
import { ContractContext } from '../../context/ContractContext'
import { useParams } from 'react-router-dom'
import Constants from '../../Constants'
import { useNavigate } from 'react-router-dom'
import TimelineFeedItem from '../../components/TimelineFeedItem/TimelineFeedItem'
import Loader from '../../components/Loader/Loader'
import { styled } from '@mui/material/styles';
import { CardMedia, Card } from '@mui/material'
import toast from 'react-hot-toast'

const ProductDetails = () => {

  const params = useParams()
  const navigate = useNavigate()
  const { Services } = React.useContext(ContractContext)
  const { account, role } = React.useContext(AuthContext)
  const [product, setProduct] = React.useState({})
  const [stage, setStage] = React.useState(Constants.ROLE[0])

  const getProductDetails = async () => {

    if (!account) return

    const productResponse = await Services.getProduct(params.product_id)
    if(!productResponse.success){
      toast.error(productResponse.message)
      console.log({ productResponse })
      return
    }
    setProduct(productResponse.data)
    setStage(Constants.STAGE[productResponse.data.details.stage]);
  }

  const handleBuy = async () => {

    if (!product.details) return

    let buyProductResponse;
    switch (Constants.STAGE[product.details.stage]) {
      case Constants.STAGE[0]:
        buyProductResponse = await Services.releaseProduct(params.product_id)
        break;
      case Constants.STAGE[1]:
        buyProductResponse = await Services.buyProduct(params.product_id)
        break;
      default:
        toast.error('Invalid stage ')
    }
    if (!buyProductResponse.success) {
      toast.error(buyProductResponse.message)
      console.log({buyProductResponse})
      return
    }

    toast.success(`${product.details.name} bought successfully`)
    navigate(role == Constants.ROLE[2] ? `/${role}/purchases` : `/${role}/inventory`)
  }


  React.useEffect(() => {
    getProductDetails()
  }, [account])

  return (product.details ?
    <Container>
      <Grid spacing={6} container justifyContent='center' alignItems='center' sx={{ m: 10 }}>
        <Grid item md={4} sm={6}>
          <Card style={{ boxShadow: '0 0 10px 0' }}>
            <CardMedia
              component="img"
              height="300"
              width="auto"
              image={`https://ipfs.io/ipfs/${product.details.ipfs_hash}`}
              alt={product.details.name}
            />
          </Card>
        </Grid>
        <Grid item md={8} sm={12}>
          <h1>Product Details</h1>
          <p><b>Product Name:</b> {product.details.name}</p>
          <p><b>Price:</b> {product.details.price}</p>
          <p><b>Stage:</b> {Constants.STAGE[product.details.stage].charAt(0).toUpperCase() + Constants.STAGE[product.details.stage].slice(1)}</p>
          {product.details.currentOwner.toLowerCase() != account && <Button variant='contained' color="lightOrange" onClick={handleBuy} type='button'>Buy Product</Button>}
        </Grid>
      </Grid>
      <TimelineFeedItem product={product} stage={stage} />
    </Container>
    : <Loader />
  )
}

export default ProductDetails