import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_project, achs_projectId } from './achs_project';
import type { achs_team_user, achs_team_userId } from './achs_team_user';

export interface achs_teamAttributes {
  id: number;
  name?: string;
  create_time?: Date;
}

export type achs_teamPk = "id";
export type achs_teamId = achs_team[achs_teamPk];
export type achs_teamOptionalAttributes = "id" | "name" | "create_time";
export type achs_teamCreationAttributes = Optional<achs_teamAttributes, achs_teamOptionalAttributes>;

export class achs_team extends Model<achs_teamAttributes, achs_teamCreationAttributes> implements achs_teamAttributes {
  id!: number;
  name?: string;
  create_time?: Date;

  // achs_team hasMany achs_project via team_id
  achs_projects!: achs_project[];
  getAchs_projects!: Sequelize.HasManyGetAssociationsMixin<achs_project>;
  setAchs_projects!: Sequelize.HasManySetAssociationsMixin<achs_project, achs_projectId>;
  addAchs_project!: Sequelize.HasManyAddAssociationMixin<achs_project, achs_projectId>;
  addAchs_projects!: Sequelize.HasManyAddAssociationsMixin<achs_project, achs_projectId>;
  createAchs_project!: Sequelize.HasManyCreateAssociationMixin<achs_project>;
  removeAchs_project!: Sequelize.HasManyRemoveAssociationMixin<achs_project, achs_projectId>;
  removeAchs_projects!: Sequelize.HasManyRemoveAssociationsMixin<achs_project, achs_projectId>;
  hasAchs_project!: Sequelize.HasManyHasAssociationMixin<achs_project, achs_projectId>;
  hasAchs_projects!: Sequelize.HasManyHasAssociationsMixin<achs_project, achs_projectId>;
  countAchs_projects!: Sequelize.HasManyCountAssociationsMixin;
  // achs_team hasMany achs_team_user via team_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof achs_team {
    return achs_team.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'achs_team',
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
    ]
  });
  }
}
