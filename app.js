const express = require('express');
const localMenu = require('./static/localMenu.json');
const localAuth = require('./static/localAuth.json');
const Mock = require('mockjs');
const app = express();

// 引入路由模块
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const mockRoutes = require('./routes/mockRoutes');
const httpRoutes = require('./routes/httpRoutes');

// 中间件用于解析请求体
/*
* 在路由挂载前加载，否则无法解析请求体
* */
app.use(express.json());

// 挂载路由模块
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/mock', mockRoutes);
app.use('/http', httpRoutes);


// 注册
app.post('/register', (req, res) => {
    // 实现用户注册的逻辑
    res.json({
        code: 200, msg: '退出登录成功'
    });
});

// 用户菜单
app.get('/menu/list', (req, res) => {
    // 实现获取用户菜单的逻辑
    let accessToken = req.headers['x-access-token'];
    let mockData = {};
    if (accessToken === 'bqddxxwqmfncffacvbpkuxvwvqrhln') {
        mockData = {
            code: 200, data: localMenu.admin, msg: '获取菜单成功'
        }
    } else if (accessToken === 'unufvdotdqxuzfbdygovfmsbftlvbn') {
        mockData = {
            code: 200, data: localMenu.user, msg: '获取菜单成功'
        }
    }
    res.json(mockData);
});

// 退出登录
app.post('/logout', (req, res) => {
    // 实现退出登录的逻辑
    res.json({
        code: 200, msg: '退出登录成功'
    });
});

// 用户登录
app.post('/login', (req, res) => {
    // 实现用户登录的逻辑
    let body = req.body;
    console.log(body.username, body.password);
    if (body.username === 'admin' && body.password === 'e10adc3949ba59abbe56e057f20f883e') {
        res.json({
            code: 200, data: {access_token: 'bqddxxwqmfncffacvbpkuxvwvqrhln'}, msg: '登录成功'
        });
    } else if (body.username === 'user' && body.password === 'e10adc3949ba59abbe56e057f20f883e') {
        res.json({
            code: 200, data: {access_token: 'unufvdotdqxuzfbdygovfmsbftlvbn'}, msg: '登录成功'
        });
    } else {
        res.json({
            code: 400, msg: '用户名或密码错误'
        });
    }
});

// 视频上传
app.post('/file/video', (req, res) => {
    // 实现视频上传的逻辑
    res.json({
        code: 200, data: {
            fileUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        }, msg: "成功"
    });
});

// 图片上传
app.post('/file/upload', (req, res) => {
    // 实现图片上传的逻辑
    res.json({
        code: 200,
        data: ["https://i.imgtg.com/2023/01/16/QRBHS.jpg", "https://i.imgtg.com/2023/01/16/QRqMK.jpg", "https://i.imgtg.com/2023/01/16/QR57a.jpg", "https://i.imgtg.com/2023/01/16/QRa0s.jpg"],
        msg: "成功"
    })
});

// 按钮权限
app.get('/auth/buttons', (req, res) => {
    // 实现按钮权限的逻辑
    let accessToken = req.headers['x-access-token'];
    let mockData = {};
    if (accessToken === 'bqddxxwqmfncffacvbpkuxvwvqrhln') {
        mockData = {
            code: 200, data: localAuth.buttons.admin, msg: '获取按钮权限成功'
        }
    } else if (accessToken === 'unufvdotdqxuzfbdygovfmsbftlvbn') {
        mockData = {
            code: 200, data: localAuth.buttons.user, msg: '获取按钮权限成功'
        }
    }
});

// 用户信息模拟
app.post('/account/list', (req, res) => {
    // 实现用户信息模拟的逻辑
});

// 连接测试服务
app.get('/', (req, res) => {
    res.json({
        code: 200, msg: '欢迎来到HTTP接口管理平台'
    });
});

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Mock server is running on port ${PORT}`);
});
