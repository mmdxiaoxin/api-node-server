const {Sequelize} = require('sequelize');

// 创建 Sequelize 实例
const sequelize = new Sequelize('achs', 'root', '122600', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false, // 不自动添加时间戳
        freezeTableName: true // 使用单数表名
    }
});

module.exports = sequelize;
