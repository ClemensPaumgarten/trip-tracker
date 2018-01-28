/**
 * Actions used for blog-entry page
 */
'use strict';

import request from 'request';

const Origin = window.location.origin;

export const REQUEST_BLOG = 'REQUEST_BLOG';
export const RECEIVE_BLOG = 'RECEIVE_BLOG';
export const ERROR_REQUEST_BLOG = 'ERROR_REQUEST_BLOG';

export function requestBlog() {
  return {
    type: REQUEST_BLOG
  };
}

export function receivedBlog(blog) {
  return {
    type: RECEIVE_BLOG,
    blog
  };
}

export function errorRequestBlog(error) {
  return {
    type: ERROR_REQUEST_BLOG,
    error
  };
}

export function fetchBlog(locationId) {
  return dispatch => {
    dispatch(requestBlog());

    request.get({
      url: `${Origin}/locations/${locationId}`
    }, (err, res, body) => {
      body = JSON.parse(body);

      if (body.success && body.dbResult.length) {
        let locationResult = body.dbResult[0];
        let blog = locationResult.blog;
        blog.photos = locationResult.photos;

        dispatch(receivedBlog(blog));
      } else {
        dispatch(errorRequestBlog(err));
      }
    });
  };
}
