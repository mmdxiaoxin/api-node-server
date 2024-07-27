import express, { Request, Response } from "express";
import {
    buildConfigsTree,
    getCategoryById,
    getApiConfigDetails,
} from "../services/httpConfig";
import { Http, Result, ResultData } from "../interface";

// 创建路由实例
const router = express.Router();

// 接口删除
router.post("/delete", (req: Request, res: Response<Result>) => {
    // 实现接口删除的逻辑
    res.json({ code: 200, msg: "删除成功" });
});

// 项目接口更新
router.post("/config/update", (req: Request, res: Response<Result>) => {
    // 实现项目接口更新的逻辑
    res.json({ code: 200, msg: "更新成功" });
});

// 项目接口删除
router.post("/config/delete", (req: Request, res: Response<Result>) => {
    // 实现项目接口删除的逻辑
    res.json({ code: 200, msg: "删除成功" });
});

// 项目接口添加
router.post("/config/add", (req: Request, res: Response<Result>) => {
    // 实现项目接口添加的逻辑
    res.json({ code: 200, msg: "添加成功" });
});

// 获取接口配置项
router.post(
    "/config",
    async (
        req: Request,
        res: Response<Result | ResultData<Http.ResConfig | null>>
    ) => {
        try {
            const query = req.body as { apiId: string };
            const data = await getApiConfigDetails(parseInt(query.apiId));
            res.json({ code: 200, data, msg: "获取成功" });
        } catch (err) {
            console.error(err);
            res.json({ code: 500, msg: "获取失败" });
        }
    }
);

// 接口项目列表
router.post(
    "/tree/list",
    async (
        req: Request,
        res: Response<Result | ResultData<Http.ResTree | null>>
    ) => {
        try {
            const query = req.body as { projectId: string };
            const projectId = parseInt(query.projectId);
            const tree = await buildConfigsTree(projectId);
            res.json({ code: 200, data: tree, msg: "获取成功" });
        } catch (err) {
            console.error(err);
            res.json({ code: 500, msg: "获取失败" });
        }
    }
);

// 接口修改
router.post("/change", (req: Request, res: Response<Result>) => {
    // 实现接口修改的逻辑
    res.json({ code: 200, msg: "修改成功" });
});

// 接口添加
router.post("/add", (req: Request, res: Response<Result>) => {
    // 实现接口添加的逻辑
    res.json({ code: 200, msg: "添加成功" });
});

// 获取目录
router.post(
    "/directory",
    async (
        req: Request,
        res: Response<ResultData<Http.ResDirectory | null> | Result>
    ) => {
        try {
            const query = req.body as { directoryId: string };
            const categoryId = query.directoryId;
            const data = await getCategoryById(parseInt(categoryId));
            res.json({ code: 200, data, msg: "获取成功" });
        } catch (err) {
            console.error(err);
            res.json({ code: 500, msg: "获取失败" });
        }
    }
);

export default router;
