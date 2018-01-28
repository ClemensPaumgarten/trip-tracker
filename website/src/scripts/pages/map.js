'use strict';

import {
  default as React,
  Component
} from 'react';

import {connect} from 'react-redux';

import {classStringBuilder} from '../utils/classname-builder';

import {
  openSidebar,
  closeSidebar
} from '../actions/map/map';

import MapContainer from '../container-components/map/map-container';

// Styles
import headerStyles from '../../styles/headerbar.scss';

class TravelMap extends Component {
  constructor() {
    super();

    this.sidebarHandler = this.sidebarHandler.bind(this);
  }

  sidebarHandler() {
    let {
      sidebarIsOpen,
      openSidebar,
      closeSidebar
    } = this.props;

    if (!sidebarIsOpen) {
      openSidebar();
    } else {
      closeSidebar();
    }
  }

  componentWillMount() {
    const Menu = {
      children: [
        {
          type: 'reg',
          className: headerStyles.link,
          href: 'http://clemens.rocks',
          label: 'Clemens'
        },
        {
          type: 'action',
          className: classStringBuilder([headerStyles.link, headerStyles.linkRight]),
          onClick: this.sidebarHandler,
          icon: 'glyphicon glyphicon-menu-hamburger'
        },
        {
          type: 'react',
          className: classStringBuilder([headerStyles.link, headerStyles.linkRight]),
          to: '/manage',
          loginReq: true,
          icon: 'glyphicon glyphicon-pencil'
        }
      ]
    };

    this.props.setMenu(Menu);
  }

  componentWillUnmount() {
    this.props.closeSidebar();
  }

  render() {
    return <MapContainer {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => ({
  openSidebar: () => dispatch(openSidebar()),
  closeSidebar: () => dispatch(closeSidebar())
});

const mapStateToProps = state => ({
  sidebarIsOpen: state.pages.map.sidebarIsOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(TravelMap);

