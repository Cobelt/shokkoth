import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

import { HTML, JS, MJS, STYL } from './rules';
import { cleanPlugin, copyPlugin, htmlPlugin, HMRPlugin, CSSPlugin } from './plugins';

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  mode: 'production',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  // externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [JS, MJS, HTML, STYL],
  },
  plugins: [
      cleanPlugin(path.join(__dirname, '../dist')),
      copyPlugin('./src/app.js'),
      htmlPlugin,
      CSSPlugin('[name].css'),
      // HMRPlugin({ webpack }),
  ],
}
