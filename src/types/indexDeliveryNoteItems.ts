export interface Root {
  data: Daum[]
  links: Links
  meta: Meta
}

export interface Daum {
  id: number
  org_stock_code: string
  org_stock_name: string
  picker: Picker
  packer: Packer
  vessel_picking: any
  vessel_packing: any
  picking_at: any
  picked_at: any
  packing_at: any
  packed_at: any
  quantity_required: number
  quantity_picked: number
  location_id?: number
  assign_picker: AssignPicker
  assign_packer: AssignPacker
  routes: Routes
}

export interface Picker {
  selected?: Selected
  pickerId?: number
  pickerName: any
}

export interface Selected {
  user_id: number
  contact_name: any
}

export interface Packer {
  selected: any
}

export interface AssignPicker {
  name: string
  parameters: Parameters
}

export interface Parameters {
  picking: number
}

export interface AssignPacker {
  name: string
  parameters: Parameters2
}

export interface Parameters2 {
  picking: number
}

export interface Routes {
  pickingRoute: PickingRoute
  queriedRoute: QueriedRoute
  waitingRoute: WaitingRoute
  pickedRoute: PickedRoute
  packingRoute: PackingRoute
  doneRoute: DoneRoute
}

export interface PickingRoute {
  name: string
  method: string
  parameters: Parameters3
}

export interface Parameters3 {
  picking: number
}

export interface QueriedRoute {
  name: string
  method: string
  parameters: Parameters4
}

export interface Parameters4 {
  picking: number
}

export interface WaitingRoute {
  name: string
  method: string
  parameters: Parameters5
}

export interface Parameters5 {
  picking: number
}

export interface PickedRoute {
  name: string
  method: string
  parameters: Parameters6
}

export interface Parameters6 {
  picking: number
}

export interface PackingRoute {
  name: string
  method: string
  parameters: Parameters7
}

export interface Parameters7 {
  picking: number
}

export interface DoneRoute {
  name: string
  method: string
  parameters: Parameters8
}

export interface Parameters8 {
  picking: number
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
