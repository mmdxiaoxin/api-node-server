import express, { Request, Response } from "express";
import localProject from "../static/localProject.json";

const router = express.Router();

// 项目管理
router.post("/update", (req: Request, res: Response) => {
    // 实现项目修改的逻辑
    res.json({
        code: 200,
        msg: "项目修改成功",
    });
});

router.post("/star", (req: Request, res: Response) => {
    // 实现收藏项目的逻辑
    res.json({
        code: 200,
        msg: "收藏项目成功",
    });
});

router.post("/list", (req: Request, res: Response) => {
    // 实现获取项目列表的逻辑
    res.json({
        code: 200,
        data: localProject.projectList,
        msg: "获取项目列表成功",
    });
});

router.post("/delete", (req: Request, res: Response) => {
    // 实现删除项目的逻辑
    res.json({
        code: 200,
        msg: "项目删除成功",
    });
});

router.post("/add", (req: Request, res: Response) => {
    // 实现添加项目的逻辑
    res.json({
        code: 200,
        msg: "项目添加成功",
    });
});

router.post("/workbench", (req: Request, res: Response) => {
    const workbench = {
        projectId: "1",
        projectName: "农业监控系统",
        teamId: "1",
        teamName: "个人空间",
        currentRole: "团队拥有者",
        curNickName: "",
    };
    res.json({
        code: 200,
        data: workbench,
        msg: "获取项目详情成功",
    });
});

router.post("/detail", (req: Request, res: Response) => {
    const query = req.body as { projectId: string };
    const projectId = parseInt(query.projectId, 10);
    const project = localProject.projectList.find(
        (item) => item.id === projectId
    );

    if (!projectId || !project) {
        res.json({ code: 404, msg: "未找到相关结果" });
    } else {
        res.json({
            code: 200,
            data: project,
            msg: "获取项目详情成功",
        });
    }
});

export default router;
