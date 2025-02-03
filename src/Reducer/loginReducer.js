export const loginReducer = (prevState, action) => {
    console.log('dsdsd',prevState)
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return { ...prevState, userData: action.userData, userToken: action.token, isLoading: false };
      case 'LOGIN':
        return { ...prevState, userData: action.userData, userToken: action.token, isLoading: false };
      case 'LOGOUT':
        return { ...prevState, userData: null, userName: null, userToken: null, isLoading: false };
      case 'REGISTER':
        return { ...prevState, userData: action.userData, userToken: action.token, isLoading: false };
      default:
        return prevState;
    }
  };