var webpack = require('webpack');


module.exports = {
    entry: ['whatwg-fetch', "./lib/App.js"],
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};