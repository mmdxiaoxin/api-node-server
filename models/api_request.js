const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('api_request', {
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
    method: {
      type: DataTypes.ENUM('GET','POST','PUT','DELETE','PATCH','HEAD','OPTIONS'),
      allowNull: false
    },
    api_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    base_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    api_auth: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    body_json: {
      type: DataTypes.JSON,
      allowNull: true
    },
    body_xml: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    body_raw: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'api_request',
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
        name: "api_request_api_config_id_fk",
        using: "BTREE",
        fields: [
          { name: "api_id" },
        ]
      },
    ]
  });
};
