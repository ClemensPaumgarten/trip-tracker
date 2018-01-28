'use strict';

import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS
} from '../../actions/data/locations';

import {
  UPDATE_LOCATION_DATA_WITH_SELECTED
} from '../../actions/cms/cms';

export default function locations(state = {
  isFetching: false,
  items: []
}, action) {
  let items, idx;
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.locations
      });
    case UPDATE_LOCATION_DATA_WITH_SELECTED:
      items = Array.from(state.items);
      idx = items.findIndex(loc => loc._id === action.selectedLocation._id);

      if (idx > 0) {
        items[idx] = action.selectedLocation;
      }

      return Object.assign({}, state, {
        items: items
      });
    default:
      return state;
  }
}
