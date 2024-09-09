import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_permissions, achs_permissionsId } from './achs_permissions';
import type { achs_roles, achs_rolesId } from './achs_roles';

export interface achs_roles_permissionsAttributes {
  id: number;
  role_id?: number;
  permission_id?: number;
}

export type achs_roles_permissionsPk = "id";
export type achs_roles_permissionsId = achs_roles_permissions[achs_roles_permissionsPk];
export type achs_roles_permissionsOptionalAttributes = "id" | "role_id" | "permission_id";
export type achs_roles_permissionsCreationAttributes = Optional<achs_roles_permissionsAttributes, achs_roles_permissionsOptionalAttributes>;

export class achs_roles_permissions extends Model<achs_roles_permissionsAttributes, achs_roles_permissionsCreationAttributes> implements achs_roles_permissionsAttributes {
  id!: number;
  role_id?: number;
  permission_id?: number;

  // achs_roles_permissions belongsTo achs_permissions via permission_id
  permission!: achs_permissions;
  getPermission!: Sequelize.BelongsToGetAssociationMixin<achs_permissions>;
  setPermission!: Sequelize.BelongsToSetAssociationMixin<achs_permissions, achs_permissionsId>;
  createPermission!: Sequelize.BelongsToCreateAssociationMixin<achs_permissions>;
  // achs_roles_permissions belongsTo achs_roles via role_id
  role!: achs_roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<achs_roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<achs_roles, achs_rolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<achs_roles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof achs_roles_permissions {
    return achs_roles_permissions.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'achs_roles',
        key: 'id'
      }
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'achs_permissions',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'achs_roles_permissions',
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
        name: "achs_roles_permissions_achs_permissions_id_fk",
        using: "BTREE",
        fields: [
          { name: "permission_id" },
        ]
      },
      {
        name: "achs_roles_permissions_achs_roles_id_fk",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
  }
}
