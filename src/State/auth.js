import { updateObject } from 'shared/utility';
import * as bookActions from './book'
import axios from 'axios';
import API from 'shared/api'

export const AUTH_START = 'auth/AUTH_START';
export const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';
export const AUTH_FAIL = 'auth/AUTH_FAIL';
export const AUTH_LOGOUT = 'auth/AUTH_LOGOUT';
export const SET_AUTH_REDIRECT_PATH = 'auth/SET_AUTH_REDIRECT_PATH';
export const GET_JWT_TOKEN = 'auth/GET_JWT_TOKEN';

export const authStart = () => {
    return {
      type: AUTH_START
    };
  };

  export const authSuccess = (token, userId) => {
    return {
      type: AUTH_SUCCESS,
      idToken: token,
      userId: userId
    };
  };

  export const authFail = (error) => {
    return {
      type: AUTH_FAIL,
      error: error
    };
  };

  export const logout = () => {
    return dispatch => {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('userId');
      dispatch(bookActions.resetReadedBooks())
      dispatch(bookActions.resetWantToReadBooks())
      dispatch(bookActions.resetRatedBooks())

      dispatch({type: AUTH_LOGOUT})
    }
  };

  export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
      setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 1000);
    };
  };

  const createUser = (authData) => {
    let url = '/users?DEBUG_SESSION_START=PHPSTORM';
    return API.post(url, authData);
  }

  export const getTokenAndLogin = (username, email, password, id = null) => {
    return dispatch => {
      const tokenData = {
        username: username,
        email: email,
        password: password,
        returnSecureToken: true
      };
      const url = "http://127.0.0.1:8000/authentication_token";
      axios.post(url, tokenData)
        .then(response => response.data)
        .then(data => {
          const token = data.token;
          const expirationDate = new Date(new Date().getTime() + 60*60*1000);
          //const expirationDate = 60*60;
          localStorage.setItem('token', data.token);
          localStorage.setItem('expirationDate', expirationDate);
          if (id) {
            dispatch(login(id, token, expirationDate))
          }
          else {
            dispatch(getUserIdAndLogin(username, email, token, expirationDate));
          }
        })
    }
  }

  export const login = (id, token, expirationDate) => {
    return dispatch => {
      localStorage.setItem('userId', id);
      dispatch(authSuccess(token, id));
      dispatch(checkAuthTimeout(expirationDate));
      dispatch(bookActions.loadWantToReadBookFromStorage());
      dispatch(bookActions.getRatedBooks());
      dispatch(bookActions.getReadedBooks(id));
    }
  }

  export const getUserIdAndLogin = (username, email, token, expirationDate) => {
    return dispatch => {
      API.get(`http://127.0.0.1:8000/api/users?username=${username}&email=${email}`)
        .then(resposne => resposne.data)
        .then(data => {
          const id = data['hydra:member'][0].id ? data['hydra:member'][0].id : null;
          dispatch(login(id, token, expirationDate))
        })
        .catch(err => {
          console.error(err);
          dispatch(authFail(err.response.data.error));
        });
    }
  }

  export const auth = (username, email, password, isSignup) => {
    return dispatch => {
      dispatch(authStart());
      const authData = {
        username: username,
        email: email,
        password: password,
      };
      if (!isSignup) {
        dispatch(getTokenAndLogin(username, email, password));
      }
      else {
        createUser(authData)
          .then(response => {
            const id = response.data.id;
            const email = response.data.email;
            const username = response.data.username;
            dispatch(getTokenAndLogin(username, email, password, id));

          })
          .catch(err => {
            console.error(err);
            dispatch(authFail(err.response.data.error));
          });
      }
    };
  };

export const setAuthRedirectPath = (path) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
      }
    }
  };
};

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const authStartReducer = ( state, action ) => {
  return updateObject( state, { error: null, loading: true } );
};

const authSuccessReducer = (state, action) => {
  return updateObject( state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  } );
};

const authFailReducer = (state, action) => {
  return updateObject( state, {
    error: action.error,
    loading: false
  });
};

const authLogoutReducer = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPathReducer = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case AUTH_START: return authStartReducer(state, action);
    case AUTH_SUCCESS: return authSuccessReducer(state, action);
    case AUTH_FAIL: return authFailReducer(state, action);
    case AUTH_LOGOUT: return authLogoutReducer(state, action);
    case SET_AUTH_REDIRECT_PATH: return setAuthRedirectPathReducer(state,action);
    default:
      return state;
  }
};

export default reducer;
