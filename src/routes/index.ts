import express, { Request, Response } from "express";
import localMenu from "../static/localMenu.json";
import localAuth from "../static/localAuth.json";
import Mock from "mockjs";
const router = express.Router();

// 注册
router.post("/register", (req: Request, res: Response) => {
    // 实现用户注册的逻辑
    res.json({ code: 200, msg: "注册成功" });
});

// 用户菜单
router.get("/menu/list", (req: Request, res: Response) => {
    const accessToken = req.headers["x-access-token"] as string;
    let mockData = [];
    if (accessToken === "bqddxxwqmfncffacvbpkuxvwvqrhln") {
        mockData = localMenu.admin;
    } else {
        mockData = localMenu.user;
    }
    res.json({ code: 200, data: mockData, msg: "获取用户菜单成功" });
});

// 退出登录
router.post("/logout", (req: Request, res: Response) => {
    // 实现退出登录的逻辑
    res.json({ code: 200, msg: "退出登录成功" });
});

// 用户登录
router.post("/login", (req: Request, res: Response) => {
    const body = req.body as { username: string; password: string };
    if (
        body.username === "admin" &&
        body.password === "e10adc3949ba59abbe56e057f20f883e"
    ) {
        res.json({
            code: 200,
            data: { access_token: "bqddxxwqmfncffacvbpkuxvwvqrhln" },
            msg: "登录成功",
        });
    } else if (
        body.username === "user" &&
        body.password === "e10adc3949ba59abbe56e057f20f883e"
    ) {
        res.json({
            code: 200,
            data: { access_token: "unufvdotdqxuzfbdygovfmsbftlvbn" },
            msg: "登录成功",
        });
    } else {
        res.json({ code: 400, msg: "用户名或密码错误" });
    }
});

// 视频上传
router.post("/file/video", (req: Request, res: Response) => {
    // 实现视频上传的逻辑
    res.json({
        code: 200,
        data: { fileUrl: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" },
        msg: "成功",
    });
});

// 图片上传
router.post("/file/upload", (req: Request, res: Response) => {
    // 实现图片上传的逻辑
    res.json({
        code: 200,
        data: [
            "https://i.imgtg.com/2023/01/16/QRBHS.jpg",
            "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
            "https://i.imgtg.com/2023/01/16/QR57a.jpg",
            "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
        ],
        msg: "成功",
    });
});

// 按钮权限
router.get("/auth/buttons", (req: Request, res: Response) => {
    const accessToken = req.headers["x-access-token"] as string;
    let mockData = {};
    if (accessToken === "bqddxxwqmfncffacvbpkuxvwvqrhln") {
        mockData = {
            code: 200,
            data: localAuth.buttons.admin,
            msg: "获取按钮权限成功",
        };
    } else if (accessToken === "unufvdotdqxuzfbdygovfmsbftlvbn") {
        mockData = {
            code: 200,
            data: localAuth.buttons.user,
            msg: "获取按钮权限成功",
        };
    }
    res.json(mockData);
});

// 用户信息模拟
router.post("/account/list", (req: Request, res: Response) => {
    const query = req.body as {
        pageSize: number;
        pageNum: number;
        username?: string;
        gender?: number;
        idCard?: string;
        email?: string;
        address?: string;
        status?: number;
    };
    let mockData;
    if (query.pageSize > 10) {
        mockData = Mock.mock({
            "datalist|18": [
                {
                    id: "@string(number,20)",
                    username: query.username || "@cname",
                    gender: query.gender || "@integer(1, 2)",
                    idCard: query.idCard || "@id",
                    email: query.email || "@email",
                    address: "@city(true)",
                    createTime: "@date @time",
                    status:
                        query.status !== undefined
                            ? query.status
                            : "@integer(0, 1)",
                    "avatar|1": [
                        "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110013.jpg",
                        "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110015.jpg",
                        "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110012.jpg",
                        "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110032.jpg",
                    ],
                },
            ],
            pageNum: query.pageNum,
            pageSize: query.pageSize,
            total: 18,
        });
    } else {
        mockData = Mock.mock({
            "datalist|10": [
                {
                    id: "@string(number,20)",
                    username: query.username || "@cname",
                    gender: query.gender || "@integer(1, 2)",
                    idCard: query.idCard || "@id",
                    email: query.email || "@email",
                    address: "@city(true)",
                    createTime: "@date @time",
                    status:
                        query.status !== undefined
                            ? query.status
                            : "@integer(0, 1)",
                    "avatar|1": [
                        "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110013.jpg",
                        "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110015.jpg",
                        "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110012.jpg",
                        "https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/img/20220728110032.jpg",
                    ],
                },
            ],
            pageNum: query.pageNum,
            pageSize: query.pageSize,
            total: 10,
        });
    }
    res.json({ code: 200, data: mockData, msg: "获取用户信息成功" });
});

// 连接测试服务
router.get("/", (req: Request, res: Response) => {
    res.json({ code: 200, msg: "欢迎来到HTTP接口管理平台" });
});

export default router;
