import { StatelessComponent } from 'react'

import { colors } from '../constants'
import { MenuItem as MenuItemType } from '../types'
import addDecimalSeparators from '../modules/addDecimalSeparators'

const MenuItem: StatelessComponent<MenuItemType> = ({
  item_title,
  item_description,
  item_price,
}) => (
  <article>
    <header>
      <h4>{item_title}</h4>
      <p className="price">{addDecimalSeparators(item_price)}</p>
    </header>

    {item_description && <p className="description">{item_description}</p>}

    <style jsx>{`
      article {
        width: 100%;
        max-width: 400px;
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
