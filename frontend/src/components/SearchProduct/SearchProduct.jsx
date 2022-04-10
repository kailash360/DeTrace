import React, { useState, useEffect } from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { FormControl, Button, TextField, Container } from '@mui/material'
import { ContractContext } from '../../context/ContractContext'
import ProductListTemplate from '../ProductListTemplate/ProductListTemplate';
import { AuthContext } from '../../context/AuthContext'
import Loader from '../Loader/Loader'
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchProduct = () => {

  const { Services, DeTrace } = React.useContext(ContractContext)
  const { role } = React.useContext(AuthContext)

  const [productName, setProductName] = useState('')
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  function handleChange(event) {
    setProductName(event.target.value)
  }

  const getProducts = async () => {
    const allProductsResponse = await Services.getAllProducts()
    if (!allProductsResponse.success) console.log(allProductsResponse.message)

    setAllProducts(allProductsResponse.data.products)
  }

  const handleSearch = async () => {
    const filteredProductsList = allProducts && allProducts.filter(product => product.name.includes(productName))
    setFilteredProducts(filteredProductsList)
  }

  useEffect(() => {
    getProducts()
  }, [Services, DeTrace])

  useEffect(() => {
    handleSearch()
  }, [productName])

  return (
    <Container>
      <Grid container fullWidth sx={{ marginTop: '20px !important' }} gap={2} jutifyContent='center' alignItems='center'>
        <Grid item xs={9}>
          <TextField fullWidth onChange={handleChange} value={productName} label={'Product Name'} margin="dense" />

        </Grid>
        <Grid item xs={2}>
          <Button startIcon={<SearchIcon />} fontSize='2rem' size='large' type="submit" variant="contained" color="lightOrange">Search</Button>

        </Grid>
      </Grid>
      {(productName ? filteredProducts : allProducts) ?
        <ProductListTemplate title={productName ? `Products with name '${productName}'` : 'All Products'} productList={productName ? filteredProducts : allProducts}></ProductListTemplate>
        : <Loader />}
    </Container>
  )
}

export default SearchProduct