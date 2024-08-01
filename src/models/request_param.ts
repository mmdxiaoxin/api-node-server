import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { api_request, api_requestId } from './api_request';

export interface request_paramAttributes {
  id: number;
  request_id?: number;
  param_name: string;
  param_value?: string;
  param_description?: string;
  create_time?: Date;
}

export type request_paramPk = "id";
export type request_paramId = request_param[request_paramPk];
export type request_paramOptionalAttributes = "id" | "request_id" | "param_value" | "param_description" | "create_time";
export type request_paramCreationAttributes = Optional<request_paramAttributes, request_paramOptionalAttributes>;

export class request_param extends Model<request_paramAttributes, request_paramCreationAttributes> implements request_paramAttributes {
  id!: number;
  request_id?: number;
  param_name!: string;
  param_value?: string;
  param_description?: string;
  create_time?: Date;

  // request_param belongsTo api_request via request_id
  request!: api_request;
  getRequest!: Sequelize.BelongsToGetAssociationMixin<api_request>;
  setRequest!: Sequelize.BelongsToSetAssociationMixin<api_request, api_requestId>;
  createRequest!: Sequelize.BelongsToCreateAssociationMixin<api_request>;

  static initModel(sequelize: Sequelize.Sequelize): typeof request_param {
    return request_param.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    request_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'api_request',
        key: 'id'
      }
    },
    param_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    param_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    param_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'request_param',
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
        name: "request_param_api_request_id_fk",
        using: "BTREE",
        fields: [
          { name: "request_id" },
        ]
      },
    ]
  });
  }
}
