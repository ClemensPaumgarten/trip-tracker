'use strict';

import {
  default as React,
  Component
} from 'react';

import LoginFormContainer from '../container-components/authentication/login-form-container';

//import '../../styles/login.scss';

import loginStyles from '../../styles/login/login-page.scss';
import headerbarStyles from '../../styles/headerbar.scss';

// Header Menus
const Menu = {
  children: [
    {
      type: 'react',
      className: headerbarStyles.link,
      to: '/',
      label: 'back',
      icon: 'glyphicon glyphicon-menu-left'
    }
  ]
};

export default class Login extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.setMenu(Menu);
  }

  render() {
    return (
      <div className={loginStyles.loginContainer}>
        <LoginFormContainer/>
      </div>
    );
  }
}
