require('dotenv').config();
const pg = require('pg');

pg.defaults.ssl = {
  rejectUnauthorized: false,
}

module.exports = {
  development: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
    dialect: 'postgres',
    define: {
      timestamp: true,
      underscored: true
    } 
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'postgresql',
    define: {
      timestamp: true,
      underscored: true
    } 
  }
};