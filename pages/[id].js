import { useRouter } from 'next/router'
import Head from 'next/head'

import { web3, contract, contractAddress } from '../lib/web3'

import Navigation from '../components/Navigation'
import Universe from '../components/Universe'
import EthName from '../components/EthName'

//import metadata from '../planetary-data/metadata-1.json'

//the metadata is currently being pulled into the page as an input into the Planet function
//we will now pull the metadata into the page before it loads within the getStaticPaths function below
function Planet({ metadata, opensea }) {
  const router = useRouter()
  let { id } = router.query
  id = parseInt(id)

  if (typeof document === "object") {
    document.documentElement.style.setProperty("--main-color", metadata.properties.mainColor)
    document.documentElement.style.setProperty("--secondary-color", metadata.properties.secondaryColor)
  }

  // TODO
  let forSaleNotice = (
    <p>Not for sale</p>
  )

  // TODO replaced static metadata on line 10 with dynamic link below
  let openSeaLink = `https://testnets.opensea.io/assets/${contractAddress}/${id}`

  return (
    <>
      <Navigation id={id} total={5} />
      <Universe id={id} metadata={metadata} />

      <section>
        <h2>Planet #{id}</h2>

        {forSaleNotice}

        <a href={openSeaLink} target="_blank" className="button"> 
          View on OpenSea
        </a>
      </section>

      <Head>
        <title>Planetary – Planet #{id}</title>
      </Head>
    </>
  )
}

export async function getStaticPaths() {
  const paths = [1, 2, 3, 4, 5].map(id => {
    return { params: { id: id.toString() }}
  })

  return {
    paths: paths,
    fallback: true
  } 
}

export async function getStaticProps({ params }) {

  //TO DO: pull in correct metadata per page within the web app
  // params.id is available
  //tokenURI can be referenced here: https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721URIStorage-_setTokenURI-uint256-string-
  let token = await contract.methods.tokenURI(params.id).call()

  let metadataResponse = await fetch(token)
  let metadata = await metadataResponse.json()

  //TO DO: use OpenSea API to create sync and keep web app information regarding product up to date
  //doc reference: https://docs.opensea.io/reference/retrieving-a-single-asset
  //we are adding "rinkeby-" to URL due to test network config
  let openseaResponse = await fetch(`https://rinkeby-api.opensea.io/api/v1/asset/${contractAddress}/${params.id}`)
  let opensea = await openseaResponse.json()

  console.log(opensea);

  return {
    props: {
      metadata: metadata,
      opensea: opensea
    }
  }
}

export default Planet