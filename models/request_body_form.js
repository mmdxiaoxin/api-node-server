const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('request_body_form', {
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
    field_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    field_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    field_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'request_body_form',
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
        name: "request_body_form_api_request_id_fk",
        using: "BTREE",
        fields: [
          { name: "request_id" },
        ]
      },
    ]
  });
};
