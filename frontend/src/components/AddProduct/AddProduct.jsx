import React, { useState } from 'react'
import { FormControl, Input, InputLabel, Button, TextField } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import * as IPFS from 'ipfs-core'
import { ContractContext } from '../../context/ContractContext'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';

const AddProduct = () => {

    const { role } = React.useContext(AuthContext)
    const { Services } = React.useContext(ContractContext)
    const navigate = useNavigate()

    const [image, setImage] = useState()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const handleUpload = async () => {

        try {

            console.log('Uploading image')
            const node = await IPFS.create({ repo: 'ok' + Math.random() })
            const ipfsUploadResult = await node.add(image)

            const addProductResponse = await Services.addProduct(name, parseInt(price), ipfsUploadResult?.path || 'none')
            if (!addProductResponse.success) throw new Error(addProductResponse.message)
            
            toast.success('Product added successfully')
            navigate(`/${role}/products/${parseInt(addProductResponse.data.product.events.Product_Added.returnValues._productId)}`)

        } catch (err) {
            toast.error(err.message)
            console.log('Error in adding product: ', err)
        }
    }

    return (
        <Box sx={{ marginY: '50px' }}>
            <Typography variant='h3' xs={{ color: 'orange' }}>Add Product</Typography>
            <FormControl fullWidth >
                <TextField sx={{ marginY: '8px' }} id="productName" label="Name" value={name} onChange={(e) => { setName(e.target.value) }} fullWidth />
                <TextField sx={{ marginY: '8px' }} id="productPrice" label="Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth />
                <Button color='lightOrange' sx={{ marginY: '8px' }} variant="contained" endIcon={<UploadIcon />} fullWidth>
                    Upload Image<input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                </Button>
                <Button color='lightOrange' sx={{ marginY: '8px' }} variant="contained" type="submit" onClick={handleUpload} fullWidth>Add Product</Button>
            </FormControl>
        </Box>
    )
}

export default AddProduct