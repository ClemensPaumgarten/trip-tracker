'use strict';

import {
  connect
} from 'react-redux';

import Headerbar from '../components/headerbar';

import {
  logout
} from '../actions/authentication';

import {
  setNotification
} from '../actions/app-env';

const mapStateToProps = (state, props) => {
  return {
    menu: props.menu,
    user: state.user,
    notification: state.appEnv.notification
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(logout());
    },
    clearNotification: () => {
      dispatch(setNotification());
    }
  };
};

const HeaderbarContainer = connect(mapStateToProps, mapDispatchToProps)(Headerbar);

export default HeaderbarContainer;
