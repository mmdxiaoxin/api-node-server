const { Sequelize } = require('sequelize');

// 创建 Sequelize 实例
const sequelize = new Sequelize('achs', 'root', '122600', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
