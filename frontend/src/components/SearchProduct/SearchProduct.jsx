import React, { useState, useEffect } from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { FormControl, Button, TextField, Container } from '@mui/material'
import { ContractContext } from '../../context/ContractContext'
import ProductListTemplate from '../ProductListTemplate/ProductListTemplate';
import { AuthContext } from '../../context/AuthContext'
import Loader from '../Loader/Loader'

const SearchProduct = () => {

    const { Services, DeTrace } = React.useContext(ContractContext)
    const { role } = React.useContext(AuthContext)

    const [productName,setProductName]=useState('')
    const [allProducts, setAllProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    function handleChange(event){
      setProductName(event.target.value)
    }

    const getProducts = async() => {
      const allProductsResponse = await Services.getAllProducts()
      if(!allProductsResponse.success) console.log(allProductsResponse.message)

      setAllProducts(allProductsResponse.data.products)
    }
    
    const handleSearch = async() => {
      const filteredProductsList = allProducts && allProducts.filter(product => product.name.includes(productName))
      setFilteredProducts(filteredProductsList)
    }

    useEffect(()=>{
      getProducts()
    },[Services, DeTrace])

    useEffect(() => {
      handleSearch()
    },[productName])

    return (
      <Container>
        <FormControl margin="dense">
          <TextField onChange={handleChange} value={productName} label={'Product Name'} margin="dense" />
          <Button type="submit" variant="contained">Search</Button>
        </FormControl>
        {(productName?filteredProducts:allProducts)?
          <ProductListTemplate title={productName?`Products with name '${productName}'`: 'All Products'} productList={productName?filteredProducts:allProducts}></ProductListTemplate>
          : <Loader/> }
      </Container>
    )
  }

  export default SearchProduct