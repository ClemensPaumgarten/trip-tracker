'use strict';

import {
  default as React,
  Component
} from 'react';

import Loader from '../loader';

import styles from '../../../styles/cms/img.scss';

export default class Image extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      imageFetched: false
    };
  }

  loadImage(htmlImg) {
    htmlImg.setAttribute('src', htmlImg.getAttribute('data-src'));
    htmlImg.onload = () => {
      htmlImg.removeAttribute('data-src');
      this.setState(() => {
        return {
          isLoading: false,
          imageFetched: true
        };
      });
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState(() => {
        return {
          isLoading: true,
          imageFetched: false
        };
      });
    }
  }

  renderLoader() {
    return (<Loader/>);
  }

  render() {
    const {
      src
    } = this.props;
    const Loader = this.state.isLoading ? this.renderLoader() : null;

    return (
      <div className={styles.imageContainer}>
        {Loader}
        <img
          className={styles.image}
          data-src={src}
          ref={(img) => {
            var imageFetched = this.state.imageFetched;

            if (!imageFetched && (src !== null) &&
              (img !== null)) {
              this.loadImage(img);
            }
          }}/>
      </div>
    );
  }
}
