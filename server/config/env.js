'use strict';

const dotenv = require('dotenv');

dotenv.load();

const env = {
  'NODE_ENV': process.env.NODE_ENV
};

module.exports = env;
