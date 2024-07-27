import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_project, achs_projectId } from './achs_project';
import type { api_config, api_configId } from './api_config';

export interface api_categoryAttributes {
  id: number;
  project_id?: number;
  category_name?: string;
  parent_id?: number;
  create_time?: Date;
}

export type api_categoryPk = "id";
export type api_categoryId = api_category[api_categoryPk];
export type api_categoryOptionalAttributes = "id" | "project_id" | "category_name" | "parent_id" | "create_time";
export type api_categoryCreationAttributes = Optional<api_categoryAttributes, api_categoryOptionalAttributes>;

export class api_category extends Model<api_categoryAttributes, api_categoryCreationAttributes> implements api_categoryAttributes {
  id!: number;
  project_id?: number;
  category_name?: string;
  parent_id?: number;
  create_time?: Date;

  // api_category belongsTo achs_project via project_id
  project!: achs_project;
  getProject!: Sequelize.BelongsToGetAssociationMixin<achs_project>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<achs_project, achs_projectId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<achs_project>;
  // api_category belongsTo api_category via parent_id
  parent!: api_category;
  getParent!: Sequelize.BelongsToGetAssociationMixin<api_category>;
  setParent!: Sequelize.BelongsToSetAssociationMixin<api_category, api_categoryId>;
  createParent!: Sequelize.BelongsToCreateAssociationMixin<api_category>;
  // api_category hasMany api_config via category_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof api_category {
    return api_category.init({
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
  }
}
