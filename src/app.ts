import express from "express";
import logger from "morgan";
import createError from "http-errors";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express";

// 引入路由模块
import userRoutes from "./routes/user";
import projectRoutes from "./routes/project";
import mockRoutes from "./routes/mock";
import httpRoutes from "./routes/http";
import indexRoutes from "./routes/index";
import teamRoutes from "./routes/team";

// 创建服务器
const app = express();

// 中间件用于解析请求体
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 挂载路由模块
app.use("/api-control-hub", indexRoutes);
app.use("/api-control-hub/user", userRoutes);
app.use("/api-control-hub/project", projectRoutes);
app.use("/api-control-hub/mock", mockRoutes);
app.use("/api-control-hub/http", httpRoutes);
app.use("/api-control-hub/team", teamRoutes);

// 捕获404并转发到错误处理程序
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

// 错误处理程序
app.use(
    (
        err: { message: string; status?: number },
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        res.status(err.status || 500);
        res.render("error");
    }
);

export default app;
