'use strict';

import {
  default as React,
  Component
} from 'react';

import {
  connect
} from 'react-redux';

import {
  withRouter
} from 'react-router';


import * as firebase from 'firebase/app';

import {
  loginSuccessful,
  logoutSuccessful,
  setFirebaseJWT
} from '../actions/authentication';

import {
  setCurrentLocation
} from '../actions/app-env';

class TravelAppContainer extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    // on page load check if user is logged in
    firebase.auth().onAuthStateChanged((user) => {
      let {
        userIsLoggedIn,
        userIsLoggedOut,
        setFirebaseJWT
      } = this.props;


      if (user) {
        // updates user data and sets authCheckDone in one call
        firebase.auth().currentUser.getToken(true).then(function (idToken) {
          setFirebaseJWT(idToken);
          userIsLoggedIn();
        }).catch(function (error) {
          console.error('Receiving token failed', error);
          userIsLoggedOut();
        });
      } else {
        // userisLoggedOut sets authCheckDone
        userIsLoggedOut();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    let {
      history,
      checkLocationState,
      currentLocation
    } = nextProps;

    if (checkLocationState &&
      (currentLocation !== history.location.pathname)) {
      history.push(currentLocation);
    }
  }

  componentDidMount() {
    let {
      history,
      setCurrentLocation,
    } = this.props;

    setCurrentLocation(history.location.pathname);
  }

  componentDidUpdate() {
    let {
      checkLocationState,
      currentLocation,
      history,
      setCurrentLocation
    } = this.props;

    if (checkLocationState ||
      (currentLocation !== history.location.pathname)) {
      setCurrentLocation(history.location.pathname);
    }
  }

  renderChildren() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  render() {
    let {
      authCheckDone
    } = this.props;

    return authCheckDone ? this.renderChildren() : null;
  }
}

const mapStateToProps = (state) => {
  return {
    authCheckDone: state.appEnv.authCheckDone,
    checkLocationState: state.appEnv.checkLocationState,
    currentLocation: state.appEnv.currentLocation,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userIsLoggedIn: () => {
      dispatch(loginSuccessful());
    },
    userIsLoggedOut: () => {
      dispatch(logoutSuccessful());
    },
    setCurrentLocation: location => {
      dispatch(setCurrentLocation(location));
    },
    setFirebaseJWT: jwt => {
      dispatch(setFirebaseJWT(jwt));
    }
  };
};

//pass router props - this way TravelAppContainer (as most upper wrapper container) can handle
// routing actions by itself
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TravelAppContainer)
);
