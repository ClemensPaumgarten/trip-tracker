'use strict';

import {connect} from 'react-redux';

import BlogContent from '../../components/cms/blog-content';

import {
  updateBlogContent,
  removeBlock,
} from '../../actions/cms/cms';

import {
  enableImageUpload,
  uploadImageToFirebase,
  removeImageBlock
} from '../../actions/cms/cms-image';

const mapStateToProps = state => ({
  imagesToDelete: state.pages.cms.imagesToDelete,
  selected: state.pages.cms.selected
});

const mapDispatchToProps = dispatch => ({
  onBlogUpdate: (blocks) => {
    dispatch(updateBlogContent(blocks));
  },
  removeBlock: (index, block) => {
    let {
      type,
      src
    } = block;

    if (type === 'img') {
      // delete image from firebase and remove block from content
      dispatch(removeImageBlock(src, index));
    } else {
      // enable image upload in case and remove block
      // no externa request
      if (type === 'img-dropzone') {
        dispatch(enableImageUpload());
      }

      dispatch(removeBlock(index));
    }
  },
  uploadImage: (file) => {
    dispatch(uploadImageToFirebase(file));
  }
});

const BlogContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogContent);

export default BlogContentContainer;
