const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('system_logs', {
    log_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    log_level: {
      type: DataTypes.ENUM('DEBUG','INFO','WARN','ERROR','FATAL'),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_ip: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    host_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    application_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    module: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    operation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    resource: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('SUCCESS','FAILURE'),
      allowNull: true
    },
    request_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    session_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    correlation_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    details: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'system_logs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "log_id" },
        ]
      },
    ]
  });
};
