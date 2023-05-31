const { nuevaConexion } = require("../database/mysql-connection");

function comprobarCredenciales({ email, password }, callback) {
  const connection = nuevaConexion();
  const query = `SELECT correo , contrasena FROM ADMINISTRADOR WHERE correo = '${email}' AND contrasena = '${password}';`;

  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length <= 0) {
      callback(401);
      connection.end();
      return;
    }

    callback(200);
    connection.end();
  });
}

module.exports = {
  comprobarCredenciales,
};
