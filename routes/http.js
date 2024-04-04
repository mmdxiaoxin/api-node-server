const express = require('express');
const router = express.Router();
const localHttp = require('../static/localHttp.json');
const localProject = require("../static/localProject.json");

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
    configData = localHttp.config[`${query.apiId}`];
    if (configData) {
        res.json({code: 200, data: configData, message: '获取成功'});
    } else {
        res.json({code: 404, message: '未找到相关结果'});
    }
});

// 接口项目列表
router.post('/tree/list', (req, res) => {
    // 实现接口项目列表的逻辑
    const query = req.body;
    const projectId = parseInt(query.projectId);
    const projectName = localProject.projectList.find(item => item.id === projectId).name;
    res.json({
        code: 200, data: [{
            id: "1", name: projectName, type: "project", children: [{
                id: "11", name: "目录1", type: "dir", children: [{
                    id: "111", name: "接口1", type: "api"
                }, {
                    id: "112", name: "接口2", type: "api"
                }, {
                    id: "113", name: "接口3", type: "api"
                }, {
                    id: "114", name: "接口4", type: "api"
                }, {
                    id: "115", name: "接口5", type: "api"
                }]
            }, {
                id: "12", name: "目录2", type: "dir"
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

router.post('/directory', (req, res) => {
    const query = req.body;
    const directoryId = query.directoryId;
    if (directoryId === '11') {
        res.json({
            code: 200, data: {
                directoryName: '目录1',
                apiList: [{
                    id: "111", name: "接口1", method: "POST"
                }, {
                    id: "112", name: "接口2", method: "POST"
                }, {
                    id: "113", name: "接口3", method: "GET"
                }, {
                    id: "114", name: "接口4", method: "POST"
                }, {
                    id: "115", name: "接口5", method: "POST"
                }]
            }, message: '获取成功'
        });
    } else if (directoryId === '12') {
        res.json({
            code: 200, data: {
                directoryName: '目录2',
                apiList: []
            }, message: '获取成功'
        });
    } else {
        res.json({code: 404, message: '未找到相关结果'});
    }
});

module.exports = router;
