export interface Root {
  data: Daum[]
  links: Links
  meta: Meta
}

export interface Daum {
  id: number
  slug: string
  reference: string
  customer_reference: string
  fulfilment_customer_name: any
  fulfilment_customer_slug: any
  fulfilment_customer_id: number
  notes: string
  state: string
  type_icon: TypeIcon
  type: string
  rental_id: number
  rental_name: string
  state_label: string
  state_icon: StateIcon
  status: string
  status_label: string
  status_icon: StatusIcon
  location_slug: string
  location_code: string
  location_id: number
  audited_at: any
  stored_items: StoredItem[]
  stored_items_quantity: number
  updateRoute: UpdateRoute
  updatePalletRentalRoute: UpdatePalletRentalRoute
  deleteRoute: DeleteRoute
  deleteFromDeliveryRoute: DeleteFromDeliveryRoute
  deleteFromReturnRoute: DeleteFromReturnRoute
  notReceivedRoute: NotReceivedRoute
  undoNotReceivedRoute: UndoNotReceivedRoute
  bookInRoute: BookInRoute
  undoBookInRoute: UndoBookInRoute
  updateLocationRoute: UpdateLocationRoute
  setAsLost: SetAsLost
  setAsDamaged: SetAsDamaged
  auditRoute: AuditRoute
  resetAuditRoute: ResetAuditRoute
  storeStoredItemRoute: StoreStoredItemRoute
}

export interface TypeIcon {
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

export interface StateIcon {
  tooltip: string
  icon: string
  class: string
  color: string
  app: App2
}

export interface App2 {
  name: string
  type: string
}

export interface StatusIcon {
  tooltip: string
  icon: string
  class: string
  color: string
  app: App3
}

export interface App3 {
  name: string
  type: string
}

export interface StoredItem {
  id: number
  reference: string
  notes: string
  state: string
  state_icon: StateIcon2
  quantity: number
}

export interface StateIcon2 {
  tooltip: string
  icon: string
  class: string
  color: string
}

export interface UpdateRoute {
  name: string
  parameters: number
}

export interface UpdatePalletRentalRoute {
  name: string
  parameters: number
}

export interface DeleteRoute {
  name: string
  parameters: number
}

export interface DeleteFromDeliveryRoute {
  name: string
  parameters: number[]
}

export interface DeleteFromReturnRoute {
  name: string
  parameters: number | undefined[]
}

export interface NotReceivedRoute {
  name: string
  parameters: number[]
}

export interface UndoNotReceivedRoute {
  name: string
  parameters: number[]
}

export interface BookInRoute {
  name: string
  parameters: number[]
}

export interface UndoBookInRoute {
  name: string
  parameters: number[]
}

export interface UpdateLocationRoute {
  name: string
  parameters: number[]
}

export interface SetAsLost {
  name: string
  parameters: number[]
}

export interface SetAsDamaged {
  name: string
  parameters: number[]
}

export interface AuditRoute {
  name: string
  parameters: number[]
}

export interface ResetAuditRoute {
  name: string
  parameters: number[]
}

export interface StoreStoredItemRoute {
  name: string
  parameters: number[]
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
