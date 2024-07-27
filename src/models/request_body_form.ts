import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { api_request, api_requestId } from './api_request';

export interface request_body_formAttributes {
  id: number;
  request_id?: number;
  field_name?: string;
  field_type?: string;
  field_value?: string;
}

export type request_body_formPk = "id";
export type request_body_formId = request_body_form[request_body_formPk];
export type request_body_formOptionalAttributes = "id" | "request_id" | "field_name" | "field_type" | "field_value";
export type request_body_formCreationAttributes = Optional<request_body_formAttributes, request_body_formOptionalAttributes>;

export class request_body_form extends Model<request_body_formAttributes, request_body_formCreationAttributes> implements request_body_formAttributes {
  id!: number;
  request_id?: number;
  field_name?: string;
  field_type?: string;
  field_value?: string;

  // request_body_form belongsTo api_request via request_id
  request!: api_request;
  getRequest!: Sequelize.BelongsToGetAssociationMixin<api_request>;
  setRequest!: Sequelize.BelongsToSetAssociationMixin<api_request, api_requestId>;
  createRequest!: Sequelize.BelongsToCreateAssociationMixin<api_request>;

  static initModel(sequelize: Sequelize.Sequelize): typeof request_body_form {
    return request_body_form.init({
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
    field_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    field_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    field_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'request_body_form',
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
        name: "request_body_form_api_request_id_fk",
        using: "BTREE",
        fields: [
          { name: "request_id" },
        ]
      },
    ]
  });
  }
}
