import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { api_config, api_configId } from './api_config';
import type { api_header, api_headerId } from './api_header';
import type { request_body_form, request_body_formId } from './request_body_form';
import type { request_body_form_x, request_body_form_xId } from './request_body_form_x';
import type { request_param, request_paramId } from './request_param';

export interface api_requestAttributes {
  id: number;
  api_id?: number;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  api_url?: string;
  base_url?: string;
  api_auth?: string;
  body_json?: object;
  body_xml?: string;
  body_raw?: string;
}

export type api_requestPk = "id";
export type api_requestId = api_request[api_requestPk];
export type api_requestOptionalAttributes = "id" | "api_id" | "api_url" | "base_url" | "api_auth" | "body_json" | "body_xml" | "body_raw";
export type api_requestCreationAttributes = Optional<api_requestAttributes, api_requestOptionalAttributes>;

export class api_request extends Model<api_requestAttributes, api_requestCreationAttributes> implements api_requestAttributes {
  id!: number;
  api_id?: number;
  method!: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  api_url?: string;
  base_url?: string;
  api_auth?: string;
  body_json?: object;
  body_xml?: string;
  body_raw?: string;

  // api_request belongsTo api_config via api_id
  api!: api_config;
  getApi!: Sequelize.BelongsToGetAssociationMixin<api_config>;
  setApi!: Sequelize.BelongsToSetAssociationMixin<api_config, api_configId>;
  createApi!: Sequelize.BelongsToCreateAssociationMixin<api_config>;
  // api_request hasMany api_header via request_id
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
  // api_request hasMany request_body_form via request_id
  request_body_forms!: request_body_form[];
  getRequest_body_forms!: Sequelize.HasManyGetAssociationsMixin<request_body_form>;
  setRequest_body_forms!: Sequelize.HasManySetAssociationsMixin<request_body_form, request_body_formId>;
  addRequest_body_form!: Sequelize.HasManyAddAssociationMixin<request_body_form, request_body_formId>;
  addRequest_body_forms!: Sequelize.HasManyAddAssociationsMixin<request_body_form, request_body_formId>;
  createRequest_body_form!: Sequelize.HasManyCreateAssociationMixin<request_body_form>;
  removeRequest_body_form!: Sequelize.HasManyRemoveAssociationMixin<request_body_form, request_body_formId>;
  removeRequest_body_forms!: Sequelize.HasManyRemoveAssociationsMixin<request_body_form, request_body_formId>;
  hasRequest_body_form!: Sequelize.HasManyHasAssociationMixin<request_body_form, request_body_formId>;
  hasRequest_body_forms!: Sequelize.HasManyHasAssociationsMixin<request_body_form, request_body_formId>;
  countRequest_body_forms!: Sequelize.HasManyCountAssociationsMixin;
  // api_request hasMany request_body_form_x via request_id
  request_body_form_xes!: request_body_form_x[];
  getRequest_body_form_xes!: Sequelize.HasManyGetAssociationsMixin<request_body_form_x>;
  setRequest_body_form_xes!: Sequelize.HasManySetAssociationsMixin<request_body_form_x, request_body_form_xId>;
  addRequest_body_form_x!: Sequelize.HasManyAddAssociationMixin<request_body_form_x, request_body_form_xId>;
  addRequest_body_form_xes!: Sequelize.HasManyAddAssociationsMixin<request_body_form_x, request_body_form_xId>;
  createRequest_body_form_x!: Sequelize.HasManyCreateAssociationMixin<request_body_form_x>;
  removeRequest_body_form_x!: Sequelize.HasManyRemoveAssociationMixin<request_body_form_x, request_body_form_xId>;
  removeRequest_body_form_xes!: Sequelize.HasManyRemoveAssociationsMixin<request_body_form_x, request_body_form_xId>;
  hasRequest_body_form_x!: Sequelize.HasManyHasAssociationMixin<request_body_form_x, request_body_form_xId>;
  hasRequest_body_form_xes!: Sequelize.HasManyHasAssociationsMixin<request_body_form_x, request_body_form_xId>;
  countRequest_body_form_xes!: Sequelize.HasManyCountAssociationsMixin;
  // api_request hasMany request_param via request_id
  request_params!: request_param[];
  getRequest_params!: Sequelize.HasManyGetAssociationsMixin<request_param>;
  setRequest_params!: Sequelize.HasManySetAssociationsMixin<request_param, request_paramId>;
  addRequest_param!: Sequelize.HasManyAddAssociationMixin<request_param, request_paramId>;
  addRequest_params!: Sequelize.HasManyAddAssociationsMixin<request_param, request_paramId>;
  createRequest_param!: Sequelize.HasManyCreateAssociationMixin<request_param>;
  removeRequest_param!: Sequelize.HasManyRemoveAssociationMixin<request_param, request_paramId>;
  removeRequest_params!: Sequelize.HasManyRemoveAssociationsMixin<request_param, request_paramId>;
  hasRequest_param!: Sequelize.HasManyHasAssociationMixin<request_param, request_paramId>;
  hasRequest_params!: Sequelize.HasManyHasAssociationsMixin<request_param, request_paramId>;
  countRequest_params!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof api_request {
    return api_request.init({
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
    method: {
      type: DataTypes.ENUM('GET','POST','PUT','DELETE','PATCH','HEAD','OPTIONS'),
      allowNull: false
    },
    api_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    base_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    api_auth: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    body_json: {
      type: DataTypes.JSON,
      allowNull: true
    },
    body_xml: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    body_raw: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'api_request',
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
        name: "api_request_api_config_id_fk",
        using: "BTREE",
        fields: [
          { name: "api_id" },
        ]
      },
    ]
  });
  }
}
