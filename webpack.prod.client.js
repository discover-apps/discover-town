const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config, {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        app: ['./src/react/index.tsx']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './[name].bundle.js',
        publicPath: '/'
    },
    optimization: {
        minimize: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.scss'],
        modules: [path.resolve('./node_modules'), path.resolve('./src')]
    }
});
