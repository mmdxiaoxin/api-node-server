const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('api_config', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    api_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    creator_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_user',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'api_category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'api_config',
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
        name: "api_config_achs_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
      {
        name: "api_config_api_category_id_fk",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
};
