const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('achs_project', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    team_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_team',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'achs_project',
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
        name: "achs_project_achs_team_id_fk",
        using: "BTREE",
        fields: [
          { name: "team_id" },
        ]
      },
    ]
  });
};
