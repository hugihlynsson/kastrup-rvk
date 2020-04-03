import { Fragment } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Prismic from 'prismic-javascript'

import { colors } from '../constants'
import { MenuItem as MenuItemType, PrismicImage } from '../types'
import MenuItem from '../components/MenuItem'

interface HomeData {
  title: string
  description: string
  share_image: PrismicImage
  opening_hours: string
  location: string
  phone: string
  menu_title: string
  menu_subtitle: string
  body: Array<{
    slice_type: 'menu_section'
    primary: { menu_section_title: string }
    items: Array<MenuItemType>
  }>
}

interface Props {
  data: HomeData
}

const Home: NextPage<Props> = ({ data }) => (
  <main>
    <Head>
      <title>{data.title}</title>
      <link rel="icon" href="/icon.png" />
      <link rel="apple-touch-icon" href="/icon-512w.png" />
      <meta name="description" content={data.description} />
      <meta property="og:url" content="https://kastrup.is" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:image" content={data.share_image.url} />
    </Head>

    <h1>
      <img alt="Kastrup – smurbrauð &amp; bar" src="/logo.svg" />
    </h1>

    <p className="text">{data.opening_hours}</p>
    <p className="text">
      {data.location} | <a href={`tel:+354 ${data.phone}`}>{data.phone}</a>
    </p>

    <h2>{data.menu_title}</h2>

    <p className="menuDescription">{data.menu_subtitle}</p>

    {data.body
      .filter(({ slice_type }) => slice_type === 'menu_section')
      .map(({ primary, items }) => (
        <Fragment key={primary.menu_section_title}>
          <h3>{primary.menu_section_title}</h3>
          {items.map((item) => (
            <MenuItem {...item} key={item.item_title} />
          ))}
        </Fragment>
      ))}

    <footer>
      <p className="text">
        {data.location} | <a href={`tel:+354 ${data.phone}`}>{data.phone}</a>
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
        .text {
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

Home.getInitialProps = async ({ res }) => {
  if (res) {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  }

  const client = Prismic.client('https://kastrup.cdn.prismic.io/api/v2')
  const homeSingle = await client.getSingle('home', {})
  console.log('data', homeSingle.data)
  return { data: homeSingle.data as HomeData }
}

export default Home
