import { CSSLoaderPlugin } from './plugins';

export const HTML = {
    test: /\.html$/,
    use: [{
        loader: "html-loader",
        options: { minimize: true }
    }]
};

export const JS = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules\/(?!muejs)/,
    use: "babel-loader"
};

export const MJS = {
    test: /\.(mjs)$/,
    exclude: /node_modules\/(?!graphql)/,
    type: "javascript/auto"
};

export const STYL = {
    test: /\.styl$/,
    exclude: /node_modules\/(?!muejs)/,
    use: [
        process.env.NODE_ENV === 'development' ? 'style-loader' : CSSLoaderPlugin,
        'css-loader',
        'stylus-loader'
    ]
};
