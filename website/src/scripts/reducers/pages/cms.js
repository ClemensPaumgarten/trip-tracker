'use strict';

import {
  SEND_PAYLOAD,
  FINISH_SAVE_BLOG,
  FINISH_UPDATE_BLOG,
  FINISH_DELETE_BLOG,
  TOGGLE_MODAL,
  FINISH_ERROR_REQUEST
} from '../../actions/cms/cms';

import {
  ENABLE_IMG_UPLOAD,
  DISABLE_IMG_UPLOAD,
  SELECT_IMAGE,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  START_DELETE_IMAGE,
  FINISH_DELETE_IMAGE,
} from '../../actions/cms/cms-image';

import {
  default as selectedReducer
} from '../modules/selected-locations';

// Detailed state info in initial-state.js
const OrigState = {
  payloadSending: false,
  blogSaved: false,

  showModal: false,

  selected: null,

  imageSelectionEnabled: true,
  images: [],
  imagesToDelete: []
};

function getImage(imageFiles, storageName) {
  var image = imageFiles.find((file) => file.storageName === storageName);

  return Object.assign({}, image);
}

function cmsPageState(state = OrigState, action) {
  let idx, images, image, imagesToDelete;

  switch (action.type) {
    case ENABLE_IMG_UPLOAD:
      return Object.assign({}, state, {
        imageSelectionEnabled: true
      });
    case DISABLE_IMG_UPLOAD:
      return Object.assign({}, state, {
        imageSelectionEnabled: false
      });
    case SELECT_IMAGE:
      images = Array.from(state.images);
      images.push({
        isUploading: false,
        isDeleting: false,
        file: action.file,
        originalName: action.file.name,
        storageName: action.storageName
      });

      return Object.assign({}, state, {
        images: images
      });
    case UPLOAD_IMAGE:
      images = Array.from(state.images);
      image = getImage(images, action.storageName);

      image.isUploading = true;

      return Object.assign({}, state, {
        images: images
      });
    case UPLOAD_IMAGE_SUCCESS:
      images = Array.from(state.images);
      image = getImage(images, action.storageName);

      image.isUploading = false;

      return Object.assign({}, state, {
        imageSelectionEnabled: true,
        images: images
      });
    case UPLOAD_IMAGE_FAIL:
      images = Array.from(state.images);
      image = getImage(images, action.storageName);

      image.isUploading = false;
      image.uploadedFailed = true;

      return Object.assign({}, state, {
        imageSelectionEnabled: true,
        images: images
      });
    case START_DELETE_IMAGE:
      imagesToDelete = Array.from(state.imagesToDelete);
      imagesToDelete.push({
        index: action.index,
        src: action.src,
        deletedFirebase: false
      });

      return Object.assign({}, state, {
        imagesToDelete: imagesToDelete
      });
    case FINISH_DELETE_IMAGE:
      imagesToDelete = Array.from(state.imagesToDelete);
      idx = imagesToDelete.findIndex(
        image => (image.index === action.index && image.src === action.src));

      imagesToDelete.splice(idx, 1);

      return Object.assign({}, state, {
        imagesToDelete: imagesToDelete
      });
    case SEND_PAYLOAD:
      return Object.assign({}, state, {
        payloadSending: true
      });
    case FINISH_SAVE_BLOG:
      return Object.assign({}, state, {
        payloadSending: false,
        blogSaved: true
      });
    case FINISH_UPDATE_BLOG:
      return Object.assign({}, state, {
        payloadSending: false,
        blogSaved: true
      });
    case FINISH_ERROR_REQUEST:
      return Object.assign({}, state, {
        payloadSending: false,
      });
    case FINISH_DELETE_BLOG:
      return Object.assign({}, state, OrigState);
    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        showModal: !state.showModal
      });
    default:
      return state;
  }
}

export default function cms(state = OrigState, action) {
  state = Object.assign({}, state, cmsPageState(state, action));
  state.selected = Object.assign({}, selectedReducer(state.selected, action));

  return state;
}
