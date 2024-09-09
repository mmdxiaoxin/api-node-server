import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_roles, achs_rolesId } from './achs_roles';
import type { achs_team, achs_teamId } from './achs_team';

export interface achs_roles_teamAttributes {
  id: number;
  role_id?: number;
  team_id?: number;
}

export type achs_roles_teamPk = "id";
export type achs_roles_teamId = achs_roles_team[achs_roles_teamPk];
export type achs_roles_teamOptionalAttributes = "id" | "role_id" | "team_id";
export type achs_roles_teamCreationAttributes = Optional<achs_roles_teamAttributes, achs_roles_teamOptionalAttributes>;

export class achs_roles_team extends Model<achs_roles_teamAttributes, achs_roles_teamCreationAttributes> implements achs_roles_teamAttributes {
  id!: number;
  role_id?: number;
  team_id?: number;

  // achs_roles_team belongsTo achs_roles via role_id
  role!: achs_roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<achs_roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<achs_roles, achs_rolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<achs_roles>;
  // achs_roles_team belongsTo achs_team via team_id
  team!: achs_team;
  getTeam!: Sequelize.BelongsToGetAssociationMixin<achs_team>;
  setTeam!: Sequelize.BelongsToSetAssociationMixin<achs_team, achs_teamId>;
  createTeam!: Sequelize.BelongsToCreateAssociationMixin<achs_team>;

  static initModel(sequelize: Sequelize.Sequelize): typeof achs_roles_team {
    return achs_roles_team.init({
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
    team_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_team',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'achs_roles_team',
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
        name: "achs_roles_team_achs_roles_id_fk",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
      {
        name: "achs_roles_team_achs_team_id_fk",
        using: "BTREE",
        fields: [
          { name: "team_id" },
        ]
      },
    ]
  });
  }
}
