import { updateObject } from 'shared/utility';

export const AUTH_START = 'auth/AUTH_START';
export const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';
export const AUTH_FAIL = 'auth/AUTH_FAIL';
export const AUTH_LOGOUT = 'auth/AUTH_LOGOUT';

export const SET_AUTH_REDIRECT_PATH = 'auth/SET_AUTH_REDIRECT_PATH';


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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
      type: AUTH_LOGOUT
    };
  };

  export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
      setTimeout(() => {
        dispatch(logout());
      }, new Date(new Date().getTime() + 10000));
    //}, expirationTime * 1000);
    };
  };

  const checkLogin = (authData, isSignup) => {
    let url = '';
    if (!isSignup) {
      url = ''
    }

    return new Promise((resolve, reject) => {
      resolve(
        { data : {
            expiresIn: 60*60*1000,
            idToken: '1234',
            localId: 'xyzABC',
          }
        }
      );
      //return axios.post(url, authData)
    });
  }

  export const auth = (email, password, isSignup) => {
    return dispatch => {
      dispatch(authStart());
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      };
      let url = '';
      if (!isSignup) {
        url = '';
      }
      //axios.post(url, authData)
      checkLogin(authData, isSignup)
        .then(response => {
          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn );
          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('userId', response.data.localId);
          dispatch(authSuccess(response.data.idToken, response.data.localId));
          dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
          dispatch(authFail(err.response.data.error));
        });
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
