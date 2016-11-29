var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
const port = (process.env.PORT || 8080)
var app = express();
var compiler = webpack(config);
var WooCommerceAPI = require('woocommerce-api');

const indexPath = path.join(__dirname, '/index.html')
const publicPath = express.static(path.join(__dirname, '../public'))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(__dirname + '/public/'));

app.get('/categories', function (req, res) {
  var WooCommerce = new WooCommerceAPI({
    url: 'http://demo.nguyenlieuphache.com.vn',
    consumerKey: 'ck_a776b8b6158048f44a27f9019a42ee80922aa186',
    consumerSecret: 'cs_53dffca3950806f7c226fb1a823637596b45870e',
    wpAPI: true,
    version: 'wc/v1',
  });

  WooCommerce.get('products/categories', function(err, response, body) {
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(200).json(JSON.parse(body));
  });
  /*API.get('products/categories').then(function(result) {
    console.log(result.toJSON().body);
    //return JSON.parse(result.toJSON().body);
    res.status(200).json(result);
  });*/

})

app.get('*', function(req, res) {
  res.sendFile(indexPath);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at '+port);
});
