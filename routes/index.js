const express = require('express');
// 引入本地数据
const localMenu = require('../static/localMenu.json');
const localAuth = require('../static/localAuth.json');
const router = express.Router();


// 注册
router.post('/register', (req, res) => {
    // 实现用户注册的逻辑
    res.json({
        code: 200, msg: '退出登录成功'
    });
});

// 用户菜单
router.get('/menu/list', (req, res) => {
    // 实现获取用户菜单的逻辑
    let accessToken = req.headers['x-access-token'];
    let mockData = [];
    if (accessToken === 'bqddxxwqmfncffacvbpkuxvwvqrhln') {
        mockData = localMenu.admin;
    } else {
        mockData = localMenu.user;
    }
    res.json({
        code: 200, data: mockData, msg: '获取用户菜单成功'
    });
});

// 退出登录
router.post('/logout', (req, res) => {
    // 实现退出登录的逻辑
    res.json({
        code: 200, msg: '退出登录成功'
    });
});

// 用户登录
router.post('/login', (req, res) => {
    // 实现用户登录的逻辑
    let body = req.body;
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
router.post('/file/video', (req, res) => {
    // 实现视频上传的逻辑
    res.json({
        code: 200, data: {
            fileUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        }, msg: "成功"
    });
});

// 图片上传
router.post('/file/upload', (req, res) => {
    // 实现图片上传的逻辑
    res.json({
        code: 200,
        data: ["https://i.imgtg.com/2023/01/16/QRBHS.jpg", "https://i.imgtg.com/2023/01/16/QRqMK.jpg", "https://i.imgtg.com/2023/01/16/QR57a.jpg", "https://i.imgtg.com/2023/01/16/QRa0s.jpg"],
        msg: "成功"
    })
});

// 按钮权限
router.get('/auth/buttons', (req, res) => {
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
    res.json(mockData);
});

// 用户信息模拟
router.post('/account/list', (req, res) => {
    // 实现用户信息模拟的逻辑
    let query = req.body;
    let mockData = {};
    if (query.pageSize > 10) {
        mockData = Mock.Mock({
            "datalist|18": [{
                id: "@string(number,20)",
                username: query.username ? query.username : "@cname",
                gender: query.gender ? query.gender : "@integer(1, 2)",
                idCard: query.idCard ? query.idCard : "@id",
                email: query.email ? query.email : "@email",
                address: "@city(true)",
                createTime: "@date @time",
                status: query.status !== undefined ? query.status : "@integer(0, 1)",
                "avatar|1": ["https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110013.jpg", "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110015.jpg", "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110012.jpg", "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110032.jpg"]
            }], pageNum: Number(query.pageNum), pageSize: Number(query.pageSize), total: 18
        })
    } else {
        mockData = Mock.Mock({
            "datalist|10": [{
                id: "@string(number,20)",
                username: query.username ? query.username : "@cname",
                gender: query.gender ? query.gender : "@integer(1, 2)",
                idCard: query.idCard ? query.idCard : "@id",
                email: query.email ? query.email : "@email",
                address: "@city(true)",
                createTime: "@date @time",
                status: query.status !== undefined ? query.status : "@integer(0, 1)",
                "avatar|1": ["https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110013.jpg", "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110015.jpg", "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110012.jpg", "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110032.jpg"]
            }], pageNum: Number(query.pageNum), pageSize: Number(query.pageSize), total: 10
        })
    }
    res.json({
        code: 200, data: mockData, msg: '获取用户信息成功'
    });
});

// 连接测试服务
router.get('/', (req, res) => {
    res.json({
        code: 200, msg: '欢迎来到HTTP接口管理平台'
    });
});

module.exports = router;
