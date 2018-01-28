'use strict';

import _ from 'lodash';

import request from 'request';

import {
  requestLocations,
  receiveLocations
} from '../data/locations';

const Origin = window.location.origin;

export const SELECT_BLOG = 'SELECT_BLOG';
export const REQUEST_BLOGS = 'REQUEST_BLOGS';
export const RECEIVE_BLOGS = 'RECEIVE_BLOGS';

export function selectBlog(blog = {
  blogTitle: '',
  blocks: []
}) {
  return {
    type: SELECT_BLOG,
    blog: blog
  };
}

export function requestBlogs() {
  return {
    type: REQUEST_BLOGS
  };
}

/**
 * Fetches blog items and all locations at the same time
 */
export function fetchBlogs() {
  return (dispatch) => {
    dispatch(requestBlogs());
    dispatch(requestLocations());

    request.get({
      url: `${Origin}/locations/blogs`
    }, (err, res, body) => {
      //form to json - json ready with blog objects including location
      body = JSON.parse(body);

      // filter locations with blogs
      let locationWithBlogs = body.data.filter((location) =>
        (_.has(location, 'blog')));

      dispatch(receiveBlogs(locationWithBlogs));
      dispatch(receiveLocations(body.data));
    });
  };
}

export function receiveBlogs(blogs) {
  return {
    type: RECEIVE_BLOGS,
    blogs: blogs,
    receivedAt: Date.now() // hopefully this will stay a function for a while
  };
}
