const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [`${__dirname}/website/src/scripts/app.js`],

  output: {
    path: `${__dirname}/website/assets/`,
    filename: 'javascript/bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[hash:base64:8]'
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /\.\/website\/assets/],
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env', 'react'],
          plugins: [
            ['transform-class-properties', {'spec': true}],
            ['transform-object-rest-spread', {'useBuiltIns': true}]
          ]
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'css/bundle.css'
    }),
  ],

  node: {
    console: false,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true,
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    har: 'empty',
    fs: 'empty'
  },

  cache: true,
};
