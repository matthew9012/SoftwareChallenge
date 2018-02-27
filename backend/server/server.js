'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var boozeSearch = require('./lcboApiServices/search-service');
var app = module.exports = loopback();

app.use(function(req, res, next) {
  var accessToken = req.header('Authorization');
  if (accessToken) {
    app.models.AccessToken.find({where: {id: accessToken}}, function(err, users) {
      if (users.length > 0) {
        req.userIdFromSession = users[0].userId;
        console.log('id in middleware: ' + req.userIdFromSession);
      } else {
        console.log('Unauthenticated');
      }
      next();
    });
  } else {
    next();
  }
});

app.get('/searchBooze/:query', function(req, res, next) {
  boozeSearch(app, req, res, next);
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

