const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AchsUser = sequelize.define('achs_user', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    avatar: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    description: DataTypes.STRING,
    ctime: DataTypes.DATE
});

module.exports = AchsUser;
