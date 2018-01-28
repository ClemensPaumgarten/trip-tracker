'use strict';

import {
  default as uuid
} from 'uuid/v1';

import {
  removeBlock,
  saveBlog,
  updateBlog
} from './cms.js';

import _ from 'lodash';

import deleteStorageFiles from '../../utils/delete-storage-files';

import imageUploader from '../../utils/image-uploader';

export const ADD_IMAGE_DROPZONE = 'ADD_IMAGE_DROPZONE';
export const ADD_IMAGE_BLOCK = 'ADD_IMAGE_BLOCK';
export const SET_IMAGE_BLOCK_SRC = 'SET_IMAGE_BLOCK_SRC';
export const REMOVE_IMAGE_BLOCK = 'REMOVE_IMAGE_BLOCK';
export const REMOVE_UPLOAD_IMAGE = 'REMOVE_UPLOAD_IMAGE';

export const START_DELETE_IMAGE = 'START_DELETE_IMAGE';
export const FINISH_DELETE_IMAGE = 'FINISH_DELETE_IMAGE';

export const ENABLE_IMG_UPLOAD = 'ENABLE_IMG_UPLOAD';
export const DISABLE_IMG_UPLOAD = 'DISABLE_IMG_UPLOAD';

export const SELECT_IMAGE = 'SELECT_IMAGE';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL';


export function removeImageBlock(src, index, selected) {
  return dispatch => {
    dispatch(startDeleteImage(index, src));

    deleteStorageFiles([src]).then(() => {
      dispatch(removeBlock(index));
      dispatch(finishDeleteImage(index, src));

      // modify selected
      // TODO: selected must be fetched from store
      selected.blog.blocks.splice(index, 1);

      if (_.has(selected, '_id')) {
        dispatch(updateBlog(selected));
      } else {
        dispatch(saveBlog(selected));
      }

    }).catch(() => {
      // Do proper error hendling
    });
  };
}

export function startDeleteImage(index, src) {
  return {
    type: START_DELETE_IMAGE,
    index,
    src
  };
}

export function finishDeleteImage(index, src) {
  return {
    type: FINISH_DELETE_IMAGE,
    index,
    src
  };
}

export function addImageBlock(blockId) {
  return {
    type: ADD_IMAGE_BLOCK,
    blockId
  };
}

export function addImageDropzone() {
  return {
    type: ADD_IMAGE_DROPZONE
  };
}

export function setImageBlockSrc(src, blockId) {
  return {
    type: SET_IMAGE_BLOCK_SRC,
    src,
    blockId
  };
}

export function enableImageUpload() {
  return {
    type: ENABLE_IMG_UPLOAD
  };
}

export function disableImageUpload() {
  return {
    type: DISABLE_IMG_UPLOAD
  };
}

export function selectImage(file, storageName) {
  return {
    type: SELECT_IMAGE,
    file,
    storageName
  };
}

export function uploadImage(storageName) {
  return {
    type: UPLOAD_IMAGE,
    storageName
  };
}

export function uploadImageSuccess(storageName) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    storageName
  };
}

export function uploadImageFail(storageName) {
  return {
    type: UPLOAD_IMAGE_FAIL,
    storageName
  };
}

export function removeImageFromBlog() {
  return {
    type: REMOVE_UPLOAD_IMAGE
  };
}

export function uploadImageToFirebase(file) {
  return dispatch => {
    let ending = file.name.split('.').pop();
    let blockId = uuid();
    let storageName = `${uuid()}.${ending}`;

    dispatch(selectImage(file, storageName)); // adds image file (js-File)

    dispatch(uploadImage(storageName));
    dispatch(addImageBlock(blockId));

    // start image upload to firebase

    // 	when image upload successful:
    //	replace dropzone and use image block,
    //	statte: remove toUpload image and set blog update
    imageUploader(file, storageName).then((snapshot) => {
      var downloadURL = snapshot.metadata.downloadURLs[0];

      dispatch(uploadImageSuccess(storageName));
      dispatch(setImageBlockSrc(downloadURL, blockId));
    }).catch(() => {
      // remove block and reset selected location block
      dispatch(uploadImageFail(storageName));
      dispatch(removeImageFromBlog());
    });
  };
}
