const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('api_category', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_project',
        key: 'id'
      }
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    parent_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'api_category',
        key: 'id'
      }
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'api_category',
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
        name: "api_category_api_category_id_fk",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
      {
        name: "api_category_achs_project_id_fk",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
    ]
  });
};
