import React, { useState } from 'react'
import { FormControl, Input, InputLabel, Button, TextField } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import * as IPFS from 'ipfs-core'
import {ContractContext} from '../../context/ContractContext'
import {useNavigate} from 'react-router-dom'

const AddProduct = () => {

    const {Services} = React.useContext(ContractContext)
    const navigate = useNavigate()

    const [image, setImage] = useState()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const handleUpload = async () => {

        try{
            const node = await IPFS.create({repo:'../../bin/ok'+Math.random()})
            const ipfsUploadResult = await node.add(image)

            const addProductResponse = await Services.addProduct(name, price, ipfsUploadResult.path)
            if(!addProductResponse.success) throw new Error(addProductResponse.message)

            navigate(`/products?id=${addProductResponse.data.product.id}`)
            
        }catch(err){
            console.log('Error in adding product: ', err)
        }



    }

    return (
        <FormControl>
            <TextField id="productName" label="Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
            <TextField id="productPrice" label="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
            <Button variant="contained" endIcon={<UploadIcon />}>
                Upload Image<input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
            </Button>
            <Button variant="contained" type="submit" onSubmit={handleUpload}>Add Product</Button>
        </FormControl>
    )
}

export default AddProduct