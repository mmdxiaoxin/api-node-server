const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('api_response', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    api_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'api_config',
        key: 'id'
      }
    },
    api_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    api_time: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    api_size: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    api_content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'api_response',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "api_response_api_config_id_fk",
        using: "BTREE",
        fields: [
          { name: "api_id" },
        ]
      },
    ]
  });
};
