import React, { ComponentType, ReactNode } from 'react';

export type setNavigation = {
  name: string;
  component: ComponentType<any>;
  options: {
    tabBarButton: ReactNode; 
  };
};

export type navigation = {
  route: {
    params: string;
  };
  navigation : any
  extraData: {
    components: setNavigation[]; 
  };
};


export type BaseListTypes = {
  refreshList: Function,
  bulkValue : Array<any>
}

export interface DetailOrgStockTypes {
  id: number;
  slug: string;
  code: string;
  unit_value?: any;
  description?: any;
  number_locations: number;
  quantity_locations: string;
  photo?: any;
  locations: Location2[];
}

export interface Location2 {
  id: number;
  quantity: number;
  value: string;
  audited_at: string;
  commercial_value: string;
  type: string;
  picking_priority: number;
  notes?: any;
  data: any[];
  settings: Setting | any[];
  created_at: string;
  updated_at: string;
  location: Location;
}

export interface Location {
  id: number;
  slug: string;
  code: string;
  tags: any[];
  allow_stocks: boolean;
  allow_fulfilment: boolean;
  allow_dropshipping: boolean;
  has_stock_slots: boolean;
  has_fulfilment: boolean;
  has_dropshipping_slots: boolean;
}

export interface Setting {
  max_stock: number;
  min_stock: number;
}

export interface reduxData {
  organisationReducer : organisationReducer
  userReducer : userReducer
  warehouseReducer : warehouseReducer
}

export interface warehouseReducer {
  active_organisation : Organisation
  organisations: Organisation[];
}


export interface organisationReducer {
  active_organisation : Organisation
  organisations: Organisation[];
}

export interface warehouseReducer {
  code: string;
  id: number;
  label: string;
  slug: string;
}

export interface userReducer {
  id: number;
  username: string;
  image: Image;
  email: string;
  about?: any;
  status: Status;
  parent_type: string;
  contact_name: string;
  group: Group;
  organisations: Organisation[];
  created_at: string;
  updated_at: string;
  roles: string[];
  permissions: string[];
}

export interface Organisation {
  id: number;
  slug: string;
  code: string;
  label: string;
  type: string;
  currency: Currency2;
  logo: Image;
  route: Route;
  authorised_shops: Authorisedshop[];
  authorised_fulfilments: Authorisedshop[];
  authorised_warehouses: Authorisedwarehouse[];
  authorised_productions: Authorisedproduction[];
  active_authorised_fulfilments : Authorisedshop
}
export interface Authorisedproduction {
  id: number;
  slug: string;
  code: string;
  label: string;
}

export interface Authorisedwarehouse {
  id: number;
  slug: string;
  code: string;
  label: string;
  route: Route;
}
export interface Authorisedshop {
  id: number;
  slug: string;
  code: string;
  label: string;
  state: string;
  type: string;
  route: Route;
}

export interface Route {
  name: string;
  parameters: string[];
}

export interface Currency2 {
  id: number;
  code: string;
  name: string;
  symbol: string;
  fraction_digits: number;
  status: boolean;
  store_historic_data: boolean;
  historic_data_since: string;
  data: any[];
  created_at: string;
  updated_at: string;
}
export interface Group {
  id: number;
  slug: string;
  label: string;
  logo: Image;
  currency: Currency;
}
export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
}
export interface Status {
  tooltip: string;
  icon: string;
  class: string;
}

export interface Image {
  original: string;
  avif: string;
  webp: string;
  avif_2x: string;
  webp_2x: string;
  original_2x: string;
}

export interface ItemOrgStockIndex {
  id: number;
  slug: string;
  code: string;
  name: string;
  unit_value?: any;
  number_locations?: any;
  quantity_locations: string;
  family_slug?: any;
  family_code?: any;
}

export interface PropsScreens {
  route : routeType
  navigation : any
}

export interface routeType {
    key: string;
    name: string;
    params: Object;
    path: string;
}


export interface PalletTypesIndex {
  id: number;
  slug: string;
  reference: string;
  customer_reference: string;
  fulfilment_customer_name?: any;
  fulfilment_customer_slug?: any;
  fulfilment_customer_id: number;
  notes: string;
  state: string;
  type_icon: Typeicon;
  type: string;
  rental_id: number;
  rental_name: string;
  state_label: string;
  state_icon: Typeicon;
  status: string;
  status_label: string;
  status_icon: Typeicon;
  location_slug: string;
  location_code: string;
  location_id: number;
  audited_at?: any;
  stored_items: any[];
  stored_items_quantity: number;
  updateRoute: UpdateRoute;
  updatePalletRentalRoute: UpdateRoute;
  deleteRoute: UpdateRoute;
  deleteFromDeliveryRoute: DeleteFromDeliveryRoute;
  deleteFromReturnRoute: DeleteFromDeliveryRoute;
  notReceivedRoute: NotReceivedRoute;
  undoNotReceivedRoute: NotReceivedRoute;
  bookInRoute: NotReceivedRoute;
  undoBookInRoute: NotReceivedRoute;
  updateLocationRoute: NotReceivedRoute;
  setAsLost: NotReceivedRoute;
  setAsDamaged: NotReceivedRoute;
  auditRoute: NotReceivedRoute;
  resetAuditRoute: NotReceivedRoute;
  storeStoredItemRoute: NotReceivedRoute;
}
interface NotReceivedRoute {
  name: string;
  parameters: number[];
}
interface DeleteFromDeliveryRoute {
  name: string;
  parameters: (null | number)[];
}
interface UpdateRoute {
  name: string;
  parameters: number;
}
interface Typeicon {
  tooltip: string;
  icon: string;
  class: string;
  color: string;
  app: App;
}
interface App {
  name: string;
  type: string;
}

export interface PalletDetailTypes {
  id: number;
  reference: string;
  customer_reference: string;
  slug: string;
  customer: Customer;
  location: {
    resource : Location
  };
  state: string;
  status: string;
  notes: string;
  rental_id: number;
  status_label: string;
  status_icon: Statusicon;
  items: any[];
  timeline: Timeline[];
}
interface Timeline {
  label: string;
  tooltip: string;
  key: string;
  icon: string;
  current: boolean;
  timestamp?: string;
}
interface Statusicon {
  tooltip: string;
  icon: string;
  class: string;
  color: string;
  app: App;
}
interface App {
  name: string;
  type: string;
}

interface Customer {
  name: string;
  contact_name: string;
  route: Route;
}

export interface warehouseAreaIndexTypes {
  id: number;
  slug: string;
  code: string;
  name: string;
  number_locations: number;
  warehouse_slug: string;
}

export interface LocationTypesIndex {
  id: number;
  slug: string;
  code: string;
  tags: any[];
  allow_stocks: boolean;
  allow_fulfilment: boolean;
  allow_dropshipping: boolean;
  has_stock_slots: boolean;
  has_fulfilment: boolean;
  has_dropshipping_slots: boolean;
}

export interface DetailLocationTypes {
  id: number;
  slug: string;
  code: string;
  allow_stocks: boolean;
  allow_fulfilment: boolean;
  allow_dropshipping: boolean;
  has_stock_slots: boolean;
  has_fulfilment: boolean;
  has_dropshipping_slots: boolean;
  status: string;
  stock_value: string;
  is_empty: boolean;
  max_weight?: any;
  max_volume?: any;
  data: any[];
  audited_at?: any;
  created_at: string;
  updated_at: string;
  tags: any[];
}