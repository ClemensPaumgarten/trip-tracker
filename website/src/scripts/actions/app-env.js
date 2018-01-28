'use strict';

export const REDIRECT_TO_LOGIN = 'REDIRECT_TO_LOGIN';

export const REDIRECT_TO_LOCATION = 'REDIRECT_TO_LOCATION';
export const REDIRECT_TO_TARGET = 'REDIRECT_TO_TARGET';
export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';


export function setCurrentLocation(location) {
  return {
    type: SET_CURRENT_LOCATION,
    location
  };
}

/**
 * Sets app location state to desired location
 * @param {string} location - location that app should navigate to after state update
 * @param {string} targetLocation - ( optional ) targetLocation saves a location that can be targeted after 'location'.
 *  - For instance if a not authenticated user tries to access blocked pages the user will be redirected to login/.
 *  - targetLocation saves the originally targeted location. After sucessful login a redirect to the saved page with 'redirectToTarget' can be triggered
 */
export function redirectToLocation(location, targetLocation = null) {
  return {
    type: REDIRECT_TO_LOCATION,
    location,
    targetLocation
  };
}

/**
 * Sets sate of currentLocation to previously stored targetlocation. If targetlocation is null or undefined the state won't be changed
 */
export function redirectToTarget() {
  return {
    type: REDIRECT_TO_TARGET
  };
}

export function setNotification(notification = null) {
  return {
    type: SET_NOTIFICATION,
    notification
  };
}

