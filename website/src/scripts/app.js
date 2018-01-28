'use strict';

import {
  default as React,
  Component
} from 'react';

import ReactDOM from 'react-dom';

import {
  applyMiddleware,
  createStore
} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';

import Cookies from 'cookies-js';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import travelBlog from './reducers/main-reducer';
import AppRouter from './router';

import '../styles/main.scss';

let env = Cookies.get('env');
if (env.slice(0, 2) === 'j:') {
  env = JSON.parse(env.slice(2));
}

const middlewares = [];

middlewares.push(ReduxThunk);

if (env.NODE_ENV === 'development') {
  let {logger} = require('redux-logger');

  middlewares.push(logger);
}

let store = createStore(travelBlog, applyMiddleware(
  ...middlewares
));

const App = () => (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);

(function initializeApp() {
  // Initialize firebase
  var config = {
    apiKey: 'AIzaSyAqMlhHS3TWgdQVG_RUYKjVP48s60IrxdY',
    authDomain: 'travel-diary-58ffc.firebaseapp.com',
    databaseURL: 'https://travel-diary-58ffc.firebaseio.com',
    projectId: 'travel-diary-58ffc',
    storageBucket: 'travel-diary-58ffc.appspot.com',
    messagingSenderId: '20413614379'
  };
  firebase.initializeApp(config);

  //Render react
  ReactDOM.render(<App/>, document.getElementById('react-mount'));
})();
