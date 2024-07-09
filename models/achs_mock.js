const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('achs_mock', {
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
    method: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    mock_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mock_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'achs_mock',
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
        name: "achs_mock_achs_project_id_fk",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
    ]
  });
};
