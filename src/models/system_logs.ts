import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface system_logsAttributes {
  log_id: number;
  timestamp?: Date;
  log_level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  message: string;
  user_id?: number;
  username?: string;
  user_ip?: string;
  host_name?: string;
  application_name?: string;
  module?: string;
  operation?: string;
  resource?: string;
  status?: 'SUCCESS' | 'FAILURE';
  request_id?: string;
  session_id?: string;
  correlation_id?: string;
  details?: object;
}

export type system_logsPk = "log_id";
export type system_logsId = system_logs[system_logsPk];
export type system_logsOptionalAttributes = "log_id" | "timestamp" | "user_id" | "username" | "user_ip" | "host_name" | "application_name" | "module" | "operation" | "resource" | "status" | "request_id" | "session_id" | "correlation_id" | "details";
export type system_logsCreationAttributes = Optional<system_logsAttributes, system_logsOptionalAttributes>;

export class system_logs extends Model<system_logsAttributes, system_logsCreationAttributes> implements system_logsAttributes {
  log_id!: number;
  timestamp?: Date;
  log_level!: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  message!: string;
  user_id?: number;
  username?: string;
  user_ip?: string;
  host_name?: string;
  application_name?: string;
  module?: string;
  operation?: string;
  resource?: string;
  status?: 'SUCCESS' | 'FAILURE';
  request_id?: string;
  session_id?: string;
  correlation_id?: string;
  details?: object;


  static initModel(sequelize: Sequelize.Sequelize): typeof system_logs {
    return system_logs.init({
    log_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    log_level: {
      type: DataTypes.ENUM('DEBUG','INFO','WARN','ERROR','FATAL'),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_ip: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    host_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    application_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    module: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    operation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    resource: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('SUCCESS','FAILURE'),
      allowNull: true
    },
    request_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    session_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    correlation_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    details: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'system_logs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "log_id" },
        ]
      },
    ]
  });
  }
}
