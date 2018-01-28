'use strict';

import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
} from '../../actions/map/map';

export default function (state = {
  sidebarIsOpen: false
}, action) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return Object.assign({}, state, {
        sidebarIsOpen: true
      });
    case CLOSE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarIsOpen: false
      });
    default:
      return state;
  }
}
