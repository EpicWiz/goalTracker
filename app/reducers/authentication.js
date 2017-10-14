const initialAuthState = {
  id: '',
  username: '',
  isLoggedIn: false,
  isLoggingIn: false
};

export default function reducer(state = initialAuthState, action) {
  switch (action.type) {
    case 'AUTHENTICATION_LOGIN_ATTEMPT': {
      const newState = Object.assign({}, state);
      newState.isLoggingIn = true;
      return newState;
    }
    case 'AUTHENTICATION_LOGIN_FAILURE':
    case 'AUTHENTICATION_SESSION_CHECK_FAILURE':
    case 'AUTHENTICATION_LOGOUT_SUCCESS': {
      const newState = Object.assign({}, initialAuthState);
      return newState;
    }
    case 'AUTHENTICATION_LOGIN_SUCCESS':
    case 'AUTHENTICATION_SESSION_CHECK_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.id = action.json._id;
      newState.isLoggedIn = true;
      newState.isLoggingIn = false;
      newState.username = action.json.username;
      return newState;
    }
    case 'AUTHENTICATION_LOGOUT_FAILURE': {
      // todo: handle error!
      return state;
    }
    default: {
      return state;
    }
  }
}
