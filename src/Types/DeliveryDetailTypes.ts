export interface Root {
  data: Data
}

export interface Data {
  id: number
  customer_name: string
  reference: string
  state: string
  timeline: Timeline
  number_pallets: number
  number_boxes: number
  number_oversizes: number
  number_services: number
  number_physical_goods: number
  state_label: string
  state_icon: StateIcon
  estimated_delivery_date: any
}

export interface Timeline {
  "in-process": InProcess
  submitted: Submitted
  confirmed: Confirmed
  received: Received
  "booking-in": BookingIn
  "booked-in": BookedIn
}

export interface InProcess {
  label: string
  tooltip: string
  key: string
  timestamp: string
}

export interface Submitted {
  label: string
  tooltip: string
  key: string
  timestamp: string
}

export interface Confirmed {
  label: string
  tooltip: string
  key: string
  timestamp: string
}

export interface Received {
  label: string
  tooltip: string
  key: string
  timestamp: string
}

export interface BookingIn {
  label: string
  tooltip: string
  key: string
  timestamp: string
}

export interface BookedIn {
  label: string
  tooltip: string
  key: string
  timestamp: any
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
