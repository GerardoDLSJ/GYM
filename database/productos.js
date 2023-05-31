const { nuevaConexion } = require("../database/mysql-connection");

function extraerProductos(callback) {
  const connection = nuevaConexion();
  let query = "SELECT * FROM PRODUCTOS";

  connection.query(query, { rowsAsArray: true }, function (err, result) {
    if (err) {
      console.log(err);
      throw err;
    }
    if (result.length === 0) {
      callback([]);
      return;
    }
    connection.end();
    callback(result);
  });
}

function insertarProducto({ titulo, precio, image, descripcion }, callback) {
  const connection = nuevaConexion();
  let query = `CALL SP_AgregarProducto('${titulo}',${precio},'["${image}"]','${descripcion}')`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      callback(400);
      return;
    }
    callback(200);
    connection.end();
  });
}

function actualizarProducto(
  { id, titulo, precio, image, descripcion },
  callback
) {
  const connection = nuevaConexion();
  let query = `UPDATE productos SET titulo = '${titulo}', precio = ${precio}, image = '["${image}"]',descripcion = '${descripcion}'
  WHERE id = ${Number(id)}`;
  connection.query(query, (err, result) => {
    console.log(result);
    if (err) {
      throw err;
    }
    if (result.affectedRows <= 0) {
      callback(400);
      connection.end();
      return;
    }

    callback(200);
    connection.end();
    return;
  });
}

function eliminarProducto({ id }, callback) {
  const connection = nuevaConexion();
  let query = `CALL SP_EliminarProducto(${id})`;
  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    if (result[0][0].rowsAffected <= 0) {
      callback(400);
      connection.end();
      return;
    }

    callback(200);
    connection.end();
    return;
  });
}

module.exports = {
  extraerProductos,
  insertarProducto,
  actualizarProducto,
  eliminarProducto,
};
