import {
  default as React,
  Component
} from 'react';

import styles from '../../styles/loader.scss';

export default class Loader extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <img src={`/anims/loader_${this.props.type}.svg`}/>
      </div>
    );
  }
}

Loader.defaultProps = {
  className: styles.loaderContainer,
  type: 'regular'
};
