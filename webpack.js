const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

const DEV = process.argv.includes('--development');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['env', 'react'],
          plugins: ['transform-object-rest-spread'],
        },
      },
    ],
  },

  plugins: [
    !DEV && new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ].filter(Boolean),

  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  mode: DEV ? 'development' : 'production',
};

module.exports.serve = {
  content: [__dirname],
  add: app => {
    const historyOptions = {
      index: '/',
    };

    app.use(convert(history(historyOptions)));
  },
};
