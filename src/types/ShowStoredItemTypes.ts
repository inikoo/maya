export interface Root {
  data: Data
}

export interface Data {
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
