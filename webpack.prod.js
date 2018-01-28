const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin({
      parallel: true,
      exclude: /node_modules/
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {discardComments: {removeAll: true}},
    })
  ]
});

