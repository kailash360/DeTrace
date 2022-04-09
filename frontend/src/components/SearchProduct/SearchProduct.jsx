import React, { useState } from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { FormControl, Button, TextField } from '@mui/material'

const SearchProduct = () => {
    const [productName,setProductName]=useState('')
    function handleChange(event){
      setProductName(event.target.value)
    }
    return (
      <FormControl margin="dense">
        <TextField onChange={handleChange} value={productName} label={'Product Name'} margin="dense" />
        
        <Button type="submit" variant="contained">Search</Button>
        
        </FormControl>
    )
  }

  export default SearchProduct