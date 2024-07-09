const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('api_header', {
    id: {
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
    response_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'api_response',
        key: 'id'
      }
    },
    header_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    header_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'api_header',
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
        name: "api_header_api_request_id_fk",
        using: "BTREE",
        fields: [
          { name: "request_id" },
        ]
      },
      {
        name: "api_header_api_response_id_fk",
        using: "BTREE",
        fields: [
          { name: "response_id" },
        ]
      },
    ]
  });
};
