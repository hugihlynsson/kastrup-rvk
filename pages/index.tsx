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
      <meta property="og:url" content="https://kastrup.now.sh" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:image" content={data.share_image.url} />
    </Head>

    <h1>
      <img
        className="logo"
        alt="Kastrup – smurbrauð &amp; bar"
        src="/logo.svg"
      />
    </h1>

    <p className="text">{data.opening_hours}</p>

    <div className="images">
      <img className="image" src="/kastrup1.jpg" alt="" />
      <img className="image" src="/kastrup2.jpg" alt="" />
      <img className="image" src="/kastrup3.jpg" alt="" />
      <img className="image" src="/kastrup4.jpg" alt="" />
    </div>

    <p className="text">
      {data.location} | <a href={`tel:+354 ${data.phone}`}>{data.phone}</a>
    </p>

    <h2>{data.menu_title}</h2>

    <p className="menuDescription">{data.menu_subtitle}</p>

    <div className="menu">
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
    </div>

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
      }

      h1 {
        width: 100%;
        max-width: 514px;
        margin: 60px 0 40px;
      }

      .logo {
        width: 100%;
        height: 100%;
      }

      .images {
        display: block;
        width: 100%;
        margin-bottom: 10px;
        padding-top: 3px;
        padding-bottom: 3px;
      }
      .image {
        float: left;
        width: 50%;
        height: auto;
        outline: 3px solid ${colors.blue};
      }

      .text {
        font-size: 18px;
        margin-top: 0;
        margin-bottom: 10px;
        margin-left: 16px;
        margin-right: 16px;
      }

      h2 {
        font-size: 64px;
        line-height: 1;
        margin-bottom: 0;
        font-weight: 400;
        margin-left: 16px;
        margin-right: 16px;
      }

      .menuDescription {
        font-size: 18px;
        color: ${colors.gray};
        margin-top: 0;
        margin-bottom: 20px;
        margin-left: 16px;
        margin-right: 16px;
      }

      .menu {
        padding-left: 16px;
        padding-right: 16px;
        width: 100%;
        max-width: 400px;
        margin-bottom: 20px;
      }

      h3 {
        font-size: 40px;
        margin-top: 40px;
        margin-bottom: 20px;
        font-weight: 400;
      }

      footer {
        display: flex;
        width: 100%;
        margin-top: 40px;
        margin-bottom: 20px;
        flex-direction: column;
        align-items: center;
        padding-top: 30px;
        text-align: center;
        border-top: 3px solid ${colors.blue};
        padding-left: 16px;
        padding-right: 16px;
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
        .image {
          width: 25%;
          outline-width: 4px;
        }
        footer {
          padding-top: 60px;
          margin-bottom: 50px;
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
