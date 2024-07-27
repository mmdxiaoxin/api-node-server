import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_user, achs_userId } from './achs_user';

export interface achs_menuAttributes {
  id: number;
  path?: string;
  name?: string;
  component?: string;
  icon?: string;
  is_link?: number;
  is_hide?: number;
  is_full?: number;
  is_affix?: number;
  is_keep_alive?: number;
  parent_id?: number;
  user_id?: number;
}

export type achs_menuPk = "id";
export type achs_menuId = achs_menu[achs_menuPk];
export type achs_menuOptionalAttributes = "id" | "path" | "name" | "component" | "icon" | "is_link" | "is_hide" | "is_full" | "is_affix" | "is_keep_alive" | "parent_id" | "user_id";
export type achs_menuCreationAttributes = Optional<achs_menuAttributes, achs_menuOptionalAttributes>;

export class achs_menu extends Model<achs_menuAttributes, achs_menuCreationAttributes> implements achs_menuAttributes {
  id!: number;
  path?: string;
  name?: string;
  component?: string;
  icon?: string;
  is_link?: number;
  is_hide?: number;
  is_full?: number;
  is_affix?: number;
  is_keep_alive?: number;
  parent_id?: number;
  user_id?: number;

  // achs_menu belongsTo achs_menu via parent_id
  parent!: achs_menu;
  getParent!: Sequelize.BelongsToGetAssociationMixin<achs_menu>;
  setParent!: Sequelize.BelongsToSetAssociationMixin<achs_menu, achs_menuId>;
  createParent!: Sequelize.BelongsToCreateAssociationMixin<achs_menu>;
  // achs_menu belongsTo achs_user via user_id
  user!: achs_user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<achs_user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<achs_user, achs_userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<achs_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof achs_menu {
    return achs_menu.init({
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
  }
}
