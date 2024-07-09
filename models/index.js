const sequelize = require('../config/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

module.exports = models;
