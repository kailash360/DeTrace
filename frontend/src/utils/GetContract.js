import Constants from '../Constants'
import Web3 from 'web3'
const DETRACE_CONTRACT_BUILD = require('../build/DeTrace.json')
const NETWORK_ID = "5777"

export const web3 = new Web3(Constants.RPC_PROVIDER)

const GetContract = () => {
    const CONTRACT_ADDRESS = DETRACE_CONTRACT_BUILD.networks[NETWORK_ID].address

    const DeTrace = new web3.eth.Contract(DETRACE_CONTRACT_BUILD.abi, CONTRACT_ADDRESS)
    return { success: true, data: { DeTrace } }
}

export default GetContract