import type { Sequelize } from "sequelize";
import { achs_menu as _achs_menu } from "./achs_menu";
import type { achs_menuAttributes, achs_menuCreationAttributes } from "./achs_menu";
import { achs_mock as _achs_mock } from "./achs_mock";
import type { achs_mockAttributes, achs_mockCreationAttributes } from "./achs_mock";
import { achs_project as _achs_project } from "./achs_project";
import type { achs_projectAttributes, achs_projectCreationAttributes } from "./achs_project";
import { achs_recent as _achs_recent } from "./achs_recent";
import type { achs_recentAttributes, achs_recentCreationAttributes } from "./achs_recent";
import { achs_star as _achs_star } from "./achs_star";
import type { achs_starAttributes, achs_starCreationAttributes } from "./achs_star";
import { achs_team as _achs_team } from "./achs_team";
import type { achs_teamAttributes, achs_teamCreationAttributes } from "./achs_team";
import { achs_team_user as _achs_team_user } from "./achs_team_user";
import type { achs_team_userAttributes, achs_team_userCreationAttributes } from "./achs_team_user";
import { achs_user as _achs_user } from "./achs_user";
import type { achs_userAttributes, achs_userCreationAttributes } from "./achs_user";
import { api_category as _api_category } from "./api_category";
import type { api_categoryAttributes, api_categoryCreationAttributes } from "./api_category";
import { api_config as _api_config } from "./api_config";
import type { api_configAttributes, api_configCreationAttributes } from "./api_config";
import { api_header as _api_header } from "./api_header";
import type { api_headerAttributes, api_headerCreationAttributes } from "./api_header";
import { api_request as _api_request } from "./api_request";
import type { api_requestAttributes, api_requestCreationAttributes } from "./api_request";
import { api_response as _api_response } from "./api_response";
import type { api_responseAttributes, api_responseCreationAttributes } from "./api_response";
import { request_body_form as _request_body_form } from "./request_body_form";
import type { request_body_formAttributes, request_body_formCreationAttributes } from "./request_body_form";
import { request_body_form_x as _request_body_form_x } from "./request_body_form_x";
import type { request_body_form_xAttributes, request_body_form_xCreationAttributes } from "./request_body_form_x";
import { request_param as _request_param } from "./request_param";
import type { request_paramAttributes, request_paramCreationAttributes } from "./request_param";
import { system_logs as _system_logs } from "./system_logs";
import type { system_logsAttributes, system_logsCreationAttributes } from "./system_logs";

export {
  _achs_menu as achs_menu,
  _achs_mock as achs_mock,
  _achs_project as achs_project,
  _achs_recent as achs_recent,
  _achs_star as achs_star,
  _achs_team as achs_team,
  _achs_team_user as achs_team_user,
  _achs_user as achs_user,
  _api_category as api_category,
  _api_config as api_config,
  _api_header as api_header,
  _api_request as api_request,
  _api_response as api_response,
  _request_body_form as request_body_form,
  _request_body_form_x as request_body_form_x,
  _request_param as request_param,
  _system_logs as system_logs,
};

