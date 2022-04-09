import React from 'react'
import ProductListTemplate from '../ProductListTemplate/ProductListTemplate';
import { AuthContext } from '../../context/AuthContext'
import { ContractContext } from '../../context/ContractContext'

const MyPurchasesList = () => {

  const { account } = React.useContext(AuthContext)
  const { Services } = React.useContext(ContractContext)

  const [products, setProducts] = React.useState([])

  const getPurchases = async () => {
    
    const purchasesResponse = await Services.getPurchases(account)
    if(!purchasesResponse.success) console.log(purchasesResponse.message)

    setProducts(purchasesResponse.data.products)
  }

  React.useEffect(() => {
    getPurchases()
  },[account, Services])

  return (
    products.length ?
      <ProductListTemplate title={'My Purchases'} productList={products} />
    : <p>No purchases yet</p>
  )
}

export default MyPurchasesList