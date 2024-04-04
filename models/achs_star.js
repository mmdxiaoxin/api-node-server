const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const AchsUser = require('./achs_user');
const AchsProject = require('./achs_project');

const AchsStar = sequelize.define('achs_star', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    creator_id: DataTypes.BIGINT,
    project_id: DataTypes.BIGINT
});

AchsStar.belongsTo(AchsUser, { foreignKey: 'creator_id', as: 'creator' });
AchsStar.belongsTo(AchsProject, { foreignKey: 'project_id', as: 'project' });

module.exports = AchsStar;
