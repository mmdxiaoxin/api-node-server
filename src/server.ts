import app from "./app";
import debug from "debug";
import http from "http";
import { AddressInfo } from "net";

const debugLog = debug("api-hub:server");

/**
 * 从环境变量中获取端口号，并存储在 Express 中。
 */
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

/**
 * 创建 HTTP 服务器。
 */
const server = http.createServer(app);

/**
 * 在所有网络接口上监听提供的端口。
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * 将端口标准化为数字、字符串或 false。
 * @param val 要标准化的值
 * @returns 标准化后的端口号或 false
 */
function normalizePort(val: string): number | string | false {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // 命名管道
        return val;
    }

    if (port >= 0) {
        // 端口号
        return port;
    }

    return false;
}

/**
 * HTTP 服务器 "error" 事件的事件监听器。
 * @param error 错误对象
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // 使用友好的消息处理特定的监听错误
    switch (error.code) {
        case "EACCES":
            console.error(bind + " 需要更高的权限");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " 已经被使用");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * HTTP 服务器 "listening" 事件的事件监听器。
 */
function onListening(): void {
    const addr = server.address();
    const bind =
        typeof addr === "string"
            ? "pipe " + addr
            : "port " + (addr as AddressInfo).port;
    debugLog("Listening on " + bind);
}
