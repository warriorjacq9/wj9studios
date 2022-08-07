var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newProdRouter = require('./routes/new-prod');
var multer=require('multer')()
var debug = require('debug')('wj9studios-express:app');
require('dotenv').config();
var mongoose=require('mongoose');

var app = express();

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if(err) console.error(err);
    debug('Mongoose connected')
  }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('schemaVersion', 1);

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer.any())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(request, response, next) {

  if (!request.secure) {
     return response.redirect("https://" + request.headers.host + request.url);
  }

  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/new-prod', newProdRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;