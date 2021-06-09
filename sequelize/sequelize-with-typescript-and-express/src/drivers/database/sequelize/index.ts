import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];

const sequelize = new Sequelize(config);

const db = {
  sequelize,
  Sequelize,
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export = db;