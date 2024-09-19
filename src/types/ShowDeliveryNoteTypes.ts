export interface Root {
  data: Data
}

export interface Data {
  id: number
  slug: string
  reference: string
  date: string
  state: string
  type: string
  status: string
  weight: string
  created_at: string
  updated_at: string
  shop_slug: any
  customer_slug: any
  customer_name: any
  number_items: any
}
