import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { api_config, api_configId } from './api_config';
import type { api_header, api_headerId } from './api_header';

export interface api_responseAttributes {
  id: number;
  api_id?: number;
  api_status?: number;
  api_time?: string;
  api_size?: string;
  api_content?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type api_responsePk = "id";
export type api_responseId = api_response[api_responsePk];
export type api_responseOptionalAttributes = "id" | "api_id" | "api_status" | "api_time" | "api_size" | "api_content" | "created_at" | "updated_at";
export type api_responseCreationAttributes = Optional<api_responseAttributes, api_responseOptionalAttributes>;

export class api_response extends Model<api_responseAttributes, api_responseCreationAttributes> implements api_responseAttributes {
  id!: number;
  api_id?: number;
  api_status?: number;
  api_time?: string;
  api_size?: string;
  api_content?: string;
  created_at?: Date;
  updated_at?: Date;

  // api_response belongsTo api_config via api_id
  api!: api_config;
  getApi!: Sequelize.BelongsToGetAssociationMixin<api_config>;
  setApi!: Sequelize.BelongsToSetAssociationMixin<api_config, api_configId>;
  createApi!: Sequelize.BelongsToCreateAssociationMixin<api_config>;
  // api_response hasMany api_header via response_id
  api_headers!: api_header[];
  getApi_headers!: Sequelize.HasManyGetAssociationsMixin<api_header>;
  setApi_headers!: Sequelize.HasManySetAssociationsMixin<api_header, api_headerId>;
  addApi_header!: Sequelize.HasManyAddAssociationMixin<api_header, api_headerId>;
  addApi_headers!: Sequelize.HasManyAddAssociationsMixin<api_header, api_headerId>;
  createApi_header!: Sequelize.HasManyCreateAssociationMixin<api_header>;
  removeApi_header!: Sequelize.HasManyRemoveAssociationMixin<api_header, api_headerId>;
  removeApi_headers!: Sequelize.HasManyRemoveAssociationsMixin<api_header, api_headerId>;
  hasApi_header!: Sequelize.HasManyHasAssociationMixin<api_header, api_headerId>;
  hasApi_headers!: Sequelize.HasManyHasAssociationsMixin<api_header, api_headerId>;
  countApi_headers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof api_response {
    return api_response.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    api_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'api_config',
        key: 'id'
      }
    },
    api_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    api_time: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    api_size: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    api_content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'api_response',
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
        name: "api_response_api_config_id_fk",
        using: "BTREE",
        fields: [
          { name: "api_id" },
        ]
      },
    ]
  });
  }
}
