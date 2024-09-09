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
  customer_reference: any
  number_pallets: number
  customer_name: string
  customer_slug: string
  estimated_delivery_date: any
  receiveRoute: ReceiveRoute
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

export interface ReceiveRoute {
  name: string
  parameters: number
  method: string
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
