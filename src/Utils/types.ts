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
