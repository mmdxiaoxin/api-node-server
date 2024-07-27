import express, { Request, Response } from "express";
import Mock from "mockjs";

const router = express.Router();

// Mock 接口
router.post("/tree/list", (req: Request, res: Response) => {
    // 实现获取树形 Mock 接口列表的逻辑
    res.json({
        code: 200,
        data: [],
        msg: "成功",
    });
});

router.get("/status", (req: Request, res: Response) => {
    // 实现 Mock 状态字典的逻辑
    res.json({
        code: 200,
        data: [
            { mockLabel: "启用", mockStatus: 1, tagType: "success" },
            { mockLabel: "关闭", mockStatus: 0, tagType: "danger" },
        ],
        msg: "成功",
    });
});

router.post("/list", (req: Request, res: Response) => {
    // 实现获取 Mock 接口列表的逻辑
    const query = req.body as {
        mockMethod?: string;
        mockURL?: string;
        mockDescription?: string;
        mockStatus?: number;
        pageNum: number;
        pageSize: number;
        status?: number;
    };

    let mockData;
    const baseMockData = {
        id: "@string(number,18)",
        mockMethod:
            query.mockMethod || "@pick(['GET', 'POST', 'DELETE', 'PUT'])",
        mockURL: query.mockURL || "/" + "@word(5, 18)",
        mockDescription: "@city(true)",
        mockCreateTime: "@date @time",
        mockStatus:
            query.status !== undefined ? query.status : "@integer(0, 1)",
        mockContent: "@word(5, 168)",
    };

    switch (query.pageSize) {
        case 25:
            mockData = Mock.mock({
                "list|25": [baseMockData],
                pageNum: Number(query.pageNum),
                pageSize: Number(query.pageSize),
                total: 2000,
            });
            break;
        case 50:
            mockData = Mock.mock({
                "list|50": [baseMockData],
                pageNum: Number(query.pageNum),
                pageSize: Number(query.pageSize),
                total: 2000,
            });
            break;
        case 100:
            mockData = Mock.mock({
                "list|100": [baseMockData],
                pageNum: Number(query.pageNum),
                pageSize: Number(query.pageSize),
                total: 2000,
            });
            break;
        default:
            mockData = Mock.mock({
                "list|10": [baseMockData],
                pageNum: Number(query.pageNum),
                pageSize: Number(query.pageSize),
                total: 2000,
            });
            break;
    }

    res.json({
        code: 200,
        data: mockData,
        msg: "成功",
    });
});

router.post("/delete", (req: Request, res: Response) => {
    // 实现删除 Mock 接口的逻辑
    res.json({
        code: 200,
        msg: "成功",
    });
});

router.post("/change", (req: Request, res: Response) => {
    // 实现切换接口状态的逻辑
    res.json({
        code: 200,
        msg: "成功",
    });
});

export default router;
