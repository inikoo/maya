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

export type palletTypes = {
  id: Number;
  location_code: String;
  reference:String;
  status_icon:{
    color : String,
    icon : String
  }
  type_icon: {
    color: String;
    icon : String;
  };
}

export type BaseListTypes = {
  refreshList: Function,
  bulkValue : Array<any>
}
