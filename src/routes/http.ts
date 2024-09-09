import express from 'express';
import httpController from '../controllers/httpController';

// 创建路由实例
const router = express.Router();

// 项目接口更新
router.post('/update', httpController.update);

// 项目接口删除
router.post('/delete', httpController.delete);

// 项目接口添加
router.post('/add', httpController.add);

// 获取接口配置项
router.post('/config', httpController.config);

// 接口项目列表
router.post('/list', httpController.list);

// 获取目录
router.post('/directory', httpController.directory);

export default router;
