const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: [/node_modules/, /\.\/website\/public/],
        loader: 'eslint-loader'
      }
    ]
  },

  devtool: 'cheap-module-eval-source-map',
  watch: true,

});
