const mysql = require("mysql2");
const connection = require("./mysql-connection");

function abrirConexión() {
  connection.connect((err) => {
    if (err) throw err;
    console.log("conectado");
  });
}

function consultarAdministrador(email, password) {
  abrirConexión();
  connection;
}

const consulta = `SELECT * FROM administrador`;

connection.query(consulta, (err, result, field) => {
  console.log(result);
});
