const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const member = require('./routes/member');

const port = process.env.PORT||3000;

// app.set('views', path.join(__dirname, 'views'));// 设定views变量，意为视图存放的目录
app.set('view engine', 'ejs');// 设定view engine变量，意为网页模板引擎

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//设置静态文件目录

// 设置服务器跨域权限
app.use( (req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ,AccessToken');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1")
  next();
});

app.use('/',index);
app.use('/member',member);

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
  
});

const server = http.createServer(app);
server.listen(port,()=>{
	console.log('i am 3000')
});