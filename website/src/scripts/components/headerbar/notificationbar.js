'use strict';

import {
  default as React,
  Component
} from 'react';

import {classStringBuilder} from '../../utils/classname-builder';

import styles from '../../../styles/headerbar.scss';

export default class Notificationbar extends Component {
  constructor() {
    super();
  }

  render() {
    const notification = this.props.notification;
    var notificationType = `notification-${notification.type}`;
    var className = classStringBuilder([
      styles[notificationType],
      styles.notificationBar
    ]);

    return (
      <div className={className}>
        <span>{notification.message}</span>
      </div>
    );
  }
}
