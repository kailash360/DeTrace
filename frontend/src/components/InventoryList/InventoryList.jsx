import * as React from 'react';
import ProductListTemplate from '../ProductListTemplate/ProductListTemplate';
import {ContractContext} from '../../context/ContractContext'
import {AuthContext} from '../../context/AuthContext'
import EmptyInventoryList from '../EmptyListText/EmptyInventoryList/EmptyInventoryList'

const InventoryList = () => {

  const [products, setProducts] = React.useState([])
  const {account, role} = React.useContext(AuthContext)
  const {Services} = React.useContext(ContractContext)

  const getProducts = async() =>{
    if(!account) return

    let response;
    switch(role){
      case 'manufacturer':
        response = await Services.getManufacturerInventory(account)
        if(!response.success) console.log(response.message)
    
        setProducts(response.data.products)
        break;
      case 'retailer':
        response = await Services.getRetailerInventory(account)
        if(!response.success) console.log(response.message)
    
        setProducts(response.data.products)
        break;
    }
  }

  React.useEffect(() => {
    getProducts()
  },[account, Services])

  return (
    products.length ? 
      <ProductListTemplate title={'Inventory'} productList={products} />
    : <EmptyInventoryList></EmptyInventoryList>
  )
}

export default InventoryList