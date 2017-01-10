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

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


router.get('/categories', function (req, res) {
  var WooCommerce = new WooCommerceAPI({
    url: 'http://nguyenlieuphache.com',
    consumerKey: 'ck_a61fb311c17c8394a05fa1930eabc747d9d3e811',
    consumerSecret: 'cs_5220811eef0c9d0bf31ef459d87a758efa343fca',
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

app.use('/api', router);


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
