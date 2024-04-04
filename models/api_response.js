const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ApiConfig = require('./api_config');

const ApiResponse = sequelize.define('api_response', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    api_id: DataTypes.BIGINT,
    api_status: DataTypes.INTEGER,
    api_time: DataTypes.STRING,
    api_size: DataTypes.STRING,
    api_content: DataTypes.TEXT
});

ApiResponse.belongsTo(ApiConfig, { foreignKey: 'api_id', as: 'apiConfig' });

module.exports = ApiResponse;
