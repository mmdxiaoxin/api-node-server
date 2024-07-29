import express, { Request, Response } from "express";

const router = express.Router();

router.get("/get", (req: Request, res: Response) => {
    res.send(JSON.stringify(req.query));
    res.send("GET method");
});

router.post("/post", (req: Request, res: Response) => {
    res.send(JSON.stringify(req.body));
    res.send("POST method");
});

router.put("/put", (req: Request, res: Response) => {
    res.send("PUT method");
});

router.delete("/delete", (req: Request, res: Response) => {
    res.send("DELETE method");
});

router.patch("/patch", (req: Request, res: Response) => {
    res.send("PATCH method");
});

router.head("/head", (req: Request, res: Response) => {
    res.send("HEAD method");
});

router.options("/options", (req: Request, res: Response) => {
    res.send("OPTIONS method");
});

router.trace("/trace", (req: Request, res: Response) => {
    res.send("TRACE method");
});

export default router;
