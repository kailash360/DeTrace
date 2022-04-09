import React from 'react'
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
    setProduct(productResponse.data.product)
  }

  React.useEffect(()=>{
    getProductDetails()
  },[account])
  
  return (
    <div>
      <p>ProductDetails</p>
      <p>{product && product.name}</p>
      <p>{product && product.price}</p>
      <img src={`https://ipfs.io/ipfs/${product && product.ipfs_hash}`}/>
    </div>
  )
}

export default ProductDetails