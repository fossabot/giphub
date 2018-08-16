// for babel-plugin-webpack-loaders
const config = require('./prod.config');

module.exports = {
    mode: 'development',
    output: {
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: config.module.loaders.slice(1) // remove babel-loader
    }
};
