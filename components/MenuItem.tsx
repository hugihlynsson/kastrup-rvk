import { StatelessComponent } from 'react'

import { colors } from '../constants'

interface Props {
  name: string
  description?: string
  price: number
}

const MenuItem: StatelessComponent<Props> = ({ name, description, price }) => (
  <article>
    <header>
      <h4>{name}</h4>
      <p className="price">{price}</p>
    </header>

    {description && <p className="description">{description}</p>}

    <style jsx>{`
      article {
        width: 100%;
        max-width: 500px;
        margin-bottom: 12px;
      }
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      h4 {
        font-size: 24px;
        margin: 0;
        font-weight: 400;
      }
      .price {
        font-size: 20px;
        margin: 0;
      }
      .description {
        font-size: 14px;
        color: ${colors.gray};
        margin: 0;
      }
    `}</style>
  </article>
)

export default MenuItem
