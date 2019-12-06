var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var connection = require("./utils/connect");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');
var teacherRouter = require('./routes/teacher');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()); //得到post请求提交的数据 fromData
app.use(express.urlencoded({ extended: false })); //req.body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//自己添加的一个  app.use   使用中间件 
/*app.use(function(req, res, next) {
    console.log("Are you OK?");
    next();
})
*/
// 设置 session 中间件
var session = require("express-session");
app.use(session({
    name: "my-exp",
    saveUninitialized: true,
    secret: "test",
    cookie: { maxAge: 1000 * 60 * 60 }, // session 保存时长  1hour 
    resave: false
}));


app.use('/', indexRouter); //路由别名
app.use('/users', usersRouter);
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);

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