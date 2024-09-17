export interface Root {
  data: Daum[]
  links: Links
  meta: Meta
}

export interface Daum {
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
  shop_slug: string
  customer_slug: string
  customer_name: string
  number_items: number
}

export interface Links {
  first: string
  last: string
  prev: any
  next: string
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface Link {
  url?: string
  label: string
  active: boolean
}
