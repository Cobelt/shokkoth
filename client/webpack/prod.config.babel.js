import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

import { HTML, JS, STYL } from './rules';
import { cleanPlugin, copyPlugin, htmlPlugin, HMRPlugin, CSSPlugin } from './plugins';

const HtmlWebPackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  mode: 'production',
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [JS,HTML,STYL],
  },
  plugins: [
      cleanPlugin('../dist'),
      copyPlugin('./src/app.js'),
      htmlPlugin,
      CSSPlugin('[name].css'),
      // HMRPlugin({ webpack }),
  ],
}