export type {
  achs_menuAttributes,
  achs_menuCreationAttributes,
  achs_mockAttributes,
  achs_mockCreationAttributes,
  achs_projectAttributes,
  achs_projectCreationAttributes,
  achs_recentAttributes,
  achs_recentCreationAttributes,
  achs_starAttributes,
  achs_starCreationAttributes,
  achs_teamAttributes,
  achs_teamCreationAttributes,
  achs_team_userAttributes,
  achs_team_userCreationAttributes,
  achs_userAttributes,
  achs_userCreationAttributes,
  api_categoryAttributes,
  api_categoryCreationAttributes,
  api_configAttributes,
  api_configCreationAttributes,
  api_headerAttributes,
  api_headerCreationAttributes,
  api_requestAttributes,
  api_requestCreationAttributes,
  api_responseAttributes,
  api_responseCreationAttributes,
  request_body_formAttributes,
  request_body_formCreationAttributes,
  request_body_form_xAttributes,
  request_body_form_xCreationAttributes,
  request_paramAttributes,
  request_paramCreationAttributes,
  system_logsAttributes,
  system_logsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const achs_menu = _achs_menu.initModel(sequelize);
  const achs_mock = _achs_mock.initModel(sequelize);
  const achs_project = _achs_project.initModel(sequelize);
  const achs_recent = _achs_recent.initModel(sequelize);
  const achs_star = _achs_star.initModel(sequelize);
  const achs_team = _achs_team.initModel(sequelize);
  const achs_team_user = _achs_team_user.initModel(sequelize);
  const achs_user = _achs_user.initModel(sequelize);
  const api_category = _api_category.initModel(sequelize);
  const api_config = _api_config.initModel(sequelize);
  const api_header = _api_header.initModel(sequelize);
  const api_request = _api_request.initModel(sequelize);
  const api_response = _api_response.initModel(sequelize);
  const request_body_form = _request_body_form.initModel(sequelize);
  const request_body_form_x = _request_body_form_x.initModel(sequelize);
  const request_param = _request_param.initModel(sequelize);
  const system_logs = _system_logs.initModel(sequelize);

  achs_menu.belongsTo(achs_menu, { as: "parent", foreignKey: "parent_id"});
  achs_menu.hasMany(achs_menu, { as: "achs_menus", foreignKey: "parent_id"});
  achs_mock.belongsTo(achs_project, { as: "project", foreignKey: "project_id"});
  achs_project.hasMany(achs_mock, { as: "achs_mocks", foreignKey: "project_id"});
  achs_recent.belongsTo(achs_project, { as: "project", foreignKey: "project_id"});
  achs_project.hasMany(achs_recent, { as: "achs_recents", foreignKey: "project_id"});
  achs_star.belongsTo(achs_project, { as: "project", foreignKey: "project_id"});
  achs_project.hasMany(achs_star, { as: "achs_stars", foreignKey: "project_id"});
  api_category.belongsTo(achs_project, { as: "project", foreignKey: "project_id"});
  achs_project.hasMany(api_category, { as: "api_categories", foreignKey: "project_id"});
  achs_project.belongsTo(achs_team, { as: "team", foreignKey: "team_id"});
  achs_team.hasMany(achs_project, { as: "achs_projects", foreignKey: "team_id"});
  achs_team_user.belongsTo(achs_team, { as: "team", foreignKey: "team_id"});
  achs_team.hasMany(achs_team_user, { as: "achs_team_users", foreignKey: "team_id"});
  achs_menu.belongsTo(achs_user, { as: "user", foreignKey: "user_id"});
  achs_user.hasMany(achs_menu, { as: "achs_menus", foreignKey: "user_id"});
  achs_recent.belongsTo(achs_user, { as: "creator", foreignKey: "creator_id"});
  achs_user.hasMany(achs_recent, { as: "achs_recents", foreignKey: "creator_id"});
  achs_star.belongsTo(achs_user, { as: "creator", foreignKey: "creator_id"});
  achs_user.hasMany(achs_star, { as: "achs_stars", foreignKey: "creator_id"});
  achs_team_user.belongsTo(achs_user, { as: "user", foreignKey: "user_id"});
  achs_user.hasMany(achs_team_user, { as: "achs_team_users", foreignKey: "user_id"});
  api_config.belongsTo(achs_user, { as: "creator", foreignKey: "creator_id"});
  achs_user.hasMany(api_config, { as: "api_configs", foreignKey: "creator_id"});
  api_category.belongsTo(api_category, { as: "parent", foreignKey: "parent_id"});
  api_category.hasMany(api_category, { as: "api_categories", foreignKey: "parent_id"});
  api_config.belongsTo(api_category, { as: "category", foreignKey: "category_id"});
  api_category.hasMany(api_config, { as: "api_configs", foreignKey: "category_id"});
  api_request.belongsTo(api_config, { as: "api", foreignKey: "api_id"});
  api_config.hasMany(api_request, { as: "api_requests", foreignKey: "api_id"});
  api_response.belongsTo(api_config, { as: "api", foreignKey: "api_id"});
  api_config.hasMany(api_response, { as: "api_responses", foreignKey: "api_id"});
  api_header.belongsTo(api_request, { as: "request", foreignKey: "request_id"});
  api_request.hasMany(api_header, { as: "api_headers", foreignKey: "request_id"});
  request_body_form.belongsTo(api_request, { as: "request", foreignKey: "request_id"});
  api_request.hasMany(request_body_form, { as: "request_body_forms", foreignKey: "request_id"});
  request_body_form_x.belongsTo(api_request, { as: "request", foreignKey: "request_id"});
  api_request.hasMany(request_body_form_x, { as: "request_body_form_xes", foreignKey: "request_id"});
  request_param.belongsTo(api_request, { as: "request", foreignKey: "request_id"});
  api_request.hasMany(request_param, { as: "request_params", foreignKey: "request_id"});
  api_header.belongsTo(api_response, { as: "response", foreignKey: "response_id"});
  api_response.hasMany(api_header, { as: "api_headers", foreignKey: "response_id"});

  return {
    achs_menu: achs_menu,
    achs_mock: achs_mock,
    achs_project: achs_project,
    achs_recent: achs_recent,
    achs_star: achs_star,
    achs_team: achs_team,
    achs_team_user: achs_team_user,
    achs_user: achs_user,
    api_category: api_category,
    api_config: api_config,
    api_header: api_header,
    api_request: api_request,
    api_response: api_response,
    request_body_form: request_body_form,
    request_body_form_x: request_body_form_x,
    request_param: request_param,
    system_logs: system_logs,
  };
}
