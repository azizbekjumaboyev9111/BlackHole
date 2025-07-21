var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const slowDown = require('express-slow-down');



var indexRouter = require('./routes/index');


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 100, // har IP dan 15 daqiqada 100 ta so‘rovdan oshmasin
  message: 'Too many requests from this IP, please try again later.'
});
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  delayAfter: 100, // 100 ta so‘rovdan keyin
  delayMs: 500 // har keyingi so‘rovga 500ms qo‘shadi
});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
// app.use(limiter);
// app.use(speedLimiter);


app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
