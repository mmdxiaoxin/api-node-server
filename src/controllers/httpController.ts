import { Request, Response } from 'express';
import { Http, Result, ResultData } from '../interface';
import {
    addApiConfigDetails,
    buildConfigsTree,
    deleteApiConfig,
    getApiConfigDetails,
    getCategoryById,
    updateApiConfigDetails,
} from '../services/HttpService';

class HttpController {
    public async delete(req: Request, res: Response<Result>) {
        try {
            const data = req.body as { apiId: number };
            await deleteApiConfig(data.apiId);
            res.json({ code: 200, msg: '删除成功' });
        } catch (err) {
            console.error(err);
            res.json({ code: 500, msg: '删除失败' });
        }
    }

    public async update(req: Request, res: Response<Result>) {
        try {
            const data = req.body as Http.ReqUpdate;
            await updateApiConfigDetails(data);
            res.json({ code: 200, msg: '更新成功' });
        } catch (err) {
            console.error(err);
            res.json({ code: 500, msg: '更新失败' });
        }
    }

    public async add(req: Request, res: Response<Result>) {
        try {
            const data = req.body as Http.ReqAdd;
            await addApiConfigDetails(data);
            res.json({ code: 200, msg: '添加成功' });
        } catch (err) {
            console.error(err);
            res.json({ code: 500, msg: '添加失败' });
        }
    }

    public async config(req: Request, res: Response<Result | ResultData<Http.ResConfig | null>>) {
        try {
            const query = req.body as { apiId: string };
            const data = await getApiConfigDetails(parseInt(query.apiId));
            res.json({ code: 200, data, msg: '获取成功' });
        } catch (err) {
            console.error(err);
            res.json({ code: 500, msg: '获取失败' });
        }
    }

    public async list(req: Request, res: Response<Result | ResultData<Http.ResTree | null>>) {
        try {
            const query = req.body as { projectId: string };
            const projectId = parseInt(query.projectId);
            const tree = await buildConfigsTree(projectId);
            res.json({ code: 200, data: tree, msg: '获取成功' });
        } catch (err) {
            console.error(err);
            res.json({ code: 500, msg: '获取失败' });
        }
    }

    public async directory(req: Request, res: Response<ResultData<Http.ResDirectory | null> | Result>) {
        try {
            const query = req.body as { directoryId: string };
            const categoryId = query.directoryId;
            const data = await getCategoryById(parseInt(categoryId));
            res.json({ code: 200, data, msg: '获取成功' });
        } catch (err) {
            console.error(err);
            res.json({ code: 500, msg: '获取失败' });
        }
    }
}

export default new HttpController();
