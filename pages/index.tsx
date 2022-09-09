import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Restaurant</title>
        <meta name="description" content="Aplicación básica de Restaurante" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div >
        <h1>Restaurants</h1>
      </div>
    </div>
  )
}

export default Home
