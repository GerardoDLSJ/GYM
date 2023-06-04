const {
  extraerProductos,
  insertarProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../database/productos");
const {
  respuestaExitosa,
  respuestaError,
} = require("../helpers/respuestaJSend");
const { manejarRespuesta } = require("../helpers/procesarRespuesta");

const apiController = {};

apiController.apiDefault = (req, res) => {
  res.send("Este es una API de suplementos de proteina");
};

apiController.obtenerSuplementos = (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      res.status(200).json(respuestaExitosa("success", procesado));
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json(
          respuestaExitosa("fail", { mensaje: "No se encontraron resultados" })
        );
    }
  });
};

apiController.obtenerSuplementoTitulo = (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const tituloBuscado = req.query.titulo.toLowerCase(); // Buscasr sin importar si es mayuscula o minuscula
      const suplementosEncontrados = procesado.filter((suplemento) =>
        suplemento.titulo.toLowerCase().includes(tituloBuscado)
      );
      if (suplementosEncontrados.length > 0) {
        res
          .status(200)
          .json(respuestaExitosa("success", suplementosEncontrados));
      } else {
        res.status(404).json(
          respuestaExitosa("fail", {
            mensaje: "No se encontraron resultados",
          })
        );
      }
    } catch (error) {
      res.status(404).json(
        respuestaExitosa("fail", {
          mensaje: "No se encontraron resultados",
        })
      );
    }
  });
};

apiController.obtenerSuplementoPorID = (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const id = parseInt(req.params.id);
      const suplemento = procesado.find((item) => item.id === id);

      if (suplemento) {
        res.status(200).json(respuestaExitosa("success", suplemento));
      } else {
        res.status(404).json(
          respuestaExitosa("fail", {
            mensaje: "No se encontraron resultados",
          })
        );
      }
    } catch (error) {
      res.status(404).json(
        respuestaExitosa("fail", {
          mensaje: "No se encontraron resultados",
        })
      );
    }
  });
};

apiController.obtenerTituloPorID = (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const id = parseInt(req.params.id);
      const suplemento = procesado.find((item) => item.id === id);

      if (suplemento) {
        res.status(200).json(respuestaExitosa("success", suplemento.titulo));
      } else {
        res.status(404).json(
          respuestaExitosa("fail", {
            mensaje: "No se encontraron resultados",
          })
        );
      }
    } catch (error) {
      res.status(404).json(
        respuestaExitosa("fail", {
          mensaje: "No se encontraron resultados",
        })
      );
    }
  });
};

apiController.obtenerDescripcionPorID = (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const id = parseInt(req.params.id);
      const suplemento = procesado.find((item) => item.id === id);

      if (suplemento) {
        res
          .status(200)
          .json(respuestaExitosa("success", suplemento.descripcion));
      } else {
        res.status(404).json(
          respuestaExitosa("fail", {
            mensaje: "No se encontraron resultados",
          })
        );
      }
    } catch (error) {
      res.status(404).json(
        respuestaExitosa("fail", {
          mensaje: "No se encontraron resultados",
        })
      );
    }
  });
};

apiController.obtenerPrecioPorID = (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const id = parseInt(req.params.id);
      const suplemento = procesado.find((item) => item.id === id);
      if (suplemento) {
        res.status(200).json(respuestaExitosa("success", suplemento.precio));
      } else {
        res.status(404).json(
          respuestaExitosa("fail", {
            mensaje: "No se encontraron resultados",
          })
        );
      }
    } catch (error) {
      res.status(404).json(
        respuestaExitosa("fail", {
          mensaje: "No se encontraron resultados",
        })
      );
    }
  });
};

apiController.obtenerImagenesPorID = (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const id = parseInt(req.params.id);
      const suplemento = procesado.find((item) => item.id === id);
      if (suplemento) {
        res.status(200).json(respuestaExitosa("success", suplemento.image));
      } else {
        res.status(404).json(
          respuestaExitosa("fail", {
            mensaje: "No se encontraron resultados",
          })
        );
      }
    } catch (error) {
      res.status(404).json(
        respuestaExitosa("fail", {
          mensaje: "No se encontraron resultados",
        })
      );
    }
  });
};

apiController.agregarNuevoSuplemento = (req, res) => {
  console.log("Se realizo una peticion");
  insertarProducto(req.body, (codigo) => {
    if (codigo !== 200) {
      return res.status(codigo).json(
        respuestaExitosa("fail", {
          mensaje:
            "No se ha podido agregar el registro verifique los datos ingresados. Todos los campos son requeridos",
        })
      );
    }
    return res.status(200).json(
      respuestaExitosa("success", {
        mensaje: "Registro insertado correctamente",
      })
    );
  });
};

apiController.actualizarSuplemento = (req, res) => {
  const id = parseInt(req.params.id);
  actualizarProducto(req.body, id, (codigo) => {
    if (codigo !== 200) {
      return res.status(codigo).json(
        respuestaExitosa("fail", {
          mensaje: "Suplemento no encontrado",
        })
      );
    }
    return res.status(200).json(
      respuestaExitosa("success", {
        mensaje: "Registro actualizado correctamente",
      })
    );
  });
};

apiController.eliminarSuplemento = (req, res) => {
  const id = parseInt(req.params.id);
  eliminarProducto({ id }, (codigo) => {
    console.log(codigo);
    if (codigo !== 200)
      return res.status(codigo).json(
        respuestaExitosa("fail", {
          mensaje: "Suplemento no encontrado",
        })
      );

    return res.status(200).json(
      respuestaExitosa("success", {
        mensaje: "Registro eliminado correctamente",
      })
    );
  });
};

module.exports = apiController;
