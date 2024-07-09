var DataTypes = require("sequelize").DataTypes;
var _achs_menu = require("./achs_menu");
var _achs_mock = require("./achs_mock");
var _achs_project = require("./achs_project");
var _achs_recent = require("./achs_recent");
var _achs_star = require("./achs_star");
var _achs_team = require("./achs_team");
var _achs_team_user = require("./achs_team_user");
var _achs_user = require("./achs_user");
var _api_category = require("./api_category");
var _api_config = require("./api_config");
var _api_header = require("./api_header");
var _api_request = require("./api_request");
var _api_response = require("./api_response");
var _request_body_form = require("./request_body_form");
var _request_body_form_x = require("./request_body_form_x");
var _request_param = require("./request_param");
var _system_logs = require("./system_logs");

function initModels(sequelize) {
  var achs_menu = _achs_menu(sequelize, DataTypes);
  var achs_mock = _achs_mock(sequelize, DataTypes);
  var achs_project = _achs_project(sequelize, DataTypes);
  var achs_recent = _achs_recent(sequelize, DataTypes);
  var achs_star = _achs_star(sequelize, DataTypes);
  var achs_team = _achs_team(sequelize, DataTypes);
  var achs_team_user = _achs_team_user(sequelize, DataTypes);
  var achs_user = _achs_user(sequelize, DataTypes);
  var api_category = _api_category(sequelize, DataTypes);
  var api_config = _api_config(sequelize, DataTypes);
  var api_header = _api_header(sequelize, DataTypes);
  var api_request = _api_request(sequelize, DataTypes);
  var api_response = _api_response(sequelize, DataTypes);
  var request_body_form = _request_body_form(sequelize, DataTypes);
  var request_body_form_x = _request_body_form_x(sequelize, DataTypes);
  var request_param = _request_param(sequelize, DataTypes);
  var system_logs = _system_logs(sequelize, DataTypes);

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
    achs_menu,
    achs_mock,
    achs_project,
    achs_recent,
    achs_star,
    achs_team,
    achs_team_user,
    achs_user,
    api_category,
    api_config,
    api_header,
    api_request,
    api_response,
    request_body_form,
    request_body_form_x,
    request_param,
    system_logs,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
