import React, { useState } from 'react'
import { FormControl, Input, InputLabel, Button, TextField } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import * as IPFS from 'ipfs-core'
const product = {
    name: 'productName',
    price: 330
}


const AddProduct = () => {
    const [image, setImage] = useState(second)
    const handleUpload = async () => {
        const node = await IPFS.create({repo:'ok'+Math.random()})

        const ipfsUploadResult = await node.add(image)
    }

    return (
        <FormControl>
            <TextField id="productName" label="Name"/>
            <TextField id="productPrice" label="Price"/>
            <Button variant="contained" endIcon={<UploadIcon />}>
                Upload Image<input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
            </Button>
            <Button variant="contained" type="submit" onSubmit={handleUpload}>Add Product</Button>
        </FormControl>
    )
}

export default AddProduct