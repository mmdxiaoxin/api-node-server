import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { api_request, api_requestId } from './api_request';
import type { api_response, api_responseId } from './api_response';

export interface api_headerAttributes {
  id: number;
  request_id?: number;
  response_id?: number;
  header_name?: string;
  header_value?: string;
  description?: string;
}

export type api_headerPk = "id";
export type api_headerId = api_header[api_headerPk];
export type api_headerOptionalAttributes = "id" | "request_id" | "response_id" | "header_name" | "header_value" | "description";
export type api_headerCreationAttributes = Optional<api_headerAttributes, api_headerOptionalAttributes>;

export class api_header extends Model<api_headerAttributes, api_headerCreationAttributes> implements api_headerAttributes {
  id!: number;
  request_id?: number;
  response_id?: number;
  header_name?: string;
  header_value?: string;
  description?: string;

  // api_header belongsTo api_request via request_id
  request!: api_request;
  getRequest!: Sequelize.BelongsToGetAssociationMixin<api_request>;
  setRequest!: Sequelize.BelongsToSetAssociationMixin<api_request, api_requestId>;
  createRequest!: Sequelize.BelongsToCreateAssociationMixin<api_request>;
  // api_header belongsTo api_response via response_id
  response!: api_response;
  getResponse!: Sequelize.BelongsToGetAssociationMixin<api_response>;
  setResponse!: Sequelize.BelongsToSetAssociationMixin<api_response, api_responseId>;
  createResponse!: Sequelize.BelongsToCreateAssociationMixin<api_response>;

  static initModel(sequelize: Sequelize.Sequelize): typeof api_header {
    return api_header.init({
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
    response_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'api_response',
        key: 'id'
      }
    },
    header_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    header_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'api_header',
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
        name: "api_header_api_request_id_fk",
        using: "BTREE",
        fields: [
          { name: "request_id" },
        ]
      },
      {
        name: "api_header_api_response_id_fk",
        using: "BTREE",
        fields: [
          { name: "response_id" },
        ]
      },
    ]
  });
  }
}
