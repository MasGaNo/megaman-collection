var path = require('path');
var webpack = require('webpack');

module.exports = {
  /*
   * client.ts(x) represents the entry point to your web application. Webpack will
   * recursively go through every "require" statement in client.ts(x) and
   * efficiently build out the application's dependency tree.
   */
  entry: ['./client/main.ts'],
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: './public',
    filename: 'app.js'
  },

  /*
   * resolve lets Webpack now in advance what file extensions you plan on
   * "require"ing into the web application, and allows you to drop them
   * in your code.
   */
  resolve: {
    extensions: ['', '.js']
  }
};