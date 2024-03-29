import { HTML, JS, STYL } from './rules';
import { cleanPlugin, copyPlugin, htmlPlugin, HMRPlugin, CSSPlugin } from './plugins';

import webpack from 'webpack';

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // host: '0.0.0.0',
    port: 3051,
    public: 'localhost:3051',

    hot: true,

    contentBase: './src',

    historyApiFallback: true,
    disableHostCheck: true,
    allowedHosts: [
      'shokkoth.fr',
      'dev.shokkoth.fr',
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
    CSSPlugin('[name].css'),
  ]
};
