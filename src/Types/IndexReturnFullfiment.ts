export interface Root {
  data: Daum[]
  links: Links
  meta: Meta
}

export interface Daum {
  id: number
  slug: string
  reference: string
  state: string
  state_label: string
  state_icon: StateIcon
  type: string
  type_label: string
  type_icon: TypeIcon
  customer_reference: any
  number_pallets: any
  number_services: number
  number_physical_goods: number
  dispatched_date: any
}

export interface StateIcon {
  tooltip: string
  icon: string
  class: string
  color: string
  app: App
}

export interface App {
  name: string
  type: string
}

export interface TypeIcon {
  tooltip: string
  icon: string
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
