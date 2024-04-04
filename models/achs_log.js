const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AchsLog = sequelize.define('achs_log', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
});

module.exports = AchsLog;
