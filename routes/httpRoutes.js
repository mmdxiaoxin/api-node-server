const express = require('express');
const router = express.Router();
const localHttp = require('../static/localHttp.json');

// 接口删除
router.post('/delete', (req, res) => {
    // 实现接口删除的逻辑
    res.json({code: 200, message: '删除成功'});
});

// 项目接口更新
router.post('/config/update', (req, res) => {
    // 实现项目接口更新的逻辑
    res.json({code: 200, message: '更新成功'});
});

// 项目接口删除
router.post('/config/delete', (req, res) => {
    // 实现项目接口删除的逻辑
    res.json({code: 200, message: '删除成功'});
});

// 项目接口添加
router.post('/config/add', (req, res) => {
    // 实现项目接口添加的逻辑
    res.json({code: 200, message: '添加成功'});
});

// 获取接口配置项
router.post('/config', (req, res) => {
    // 实现获取接口配置项的逻辑
    let query = req.body;
    let configData = {};
    switch (query.apiId) {
        case '111':
            configData = localHttp.config.api1;
            break;
        case '112':
            configData = localHttp.config.api2;
            break;
        case '113':
            configData = localHttp.config.api3;
            break;
        case '114':
            configData = localHttp.config.api4;
            break;
        case '115':
            configData = localHttp.config.api5;
            break;
        default:
            res.json({code: 404, message: '未获取资源'});
            break;
    }
    res.json({code: 200, data: configData, message: '获取成功'});
});

// 接口项目列表
router.post('/collection/list', (req, res) => {
    // 实现接口项目列表的逻辑
    let query = req.body;
    res.json({
        code: 200, data: [{
            id: "1", name: query.projectName, isProject: true, children: [{
                id: "11", name: "目录1", isDirectory: true, children: [{
                    id: "111", name: "接口1", isApi: true
                }, {
                    id: "112", name: "接口2", isApi: true
                }, {
                    id: "113", name: "接口3", isApi: true
                }, {
                    id: "114", name: "接口4", isApi: true
                }, {
                    id: "115", name: "接口5", isApi: true
                }]
            }, {
                id: "12", name: "目录2", isDirectory: true
            }]
        }], message: '获取成功',
    })
});

// 接口修改
router.post('/change', (req, res) => {
    // 实现接口修改的逻辑
    res.json({code: 200, message: '修改成功'});
});

// 接口添加
router.post('/add', (req, res) => {
    // 实现接口添加的逻辑
    res.json({code: 200, message: '添加成功'});
});

module.exports = router;
