import express, { Request, Response } from "express";
import Mock from "mockjs";

const router = express.Router();

// 用户管理
router.post("/tree/list", (req: Request, res: Response) => {
    const body = req.body;
    if (body.pageSize === 25) {
        res.json(
            Mock.mock({
                code: 200,
                "data|25": [
                    {
                        id: "@string(number,18)",
                        username: body.username || "@cname",
                        gender: body.gender || "@integer(1, 2)",
                        user: {
                            detail: {
                                age: body.age || "@integer(10,30)",
                            },
                        },
                        idCard: body.idCard || "@id",
                        email: body.email || "@email",
                        address: "@city(true)",
                        createTime: "@date @time",
                        status:
                            body.status !== undefined
                                ? body.status
                                : "@integer(0, 1)",
                        role: "@pick(['管理员', '成员', '游客', '团队拥有者'])",
                        "avatar|1": [
                            "https://i.imgtg.com/2023/01/16/QRBHS.jpg",
                            "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                            "https://i.imgtg.com/2023/01/16/QR57a.jpg",
                            "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
                        ],
                    },
                ],
                "children|3": [
                    {
                        id: "@string(number,18)",
                        username: body.username || "@cname",
                        gender: body.gender || "@integer(1, 2)",
                        user: {
                            detail: {
                                age: body.age || "@integer(10,30)",
                            },
                        },
                        idCard: body.idCard || "@id",
                        email: body.email || "@email",
                        address: "@city(true)",
                        createTime: "@date @time",
                        status:
                            body.status !== undefined
                                ? body.status
                                : "@integer(0, 1)",
                        "avatar|1": [
                            "https://i.imgtg.com/2023/01/16/QRBHS.jpg",
                            "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                            "https://i.imgtg.com/2023/01/16/QR57a.jpg",
                            "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
                        ],
                    },
                ],
                pageNum: Number(body.pageNum),
                pageSize: Number(body.pageSize),
                total: 2000,
            })
        );
    } else {
        res.json(
            Mock.mock({
                code: 200,
                "data|10": [
                    {
                        id: "@string(number,18)",
                        username: body.username || "@cname",
                        gender: body.gender || "@integer(1, 2)",
                        user: {
                            detail: {
                                age: body.age || "@integer(10,30)",
                            },
                        },
                        idCard: body.idCard || "@id",
                        email: body.email || "@email",
                        address: "@city(true)",
                        createTime: "@date @time",
                        status:
                            body.status !== undefined
                                ? body.status
                                : "@integer(0, 1)",
                        role: "@pick(['管理员', '成员', '游客', '团队拥有者'])",
                        "avatar|1": [
                            "https://i.imgtg.com/2023/01/16/QRBHS.jpg",
                            "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                            "https://i.imgtg.com/2023/01/16/QR57a.jpg",
                            "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
                        ],
                    },
                ],
                pageNum: Number(body.pageNum),
                pageSize: Number(body.pageSize),
                total: 2000,
            })
        );
    }
});

router.get("/status", (req: Request, res: Response) => {
    res.json({
        code: 200,
        data: [
            {
                userLabel: "启用",
                userStatus: 1,
                tagType: "success",
            },
            {
                userLabel: "禁用",
                userStatus: 0,
                tagType: "danger",
            },
        ],
        msg: "成功",
    });
});

router.get("/role", (req: Request, res: Response) => {
    res.json({
        code: 200,
        data: [
            {
                label: "全部",
                value: "",
            },
            {
                label: "超级管理员",
                value: "1",
            },
            {
                label: "公司CEO",
                value: "2",
            },
            {
                label: "部门主管",
                value: "3",
            },
            {
                label: "人事经理",
                value: "4",
            },
        ],
        msg: "成功",
    });
});

router.post("/reset_password", (req: Request, res: Response) => {
    res.json({
        code: 200,
        msg: "成功",
    });
});

