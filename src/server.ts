import http from "http";
import debugLib from "debug";
import app from "./app";
import { normalizePort, onError, onListening } from "./utils";

const debug = debugLib("api-hub:server");

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", (error) => onError(error, port));
server.on("listening", () => onListening(server, debug));
