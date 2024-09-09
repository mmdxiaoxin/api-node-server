import bcrypt from 'bcrypt';
import models from '../models';
const { achs_user: User } = models;
import sequelize from '../config/database';

class AuthService {
    // 用户注册服务
    public async register(email: string, password: string) {
        const transaction = await sequelize.transaction();

        try {
            // 检查用户是否存在
            const existingUser = await User.findOne({ where: { email }, transaction });
            if (existingUser) {
                throw new Error('该邮箱已经被用户绑定!');
            }

            // 哈希密码
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // 创建用户
            const newUser = await User.create(
                {
                    name: 'Temp User',
                    email,
                    password_hash: hashedPassword,
                },
                { transaction }
            );

            // 使用用户 id 唯一化 name
            const uniqueName = `User_${newUser.id}`;

            // 更新用户 name 字段
            newUser.name = uniqueName;
            await newUser.save({ transaction });

            await transaction.commit();
            return newUser;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

export default new AuthService();
