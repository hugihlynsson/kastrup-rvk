import { NextPage } from 'next'
import Head from 'next/head'

import { colors } from '../constants'
import MenuItem from '../components/MenuItem'

const breadMenu = [
  {
    name: 'Christiansö síld',
    description: 'creme fraiche, laukur, eggjarauða',
    price: 2690,
  },
  {
    name: 'Marineruð síld',
    description: 'hrár og sultaður laukur, capers, kartöflur, dill',
    price: 2190,
  },
  {
    name: 'Karrýsíld',
    description: 'epli, egg & karsi',
    price: 2190,
  },
  {
    name: 'Egg & rækjur',
    description: 'karsi & sítrónumæjó',
    price: 2490,
  },
]

const mainMenu = [
  {
    name: 'Fiskur dagsins',
    description: 'ásamt meðlæti',
    price: 2490,
  },
  {
    name: 'Salat',
    description: 'með gratineruðum geitaosti á crouton',
    price: 2890,
  },
  {
    name: 'Christiansö síld',
    description: 'creme fraiche, laukur, eggjarauða',
    price: 2690,
  },
]

const desertMenu = [
  { name: 'Ostur – 3 tegundir', price: 2490 },
  { name: 'Súkkulaðimús', price: 1200 },
  { name: 'Vanilluís', price: 1200 },
]

interface Props {}

const Home: NextPage<Props> = () => (
  <main>
    <Head>
      <title>Kastrup RVK</title>
      <link rel="icon" href="/favicon.png" />
    </Head>

    <h1>
      <img alt="Kastrup – smurbrauð &amp; bar" src="/logo.svg" />
    </h1>

    <p className="text">Þri – fös: 12 – 16 Lau: 12 – 18</p>
    <p className="text">
      Ingólfsstræti | Reykjavík | <a href="tel:+3547771979">777 1979</a>
    </p>

    <h2>Matseðill</h2>

    <p className="menuDescription">Hringið til að panta take-away</p>

    <h3>Smurbrauð</h3>

    {[...breadMenu, ...breadMenu, ...breadMenu].map((item, index) => (
      <MenuItem {...item} key={index} />
    ))}

    <h3>Aðalréttir</h3>

    {mainMenu.map((item) => (
      <MenuItem {...item} key={item.name} />
    ))}

    <h3>Eftirréttir</h3>

    {desertMenu.map((item) => (
      <MenuItem {...item} key={item.name} />
    ))}

    <footer>
      <p className="text">
        Ingólfsstræti | Reykjavík | <a href="tel:+3547771979">777 1979</a>
      </p>
      <p className="text">
        <a href="https://www.facebook.com/kastruprvk/">Facebook</a> |{' '}
        <a href="https://www.instagram.com/kastruprvk">Instagram</a>
      </p>
    </footer>

    <style jsx>{`
      main {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
        border: 3px solid ${colors.blue};
        padding: 16px;
      }

      h1 {
        width: 100%;
        max-width: 514px;
      }

      img {
        width: 100%;
      }

      .text {
        font-size: 18px;
        margin-top: 0;
        margin-bottom: 10px;
      }

      h2 {
        font-size: 64px;
        line-height: 1;
        margin-bottom: 0;
        font-weight: 400;
      }

      .menuDescription {
        font-size: 18px;
        color: ${colors.gray};
        margin-top: 0;
        margin-bottom: 20px;
      }

      h3 {
        font-size: 40px;
        margin-top: 40px;
        margin-bottom: 20px;
        font-weight: 400;
      }

      footer {
        margin-top: 40px;
        margin-bottom: 20px;
        text-align: center;
      }

      a {
        color: ${colors.blue};
      }

      @media (min-width: 600px) {
        main {
          border-width: 4px;
        }
        text {
          font-size: 25px;
        }
      }
    `}</style>

    <style jsx global>{`
      @font-face {
        font-family: 'Din Condensed';
        src: url('/DINNextLTPro-Condensed.otf') format('opentype');
      }

      html,
      body {
        padding: 0;
        margin: 0;
        color: ${colors.blue};
        font-family: 'Din Condensed', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </main>
)

export default Home
