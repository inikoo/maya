export const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        userData: action.userData,
        userToken: action.token,
        isLoading: false,
        organisation: null,
        fulfilment: null,
      };
    case 'LOGIN':
      return {
        userData: action.userData,
        userToken: action.token,
        isLoading: false,
        organisation: null,
        fulfilment: null,
      };
    case 'LOGOUT':
      return {
        userData: null,
        userToken: null,
        isLoading: false,
      };
    case 'SET_ORGANISATION':
      return {
        userData: action.userData,
        userToken: action.token,
        isLoading: false,
        organisation: action.organisation,
        fulfilment: null,
      };
    case 'SET_FULFILMENT':
      return {
        userData: action.userData,
        userToken: action.token,
        isLoading: false,
        organisation: action.organisation,
        fulfilment: action.fulfilment,
      };

    default:
      return prevState;
  }
};
