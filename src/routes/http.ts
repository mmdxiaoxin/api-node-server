import express from 'express';
import httpController from '../controllers/httpController';

// 创建路由实例
const router = express.Router();

// 项目接口更新
router.post('/update', (req, res) => httpController.update(req, res));

// 项目接口删除
router.post('/delete', (req, res) => httpController.delete(req, res));

// 项目接口添加
router.post('/add', (req, res) => httpController.add(req, res));

// 获取接口配置项
router.post('/config', (req, res) => httpController.config(req, res));

// 接口项目列表
router.post('/list', (req, res) => httpController.list(req, res));

// 获取目录
router.post('/directory', (req, res) => httpController.directory(req, res));

export default router;
