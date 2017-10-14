export function addTask(postId, author, task) {
  return {
    type: 'ADD_TASK',
    postId,
    author,
    task
  }
}

export const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
export const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
export const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
export const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
export const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
export const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
export const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });





// export const MANUAL_LOGIN_USER = "MANUAL_LOGIN_USER";
// export const LOGIN_SUCCESS_USER = "LOGIN_SUCCESS_USER";
// export const LOGIN_ERROR_USER = "LOGIN_ERROR_USER";
// export const SIGNUP_USER = "SIGNUP_USER";
// export const SIGNUP_SUCCESS_USER = "SIGNUP_SUCCESS_USER";
// export const SIGNUP_ERROR_USER = "SIGNUP_ERROR_USER";
// export const LOGOUT_USER = "LOGOUT_USER";
// export const LOGOUT_SUCCESS_USER = "LOGOUT_SUCCESS_USER";
// export const LOGOUT_ERROR_USER = "LOGOUT_ERROR_USER";
// export const REGISTER_USER = "REGISTER_USER";
// export const REGISTER_SUCCESS_USER = "REGISTER_SUCCESS_USER";
// export const REGISTER_ERROR_USER = "REGISTER_ERROR_USER";
