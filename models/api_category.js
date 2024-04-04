const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ApiCategory = sequelize.define('api_category', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    project_id: DataTypes.BIGINT,
    category_name: DataTypes.STRING
});

module.exports = ApiCategory;
