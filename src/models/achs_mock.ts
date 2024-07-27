import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_project, achs_projectId } from './achs_project';

export interface achs_mockAttributes {
  id: number;
  project_id?: number;
  method?: string;
  mock_url?: string;
  mock_description?: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type achs_mockPk = "id";
export type achs_mockId = achs_mock[achs_mockPk];
export type achs_mockOptionalAttributes = "id" | "project_id" | "method" | "mock_url" | "mock_description" | "status" | "created_at" | "updated_at";
export type achs_mockCreationAttributes = Optional<achs_mockAttributes, achs_mockOptionalAttributes>;

export class achs_mock extends Model<achs_mockAttributes, achs_mockCreationAttributes> implements achs_mockAttributes {
  id!: number;
  project_id?: number;
  method?: string;
  mock_url?: string;
  mock_description?: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;

  // achs_mock belongsTo achs_project via project_id
  project!: achs_project;
  getProject!: Sequelize.BelongsToGetAssociationMixin<achs_project>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<achs_project, achs_projectId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<achs_project>;

  static initModel(sequelize: Sequelize.Sequelize): typeof achs_mock {
    return achs_mock.init({
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
    method: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    mock_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mock_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'achs_mock',
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
        name: "achs_mock_achs_project_id_fk",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
    ]
  });
  }
}
