const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const AchsProject = require('./achs_project');

const AchsMock = sequelize.define('achs_mock', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    project_id: DataTypes.BIGINT,
    method: DataTypes.STRING,
    mock_url: DataTypes.STRING,
    mock_description: DataTypes.STRING,
    status: DataTypes.TINYINT
});

AchsMock.belongsTo(AchsProject, { foreignKey: 'project_id', as: 'project' });

module.exports = AchsMock;
