const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');
const cookieParser = require('cookie-parser');

// 引入mockjs
const Mock = require('mockjs');

// 创建服务器
const app = express();

// 引入路由模块
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');
const mockRoutes = require('./routes/mock');
const httpRoutes = require('./routes/http');
const indexRoutes = require('./routes/index');
const teamRoutes = require('./routes/team');

// 中间件用于解析请求体
/*
* 在路由挂载前加载，否则无法解析请求体
* */
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// 挂载路由模块
app.use('/api-control-hub', indexRoutes);
app.use('/api-control-hub/user', userRoutes);
app.use('/api-control-hub/project', projectRoutes);
app.use('/api-control-hub/mock', mockRoutes);
app.use('/api-control-hub/http', httpRoutes);
app.use('/api-control-hub/team', teamRoutes);

// 捕获404并转发到错误处理程序
app.use(function (req, res, next) {
    next(createError(404));
});

// 错误处理程序
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
