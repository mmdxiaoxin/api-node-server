const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ApiRequest = require('./api_request');

const RequestBodyForm = sequelize.define('request_body_form', {
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

RequestBodyForm.belongsTo(ApiRequest, { foreignKey: 'request_id', as: 'apiRequest' });

module.exports = RequestBodyForm;
