'use strict';

import {
  default as React,
  Component
} from 'react';

import Transition from 'react-transition-group/Transition';

// import { TweenLite } from 'gsap';

import styles from '../../styles/animation/page-transition.scss';

export default class PageTransition extends Component {
  constructor() {
    super();

    this.path;
    // this.onEnter	= this.onEnter.bind(this);
    this.onExit = this.onExit.bind(this);
    this.setPath = this.setPath.bind(this);
  }

  setPath(path = '') {
    this.path = path === '/' ? 'map' : path;
  }

  onEnter() {

  }

  onExit() {
    let {
      detail,
      pageName
    } = this.props;

    if ((this.path.indexOf(detail)) > -1 || (detail === 'all')) {
      console.log('exit to left', pageName, this.ref);
    } else {
      console.log('exit to right', pageName, this.ref);
    }
  }

  componentWillMount() {
    this.setPath(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    this.setPath(nextProps.location.pathname);
  }

  render() {
    let {
      transIn,
      children
    } = this.props;

    return (
      <Transition
        timeout={0}
        in={transIn}
        appear={true}
        onEnter={this.onEnter}
        onExit={this.onExit}
        children={() => {

          return (
            <div ref={(ref) => this.ref = ref} className={'bla ' + styles.transitionContainer}>
              {children}
            </div>
          );
        }}/>
    );
  }

}
