const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('achs_menu', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    component: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_link: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    is_hide: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    is_full: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    is_affix: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    is_keep_alive: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    parent_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_menu',
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
    }
  }, {
    sequelize,
    tableName: 'achs_menu',
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
        name: "achs_menu_achs_menu_id_fk",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
      {
        name: "achs_menu_achs_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
