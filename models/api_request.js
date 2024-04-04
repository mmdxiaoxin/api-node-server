const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ApiConfig = require('./api_config');

const ApiRequest = sequelize.define('api_request', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    api_id: DataTypes.BIGINT,
    method: DataTypes.STRING,
    api_url: DataTypes.STRING,
    base_url: DataTypes.STRING,
    api_auth: DataTypes.STRING,
    body_json: DataTypes.JSON,
    body_xml: DataTypes.TEXT,
    body_raw: DataTypes.TEXT
});

ApiRequest.belongsTo(ApiConfig, { foreignKey: 'api_id', as: 'apiConfig' });

module.exports = ApiRequest;
