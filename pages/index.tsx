import { NextPage } from 'next'
import Head from 'next/head'

interface Props {}

const Home: NextPage<Props> = () => (
  <main>
    <Head>
      <title>Kastrup RVK</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <h1>Kastrup</h1>

    <style jsx>{`
      main {
        margin: 20px;
        border: 3px solid;
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </main>
)

export default Home
