var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');

var config = {
   entry: './main.js',

   output: {
      path:'./',
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8080
   },

   module: {
      //noParse: /node_modules\/localForage\/dist\/localforage.js/,
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
           test: /\.css$/,
           loaders: ['style', 'css?modules&localIdentName=[local]---[hash:base64:5]', 'postcss']
         },
         {
           test: /\.svg$/,
           loader: 'svg-inline'
         },
         {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
          },

      ]
   },

   postcss: function() {
     return [autoprefixer];
   }


}

module.exports = config;
