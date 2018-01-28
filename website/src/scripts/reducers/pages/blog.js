'use strict';

import {
  REQUEST_BLOG,
  RECEIVE_BLOG,
  ERROR_REQUEST_BLOG
} from '../../actions/blog/blog';

export default function blog(state = {
  isFetching: true,
  blog: null,
  error: null
}, action) {
  switch (action.type) {
    case REQUEST_BLOG:
      return Object.assign({}, state, {
        isFetching: true,
        blog: null
      });
    case RECEIVE_BLOG:
      return Object.assign({}, state, {
        isFetching: false,
        blog: action.blog
      });
    case ERROR_REQUEST_BLOG:
      return Object.assign({}, state, {
        isFetching: false,
        blog: null,
        error: action.error
      });
    default:
      return state;
  }
}
