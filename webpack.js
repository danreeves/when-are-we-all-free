const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEV = process.argv.includes('--development');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['env', 'react']
        }
      }
    ]
  },

  plugins: [
    !DEV && new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ].filter(Boolean),

  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  mode: DEV ? 'development' : 'production'
};
