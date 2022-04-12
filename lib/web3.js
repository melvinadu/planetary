import Web3 from 'web3'
import Planetary from './Planetary.json'

// we are going to make our application talk to the test Rinkeby network we setup on Infura
let web3 = new Web3("https://rinkeby.infura.io/v3/91e34b9fd525473dab3802e2bb7b0829")

const contractAddress = "0xBb4EFB34a6888fB62c099D2E3ABEDD44ABBB873E"
const contract =  new web3.eth.Contract(Planetary.abi, contractAddress)

export { web3, contract, contractAddress }