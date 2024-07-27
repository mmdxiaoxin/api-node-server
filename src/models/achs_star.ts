import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achs_project, achs_projectId } from './achs_project';
import type { achs_user, achs_userId } from './achs_user';

export interface achs_starAttributes {
  id: number;
  creator_id?: number;
  project_id?: number;
  create_time?: Date;
}

export type achs_starPk = "id";
export type achs_starId = achs_star[achs_starPk];
export type achs_starOptionalAttributes = "id" | "creator_id" | "project_id" | "create_time";
export type achs_starCreationAttributes = Optional<achs_starAttributes, achs_starOptionalAttributes>;

export class achs_star extends Model<achs_starAttributes, achs_starCreationAttributes> implements achs_starAttributes {
  id!: number;
  creator_id?: number;
  project_id?: number;
  create_time?: Date;

  // achs_star belongsTo achs_project via project_id
  project!: achs_project;
  getProject!: Sequelize.BelongsToGetAssociationMixin<achs_project>;
  setProject!: Sequelize.BelongsToSetAssociationMixin<achs_project, achs_projectId>;
  createProject!: Sequelize.BelongsToCreateAssociationMixin<achs_project>;
  // achs_star belongsTo achs_user via creator_id
  creator!: achs_user;
  getCreator!: Sequelize.BelongsToGetAssociationMixin<achs_user>;
  setCreator!: Sequelize.BelongsToSetAssociationMixin<achs_user, achs_userId>;
  createCreator!: Sequelize.BelongsToCreateAssociationMixin<achs_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof achs_star {
    return achs_star.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_user',
        key: 'id'
      }
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'achs_project',
        key: 'id'
      }
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'achs_star',
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
        name: "achs_star_achs_project_id_fk",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "achs_star_achs_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
    ]
  });
  }
}
