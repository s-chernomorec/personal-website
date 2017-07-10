var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'dis'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "src/sass"),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options : { minimize: false, sourceMap: false, url: false }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () { return [ require('autoprefixer') ]; }
              }
            },
            {
                loader: "sass-loader",
                options: {
                    outputStyle: "compressed"
                }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      },
      sourceMap: false
    })
  ]
};
