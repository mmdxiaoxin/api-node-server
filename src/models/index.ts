import sequelize from "../config/database";
import { initModels } from "./init-models";
const models = initModels(sequelize);

export default models;
