import {
  default as React,
  Component
} from 'react';

import {connect} from 'react-redux';

import _ from 'lodash';

import ControlBarContainer from './controlbar-container';
import TitleContainer from './title-container';
import BlogContentContainer from './blog-content-container';
import AddContentBlockContainer from './add-content-block-container';
import ModalContainer from './modal-container';

import Loader from '../../components/loader';

import {
  fetchBlogs
} from '../../actions/data/blogs.js';

// Styles
import cmsStyles from '../../../styles/cms/cms-page.scss';

class CMSContainer extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.dispatch(fetchBlogs());
  }

  renderLoader() {
    return <Loader/>;
  }


  renderTitleContainer() {
    return <TitleContainer/>;
  }

  renderBlogContent() {
    return <BlogContentContainer/>;
  }

  renderAddContentBlockContainer() {
    return <AddContentBlockContainer/>;
  }

  renderBlocksContainer() {
    let {
      selectedLocation,
    } = this.props;

    // Blog Title
    let blogTitle = _.get(selectedLocation, 'blog.blogTitle');
    let InputTitle = typeof blogTitle !== 'undefined' ?
      this.renderTitleContainer() : null;

    // Blog Content
    let blogBlocks = _.get(selectedLocation, 'blog.blocks');
    let BlogContent = (typeof blogBlocks !== 'undefined' && blogBlocks.length) ?
      this.renderBlogContent() : null;

    let AddContentBlockContainer =
      ((InputTitle !== null) || (BlogContent !== null)) ?
        this.renderAddContentBlockContainer() : null;
    return (
      <div className={cmsStyles.cmsContainerInner}>
        {InputTitle}
        {BlogContent}
        {AddContentBlockContainer}
      </div>
    );
  }

  render() {
    let {
      blogCMS,
      selectedLocation
    } = this.props;

    let Loader = blogCMS.payloadSending ? this.renderLoader() : null;

    return (
      <div className={cmsStyles.cmsContainer}>
        {Loader}
        <ControlBarContainer/>
        <ModalContainer/>
        {_.has(selectedLocation, 'location') && this.renderBlocksContainer()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedLocation: state.pages.cms.selected,
  blogCMS: state.pages.cms
});

export default connect(mapStateToProps)(CMSContainer);
