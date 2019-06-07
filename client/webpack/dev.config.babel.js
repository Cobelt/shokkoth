import { HTML, JS, STYL } from './rules';
import { cleanPlugin, copyPlugin, htmlPlugin, HMRPlugin } from './plugins';

import webpack from 'webpack';

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // host: '0.0.0.0',
    port: 3051,
    public: 'shokkoth.tk',

    hot: true,

    contentBase: './src',

    historyApiFallback: true,
    disableHostCheck: true,
    allowedHosts: [
      'shokkoth.tk',
      'labdofus',
      'localhost',
      'www.dofus.com',
    ],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }

  },
  entry: {
    app: './src/app.js',
  },

  module: {
    rules: [HTML, JS, STYL],
  },
  plugins: [
    cleanPlugin('dist'),
    copyPlugin('./src/app.js'),
    htmlPlugin,
    HMRPlugin({ webpack }),
  ]
};
