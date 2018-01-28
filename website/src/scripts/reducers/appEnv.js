'use strict';

import {
  AUTH_CHECK_DONE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from '../actions/authentication';

import {
  REDIRECT_TO_TARGET,
  REDIRECT_TO_LOCATION,
  SET_CURRENT_LOCATION,
  SET_NOTIFICATION
} from '../actions/app-env';

export default function appEnv(state = {}, action) {
  var stateClone;
  switch (action.type) {
    case REDIRECT_TO_LOCATION:
      return Object.assign({}, state, {
        checkLocationState: true,
        currentLocation: action.location,
        targetLocation: action.targetLocation
      });
    case REDIRECT_TO_TARGET:
      stateClone = Object.assign({}, state);

      if (stateClone.targetLocation) {
        stateClone = Object.assign({}, state, {
          checkLocationState: true,
          currentLocation: state.targetLocation,
          targetLocation: null
        });
      }

      return stateClone;
    case SET_CURRENT_LOCATION:
      return Object.assign({}, state, {
        checkLocationState: false,
        currentLocation: action.location
      });
    case SET_NOTIFICATION:
      return Object.assign({}, state, {
        notification: action.notification
      });
    case AUTH_CHECK_DONE:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      // actual user data is saved in firebase object
      return Object.assign({}, state, {
        authCheckDone: true
      });
    default:
      return state;
  }
}
