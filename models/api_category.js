const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ApiCategory = sequelize.define('api_category', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    project_id: DataTypes.BIGINT,
    category_name: DataTypes.STRING,
    parent_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'api_category',
            key: 'id'
        }
    }
});

module.exports = ApiCategory;
