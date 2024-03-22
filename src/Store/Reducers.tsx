import { WriteCredential, WriteOrganisation, WriteWarehouse } from '../Utils/auth';

export default {
  userReducer(state = {}, action: object) {
    switch (action.type) {
      case 'CreateUserSession':
        state = {
          token: action.payload.token,
          id: action.payload.id,
          slug: action.payload.slug,
          username: action.payload.username,
          email: action.payload.email,
          avatar: action.payload.avatar,
          contact_name: action.payload.contact_name,
          created_at: action.payload.created_at,
          updated_at: action.payload.updated_at,
          status: action.payload.status,
          roles: action.payload.roles,
          permissions: action.payload.permissions,
          group: action.payload.group,
          organisations: action.payload.organisations,
        };
        WriteCredential(state);
        break;
      case 'DestroyUserSession':
        state = {
          token: null,
          id: null,
          slug: null,
          username: null,
          email: null,
          avatar: null,
          contact_name: null,
          created_at: null,
          updated_at: null,
          status: null,
          roles: null,
          permissions: null,
          group: null,
          organisations: null,
        };
        break;
    }
    return state;
  },

  organisationReducer(state = {}, action: object) {
    switch (action.type) {
      case 'CreateUserOrganisation':
        state = {
          organisations: action.payload.organisations,
          active_organisation: action.payload.active_organisation,
        };
        WriteOrganisation(state);
        break;
    }
    return state;
  },


  warehouseReducer(state = {}, action: object) {
    switch (action.type) {
      case 'CreateWarehouse':
        state = {
         code : action.payload.code,
         id : action.payload.id,
         name : action.payload.name,
         number_location : action.payload.number_location,
         number_warehouse_areas : action.payload.number_warehouse_areas,
         slug : action.payload.slug
        };
        WriteWarehouse(state);
        break;
    }
    return state;
  },

};
