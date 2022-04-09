import React, {useState} from 'react'
import { FormControl, TextField, InputLabel, Input, Select, MenuItem, FormHelperText } from '@mui/material'

const RegisterForm = () => {

    // const [userType, setUserType] = useState('')
    // const handleChange = () => {
    //     setUserType('')
    // }
    return (
        <div>
            <FormControl>
                <TextField label={'UserName'} id="margin-none" />
                <InputLabel id="userType">I'm a</InputLabel>
                <Select
                    labelId="userType"
                    id="userType"
                    // value={}
                    label="Age"
                    // onChange={}
                >
                    <MenuItem value='Manufacturer'>Manufacturer</MenuItem>
                    <MenuItem value='Retailer'>Retailer</MenuItem>
                    <MenuItem value='Customer'>Customer</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default RegisterForm