var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var jwt = require("./routes/config/jwt");
var errorHandler = require("./routes/config/error-handler");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var storeRouter = require('./routes/stores')
var colorRouter = require('./routes/color')
var categoriesRouter = require('./routes/categories')
var frameRouter = require('./routes/frametypes')
var materialRouter = require('./routes/material')
var shapeRouter = require('./routes/shapes')
var priceRouter = require('./routes/price')
var adminRouter = require('./routes/admin')
var productRouter = require('./routes/product')
var finalproductRouter = require('./routes/finalproduct')
var mainpageRouter = require('./routes/mainpage')
var userDetailsRouter = require('./routes/userdetails')
var sendsmsRouter = require('./routes/smsapi');
var orderRouter = require('./routes/order')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(jwt())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stores',storeRouter)
app.use('/color',colorRouter);
app.use('/admin',adminRouter);
app.use('/categories',categoriesRouter);
app.use('/frame',frameRouter);
app.use('/material',materialRouter);
app.use('/shapes',shapeRouter);
app.use('/price',priceRouter);
app.use('/product',productRouter)
app.use('/finalproduct',finalproductRouter);
app.use('/mainpage',mainpageRouter)
app.use('/userdetails',userDetailsRouter)
app.use('/sendsms',sendsmsRouter)
app.use('/order',orderRouter)
// app.use(errorHandler)

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
