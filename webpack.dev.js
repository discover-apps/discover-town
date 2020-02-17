const path = require('path');
const webpack = require("webpack");
const merge = require('webpack-merge');
const dotenv = require('dotenv-webpack');
const config = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        app: [
            "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
            "./src/react/index.tsx"
        ]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new dotenv({
            path: 'src/util/.env'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.scss'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        },
        modules: [path.resolve('./node_modules'), path.resolve('./src')]
    }
});
