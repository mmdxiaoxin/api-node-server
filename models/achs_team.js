const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AchsTeam = sequelize.define('achs_team', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING
});

module.exports = AchsTeam;
