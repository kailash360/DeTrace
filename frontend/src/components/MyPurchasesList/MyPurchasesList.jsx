import React from 'react'
import ProductListTemplate from '../ProductListTemplate/ProductListTemplate';
import { AuthContext } from '../../context/AuthContext'
import { ContractContext } from '../../context/ContractContext'
import Loader from '../Loader/Loader'
import EmptyPurchaseList from '../EmptyListText/EmptyPuchaseList/EmptyPurchaseList';

const MyPurchasesList = () => {

  const { account } = React.useContext(AuthContext)
  const { Services } = React.useContext(ContractContext)

  const [products, setProducts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const getPurchases = async () => {
    if(!account) return
    setIsLoading(true)
    
    const purchasesResponse = await Services.getCustomerOrders(account)
    if(!purchasesResponse.success) console.log(purchasesResponse.message)
    
    setProducts(purchasesResponse.data.products)
    setIsLoading(false)
  }

  React.useEffect(() => {
    getPurchases()
  },[account, Services])

  return (isLoading? <Loader></Loader>:
    products.length ?
      <ProductListTemplate title={'My Purchases'} productList={products} />
    : <EmptyPurchaseList />
  )
}

export default MyPurchasesList