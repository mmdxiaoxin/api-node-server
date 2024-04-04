const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ApiRequest = require('./api_request');

const RequestParam = sequelize.define('request_param', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    request_id: DataTypes.BIGINT,
    param_name: DataTypes.STRING,
    param_value: DataTypes.STRING
});

RequestParam.belongsTo(ApiRequest, { foreignKey: 'request_id', as: 'apiRequest' });

module.exports = RequestParam;
