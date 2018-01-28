'use strict';
// React
import {
  default as React,
  Component
} from 'react';

import {connect} from 'react-redux';

// actions
import {
  fetchBlog
} from '../../actions/blog/blog';

// blog components
import TextBlock from '../../components/text-block';

import Loader from '../../components/loader';

// utils
import imageLoader from '../../utils/image-loader';

// styles
import styles from '../../../styles/blog/blog-page.scss';

class Blog extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    let {
      locationId,
      fetchBlog
    } = this.props;

    fetchBlog(locationId);
  }

  componentWillReceiveProps(nextProps) {
    let {
      pageState,
      addMenuItem
    } = nextProps;
    let blog = pageState.blog;

    if (blog && blog.photos) {
      addMenuItem({
        type: 'reg',
        className: styles.headerlink,
        href: blog.photos,
        label: 'all photos'
      });
    }
  }

  renderTextBlock(key, title = false, content) {
    let blockTitle = title ? (<h2>{title}</h2>) : null;

    return (
      <div key={key + '_' + Math.random()}>
        {blockTitle}
        <TextBlock content={content} className={styles.textBlock}/>
      </div>
    );
  }

  renderImage(key, imageUrl) {
    return (
      <div key={key} className={styles.imageContainer}>
        <img data-src={imageUrl} ref={(ref) => {
          (ref && imageLoader(ref));
        }}/>
      </div>
    );
  }

  renderBlocks(blocks) {
    let content = null;

    content = blocks.map((block, i) => {
      let component = null;

      switch (block.type) {
        case 'text':
          component = this.renderTextBlock(i, block.title, block.block);
          break;
        case 'img':
          component = this.renderImage(i, block.src);
          break;
        default:
          component = null;
      }
      return component;
    });

    return content;
  }

  renderBlog(blog) {
    return (
      <div className={styles.blogContainer}>
        <div className={styles.blogContainerInner}>
          <h1 className={styles.title}>{blog.blogTitle}</h1>
          {this.renderBlocks(blog.blocks)}
        </div>
      </div>
    );
  }

  renderLoader() {
    return <Loader className={styles.loaderContainer}/>;
  }

  render() {
    let {
      pageState
    } = this.props;
    let isFetching = pageState.isFetching;
    let blog = pageState.blog;

    const Component = isFetching ? this.renderLoader() : this.renderBlog(blog);

    return Component;
  }
}

const mapStateToProps = (state, props) => {
  return {
    pageState: state.pages.blog,
    locationId: props.locationId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBlog: locationId => {
      dispatch(fetchBlog(locationId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
