import bcrypt from 'bcrypt';
import models from '../models';
const { achs_user: User } = models;
import sequelize from '../config/database';

class AuthService {
    // 用户注册服务
    public async register(username: string, password: string) {
        const transaction = await sequelize.transaction();

        try {
            // 检查用户是否存在
            const existingUser = await User.findOne({ where: { username }, transaction });
            if (existingUser) {
                throw new Error('该用户名已经被用户绑定!');
            }

            // 创建用户
            const newUser = await User.create(
                {
                    username,
                    password,
                },
                { transaction }
            );

            await transaction.commit();
            return newUser;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    // 用户登录服务
    public async login(username: string, password: string) {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            throw new Error('用户不存在');
        }

        const validPassword = user.password === password;
        if (!validPassword) {
            throw new Error('密码错误');
        }

        return user;
    }
}

export default new AuthService();
