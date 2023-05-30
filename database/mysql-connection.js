const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sgbdgera",
  database: "GYMWEB",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = connection;
