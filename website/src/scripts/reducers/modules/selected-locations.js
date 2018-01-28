'use strict';

// modules
import _ from 'lodash';

import {
  SELECT_BLOG
} from '../../actions/data/blogs';

import {
  UPDATE_BLOG_CONTENT,
  UPDATE_BLOG_TITLE,
  ADD_TEXT_BLOCK,
  REMOVE_BLOCK,
  REPLACE_SELECTED_LOCATION,
  SWITCH_LOCATION_FOR_SELECTED,
  FINISH_SAVE_BLOG,
  FINISH_UPDATE_BLOG,
  SAVE_MODAL_DATA
} from '../../actions/cms/cms';

import {
  ADD_IMAGE_DROPZONE,
  ADD_IMAGE_BLOCK,
  SET_IMAGE_BLOCK_SRC,
  REMOVE_UPLOAD_IMAGE
} from '../../actions/cms/cms-image';

export default function selectedLocation(state = {}, action) {
  let blog = {};
  let blocks;

  switch (action.type) {
    case FINISH_SAVE_BLOG:
    case FINISH_UPDATE_BLOG:
    case REPLACE_SELECTED_LOCATION: // Replaces entire selectedLocation object
      return Object.assign({}, action.location);
    case SWITCH_LOCATION_FOR_SELECTED: // Changes specific location in selectedLocation object
      return Object.assign({}, state, action.location);
    case SELECT_BLOG: // selects blog for selectedLocation object
      return Object.assign({}, state, {
        blog: action.blog
      });
    case UPDATE_BLOG_CONTENT: // updates blog for selectedLocation object
      blog = Object.assign({}, state.blog);
      blog.blocks = Array.from(action.blocks);

      return Object.assign({}, state, {
        blog: blog
      });
    case UPDATE_BLOG_TITLE:
      blog = Object.assign({}, state.blog);
      blog.blogTitle = action.title;

      return Object.assign({}, state, {
        blog: blog
      });
    case ADD_TEXT_BLOCK:
      blog = Object.assign({}, state.blog);
      blocks = Array.from(_.get(blog, 'blocks') || []);

      blocks.push({
        type: 'text'
      });

      _.set(blog, 'blocks', blocks);

      return Object.assign({}, state, {
        blog: blog
      });
    case ADD_IMAGE_DROPZONE:
      blog = Object.assign({}, state.blog);

      blocks = Array.from(_.get(blog, 'blocks') || []);
      blocks.push({
        type: 'img-dropzone'
      });

      _.set(blog, 'blocks', blocks);

      return Object.assign({}, state, {
        blog: blog
      });
    case ADD_IMAGE_BLOCK:
      blog = Object.assign({}, state.blog);
      blocks = Array.from(_.get(blog, 'blocks') || []);

      blocks.pop(); // remove dropzone
      blocks.push({
        type: 'img',
        src: null,
        blockId: action.blockId
      });

      _.set(blog, 'blocks', blocks);

      return Object.assign({}, state, {
        blog: blog
      });
    case REMOVE_UPLOAD_IMAGE: // remove last blog item
      blog = Object.assign({}, state.blog);
      blocks = Array.from(_.get(blog, 'blocks') || []);

      blocks.pop();
      _.set(blog, 'blocks', blocks);

      return Object.assign({}, state, {
        blog: blog
      });
    case SET_IMAGE_BLOCK_SRC:
      blog = Object.assign({}, state.blog);
      blocks = Array.from(_.get(blog, 'blocks') || []);

      if (blocks.length) {
        let imgBlockIdx = blocks.findIndex((block) => block.blockId === action.blockId);
        let imgBlock = Object.assign({}, blocks[imgBlockIdx]);

        if (imgBlock) {
          imgBlock.src = action.src;
          delete imgBlock.blockId;
          blocks[imgBlockIdx] = imgBlock;
        }

        _.set(blog, 'blocks', blocks);
      }

      return Object.assign({}, state, {
        blog: blog
      });
    case REMOVE_BLOCK:
      blog = Object.assign({}, state.blog);
      blocks = Array.from(_.get(blog, 'blocks') || []);

      blocks.splice(action.index, 1);

      _.set(blog, 'blocks', blocks);

      return Object.assign({}, state, {
        blog: blog
      });
    case SAVE_MODAL_DATA:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
