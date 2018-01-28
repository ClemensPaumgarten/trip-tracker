'use strict';

import {
  default as React,
  Component
} from 'react';

import {Link} from 'react-router-dom';

import _ from 'lodash';

import styles from '../../styles/headerbar.scss';

import {classStringBuilder} from '../utils/classname-builder';

import Notificationbar from './headerbar/notificationbar';


/**
 * Default headerbar for blog
 */
export default class Headerbar extends Component {
  constructor() {
    super();

    this.state = {
      notificationTimerRunning: false
    };
  }

  chooseButton(type) {
    let ButtonType = null;

    switch (type) {
      case 'react':
        ButtonType = ReactLink;
        break;
      case 'reg':
        ButtonType = RegularLink;
        break;
      case 'action':
        ButtonType = ActionLink;
        break;
      default:
        ButtonType = null;
    }

    return ButtonType;
  }

  renderNavButtons(children) {
    var Button = null;

    var navButtons = children.map((child, i) => {
      let {loginReq} = child;
      let {user} = this.props;

      Button = this.chooseButton(child.type);

      if (!Button || (loginReq && !user.isLoggedIn)) {
        return null;
      } else {
        return (
          <Button key={i} {...child}/>
        );
      }
    });

    return navButtons;
  }

  renderNotificationbar(notification) {
    return (
      <Notificationbar notification={notification}/>
    );
  }

  componentDidUpdate(prevProps) {
    let notification = this.props.notification;

    if (!prevProps.notification && notification) {
      this.setState(() => ({
        notificationTimerRunning: true
      }));

      window.setTimeout(() => {
        this.setState(() => ({
          notificationTimerRunning: false
        }));
        this.props.clearNotification();
      }, notification.time);
    }
  }

  render() {
    let {
      menu,
      user,
      notification
    } = this.props;
    let menuItems = menu && menu.children ? Array.from(menu.children) : null;
    let parentProps = menu ? menu.parent : {};

    let parentClassname = _.get(parentProps, 'className', '');
    let containerClass = classStringBuilder(
      [styles.headerbarContainer, parentClassname]);

    if (menuItems && user.isLoggedIn) {
      menuItems.push({
        type: 'action',
        className: classStringBuilder([styles.link, styles.login]),
        onClick: this.props.logoutUser,
        icon: 'glyphicon glyphicon-user'
      });
    }

    const NavButtons = menuItems ?
      this.renderNavButtons(menuItems) : null;

    let Notificationbar = notification ? this.renderNotificationbar(notification) : null;

    return (
      <div className={containerClass}>
        <div className={styles.navigationBar}>
          {NavButtons}
        </div>
        {Notificationbar}
      </div>
    );
  }
}

class ReactLink extends Component {
  constructor() {
    super();
  }

  renderIcon(iconClass) {
    var classname = classStringBuilder([styles.linkIcon, iconClass]);

    return (
      <span className={classname}></span>
    );
  }

  render() {
    const props = this.props;
    const Icon = props.icon ? this.renderIcon(props.icon) : null;
    return (
      <Link id={props.id}
            to={props.to}
            className={props.className}>
        {Icon}
        {props.label}
      </Link>
    );
  }
}

class ActionLink extends Component {
  constructor() {
    super();
  }

  renderIcon(iconClass) {
    var classname = classStringBuilder([styles.linkIcon, iconClass]);

    return (
      <span className={classname}></span>
    );
  }

  render() {
    var {
      id,
      className,
      onClick,
      icon,
      label
    } = this.props;

    const Icon = icon ? this.renderIcon(icon) : null;

    return (
      <div id={id}
           className={className}
           onClick={onClick}>
        {Icon}
        {label}
      </div>
    );
  }


}

class RegularLink extends Component {
  constructor(props) {
    super(props);
  }

  renderIcon(iconClass) {
    var classname = classStringBuilder([styles.linkIcon, iconClass]);

    return (
      <span className={classname}></span>
    );
  }

  render() {
    var {
      id,
      className,
      target,
      href,
      icon,
      label
    } = this.props;

    const Icon = icon ? this.renderIcon(icon) : null;
    return (
      <a id={id}
         className={className}
         target={target}
         href={href}>
        {Icon}
        {label}
      </a>
    );
  }
}
