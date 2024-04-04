const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const AchsUser = require('./achs_user');
const AchsProject = require('./achs_project');

const AchsRecent = sequelize.define('achs_recent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    creator_id: DataTypes.BIGINT,
    project_id: DataTypes.BIGINT
});

AchsRecent.belongsTo(AchsUser, { foreignKey: 'creator_id', as: 'creator' });
AchsRecent.belongsTo(AchsProject, { foreignKey: 'project_id', as: 'project' });

module.exports = AchsRecent;
