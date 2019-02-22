import { HTML, JS, STYL } from './rules';
import { cleanPlugin, copyPlugin, htmlPlugin, HMRPlugin } from './plugins';

import webpack from 'webpack';

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 80,
        public: 'localhost:3051',

        hot: true,

        contentBase: './dist',

        historyApiFallback: true,
        disableHostCheck: true,
        allowedHosts: [
            'labdofus',
            'localhost',
        ],
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