import { Request, Response } from 'express';
import { Login, Register, Result, ResultData } from '../interface';
import AuthService from '../services/AuthService';

class AuthController {
    public async register(req: Request, res: Response<Result>) {
        const { username, password } = req.body as Register.ReqRegisterForm;

        try {
            const user = await AuthService.register(username, password);
            res.json({ code: 200, msg: '注册成功' });
        } catch (error) {
            res.json({ code: 500, msg: '注册失败' });
        }
    }

    public async login(req: Request, res: Response<ResultData<Login.ResLogin> | Result>) {
        const { username, password } = req.body as Login.ReqLoginForm;

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