router.post("/list", (req: Request, res: Response) => {
    const query = req.body;
    let mockData;
    if (
        query.username ||
        query.gender ||
        query.age ||
        query.idCard ||
        query.email ||
        query.status !== undefined
    ) {
        mockData = Mock.mock({
            "list|10": [
                {
                    id: "@string(number,18)",
                    username: query.username || "@cname",
                    gender: query.gender || "@integer(1, 2)",
                    user: {
                        detail: {
                            age: query.age || "@integer(10,30)",
                        },
                    },
                    idCard: query.idCard || "@id",
                    email: query.email || "@email",
                    address: "@city(true)",
                    createTime: "@date @time",
                    status:
                        query.status !== undefined
                            ? query.status
                            : "@integer(0, 1)",
                    role: "@pick(['管理员', '成员', '游客', '团队拥有者'])",
                    "avatar|1": [
                        "https://i.imgtg.com/2023/01/16/QRBHS.jpg",
                        "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                        "https://i.imgtg.com/2023/01/16/QR57a.jpg",
                        "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
                    ],
                },
            ],
            pageNum: Number(query.pageNum),
            pageSize: Number(query.pageSize),
            total: 18,
        });
    } else if (query.pageSize === 25) {
        mockData = Mock.mock({
            "list|25": [
                {
                    id: "@string(number,18)",
                    username: query.username || "@cname",
                    gender: query.gender || "@integer(1, 2)",
                    user: {
                        detail: {
                            age: query.age || "@integer(10,30)",
                        },
                    },
                    idCard: query.idCard || "@id",
                    email: query.email || "@email",
                    address: "@city(true)",
                    createTime: "@date @time",
                    status:
                        query.status !== undefined
                            ? query.status
                            : "@integer(0, 1)",
                    role: "@pick(['管理员', '成员', '游客', '团队拥有者'])",
                    "avatar|1": [
                        "https://i.imgtg.com/2023/01/16/QRBHS.jpg",
                        "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                        "https://i.imgtg.com/2023/01/16/QR57a.jpg",
                        "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
                    ],
                },
            ],
            pageNum: Number(query.pageNum),
            pageSize: Number(query.pageSize),
            total: 2000,
        });
    } else if (query.pageSize === 50) {
        mockData = Mock.mock({
            "list|50": [
                {
                    id: "@string(number,18)",
                    username: query.username || "@cname",
                    gender: query.gender || "@integer(1, 2)",
                    user: {
                        detail: {
                            age: query.age || "@integer(10,30)",
                        },
                    },
                    idCard: query.idCard || "@id",
                    email: query.email || "@email",
                    address: "@city(true)",
                    createTime: "@date @time",
                    status:
                        query.status !== undefined
                            ? query.status
                            : "@integer(0, 1)",
                    role: "@pick(['管理员', '成员', '游客', '团队拥有者'])",
                    "avatar|1": [
                        "https://i.imgtg.com/2023/01/16/QRBHS.jpg",
                        "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                        "https://i.imgtg.com/2023/01/16/QR57a.jpg",
                        "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
                    ],
                },
            ],
            pageNum: Number(query.pageNum),
            pageSize: Number(query.pageSize),
            total: 2000,
        });
    } else if (query.pageSize === 100) {
        mockData = Mock.mock({
            "list|100": [
                {
                    id: "@string(number,18)",
                    username: query.username || "@cname",
                    gender: query.gender || "@integer(1, 2)",
                    user: {
                        detail: {
                            age: query.age || "@integer(10,30)",
                        },
                    },
                    idCard: query.idCard || "@id",
                    email: query.email || "@email",
                    address: "@city(true)",
                    createTime: "@date @time",
                    status:
                        query.status !== undefined
                            ? query.status
                            : "@integer(0, 1)",
                    role: "@pick(['管理员', '成员', '游客', '团队拥有者'])",
                    "avatar|1": [
                        "https://i.imgtg.com/2023/01/16/QRBHS.jpg",
                        "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                        "https://i.imgtg.com/2023/01/16/QR57a.jpg",
                        "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
                    ],
                },
            ],
            pageNum: Number(query.pageNum),
            pageSize: Number(query.pageSize),
            total: 2000,
        });
    } else {
        mockData = Mock.mock({
            "list|18": [
                {
                    id: "@string(number,18)",
                    username: query.username || "@cname",
                    gender: query.gender || "@integer(1, 2)",
                    user: {
                        detail: {
                            age: query.age || "@integer(10,30)",
                        },
                    },
                    idCard: query.idCard || "@id",
                    email: query.email || "@email",
                    address: "@city(true)",
                    createTime: "@date @time",
                    status:
                        query.status !== undefined
                            ? query.status
                            : "@integer(0, 1)",
                    role: "@pick(['管理员', '成员', '游客', '团队拥有者'])",
                    "avatar|1": [
                        "https://i.imgtg.com/2023/01/16/QRBHS.jpg",
                        "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                        "https://i.imgtg.com/2023/01/16/QR57a.jpg",
                        "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
                    ],
                },
            ],
            pageNum: Number(query.pageNum),
            pageSize: Number(query.pageSize),
            total: 2000,
        });
    }
    res.json({
        code: 200,
        data: mockData,
        msg: "成功",
    });
});

