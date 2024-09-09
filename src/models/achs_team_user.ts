import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_roles, achs_rolesId } from './achs_roles';
import type { achs_team, achs_teamId } from './achs_team';
import type { achs_user, achs_userId } from './achs_user';

export interface achs_team_userAttributes {
  id: number;
  team_id?: number;
  user_id?: number;
  role_id?: number;
}

export type achs_team_userPk = "id";
export type achs_team_userId = achs_team_user[achs_team_userPk];
export type achs_team_userOptionalAttributes = "id" | "team_id" | "user_id" | "role_id";
export type achs_team_userCreationAttributes = Optional<achs_team_userAttributes, achs_team_userOptionalAttributes>;

export class achs_team_user extends Model<achs_team_userAttributes, achs_team_userCreationAttributes> implements achs_team_userAttributes {
  id!: number;
  team_id?: number;
  user_id?: number;
  role_id?: number;

  // achs_team_user belongsTo achs_roles via role_id
  role!: achs_roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<achs_roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<achs_roles, achs_rolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<achs_roles>;
  // achs_team_user belongsTo achs_team via team_id
  team!: achs_team;
  getTeam!: Sequelize.BelongsToGetAssociationMixin<achs_team>;
  setTeam!: Sequelize.BelongsToSetAssociationMixin<achs_team, achs_teamId>;
  createTeam!: Sequelize.BelongsToCreateAssociationMixin<achs_team>;
  // achs_team_user belongsTo achs_user via user_id
  user!: achs_user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<achs_user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<achs_user, achs_userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<achs_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof achs_team_user {
    return achs_team_user.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    team_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_team',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_user',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'achs_roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'achs_team_user',
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
        name: "achs_team_user_achs_team_id_fk",
        using: "BTREE",
        fields: [
          { name: "team_id" },
        ]
      },
      {
        name: "achs_team_user_achs_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "achs_team_user_achs_roles_id_fk",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
  }
}
