const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const AchsTeam = require('./achs_team');

const AchsProject = sequelize.define('achs_project', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    team_id: DataTypes.BIGINT,
    name: DataTypes.STRING
});

AchsProject.belongsTo(AchsTeam, { foreignKey: 'team_id', as: 'team' });

module.exports = AchsProject;
