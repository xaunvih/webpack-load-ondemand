const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/main.ts')
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].js',
        publicPath: '', // Let this space empty, We already customized it in chunk.config.js
        chunkFilename: '[name].[contenthash].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `public/index.html`)
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
