const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const AchsTeam = require('./achs_team');
const AchsUser = require('./achs_user');

const AchsTeamUser = sequelize.define('achs_team_user', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    team_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    user_auth: DataTypes.STRING
});

AchsTeamUser.belongsTo(AchsTeam, { foreignKey: 'team_id', as: 'team' });
AchsTeamUser.belongsTo(AchsUser, { foreignKey: 'user_id', as: 'user' });

module.exports = AchsTeamUser;
