const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('request_param', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    request_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'api_request',
        key: 'id'
      }
    },
    param_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    param_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'request_param',
    timestamps: false,
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
        name: "request_param_api_request_id_fk",
        using: "BTREE",
        fields: [
          { name: "request_id" },
        ]
      },
    ]
  });
};
