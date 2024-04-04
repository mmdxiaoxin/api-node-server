const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ApiRequest = require('./api_request');
const ApiResponse = require('./api_response');

const ApiHeader = sequelize.define('api_header', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    request_id: DataTypes.BIGINT,
    response_id: DataTypes.BIGINT,
    header_name: DataTypes.STRING,
    header_value: DataTypes.STRING,
    description: DataTypes.STRING
});

ApiHeader.belongsTo(ApiRequest, { foreignKey: 'request_id', as: 'request' });
ApiHeader.belongsTo(ApiResponse, { foreignKey: 'response_id', as: 'response' });

module.exports = ApiHeader;
