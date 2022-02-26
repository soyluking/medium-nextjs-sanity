import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Medium - Where good ideas find you</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Hero />

      {/* <Posts /> */}
    </div>
  )
}

export default Home
