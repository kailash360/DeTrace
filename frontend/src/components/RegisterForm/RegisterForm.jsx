import React, { useState } from 'react'
import { FormControl, Button, TextField, InputLabel, Input, Select, MenuItem, FormHelperText } from '@mui/material'

const RegisterForm = () => {

    const [userType, setUserType] = React.useState('');

    const handleChange = (event) => {
        setUserType(event.target.value);
    };
    return (
        <div>
            <FormControl margin="dense">
                <InputLabel id="userType">I'm a</InputLabel>
                <Select
                    labelId="userType"
                    id="userType"
                    value={userType}
                    label="userType"
                    onChange={handleChange}
                >
                    <MenuItem value='Manufacturer'>Manufacturer</MenuItem>
                    <MenuItem value='Retailer'>Retailer</MenuItem>
                    <MenuItem value='Customer'>Customer</MenuItem>
                </Select>
                <TextField label={'UserName'} margin="dense" />

                <Button type="submit" variant="contained">Register</Button>
            </FormControl>
        </div>
    )
}

export default RegisterForm