import { useRouter } from 'next/router'
import Head from 'next/head'

import { web3, contract, contractAddress } from '../lib/web3'

import Navigation from '../components/Navigation'
import Universe from '../components/Universe'
import EthName from '../components/EthName'

import metadata from '../planetary-data/metadata-1.json'

function Planet({ metadata }) {
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

  // TODO
  let openSeaLink = "#"

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

  // params.id is available

  return {
    props: {
      metadata: metadata
    }
  }
}

export default Planet