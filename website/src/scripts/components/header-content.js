'use strict';

import {
  default as React,
  Component
} from 'react';

import Proptypes from 'prop-types';

class HeaderContent extends Component {
  render() {
    var {
      styles,
      title,
      children
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </div>
    );
  }
}

HeaderContent.proptypes = {
  styles: Proptypes.shape({
    container: Proptypes.string,
    header: Proptypes.string,
    contentContainer: Proptypes.string,
  }),
  title: Proptypes.string
};

export default HeaderContent;
