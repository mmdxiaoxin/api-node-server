const express = require('express');
const router = express.Router();
const Mock = require('mockjs');
// Mock 接口
router.post('/tree/list', (req, res) => {
    // 实现获取树形 Mock 接口列表的逻辑
});

router.get('/status', (req, res) => {
    // 实现 Mock 状态字典的逻辑
    res.json({
        code: 200, data: [{
            mockLabel: "启用", mockStatus: 1, tagType: "success"
        }, {
            mockLabel: "关闭", mockStatus: 0, tagType: "danger"
        }], msg: "成功"
    });
});

router.post('/list', (req, res) => {
    // 实现获取 Mock 接口列表的逻辑
    let query = req.body;
    let mockData = {};
    if (query.mockMethod || query.mockURL || query.mockDescription || query.mockStatus || query.status !== undefined) {
        mockData = Mock.mock({
            'list|10': [{
                id: "@string(number,18)",
                mockMethod: query.mockMethod ? query.mockMethod : "@pick(['GET', 'POST', 'DELETE', 'PUT'])",
                mockURL: query.mockURL ? query.mockURL : "/" + "@word(5, 18)",
                mockDescription: "@city(true)",
                mockCreateTime: "@date @time",
                mockStatus: query.status !== undefined ? query.status : "@integer(0, 1)",
                mockContent: "@word(5, 168)"
            }],
            pageNum: Number(query.pageNum),
            pageSize: Number(query.pageSize),
            total: 18
        });
        res.json({
            code: 200,
            data: mockData,
            msg: "成功"
        });
    } else {
        res.json({
            code: 200,
            data: {
                list: [],
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            msg: "成功"
        });
    }
    res.json({
        code: 200,
        data: mockData,
        msg: "成功"
    })
});

router.post('/delete', (req, res) => {
    // 实现删除 Mock 接口的逻辑
    res.json({
        code: 200,
        msg: "成功"
    });
});

router.post('/change', (req, res) => {
    // 实现切换接口状态的逻辑
    res.json({
        code: 200,
        msg: "成功"
    });
});

module.exports = router;
