import React from 'react';
import GetContract from '../utils/GetContract'
import Connect from '../utils/Connect'
import Constants from '../Constants'
import {AuthContext} from '../context/AuthContext'

export const ContractContext = React.createContext()

function ContractContextProvider(props){

    const {account, updateAuth} = React.useContext(AuthContext)

    const [state, setState] = React.useState({
        DeTrace: null
    })

    const updateContract = (data) => {
        setState({...state,...data})
    }

    const Services = {
        registerManufacturer: async(_name)=>{
            try{
                if(!state.DeTrace) return {success: true, data: {}}

                const manufacturerRegistrationResponse = await state.DeTrace.methods.addManufacturer(_name).send({
                    from: account,
                    gas: Constants.GAS
                })
                return {success: true, data: {manufacturer: manufacturerRegistrationResponse}}

            }catch(err){
                console.log('Error in registering manufacturer: ',err)
                return {success: false, message: err.message}
            }
        },
        
        registerRetailer: async(_name)=>{
            try{
                if(!state.DeTrace) return {success: true, data: {}}

                const retailerRegistrationResponse = await state.DeTrace.methods.addRetailer(_name).send({
                    from: account,
                    gas: Constants.GAS
                })
                return {success: true, data: {retailer: retailerRegistrationResponse}}

            }catch(err){
                console.log('Error in registering retailer: ', err)
                return {success: false, message: err.message}
            }
        },
        
        registerCustomer: async(_name)=>{
            try{
                if(!state.DeTrace) return {success: true, data: {}}

                const customerRegistrationResponse = await state.DeTrace.methods.addCustomer(_name).send({
                    from: account,
                    gas: Constants.GAS
                })
                return {success: true, data: {customer: customerRegistrationResponse}}

            }catch(err){
                console.log('Error in registering customer: ', err)
                return {success: false, message: err.message}
            }
        },
        
        getManufacturer: async(_address)=>{
            try{
                if(!state.DeTrace) return {success: true, data: {}}

                const manufacturer = await state.DeTrace.methods.getManufacturerDetails(_address).call()
                return {success: true, data: {manufacturer}}

            }catch(err){
                console.log('Error in getting manufacturer: ', err)
                return {success: false, message: err.message}
            }
        },
        
        getRetailer: async(_address)=>{
            try{
                if(!state.DeTrace) return {success: true, data: {}}

                const retailer = await state.DeTrace.methods.getRetailDetails(_address).call()
                return {success: true, data: {retailer}}

            }catch(err){
                console.log('Error in getting retailer: ', err)
                return {success: false, message: err.message}
            }
        },
        
        getCustomer: async(_address)=>{
            try{
                if(!state.DeTrace) return {success: true, data: {}}

                const customer = await state.DeTrace.methods.getCustomerDetails(_address).call()
                return {success: true, data: {customer}}

            }catch(err){
                console.log('Error in getting customer: ', err)
                return {success: false, message: err.message}
            }
        },
        
        addProduct: async(_name, _price, _ipfs_hash)=>{
            try{
                if(!state.DeTrace) return {success: true, data: {}}

                const addProductResponse = await state.DeTrace.methods.addProduct(_name, _price, _ipfs_hash).send({
                    from: account,
                    gas: Constants.GAS
                })
                return {success: true, data: {product: addProductResponse}}

            }catch(err){
                console.log('Error in adding product: ', err)
                return {success: false, message: err.message}
            }
        },

        getProduct: async(_productId) => {
            try{
                if(!state.DeTrace) return {success: true, data: {}}

                const productResponse = await state.DeTrace.methods.getProductDetails(_productId).call()

                return {success: true, 
                    data: {
                        product: productResponse[0],
                        retailers: productResponse[1],
                        manufacturer: productResponse[2],
                        customer: productResponse[3]
                    }
                }

            }catch(err){
                console.log('Error in getting product: ', err)
                return {success: false, message: err.message}
            }
        },
        
        getCurrentStatus: async(_productId) => {
            try{
                if(!state.DeTrace) return {success: true, data: {}}

                const currentStatusResponse = await state.DeTrace.methods.getCurrentStatus(_productId).call()
                return {success: true, data: {
                    stage: currentStatusResponse[0],
                    owner: currentStatusResponse[1],
                    manufacturer: currentStatusResponse[2],
                    customer: currentStatusResponse[3],
                    retailer: currentStatusResponse[4]
                }}

            }catch(err){
                console.log('Error in getting product status: ', err)
                return {success: false, message: err.message}
            }
        },

        getUserType: async(_address)=>{
            try{
                if(!state.DeTrace) return {success: true, data: {}}

                const userType = await state.DeTrace.methods.getUserType(_address).call()
                return {success: true, data: {type: Constants.ROLE[userType]}}

            }catch(err){
                console.log('Error in getting user type: ', err)
                return {success: false, message: err.message}
            }
        }        
    }

    React.useEffect(() => {
        (async()=>{
        
        //Get the info from the contracts
        const contractResult = GetContract()
        updateContract(contractResult.data)  
        
        // Get the account of the user
        const accountResponse = await Connect()
        updateAuth({account: accountResponse.data.account})
        })()

    },[])

    React.useEffect(()=>{
        if(!account) return
        
        (async() => {
            const userTypeResponse = await Services.getUserType(account)
            if(userTypeResponse.success && userTypeResponse.data.type != Constants.ROLE[3]){
                updateAuth({account, role: userTypeResponse.data.type})
            }else{
                if(window.location.pathname !== "/") window.location.href = "/"
            }
        })()
        
    }, [account])

    return(
        <ContractContext.Provider
            value={{...state, ...{
                updateContract,
                Services
            }}}
        >
            {props.children}
        </ContractContext.Provider>
    )
}

export default ContractContextProvider