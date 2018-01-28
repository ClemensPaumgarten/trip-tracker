'use strict';

import request from 'request';

export default {
  get: request.get,
  post: request.post,

  /**
   * Get request with Accept-header default set to 'application/javascript'
   * @param  {object}   options  options object according to requestjs doc
   * @param  {function} callback callback according to requestjs doc
   */
  getJson(options, callback) {
    options.headers = options.headers || {};
    options.headers.accept = options.headers.accept || 'application/javascript';
    request.get(options, callback);
  },

};
