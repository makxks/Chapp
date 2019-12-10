var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var chatRoutes = require('./routes/chat');
var messageRoutes = require('./routes/message');
var todoRoutes = require('./routes/todo');
var contactRoutes = require('./routes/contact');
var notificationRoutes = require('./routes/notification');
var userRoutes = require('./routes/user');

var app = express();

//mongoose.connect('localhost:27017/TChat');
//mongoose.connect('mongodb://makks:M0nument@ds253398.mlab.com:53398/tchattest');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);
app.use('/todo', todoRoutes);
app.use('/contact', contactRoutes);
app.use('/notification', notificationRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
