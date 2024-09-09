import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_roles_permissions, achs_roles_permissionsId } from './achs_roles_permissions';
import type { achs_roles_team, achs_roles_teamId } from './achs_roles_team';
import type { achs_team_user, achs_team_userId } from './achs_team_user';

export interface achs_rolesAttributes {
  id: number;
  name: string;
  description?: string;
  type: 'Team' | 'Project';
  created_at?: Date;
  updated_at?: Date;
}

export type achs_rolesPk = "id";
export type achs_rolesId = achs_roles[achs_rolesPk];
export type achs_rolesOptionalAttributes = "id" | "description" | "created_at" | "updated_at";
export type achs_rolesCreationAttributes = Optional<achs_rolesAttributes, achs_rolesOptionalAttributes>;

export class achs_roles extends Model<achs_rolesAttributes, achs_rolesCreationAttributes> implements achs_rolesAttributes {
  id!: number;
  name!: string;
  description?: string;
  type!: 'Team' | 'Project';
  created_at?: Date;
  updated_at?: Date;

  // achs_roles hasMany achs_roles_permissions via role_id
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
  // achs_roles hasMany achs_roles_team via role_id
  achs_roles_teams!: achs_roles_team[];
  getAchs_roles_teams!: Sequelize.HasManyGetAssociationsMixin<achs_roles_team>;
  setAchs_roles_teams!: Sequelize.HasManySetAssociationsMixin<achs_roles_team, achs_roles_teamId>;
  addAchs_roles_team!: Sequelize.HasManyAddAssociationMixin<achs_roles_team, achs_roles_teamId>;
  addAchs_roles_teams!: Sequelize.HasManyAddAssociationsMixin<achs_roles_team, achs_roles_teamId>;
  createAchs_roles_team!: Sequelize.HasManyCreateAssociationMixin<achs_roles_team>;
  removeAchs_roles_team!: Sequelize.HasManyRemoveAssociationMixin<achs_roles_team, achs_roles_teamId>;
  removeAchs_roles_teams!: Sequelize.HasManyRemoveAssociationsMixin<achs_roles_team, achs_roles_teamId>;
  hasAchs_roles_team!: Sequelize.HasManyHasAssociationMixin<achs_roles_team, achs_roles_teamId>;
  hasAchs_roles_teams!: Sequelize.HasManyHasAssociationsMixin<achs_roles_team, achs_roles_teamId>;
  countAchs_roles_teams!: Sequelize.HasManyCountAssociationsMixin;
  // achs_roles hasMany achs_team_user via role_id
  achs_team_users!: achs_team_user[];
  getAchs_team_users!: Sequelize.HasManyGetAssociationsMixin<achs_team_user>;
  setAchs_team_users!: Sequelize.HasManySetAssociationsMixin<achs_team_user, achs_team_userId>;
  addAchs_team_user!: Sequelize.HasManyAddAssociationMixin<achs_team_user, achs_team_userId>;
  addAchs_team_users!: Sequelize.HasManyAddAssociationsMixin<achs_team_user, achs_team_userId>;
  createAchs_team_user!: Sequelize.HasManyCreateAssociationMixin<achs_team_user>;
  removeAchs_team_user!: Sequelize.HasManyRemoveAssociationMixin<achs_team_user, achs_team_userId>;
  removeAchs_team_users!: Sequelize.HasManyRemoveAssociationsMixin<achs_team_user, achs_team_userId>;
  hasAchs_team_user!: Sequelize.HasManyHasAssociationMixin<achs_team_user, achs_team_userId>;
  hasAchs_team_users!: Sequelize.HasManyHasAssociationsMixin<achs_team_user, achs_team_userId>;
  countAchs_team_users!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof achs_roles {
    return achs_roles.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('Team','Project'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'achs_roles',
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
