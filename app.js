'use strict';

//Dependencies
var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

//Start off the express app
var app = express();

//Basic / Default Express configuration
//We are also making use of Passport here for sessions and authentication
app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('cmcSilk'));
  app.use(express.session());

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


/*Route Handlers*/
app.get('/', routes.index);

app.get('/partials/:name', routes.partials);

app.post('/postStaticJsonData', api.postStaticJsonData);
app.get('/getStaticJsonData', api.getStaticJsonData);


app.use(routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//Passport will make use of this function as a middleware to ensure that
//the user can access certain pages only when the user has been previously authenticated
function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send(401);
  }
}

function ensureAuthenticatedApi (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({
      error: 'You are not logged in.'
    });
  }
}
