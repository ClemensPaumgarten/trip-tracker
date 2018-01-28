'use strict';

import {
  SEND_AUTH_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SET_FIREBASE_JWT
//	LOGIN_ERROR
} from '../actions/authentication';

export default function user(state = {
  hasJWT: false
}, action) {
  switch (action.type) {
    case SEND_AUTH_REQUEST:
      return Object.assign({}, state, {
        sendAuthReqest: true
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        sendAuthReqest: false,
        isLoggedIn: true
      });
    case SET_FIREBASE_JWT:
      window.localStorage.setItem('jwt', action.jwt);
      return Object.assign({}, state, {
        jwt: true
      });
    case LOGOUT_SUCCESS:
      window.localStorage.clear();
      return Object.assign({}, state, {
        sendAuthReqest: false,
        isLoggedIn: false
      });
    default:
      return state;
  }
}
