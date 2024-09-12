export interface Root {
  data: Daum[]
  links: Links
  meta: Meta
}

export interface Daum {
  id: number
  reference: string
  slug: string
  customer_name: string
  location: string
  state: string
  notes: string
  status: any
  state_icon: StateIcon
  quantity: number
  total_quantity: number
  max_quantity: number
  pallet_name: string
  deleteRoute: DeleteRoute
}

export interface StateIcon {
  tooltip: string
  icon: string
  class: string
  color: string
}

export interface DeleteRoute {
  name: string
  parameters: Parameters
}

export interface Parameters {
  storedItem: number
}

export interface Links {
  first: string
  last: string
  prev: any
  next: any
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
