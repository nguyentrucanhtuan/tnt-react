var path = require('path');
var express = require('express');
const querystring = require('querystring');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
const port = (process.env.PORT || 8080)
var app = express();
var compiler = webpack(config);
var WooCommerceAPI = require('woocommerce-api');
//var localForage = require('localforage');
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

var WooCommerce = new WooCommerceAPI({
  url: 'http://nguyenlieuphache.com',
  consumerKey: 'ck_d42aca2c0c11fc0f81dd6342c759a1958056cc42',
  consumerSecret: 'cs_c4dd7d8cd71df6ad9e2d9add9b7e216af0cb2e55',
  wpAPI: true,
  version: 'wc/v1',
});


router.get('/categories', function (req, res) {

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

router.route('/products/:product_id').get(function(req, res) {
  WooCommerce.get('products/' + req.params.product_id, function(err, response, body) {
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200).json(JSON.parse(body));
  });
});


router.route('/addWistList/:product_id').get(function(req, res){
  WooCommerce.get('products/' + req.params.product_id, function(err, response, body) {
      res.header("Content-Type", "application/json; charset=utf-8");
      var product = JSON.parse(body);
      res.status(200).json(JSON.parse(body));

  });
})
router.route('/products').get(function(req, res) {
  console.log(querystring)
  console.log(req.query)
  var querystr = querystring.stringify(req.query)
  console.log(querystr)
  WooCommerce.get('products?'+querystr, function(err, response, body) {
      res.header("Content-Type", "application/json; charset=utf-8");
      res.status(200).json(JSON.parse(body));
  });
});



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
