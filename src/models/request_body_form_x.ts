import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { api_request, api_requestId } from './api_request';

export interface request_body_form_xAttributes {
  id: number;
  request_id?: number;
  field_name?: string;
  field_type?: string;
  field_value?: string;
}

export type request_body_form_xPk = "id";
export type request_body_form_xId = request_body_form_x[request_body_form_xPk];
export type request_body_form_xOptionalAttributes = "id" | "request_id" | "field_name" | "field_type" | "field_value";
export type request_body_form_xCreationAttributes = Optional<request_body_form_xAttributes, request_body_form_xOptionalAttributes>;

export class request_body_form_x extends Model<request_body_form_xAttributes, request_body_form_xCreationAttributes> implements request_body_form_xAttributes {
  id!: number;
  request_id?: number;
  field_name?: string;
  field_type?: string;
  field_value?: string;

  // request_body_form_x belongsTo api_request via request_id
  request!: api_request;
  getRequest!: Sequelize.BelongsToGetAssociationMixin<api_request>;
  setRequest!: Sequelize.BelongsToSetAssociationMixin<api_request, api_requestId>;
  createRequest!: Sequelize.BelongsToCreateAssociationMixin<api_request>;

  static initModel(sequelize: Sequelize.Sequelize): typeof request_body_form_x {
    return request_body_form_x.init({
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
      type: DataTypes.STRING(20),
      allowNull: true
    },
    field_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'request_body_form_x',
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
        name: "request_body_form_x_api_request_id_fk",
        using: "BTREE",
        fields: [
          { name: "request_id" },
        ]
      },
    ]
  });
  }
}
