const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const AchsUser = require('./achs_user');
const ApiCategory = require('./api_category');

const ApiConfig = sequelize.define('api_config', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    api_name: DataTypes.STRING,
    creator_id: DataTypes.BIGINT,
    category_id: DataTypes.BIGINT,
    create_time: DataTypes.DATE
});

ApiConfig.belongsTo(AchsUser, { foreignKey: 'creator_id', as: 'creator' });
ApiConfig.belongsTo(ApiCategory, { foreignKey: 'category_id', as: 'category' });

module.exports = ApiConfig;
