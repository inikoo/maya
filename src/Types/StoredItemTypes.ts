
export interface RootObject {
    data: Datum[];
  }
  export interface Datum {
    id: number;
    reference: string;
    slug: string;
    customer_name: string;
    location: string;
    state: string;
    notes: string;
    status?: any;
    state_icon: Stateicon;
    quantity: number;
    total_quantity: number;
    max_quantity: number;
    pallet_name: string;
    deleteRoute: DeleteRoute;
  }
  export interface DeleteRoute {
    name: string;
    parameters: Parameters;
  }
  export interface Parameters {
    storedItem: number;
  }
  export interface Stateicon {
    tooltip: string;
    icon: string;
    class: string;
    color: string;
  }

  export interface Data {
    id: number;
    reference: string;
    slug: string;
    customer_name: string;
    location: string;
    state: string;
    notes: string;
    status?: any;
    state_icon: Stateicon;
    quantity: number;
    total_quantity: number;
    max_quantity: number;
    pallet_name: string;
    deleteRoute: DeleteRoute;
  }
