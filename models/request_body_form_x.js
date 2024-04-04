const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ApiRequest = require('./api_request');

const RequestBodyFormX = sequelize.define('request_body_form_x', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    request_id: DataTypes.BIGINT,
    field_name: DataTypes.STRING,
    field_type: DataTypes.STRING,
    field_value: DataTypes.STRING
});

RequestBodyFormX.belongsTo(ApiRequest, { foreignKey: 'request_id', as: 'apiRequest' });

module.exports = RequestBodyFormX;
