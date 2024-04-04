const express = require('express');
const router = express.Router();
const localHttp = require('../static/localHttp.json');
const localProject = require("../static/localProject.json");
const {buildTree, getCategoryById, getApiConfigDetails} = require("../services/HttpConfigService");
const ApiConfig = require('../models/api_config');
const ApiCategory = require('../models/api_category');

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
    getApiConfigDetails(query.apiId).then(data => {
        res.json({code: 200, data: data, message: '获取成功'});
    }).catch(err => {
        console.error(err);
        res.json({code: 500, message: '获取失败'});
    });
});

// 接口项目列表
router.post('/tree/list', (req, res) => {
    // 实现接口项目列表的逻辑
    const query = req.body;
    const projectId = parseInt(query.projectId);
    buildTree(projectId).then(tree => {
        res.json({code: 200, data: tree, message: '获取成功'});
    }).catch(err => {
        console.error(err);
        res.json({code: 500, message: '获取失败'});
    });
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
    const categoryId = query.directoryId;
    getCategoryById(categoryId).then(data => {
        res.json({code: 200, data, message: '获取成功'});
    }).catch(err => {
        console.error(err);
        res.json({code: 500, message: '获取失败'});
    });
});

module.exports = router;
