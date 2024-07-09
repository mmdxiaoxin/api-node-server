const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('achs_team_user', {
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
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_user',
        key: 'id'
      }
    },
    user_auth: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'achs_team_user',
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
        name: "achs_team_user_achs_team_id_fk",
        using: "BTREE",
        fields: [
          { name: "team_id" },
        ]
      },
      {
        name: "achs_team_user_achs_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
