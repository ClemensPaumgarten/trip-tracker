'use strict';

import {
  REQUEST_BLOGS,
  RECEIVE_BLOGS,
} from '../../actions/data/blogs';

import {
  UPDATE_BLOG_DATA_WITH_SELECTED
} from '../../actions/cms/cms';

export default function blogs(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  let blogs, idx;
  switch (action.type) {
    case REQUEST_BLOGS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_BLOGS:
      blogs = Array.from(action.blogs);

      blogs.unshift({
        _temp: {
          isNew: true
        },
        blog: {
          blogTitle: 'Create New Blog'
        }
      });

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: blogs,
        lastUpdated: action.receivedAt
      });
    case UPDATE_BLOG_DATA_WITH_SELECTED:
      blogs = Array.from(state.items);
      idx = blogs.findIndex(blog => blog._id === action.selectedLocation._id);

      if (idx > -1) {
        blogs[idx] = action.selectedLocation;
      } else {
        blogs.push(action.selectedLocation);
      }

      return Object.assign({}, state, {
        items: blogs
      });
    default:
      return state;
  }
}
