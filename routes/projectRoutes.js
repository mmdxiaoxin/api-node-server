const express = require('express');
const router = express.Router();

// 项目管理
router.post('/update', (req, res) => {
    // 实现项目修改的逻辑
    res.json({
        code: 200, msg: '项目修改成功'
    });
});

router.post('/star', (req, res) => {
    // 实现收藏项目的逻辑
    res.json({
        code: 200, msg: '收藏项目成功'
    });
});

router.post('/list', (req, res) => {
    // 实现获取项目列表的逻辑
    res.json({
        code: 200, data: [{
            id: 1, name: "农业监控系统", icon: "src/assets/icons/xianxingdaoyu.svg", isCollection: true
        }, {
            id: 2, name: "电商平台开发", icon: "src/assets/icons/xianxingdiqiu.svg", isCollection: false
        }, {
            id: 3, name: "社交媒体应用", icon: "src/assets/icons/xianxingditu.svg", isCollection: false
        }, {
            id: 4, name: "在线教育平台", icon: "src/assets/icons/xianxingfanchuan.svg", isCollection: true
        }, {
            id: 5, name: "智能家居控制系统", icon: "src/assets/icons/xianxingfeiji.svg", isCollection: false
        }, {
            id: 6, name: "健康管理应用", icon: "src/assets/icons/xianxinglvhangriji.svg", isCollection: true
        }, {
            id: 7, name: "旅游信息平台", icon: "src/assets/icons/xianxingtianqiyubao.svg", isCollection: false
        }, {
            id: 8, name: "智能物流系统", icon: "src/assets/icons/xianxingxiangjipaizhao.svg", isCollection: true
        }, {
            id: 9, name: "人才招聘平台", icon: "src/assets/icons/xianxingxiarilengyin.svg", isCollection: false
        }, {
            id: 10, name: "金融数据分析工具", icon: "src/assets/icons/xianxingyoulun.svg", isCollection: true
        }, {
            id: 11, name: "在线购物商城", icon: "src/assets/icons/xianxingdaoyu.svg", isCollection: false
        }, {
            id: 12, name: "智能车辆管理系统", icon: "src/assets/icons/xianxingdaoyu.svg", isCollection: false
        }], msg: '获取项目列表成功'
    });
});

router.post('/delete', (req, res) => {
    // 实现删除项目的逻辑
    res.json({
        code: 200, msg: '项目删除成功'
    });
});

router.post('/add', (req, res) => {
    // 实现添加项目的逻辑
    res.json({
        code: 200, msg: '项目添加成功'
    });
});

module.exports = router;
