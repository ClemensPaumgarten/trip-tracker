'use strict';

import {
  default as React,
  Component
} from 'react';

import BlogContainer from '../container-components/blog/blog-container';

// Styles
import styles from '../../styles/blog/blog-page.scss';

export default class Blog extends Component {
  constructor() {
    super();

    this.menu = {
      children: [
        {
          type: 'react',
          className: styles.desktopBacklink,
          to: '/',
          label: 'back',
          icon: 'glyphicon glyphicon-menu-left'
        },
        {
          type: 'react',
          className: styles.mobileBacklink,
          to: '/',
          icon: 'glyphicon glyphicon-menu-left'
        }
      ]
    };


    this.addMenuItem = this.addMenuItem.bind(this);
  }

  addMenuItem(menuItem) {
    this.menu.children.push(menuItem);

    this.props.setMenu(this.menu);
  }

  componentWillMount() {
    this.props.setMenu(this.menu);
  }

  render() {
    return (
      <BlogContainer
        locationId={this.props.match.params.locationId}
        addMenuItem={this.addMenuItem}/>
    );
  }
}

