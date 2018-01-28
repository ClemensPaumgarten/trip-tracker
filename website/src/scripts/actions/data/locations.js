'use strict';

import request from 'request';

const Origin = window.location.origin;

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';

export function fetchLocations() {
  return dispatch => {
    dispatch(requestLocations());

    request.get({
      url: `${Origin}/locations`
    }, (err, result, body) => {
      body = JSON.parse(body);
      if (body.success && body.locations.length) {
        dispatch(receiveLocations(body.locations));
      }
    });
  };
}

export function requestLocations() {
  return {
    type: REQUEST_LOCATIONS
  };
}

export function receiveLocations(locations) {
  return {
    type: RECEIVE_LOCATIONS,
    locations
  };
}
