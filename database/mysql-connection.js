const mysql = require("mysql2");
require("dotenv").config();

function nuevaConexion() {
  return (connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl: {
      rejectUnauthorized: false,
    },
  }));
}

module.exports = {
  nuevaConexion,
};
