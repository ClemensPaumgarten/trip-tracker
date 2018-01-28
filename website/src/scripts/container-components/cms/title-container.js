'use strict';

import {connect} from 'react-redux';

import Title from '../../components/cms/title';

import {
  updateBlogTitle
} from '../../actions/cms/cms';

const mapStateToProps = state => ({
  value: state.pages.cms.selected.blog.blogTitle
});

const mapDispatchToProps = dispatch => ({
  onBlur: title => {
    dispatch(updateBlogTitle(title));
  }
});

const TitleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Title);

export default TitleContainer;
