import React, {useState} from 'react'
import { FormControl, InputLabel, Input, Select, MenuItem, FormHelperText } from '@mui/material'

const RegisterForm = () => {

    // const [userType, setUserType] = useState('')
    // const handleChange = () => {
    //     setUserType('')
    // }
    return (
        <div>
            <FormControl>
                <InputLabel htmlFor="my-input">User Name</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <InputLabel id="demo-simple-select-label">I'm a</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={}
                    label="Age"
                    // onChange={}
                >
                    <MenuItem value='Manufacturer'>Manufacturer</MenuItem>
                    <MenuItem value='Retailer'>Retailer</MenuItem>
                    <MenuItem value='Customer'>Customer</MenuItem>
                </Select>
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
        </div>
    )
}

export default RegisterForm