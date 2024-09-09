import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_roles_permissions, achs_roles_permissionsId } from './achs_roles_permissions';

export interface achs_permissionsAttributes {
  id: number;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type achs_permissionsPk = "id";
export type achs_permissionsId = achs_permissions[achs_permissionsPk];
export type achs_permissionsOptionalAttributes = "id" | "description" | "created_at" | "updated_at";
export type achs_permissionsCreationAttributes = Optional<achs_permissionsAttributes, achs_permissionsOptionalAttributes>;

export class achs_permissions extends Model<achs_permissionsAttributes, achs_permissionsCreationAttributes> implements achs_permissionsAttributes {
  id!: number;
  name!: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;

  // achs_permissions hasMany achs_roles_permissions via permission_id
  achs_roles_permissions!: achs_roles_permissions[];
  getAchs_roles_permissions!: Sequelize.HasManyGetAssociationsMixin<achs_roles_permissions>;
  setAchs_roles_permissions!: Sequelize.HasManySetAssociationsMixin<achs_roles_permissions, achs_roles_permissionsId>;
  addAchs_roles_permission!: Sequelize.HasManyAddAssociationMixin<achs_roles_permissions, achs_roles_permissionsId>;
  addAchs_roles_permissions!: Sequelize.HasManyAddAssociationsMixin<achs_roles_permissions, achs_roles_permissionsId>;
  createAchs_roles_permission!: Sequelize.HasManyCreateAssociationMixin<achs_roles_permissions>;
  removeAchs_roles_permission!: Sequelize.HasManyRemoveAssociationMixin<achs_roles_permissions, achs_roles_permissionsId>;
  removeAchs_roles_permissions!: Sequelize.HasManyRemoveAssociationsMixin<achs_roles_permissions, achs_roles_permissionsId>;
  hasAchs_roles_permission!: Sequelize.HasManyHasAssociationMixin<achs_roles_permissions, achs_roles_permissionsId>;
  hasAchs_roles_permissions!: Sequelize.HasManyHasAssociationsMixin<achs_roles_permissions, achs_roles_permissionsId>;
  countAchs_roles_permissions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof achs_permissions {
    return achs_permissions.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'achs_permissions',
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
    ]
  });
  }
}
