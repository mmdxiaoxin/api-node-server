import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_user, achs_userId } from './achs_user';
import type { api_category, api_categoryId } from './api_category';
import type { api_request, api_requestId } from './api_request';
import type { api_response, api_responseId } from './api_response';

export interface api_configAttributes {
  id: number;
  api_name?: string;
  creator_id?: number;
  category_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type api_configPk = "id";
export type api_configId = api_config[api_configPk];
export type api_configOptionalAttributes = "id" | "api_name" | "creator_id" | "category_id" | "created_at" | "updated_at";
export type api_configCreationAttributes = Optional<api_configAttributes, api_configOptionalAttributes>;

export class api_config extends Model<api_configAttributes, api_configCreationAttributes> implements api_configAttributes {
  id!: number;
  api_name?: string;
  creator_id?: number;
  category_id?: number;
  created_at?: Date;
  updated_at?: Date;

  // api_config belongsTo achs_user via creator_id
  creator!: achs_user;
  getCreator!: Sequelize.BelongsToGetAssociationMixin<achs_user>;
  setCreator!: Sequelize.BelongsToSetAssociationMixin<achs_user, achs_userId>;
  createCreator!: Sequelize.BelongsToCreateAssociationMixin<achs_user>;
  // api_config belongsTo api_category via category_id
  category!: api_category;
  getCategory!: Sequelize.BelongsToGetAssociationMixin<api_category>;
  setCategory!: Sequelize.BelongsToSetAssociationMixin<api_category, api_categoryId>;
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<api_category>;
  // api_config hasMany api_request via api_id
  api_requests!: api_request[];
  getApi_requests!: Sequelize.HasManyGetAssociationsMixin<api_request>;
  setApi_requests!: Sequelize.HasManySetAssociationsMixin<api_request, api_requestId>;
  addApi_request!: Sequelize.HasManyAddAssociationMixin<api_request, api_requestId>;
  addApi_requests!: Sequelize.HasManyAddAssociationsMixin<api_request, api_requestId>;
  createApi_request!: Sequelize.HasManyCreateAssociationMixin<api_request>;
  removeApi_request!: Sequelize.HasManyRemoveAssociationMixin<api_request, api_requestId>;
  removeApi_requests!: Sequelize.HasManyRemoveAssociationsMixin<api_request, api_requestId>;
  hasApi_request!: Sequelize.HasManyHasAssociationMixin<api_request, api_requestId>;
  hasApi_requests!: Sequelize.HasManyHasAssociationsMixin<api_request, api_requestId>;
  countApi_requests!: Sequelize.HasManyCountAssociationsMixin;
  // api_config hasMany api_response via api_id
  api_responses!: api_response[];
  getApi_responses!: Sequelize.HasManyGetAssociationsMixin<api_response>;
  setApi_responses!: Sequelize.HasManySetAssociationsMixin<api_response, api_responseId>;
  addApi_response!: Sequelize.HasManyAddAssociationMixin<api_response, api_responseId>;
  addApi_responses!: Sequelize.HasManyAddAssociationsMixin<api_response, api_responseId>;
  createApi_response!: Sequelize.HasManyCreateAssociationMixin<api_response>;
  removeApi_response!: Sequelize.HasManyRemoveAssociationMixin<api_response, api_responseId>;
  removeApi_responses!: Sequelize.HasManyRemoveAssociationsMixin<api_response, api_responseId>;
  hasApi_response!: Sequelize.HasManyHasAssociationMixin<api_response, api_responseId>;
  hasApi_responses!: Sequelize.HasManyHasAssociationsMixin<api_response, api_responseId>;
  countApi_responses!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof api_config {
    return api_config.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    api_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    creator_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_user',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'api_category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'api_config',
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
        name: "api_config_achs_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
      {
        name: "api_config_api_category_id_fk",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  }
}
