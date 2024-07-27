import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_mock, achs_mockId } from './achs_mock';
import type { achs_recent, achs_recentId } from './achs_recent';
import type { achs_star, achs_starId } from './achs_star';
import type { achs_team, achs_teamId } from './achs_team';
import type { api_category, api_categoryId } from './api_category';

export interface achs_projectAttributes {
  id: number;
  team_id?: number;
  name?: string;
  icon?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type achs_projectPk = "id";
export type achs_projectId = achs_project[achs_projectPk];
export type achs_projectOptionalAttributes = "id" | "team_id" | "name" | "icon" | "created_at" | "updated_at";
export type achs_projectCreationAttributes = Optional<achs_projectAttributes, achs_projectOptionalAttributes>;

export class achs_project extends Model<achs_projectAttributes, achs_projectCreationAttributes> implements achs_projectAttributes {
  id!: number;
  team_id?: number;
  name?: string;
  icon?: string;
  created_at?: Date;
  updated_at?: Date;

  // achs_project hasMany achs_mock via project_id
  achs_mocks!: achs_mock[];
  getAchs_mocks!: Sequelize.HasManyGetAssociationsMixin<achs_mock>;
  setAchs_mocks!: Sequelize.HasManySetAssociationsMixin<achs_mock, achs_mockId>;
  addAchs_mock!: Sequelize.HasManyAddAssociationMixin<achs_mock, achs_mockId>;
  addAchs_mocks!: Sequelize.HasManyAddAssociationsMixin<achs_mock, achs_mockId>;
  createAchs_mock!: Sequelize.HasManyCreateAssociationMixin<achs_mock>;
  removeAchs_mock!: Sequelize.HasManyRemoveAssociationMixin<achs_mock, achs_mockId>;
  removeAchs_mocks!: Sequelize.HasManyRemoveAssociationsMixin<achs_mock, achs_mockId>;
  hasAchs_mock!: Sequelize.HasManyHasAssociationMixin<achs_mock, achs_mockId>;
  hasAchs_mocks!: Sequelize.HasManyHasAssociationsMixin<achs_mock, achs_mockId>;
  countAchs_mocks!: Sequelize.HasManyCountAssociationsMixin;
  // achs_project hasMany achs_recent via project_id
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
  // achs_project hasMany achs_star via project_id
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
  // achs_project hasMany api_category via project_id
  api_categories!: api_category[];
  getApi_categories!: Sequelize.HasManyGetAssociationsMixin<api_category>;
  setApi_categories!: Sequelize.HasManySetAssociationsMixin<api_category, api_categoryId>;
  addApi_category!: Sequelize.HasManyAddAssociationMixin<api_category, api_categoryId>;
  addApi_categories!: Sequelize.HasManyAddAssociationsMixin<api_category, api_categoryId>;
  createApi_category!: Sequelize.HasManyCreateAssociationMixin<api_category>;
  removeApi_category!: Sequelize.HasManyRemoveAssociationMixin<api_category, api_categoryId>;
  removeApi_categories!: Sequelize.HasManyRemoveAssociationsMixin<api_category, api_categoryId>;
  hasApi_category!: Sequelize.HasManyHasAssociationMixin<api_category, api_categoryId>;
  hasApi_categories!: Sequelize.HasManyHasAssociationsMixin<api_category, api_categoryId>;
  countApi_categories!: Sequelize.HasManyCountAssociationsMixin;
  // achs_project belongsTo achs_team via team_id
  team!: achs_team;
  getTeam!: Sequelize.BelongsToGetAssociationMixin<achs_team>;
  setTeam!: Sequelize.BelongsToSetAssociationMixin<achs_team, achs_teamId>;
  createTeam!: Sequelize.BelongsToCreateAssociationMixin<achs_team>;

  static initModel(sequelize: Sequelize.Sequelize): typeof achs_project {
    return achs_project.init({
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
  }
}
