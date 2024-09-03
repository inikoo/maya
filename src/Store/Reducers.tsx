import { WriteCredential,RemoveCredential, WriteOrganisation, WriteWarehouse } from '../Utils/auth';

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
          image : action.payload.image,
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
         label : action.payload.label,
         slug : action.payload.slug
        };
        WriteWarehouse(state);
        break;
        case 'DestroyWarehouse':
          state = {
           code : null,
           id : null,
           name : null,
           number_location : null,
           number_warehouse_areas : null,
           slug : null
          };
          WriteWarehouse(state);
          break;
    }
    return state;
  },

};
