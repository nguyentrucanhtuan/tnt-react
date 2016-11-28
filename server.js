var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
const port = (process.env.PORT || 8080)
var app = express();
var compiler = webpack(config);

const indexPath = path.join(__dirname, '/index.html')
const publicPath = express.static(path.join(__dirname, '../public'))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(__dirname + '/public/'));

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
