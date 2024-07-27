import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_menu, achs_menuId } from './achs_menu';
import type { achs_recent, achs_recentId } from './achs_recent';
import type { achs_star, achs_starId } from './achs_star';
import type { achs_team_user, achs_team_userId } from './achs_team_user';
import type { api_config, api_configId } from './api_config';

export interface achs_userAttributes {
  id: number;
  name?: string;
  account?: string;
  password?: string;
  salt?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  gender?: number;
  status?: number;
  description?: string;
  create_time?: Date;
}

export type achs_userPk = "id";
export type achs_userId = achs_user[achs_userPk];
export type achs_userOptionalAttributes = "id" | "name" | "account" | "password" | "salt" | "avatar" | "phone" | "email" | "gender" | "status" | "description" | "create_time";
export type achs_userCreationAttributes = Optional<achs_userAttributes, achs_userOptionalAttributes>;

export class achs_user extends Model<achs_userAttributes, achs_userCreationAttributes> implements achs_userAttributes {
  id!: number;
  name?: string;
  account?: string;
  password?: string;
  salt?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  gender?: number;
  status?: number;
  description?: string;
  create_time?: Date;

  // achs_user hasMany achs_menu via user_id
  achs_menus!: achs_menu[];
  getAchs_menus!: Sequelize.HasManyGetAssociationsMixin<achs_menu>;
  setAchs_menus!: Sequelize.HasManySetAssociationsMixin<achs_menu, achs_menuId>;
  addAchs_menu!: Sequelize.HasManyAddAssociationMixin<achs_menu, achs_menuId>;
  addAchs_menus!: Sequelize.HasManyAddAssociationsMixin<achs_menu, achs_menuId>;
  createAchs_menu!: Sequelize.HasManyCreateAssociationMixin<achs_menu>;
  removeAchs_menu!: Sequelize.HasManyRemoveAssociationMixin<achs_menu, achs_menuId>;
  removeAchs_menus!: Sequelize.HasManyRemoveAssociationsMixin<achs_menu, achs_menuId>;
  hasAchs_menu!: Sequelize.HasManyHasAssociationMixin<achs_menu, achs_menuId>;
  hasAchs_menus!: Sequelize.HasManyHasAssociationsMixin<achs_menu, achs_menuId>;
  countAchs_menus!: Sequelize.HasManyCountAssociationsMixin;
  // achs_user hasMany achs_recent via creator_id
  achs_recents!: achs_recent[];
  getAchs_recents!: Sequelize.HasManyGetAssociationsMixin<achs_recent>;
  setAchs_recents!: Sequelize.HasManySetAssociationsMixin<achs_recent, achs_recentId>;
  addAchs_recent!: Sequelize.HasManyAddAssociationMixin<achs_recent, achs_recentId>;
  addAchs_recents!: Sequelize.HasManyAddAssociationsMixin<achs_recent, achs_recentId>;
  createAchs_recent!: Sequelize.HasManyCreateAssociationMixin<achs_recent>;
  removeAchs_recent!: Sequelize.HasManyRemoveAssociationMixin<achs_recent, achs_recentId>;
  removeAchs_recents!: Sequelize.HasManyRemoveAssociationsMixin<achs_recent, achs_recentId>;
  hasAchs_recent!: Sequelize.HasManyHasAssociationMixin<achs_recent, achs_recentId>;
  hasAchs_recents!: Sequelize.HasManyHasAssociationsMixin<achs_recent, achs_recentId>;
  countAchs_recents!: Sequelize.HasManyCountAssociationsMixin;
  // achs_user hasMany achs_star via creator_id
  achs_stars!: achs_star[];
  getAchs_stars!: Sequelize.HasManyGetAssociationsMixin<achs_star>;
  setAchs_stars!: Sequelize.HasManySetAssociationsMixin<achs_star, achs_starId>;
  addAchs_star!: Sequelize.HasManyAddAssociationMixin<achs_star, achs_starId>;
  addAchs_stars!: Sequelize.HasManyAddAssociationsMixin<achs_star, achs_starId>;
  createAchs_star!: Sequelize.HasManyCreateAssociationMixin<achs_star>;
  removeAchs_star!: Sequelize.HasManyRemoveAssociationMixin<achs_star, achs_starId>;
  removeAchs_stars!: Sequelize.HasManyRemoveAssociationsMixin<achs_star, achs_starId>;
  hasAchs_star!: Sequelize.HasManyHasAssociationMixin<achs_star, achs_starId>;
  hasAchs_stars!: Sequelize.HasManyHasAssociationsMixin<achs_star, achs_starId>;
  countAchs_stars!: Sequelize.HasManyCountAssociationsMixin;
  // achs_user hasMany achs_team_user via user_id
  achs_team_users!: achs_team_user[];
  getAchs_team_users!: Sequelize.HasManyGetAssociationsMixin<achs_team_user>;
  setAchs_team_users!: Sequelize.HasManySetAssociationsMixin<achs_team_user, achs_team_userId>;
  addAchs_team_user!: Sequelize.HasManyAddAssociationMixin<achs_team_user, achs_team_userId>;
  addAchs_team_users!: Sequelize.HasManyAddAssociationsMixin<achs_team_user, achs_team_userId>;
  createAchs_team_user!: Sequelize.HasManyCreateAssociationMixin<achs_team_user>;
  removeAchs_team_user!: Sequelize.HasManyRemoveAssociationMixin<achs_team_user, achs_team_userId>;
  removeAchs_team_users!: Sequelize.HasManyRemoveAssociationsMixin<achs_team_user, achs_team_userId>;
  hasAchs_team_user!: Sequelize.HasManyHasAssociationMixin<achs_team_user, achs_team_userId>;
  hasAchs_team_users!: Sequelize.HasManyHasAssociationsMixin<achs_team_user, achs_team_userId>;
  countAchs_team_users!: Sequelize.HasManyCountAssociationsMixin;
  // achs_user hasMany api_config via creator_id
  api_configs!: api_config[];
  getApi_configs!: Sequelize.HasManyGetAssociationsMixin<api_config>;
  setApi_configs!: Sequelize.HasManySetAssociationsMixin<api_config, api_configId>;
  addApi_config!: Sequelize.HasManyAddAssociationMixin<api_config, api_configId>;
  addApi_configs!: Sequelize.HasManyAddAssociationsMixin<api_config, api_configId>;
  createApi_config!: Sequelize.HasManyCreateAssociationMixin<api_config>;
  removeApi_config!: Sequelize.HasManyRemoveAssociationMixin<api_config, api_configId>;
  removeApi_configs!: Sequelize.HasManyRemoveAssociationsMixin<api_config, api_configId>;
  hasApi_config!: Sequelize.HasManyHasAssociationMixin<api_config, api_configId>;
  hasApi_configs!: Sequelize.HasManyHasAssociationsMixin<api_config, api_configId>;
  countApi_configs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof achs_user {
    return achs_user.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    account: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'achs_user',
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
    ]
  });
  }
}
