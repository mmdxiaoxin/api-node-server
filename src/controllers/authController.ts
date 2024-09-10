import { Request, Response } from 'express';
import { Login, Register, Result, ResultData } from '../interface';
import AuthService from '../services/AuthService';

class AuthController {
    public async register(req: Request<{}, Register.ReqRegisterForm>, res: Response<Result>) {
        const { username, password } = req.body;

        try {
            const user = await AuthService.register(username, password);
            res.json({ code: 200, msg: '注册成功' });
        } catch (error) {
            res.json({ code: 500, msg: '注册失败' });
        }
    }

    public async login(req: Request<{}, Login.ReqLoginForm>, res: Response<ResultData<Login.ResLogin> | Result>) {
        const { username, password } = req.body;

        try {
            await AuthService.login(username, password);
            res.json({
                code: 200,
                msg: '登录成功',
                data: { access_token: 'bqddxxwqmfncffacvbpkuxvwvqrhln' },
            });
        } catch (error) {
            res.json({ code: 500, msg: '登录失败' });
        }
    }
}

export default new AuthController();
