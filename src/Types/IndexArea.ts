export interface Root {
  data: Daum[]
  links: Links
  meta: Meta
}

export interface Daum {
  id: number
  slug: string
  code: string
  name: string
  number_locations: number
  warehouse_slug: string
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
