const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(config, {
    name: 'server',
    mode: 'production',
    devtool: 'source-map',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        server: ['./src/server/index.ts']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.scss'],
        modules: [path.resolve('./node_modules'), path.resolve('./src')]
    }
});
