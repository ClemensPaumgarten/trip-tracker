'use strict';

import {
  default as React,
  Component
} from 'react';

import {connect} from 'react-redux';

import classnames from 'classnames';

import Sidebar from '../components/header-content';

import {classStringBuilder} from '../utils/classname-builder';

// styles
import styles from '../../styles/sidebar.scss';


class SiderbarContainer extends Component {
  constructor() {
    super();
  }

  onBlogClick(marker) {
    this.props.reactHistory.push('/blog/' + marker._id);
  }

  renderBlogList() {
    var classnames = classStringBuilder([styles.blogList, 'list-unstyled']);
    var listElems = this.props.markers.map((marker, i) => {
      return (
        <li key={i} className={styles.blogEntry}
            onClick={() => this.onBlogClick(marker)}>
          {marker.blog.blogTitle}
        </li>
      );
    });

    return (
      <ul className={classnames}>
        {listElems}
      </ul>
    );
  }

  renderNoBlogList() {
    return (
      <div className={styles.noBlogs}>No blogs yet</div>
    );
  }

  render() {
    var {
      markers
    } = this.props;

    var containerClassname = classnames({
      [styles.sidebarComponent]: true,
      [styles.sidebarOpen]: this.props.sidebarIsOpen,
      [styles.sidebarClosed]: !this.props.sidebarIsOpen
    });
    var sidebarStyles = {
      container: styles.blogListContainer,
      header: styles.blogListHeaderContainer
    };

    return (
      <div className={containerClassname}>
        <Sidebar title='All Blogs' styles={sidebarStyles}>
          {markers.length ? this.renderBlogList() : this.renderNoBlogList()}
        </Sidebar>
      </div>
    );
  }
}

SiderbarContainer.propTypes = {
  filters: React.PropTypes.array,
  markers: React.PropTypes.array
};

const mapStateToProps = state => ({
  sidebarIsOpen: state.pages.map.sidebarIsOpen
});


export default connect(mapStateToProps)(SiderbarContainer);
