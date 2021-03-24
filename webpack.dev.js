const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack.common');

module.exports = merge(webpackCommon, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        inline: true,
        hot: true,
        open: true,
        writeToDisk: true,
        watchOptions: {
            poll: true
        }
    }
});
