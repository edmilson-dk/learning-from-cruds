import { Sequelize } from 'sequelize';
import config from "./config";

const env = process.env.NODE_ENV || "development";
const url = config.url || process.env.DATABSE_URL;

const sequelize = new Sequelize(url, config);