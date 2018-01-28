'use strict';

import {
  connect
} from 'react-redux';

import {
  addImageDropzone,
  disableImageUpload
} from '../../actions/cms/cms-image';

import {
  addTextBlock
} from '../../actions/cms/cms';

import AddContentBlock from '../../components/cms/add-content-block';

const mapStateToProps = state => ({
  imgUploadEnabled: state.pages.cms.imageSelectionEnabled
});

const mapDispatchToProps = dispatch => ({
  addTextBlock: () => {
    dispatch(addTextBlock());
  },
  addImageDropzone: () => {
    dispatch(addImageDropzone());
  },
  disableImageUpload: () => {
    dispatch(disableImageUpload());
  }
});

const AddContentBlockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContentBlock);

export default AddContentBlockContainer;

