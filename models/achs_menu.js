const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AchsMenu = sequelize.define('achs_menu', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    path: DataTypes.STRING,
    name: DataTypes.STRING,
    component: DataTypes.STRING,
    icon: DataTypes.STRING,
    is_link: DataTypes.TINYINT,
    is_hide: DataTypes.TINYINT,
    is_full: DataTypes.TINYINT,
    is_affix: DataTypes.TINYINT,
    is_keep_alive: DataTypes.TINYINT,
    parent_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
});

module.exports = AchsMenu;
