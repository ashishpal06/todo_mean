var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');              // mongoose for mongodb
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var database = require('./config/database');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var port = 8888;         // set the port


var app = express();
	
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// connect db
mongoose.connect(database.url, function(err) {	// connect to mongoDB database on modulus.io
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});     
	

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
var Account = require('./models/Account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

var main = require('./routes/index');
var todo = require('./routes/todos');
var users = require('./routes/users');

var todoRouter = express.Router();
app.use('/todos', todoRouter);
app.use('/users', users);


app.use('/login', users);

app.get('/', main.index);
todoRouter.get('/', todo.all);
todoRouter.get('/:id', todo.viewOne);
todoRouter.post('/add', todo.add);
todoRouter.post('/remove/:id', todo.remove);
todoRouter.post('/edit/:id', todo.edit);


app.use(express.static(path.join(__dirname, 'public')));
// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port : " + port);
	
	
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