router.post("/import", (req: Request, res: Response) => {
    res.json({
        code: 200,
        msg: "成功",
    });
});

router.get("/gender", (req: Request, res: Response) => {
    res.json({
        code: 200,
        data: [
            {
                label: "全部",
                value: "",
            },
            {
                label: "男",
                value: "1",
            },
            {
                label: "女",
                value: "2",
            },
        ],
        msg: "成功",
    });
});

router.post("/export", (req: Request, res: Response) => {
    res.json({
        code: 200,
        msg: "演示环境暂不能导出数据🙅",
    });
});

router.post("/edit", (req: Request, res: Response) => {
    res.json({
        code: 200,
        msg: "成功",
    });
});

router.get("/department", (req: Request, res: Response) => {
    res.json({
        code: 200,
        data: [
            {
                id: "1",
                name: "华东分部",
                children: [
                    {
                        id: "11",
                        name: "研发部",
                    },
                    {
                        id: "12",
                        name: "市场部",
                    },
                    {
                        id: "13",
                        name: "商务部",
                    },
                    {
                        id: "14",
                        name: "财务部",
                    },
                ],
            },
            {
                id: "2",
                name: "华南分部",
                children: [
                    {
                        id: "21",
                        name: "研发部",
                    },
                    {
                        id: "22",
                        name: "市场部",
                    },
                    {
                        id: "23",
                        name: "商务部",
                    },
                    {
                        id: "24",
                        name: "财务部",
                    },
                ],
            },
            {
                id: "3",
                name: "西北分部",
                children: [
                    {
                        id: "31",
                        name: "研发部",
                    },
                    {
                        id: "32",
                        name: "市场部",
                    },
                    {
                        id: "33",
                        name: "商务部",
                    },
                    {
                        id: "34",
                        name: "财务部",
                    },
                ],
            },
        ],
        msg: "成功",
    });
});

router.post("/delete", (req: Request, res: Response) => {
    res.json({
        code: 200,
        msg: "成功",
    });
});

router.post("/change", (req: Request, res: Response) => {
    res.json({
        code: 200,
        msg: "成功",
    });
});

router.post("/add", (req: Request, res: Response) => {
    res.json({
        code: 200,
        msg: "成功",
    });
});

router.post("/info", (req: Request, res: Response) => {
    const userInfo = {
        name: "小新AI",
        email: "782446723@qq.com",
        phone: "18888888888",
        avatar: "src/assets/images/avatar.png",
        description: "嗨嗨嗨，测试.",
    };
    res.json({
        code: 200,
        data: userInfo,
        msg: "成功",
    });
});

export default router;
