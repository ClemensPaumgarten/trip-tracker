'use strict';

import * as firebase from 'firebase/app';

import {
  redirectToTarget
} from './app-env';

export const AUTH_CHECK_DONE = 'AUTH_CHECK_DONE';

export const REDIRECT_TO_LOGIN = 'REDIRECT_TO_LOGIN';
export const REDIRECT_TO_TARGET = 'REDIRECT_TO_TARGET';

export const SEND_AUTH_REQUEST = 'SEND_AUTH_REQUEST';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const SET_FIREBASE_JWT = 'SET_FIREBASE_JWT';

export function authCheckDone() {
  return {
    type: AUTH_CHECK_DONE
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(sendAuthRequest());

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      firebase.auth().currentUser.getToken(true).then(function (idToken) {
        dispatch(setFirebaseJWT(idToken));
        dispatch(loginSuccessful());
        dispatch(redirectToTarget());
      }).catch(function (error) {
        console.error('Receiving token failed', error);
        dispatch(loginError());
      });
    }).catch(() => {
      dispatch(loginError());
    });
  };
}

export function sendAuthRequest() {
  return {
    type: SEND_AUTH_REQUEST
  };
}

export function loginSuccessful() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function setFirebaseJWT(jwt) {
  return {
    type: SET_FIREBASE_JWT,
    jwt
  };
}

export function loginError() {
  return {
    type: LOGIN_ERROR
  };
}

export function logoutSuccessful() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function logoutError() {
  return {
    type: LOGOUT_ERROR
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(sendAuthRequest());

    firebase.auth().signOut().then(() => {
      dispatch(logoutSuccessful());
    }).catch(() => {
      dispatch(logoutError());
    });
  };
}
