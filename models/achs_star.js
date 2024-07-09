const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('achs_star', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_user',
        key: 'id'
      }
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_project',
        key: 'id'
      }
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'achs_star',
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
        name: "achs_star_achs_project_id_fk",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "achs_star_achs_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
    ]
  });
};
