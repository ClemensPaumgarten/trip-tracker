'use strict';

import {connect} from 'react-redux';

import ControlBar from '../../components/cms/controlbar';

import {
  replaceSelectedLocation,
  switchLocationForSelected,
  saveBlog,
  updateBlog,
  deleteBlog,
  toggleModal
} from '../../actions/cms/cms';

const mapStateToProps = state => ({
  blogs: state.data.blogs.items,
  locations: state.data.locations.items,
  selectedLocation: state.pages.cms.selected,
  cms: state.pages.cms
});

const mapDispatchToProps = dispatch => ({
  onBlogSelect: location => {
    dispatch(replaceSelectedLocation(location));
  },
  onLocationSelect: location => {
    dispatch(switchLocationForSelected(location));
  },
  saveBlog: selectedLocation => {
    dispatch(saveBlog(selectedLocation));
  },
  updateBlog: selectedLocation => {
    dispatch(updateBlog(selectedLocation));
  },
  deleteBlog: selectedLocation => {
    dispatch(deleteBlog(selectedLocation));
  },
  toggleModal: () => {
    dispatch(toggleModal());
  }
});

const ControlBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlBar);

export default ControlBarContainer;
