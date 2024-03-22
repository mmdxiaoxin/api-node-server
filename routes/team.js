const express = require('express');
const router = express.Router();

// 团队添加
router.post('/add', (req, res) => {
    // 实现团队添加的逻辑
    res.json({
        code: 200, msg: '团队添加成功'
    });
});

// 团队删除
router.post('/delete', (req, res) => {
    // 实现团队删除的逻辑
    res.json({
        code: 200, msg: '团队删除成功'
    });
});

// 团队修改
router.post('/update', (req, res) => {
    // 实现团队修改的逻辑
    res.json({
        code: 200, msg: '团队修改成功'
    });
});

// 团队列表
router.post('/list', (req, res) => {
    // 实现获取团队列表的逻辑
    res.json({
        code: 200, data: [{
            id: 1, name: "前端团队", memberCount: 10, projectCount: 5
        }, {
            id: 2, name: "后端团队", memberCount: 8, projectCount: 3
        }, {
            id: 3, name: "测试团队", memberCount: 5, projectCount: 2
        }, {
            id: 4, name: "运维团队", memberCount: 3, projectCount: 1
        }], msg: '获取团队列表成功'
    });
});

module.exports = router;
