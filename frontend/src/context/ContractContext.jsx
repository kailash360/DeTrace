import React from 'react';
import Web3 from 'web3'
import GetContract, { web3 } from '../utils/GetContract'
import Connect from '../utils/Connect'
import Constants from '../Constants'
import { AuthContext } from '../context/AuthContext'

export const ContractContext = React.createContext()

function ContractContextProvider(props) {

    const { account, updateAuth } = React.useContext(AuthContext)

    const [state, setState] = React.useState({
        DeTrace: null
    })

    const updateContract = (data) => {
        setState({ ...state, ...data })
    }

    const Services = {
        registerManufacturer: async (_name) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const manufacturerRegistrationResponse = await state.DeTrace.methods.addManufacturer(_name).send({
                    from: account,
                    gas: Constants.GAS
                })
                return { success: true, data: { manufacturer: manufacturerRegistrationResponse } }

            } catch (err) {
                console.log('Error in registering manufacturer: ', err)
                return { success: false, message: err.message }
            }
        },

        registerRetailer: async (_name) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const retailerRegistrationResponse = await state.DeTrace.methods.addRetailer(_name).send({
                    from: account,
                    gas: Constants.GAS
                })
                return { success: true, data: { retailer: retailerRegistrationResponse } }

            } catch (err) {
                console.log('Error in registering retailer: ', err)
                return { success: false, message: err.message }
            }
        },

        registerCustomer: async (_name) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const customerRegistrationResponse = await state.DeTrace.methods.addCustomer(_name).send({
                    from: account,
                    gas: Constants.GAS
                })
                return { success: true, data: { customer: customerRegistrationResponse } }

            } catch (err) {
                console.log('Error in registering customer: ', err)
                return { success: false, message: err.message }
            }
        },

        getManufacturer: async (_address) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const manufacturer = await state.DeTrace.methods.getManufacturerDetails(_address).call()
                return { success: true, data: { manufacturer } }

            } catch (err) {
                console.log('Error in getting manufacturer: ', err)
                return { success: false, message: err.message }
            }
        },

        getRetailer: async (_address) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const retailer = await state.DeTrace.methods.getRetailerDetails(_address).call()
                return { success: true, data: { retailer } }

            } catch (err) {
                console.log('Error in getting retailer: ', err)
                return { success: false, message: err.message }
            }
        },

        getCustomer: async (_address) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const customer = await state.DeTrace.methods.getCustomerDetails(_address).call()
                return { success: true, data: { customer } }

            } catch (err) {
                console.log('Error in getting customer: ', err)
                return { success: false, message: err.message }
            }
        },

        getManufacturerInventory: async (_address) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const productIDList = await state.DeTrace.methods.getManufacturerInventory(_address).call()

                let products = []
                for await (let id of productIDList) {
                    const product = await state.DeTrace.methods.products(parseInt(id)).call()
                    products.push(product)
                }

                return { success: true, data: { products } }
            } catch (err) {
                console.log('Error in getting manufacturer inventory: ', err)
                return { success: false, message: err.message }
            }
        },

        getRetailerInventory: async (_address) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const productIDList = await state.DeTrace.methods.getRetailerInventory(_address).call()

                let products = []
                for await (let id of productIDList) {
                    const product = await state.DeTrace.methods.products(parseInt(id)).call()
                    products.push(product)
                }

                return { success: true, data: { products } }
            } catch (err) {
                console.log('Error in getting retailer inventory: ', err)
                return { success: false, message: err.message }
            }
        },

        getCustomerOrders: async (_address) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const productIDList = await state.DeTrace.methods.getCustomerOrders(_address).call()

                let products = []
                for await (let id of productIDList) {
                    const product = await state.DeTrace.methods.products(parseInt(id)).call()
                    products.push(product)
                }

                return { success: true, data: { products } }
            } catch (err) {
                console.log('Error in getting customer inventory: ', err)
                return { success: false, message: err.message }
            }
        },

        addProduct: async (_name, _price, _ipfs_hash) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }
                const date = Date.now()
                const addProductResponse = await state.DeTrace.methods.addProduct(_name, _price, _ipfs_hash, date).send({
                    from: account,
                    gas: Constants.GAS
                })
                return { success: true, data: { product: addProductResponse } }

            } catch (err) {
                console.log('Error in adding product: ', err)
                return { success: false, message: err.message }
            }
        },

        getProduct: async (_productId) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const productResponse = await state.DeTrace.methods.getProductDetails(_productId).call()

                return {
                    success: true,
                    data: {
                        details: productResponse[0],
                        retailers: productResponse[1],
                        manufacturer: productResponse[2],
                        customer: productResponse[3]
                    }
                }

            } catch (err) {
                console.log('Error in getting product: ', err)
                return { success: false, message: err.message }
            }
        },

        getCurrentStatus: async (_productId) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const currentStatusResponse = await state.DeTrace.methods.getCurrentStatus(_productId).call()
                return {
                    success: true, data: {
                        stage: currentStatusResponse[0],
                        owner: currentStatusResponse[1],
                        manufacturer: currentStatusResponse[2],
                        customer: currentStatusResponse[3],
                        retailer: currentStatusResponse[4]
                    }
                }

            } catch (err) {
                console.log('Error in getting product status: ', err)
                return { success: false, message: err.message }
            }
        },

        getUserType: async (_address) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const userType = await state.DeTrace.methods.getUserType(_address).call()
                return { success: true, data: { type: Constants.ROLE[userType] } }

            } catch (err) {
                console.log('Error in getting user type: ', err)
                return { success: false, message: err.message }
            }
        },

        getProductHistory: async (_productId) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }

                const allEvents = await state.DeTrace.getPastEvents('allEvents', {
                    fromBlock: 0,
                    toBlock: 'latest'
                })
                console.log({ allEvents })
                console.log(_productId)

                const history = allEvents.filter(event => event.returnValues._productId == _productId)

                return { success: true, data: { history } }

            } catch (err) {
                console.log('Error in getting product history: ', err)
                return { success: false, message: err.message }
            }
        },

        getAllProducts: async () => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }
                const allProducts = await state.DeTrace.methods.getProducts().call()
                const products = allProducts.filter(product => product.currentOwner.toLowerCase() != account.toLowerCase())
                return { success: true, data: { products } }

            } catch (err) {
                console.log('Error in getting all products: ', err)
                return { success: false, message: err.message }
            }
        },

        getProductsOfStage: async (_stage) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }
                const allProducts = await state.DeTrace.methods.getProducts().call()

                const products = allProducts.filter(product => product.stage == _stage)
                return { success: true, data: { products } }

            } catch (err) {
                console.log(`Error in getting products of stage ${_stage}: `, err)
                return { success: false, message: err.message }
            }
        },

        getProductsOfName: async (_name) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }
                const allProducts = await state.DeTrace.methods.getProducts().call()

                const products = allProducts.filter(product => product.name == _name)
                return { success: true, data: { products } }

            } catch (err) {
                console.log(`Error in getting products of name ${_name}: `, err)
                return { success: false, message: err.message }
            }
        },

        releaseProduct: async (_productId) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }
                const date = Date.now()
                const product = await state.DeTrace.methods.products(_productId).call()

                const releaseProductResponse = await state.DeTrace.methods.releaseProduct(_productId, date).send({
                    from: account,
                    gas: Constants.GAS
                })

                const transactionResponse = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: account,
                        to: product.manufacturer,
                        value: Web3.utils.toWei(product.price, 'finney').toString()
                    }]
                })

                return { success: true, data: { releaseProductResponse, transactionResponse } }
            } catch (err) {
                console.log(`Error in releasing product :`, err)
                return { success: false, message: err.message }
            }
        },

        buyProduct: async (_productId) => {
            try {
                if (!state.DeTrace) return { success: true, data: {} }
                const date = Date.now()

                const product = await state.DeTrace.methods.products(_productId).call()
                const currentRetailerAddress = await state.DeTrace.methods.Product_Retailers(_productId, product.total_retailers - 1).call()
                // const currentRetailerAddress = retailers[retailers.length - 1]

                const buyProductResponse = await state.DeTrace.methods.buyProduct(_productId, date).send({
                    from: account,
                    gas: Constants.GAS
                })

                const transactionResponse = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: account,
                        to: currentRetailerAddress,
                        value: Web3.utils.toWei(product.price, 'finney').toString()
                    }]
                })

                return { success: true, data: { buyProductResponse, transactionResponse } }
            } catch (err) {
                console.log(`Error in buying product :`, err)
                return { success: false, message: err.message }
            }
        }
    }

    React.useEffect(() => {
        (async () => {

            //Get the info from the contracts
            const contractResult = GetContract()
            updateContract(contractResult.data)

            // Get the account of the user
            const accountResponse = await Connect()
            updateAuth({ account: accountResponse.data.account })
        })()

    }, [])

    React.useEffect(() => {

        (async () => {
            if (!account) return
            const userTypeResponse = await Services.getUserType(account)
            if (userTypeResponse.success && userTypeResponse.data.type != Constants.ROLE[3]) {

                let userResponse;
                switch (userTypeResponse.data.type) {
                    case Constants.ROLE[0]:
                        userResponse = await Services.getManufacturer(account)
                        updateAuth({
                            authenticated: true,
                            name: userResponse.data.manufacturer.name,
                            account: account,
                            role: userTypeResponse.data.type
                        })
                        break;
                    case Constants.ROLE[1]:
                        userResponse = await Services.getRetailer(account)
                        updateAuth({
                            authenticated: true,
                            name: userResponse.data.retailer.name,
                            account: account,
                            role: userTypeResponse.data.type
                        })
                        break;
                    case Constants.ROLE[2]:
                        userResponse = await Services.getCustomer(account)
                        updateAuth({
                            authenticated: true,
                            name: userResponse.data.customer.name,
                            account: account,
                            role: userTypeResponse.data.type
                        })
                        break;
                    default:
                        if (window.location.pathname !== "/") window.location.href = "/"

                }
            } else {
                if (window.location.pathname !== "/") window.location.href = "/"
            }
        })()

    }, [account])

    return (
        <ContractContext.Provider
            value={{
                ...state, ...{
                    updateContract,
                    Services
                }
            }}
        >
            {props.children}
        </ContractContext.Provider>
    )
}

export default ContractContextProvider