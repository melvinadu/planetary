import Web3 from 'web3'
// import Planetary from './Planetary.json'

let web3 = new Web3(Web3.givenProvider)

const contractAddress = "0x_____"
const contract = null // new web3.eth.Contract(Planetary.abi, contractAddress)

export { web3, contract, contractAddress }