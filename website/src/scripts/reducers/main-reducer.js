'use strict';

import {combineReducers} from 'redux';

// data
import locations from './data/locations';
import blogs from './data/blogs';

//appEnv
import appEnv from './appEnv';

//user
import user from './user';

//pages
import cms from './pages/cms';
import blog from './pages/blog';
import map from './pages/map';

let data = combineReducers({
  locations,
  blogs
});

let pages = combineReducers({
  cms,
  map,
  blog
});

export default combineReducers({
  appEnv,
  user,
  data,
  pages
});
