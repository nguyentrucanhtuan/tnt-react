var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var postcss      = require('postcss');
var precss      = require('precss');
var qs = require('querystring');
var stripInlineComments = require('postcss-strip-inline-comments');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './main.js'
  ],
  output: {
    path:path.join(__dirname, ''),
    filename: 'index.js',
    path: path.join(__dirname, 'public'),
    //filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    root: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'node_modules')
    ],

    extensions: ['', '.js', '.jsx', '.json', '.css', '.html', '.styl'],

    unsafeCache: true,

  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
       {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          //include: path.join(__dirname, 'app'),
          query: {
             presets: ['es2015', 'react', 'stage-2']
          }
       },
       {
         test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
       },
       {
          test: /\.less$/,
          loader: "style-loader!css-loader!less-loader"
        },

        {
          test: /\.html$/,
          loader: 'html'
        },

        {
          test: /\.styl$/,
          loader: 'style!css!postcss!stylus'
        },
        {
          test: /\.json$/,
          loader: 'json'
        },

        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        },
            // Font Definitions
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        },

        {
            test: /localforage\/dist\/localforage.js/,
            loader: 'exports?localforage',
        },

    ],
    noParse: [
        /localforage\/dist\/localforage.js/
    ]
    //noParse: [new RegExp('node_modules/localforage/dist/localforage.js')]
  },
  alias: { 'localforage': 'localforage/dist/localforage.js'},
  postcss: function (webpack) {
      return [precss, autoprefixer];
  }
};
