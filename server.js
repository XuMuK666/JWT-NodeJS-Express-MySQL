// get all the tools needed
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session  = require('express-session');
var morgan = require('morgan');
var app = express();
const config = require('./config/config');
var passport = require('passport');
var flash    = require('connect-flash');
var fs = require('fs');
var https = require('https');
const dotenv = require('dotenv');
dotenv.config();

// config passport and connect to DB
require('./config/passport')(passport);

// set up express
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// config passport
app.use(session({
	secret: config.sessionSecret,
	resave: true,
	saveUninitialized: false
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use(function(err, req, res, next) {
  if (err) {
    req.logout();
    next();
  } else {
    next();
  }
});

// Set Https certificate
var options = {
  key: fs.readFileSync(config.httpsPrivateKey),
  cert: fs.readFileSync(config.httpsCert),
  ca: fs.readFileSync(config.httpsCA),
};

https = https.createServer(options, app);
// Create server


  https.listen(config.port, function(){
    console.log('Server listening on port ' + config.port);
  });
  // routes
  require('./app/routes.js')(app, passport, config); // load our routes and pass in our app and fully configured passport







