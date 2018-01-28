'use strict';

import {
  connect
} from 'react-redux';

import LoginForm from '../../components/authentication/login-form';

import {
  login
} from '../../actions/authentication';

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => {
      dispatch(login(email, password));
    }
  };
};

const LoginFormContainer = connect(null, mapDispatchToProps)(LoginForm);

export default LoginFormContainer;
