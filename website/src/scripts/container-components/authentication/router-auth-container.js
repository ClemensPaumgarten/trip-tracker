'use strict';

import {connect} from 'react-redux';

import RouterAuth from '../../components/authentication/router-auth';

import {
  redirectToLocation
} from '../../actions/app-env';

const mapStateToProps = (state) => {
  return {
    appEnv: state.appEnv,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redirectToLocation: (location, targetLocation) => {
      dispatch(redirectToLocation(location, targetLocation));
    }
  };
};

const RouterAuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterAuth);

export default RouterAuthContainer;
