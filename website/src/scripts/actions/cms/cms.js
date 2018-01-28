'use strict';

import deleteStorageFiles from '../../utils/delete-storage-files';

import request from 'request';

import _ from 'lodash';

import {
  redirectToLocation
} from '../app-env';

const Origin = window.location.origin;

export const REPLACE_SELECTED_LOCATION = 'REPLACE_SELECTED_LOCATION';
export const SWITCH_LOCATION_FOR_SELECTED = 'SWITCH_LOCATION_FOR_SELECTED';

export const ADD_TEXT_BLOCK = 'ADD_TEXT_BLOCK';
export const REMOVE_BLOCK = 'REMOVE_BLOCK';

export const UPDATE_BLOG_CONTENT = 'UPDATE_BLOG_CONTENT'; //Update state changes
export const UPDATE_BLOG_TITLE = 'UPDATE_BLOG_TITLE';

export const SEND_PAYLOAD = 'SEND_PAYLOAD';
export const FINISH_SAVE_BLOG = 'FINISH_SAVE_BLOG';
export const FINISH_UPDATE_BLOG = 'FINISH_UPDATE_BLOG';
export const FINISH_DELETE_BLOG = 'FINISH_DELETE_BLOG';

export const UPDATE_LOCATION_DATA_WITH_SELECTED = 'UPDATE_LOCATION_DATA_WITH_SELECTED';
export const UPDATE_BLOG_DATA_WITH_SELECTED = 'UPDATE_BLOG_DATA_WITH_SELECTED';

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SAVE_MODAL_DATA = 'SAVE_MODAL_DATA';

export const FINISH_ERROR_REQUEST = 'FINISH_ERROR_REQUEST';

export function replaceSelectedLocation(location) {
  return {
    type: REPLACE_SELECTED_LOCATION,
    location
  };
}

export function switchLocationForSelected(location) {
  return {
    type: SWITCH_LOCATION_FOR_SELECTED,
    location
  };
}

function sendPayload() {
  return {
    type: SEND_PAYLOAD
  };
}

function finishSaveBlog() {
  return {
    type: FINISH_SAVE_BLOG
  };
}

function finishUpdateBlog(location) {
  return {
    type: FINISH_UPDATE_BLOG,
    location
  };
}

function finishDeleteBlog() {
  return {
    type: FINISH_DELETE_BLOG
  };
}

export function updateBlog(selectedLocation) {
  return dispatch => {
    let selectedLocationClone = Object.assign({}, selectedLocation);

    dispatch(sendPayload());

    delete selectedLocationClone._temp;
    request.put({
      url: Origin + '/locations',
      json: {
        jwt: window.localStorage.getItem('jwt'),
        data: selectedLocationClone

      }
    }, function (err, res, body) {
      if (!body.success) {
        dispatch(finishErrorRequest());
      } else {
        let updatedLocation = _.get(body, 'dbResult.value');
        dispatch(updateLocationDataWithSelected(updatedLocation));
        dispatch(updateBlogDataWithSelected(updatedLocation));
        dispatch(finishUpdateBlog(updatedLocation));
      }
    });
  };
}

export function saveBlog(selectedLocation) {
  return dispatch => {
    let selectedLocationClone = Object.assign({}, selectedLocation);

    dispatch(sendPayload());

    delete selectedLocationClone._temp;
    request.post({
      url: Origin + '/locations',
      json: {
        jwt: window.localStorage.getItem('jwt'),
        data: selectedLocationClone
      }
    }, function (err, res, body) {
      if (!body.success) {
        dispatch(finishErrorRequest());
      } else {
        let dbSelected = _.get(body, 'dbResult.ops')[0];
        dispatch(updateLocationDataWithSelected(dbSelected));
        dispatch(updateBlogDataWithSelected(dbSelected));
        dispatch(finishSaveBlog(dbSelected));
      }
    });
  };
}

export function deleteBlog(selectedLocation) {
  return dispatch => {
    let blocks = _.get(selectedLocation, 'blog.blocks');
    let linksToDelete = [];

    dispatch(sendPayload());

    // collect image-file links
    if (blocks) {
      blocks.forEach((block) => {
        if (block.type === 'img') {
          linksToDelete.push(block.src);
        }
      });
    }

    deleteStorageFiles(linksToDelete).then(() => {
      request.delete({
        url: Origin + '/locations/blog/' + selectedLocation._id,
        json: {
          jwt: window.localStorage.getItem('jwt')
        }
      }, function (err, res, body) {
        if (!body.success) {
          dispatch(finishErrorRequest());
        } else {
          dispatch(finishDeleteBlog());
          dispatch(redirectToLocation('/'));
        }
      });
    });
  };
}

function updateLocationDataWithSelected(selectedLocation) {
  return {
    type: UPDATE_LOCATION_DATA_WITH_SELECTED,
    selectedLocation
  };
}

function updateBlogDataWithSelected(selectedLocation) {
  return {
    type: UPDATE_BLOG_DATA_WITH_SELECTED,
    selectedLocation
  };
}

function finishErrorRequest() {
  return {
    type: FINISH_ERROR_REQUEST
  };
}

export function updateBlogContent(blocks) {
  return {
    type: UPDATE_BLOG_CONTENT,
    blocks: blocks
  };
}

export function updateBlogTitle(title) {
  return {
    type: UPDATE_BLOG_TITLE,
    title: title
  };
}

export function addTextBlock() {
  return {
    type: ADD_TEXT_BLOCK
  };
}

export function removeBlock(index) {
  return {
    type: REMOVE_BLOCK,
    index
  };
}

export function toggleModal() {
  return {
    type: TOGGLE_MODAL
  };
}

export function saveModalData(data) {
  return {
    type: SAVE_MODAL_DATA,
    data
  };
}
