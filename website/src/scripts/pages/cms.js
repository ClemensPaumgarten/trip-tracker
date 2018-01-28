'use strict';

import {
  default as React,
  Component
} from 'react';

import CMSContainer from '../container-components/cms/cms-container';

// Styles
import headerStyles from '../../styles/headerbar.scss';

const Menu = {
  children: [
    {
      type: 'react',
      className: headerStyles.link,
      to: '/',
      label: 'back',
      icon: 'glyphicon glyphicon-menu-left'
    }
  ]
};

export default class CMS extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.setMenu(Menu);
  }

  render() {
    return <CMSContainer/>;
  }
}
