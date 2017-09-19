var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routerFs = require('./libs/fs');
const fs = require('fs')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'app/webCreate/build'));
// app.set('views', path.join(__dirname, 'app/webShow/build'));
app.set('views', path.join(__dirname, 'app/public/build'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//注册路由
const dirTree = routerFs.readDirDeepSync(path.resolve(__dirname, 'routes'));

routerFs.genRouteByDirTree(dirTree).forEach((route) => {
  console.log(route)
  app.use(route.route, require(route.path));
});
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, 'app/public/build')))
// app.use(express.static(path.resolve(__dirname, 'app/webShow/build')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('/createPage', function(req, res) {
    // const html = fs.readFileSync(path.resolve(__dirname, 'app/webCreate/build/index.html'), 'utf-8')
    // res.send(html)
    res.render('create.html')
})
app.get('/show', function(req, res) {
  // const html = fs.readFileSync(path.resolve(__dirname, 'app/webShow/build/index.html'), 'utf-8')
  // res.send(html)
  res.render('show.html', {
    title: '怪猫游戏'
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  app.set('views', path.join(__dirname, './views'));
  res.render('error');
});

module.exports = app;
