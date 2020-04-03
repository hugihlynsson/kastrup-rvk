export interface MenuItem {
  item_title: string
  item_description: string
  item_price: number
}

export interface PrismicImage {
  alt?: string
  dimensions: { width: number; height: number }
  url: string
}
