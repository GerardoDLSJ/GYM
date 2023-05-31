const { Router } = require("express");
const infoSuplemento = require("../suplementos.json");
const {
  extraerProductos,
  insertarProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../database/productos");
const {
  procesarRespuesta,
  manejarRespuesta,
} = require("../helpers/procesarRespuesta");
const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.send("Este es una API de suplementos de proteina");
});

// Obtener todos los suplementos
apiRouter.get("/suplementos", (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      res.status(200).send(procesado);
    } catch (error) {
      console.log(error);
      res.status(404).send("Suplemento no encontrado");
    }
  });
});

// Buscar suplemento por título Ejemplo /suplemento?titulo=elite
apiRouter.get("/suplemento", (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const tituloBuscado = req.query.titulo.toLowerCase(); // Buscasr sin importar si es mayuscula o minuscula
      const suplementosEncontrados = procesado.filter((suplemento) =>
        suplemento.titulo.toLowerCase().includes(tituloBuscado)
      );
      if (suplementosEncontrados.length > 0) {
        res.status(200).send(suplementosEncontrados);
      } else {
        res.status(404).send("Suplemento no encontrado");
      }
    } catch (error) {
      res.status(404).send("Suplemento no encontrado");
    }
  });
});

// Obtener un suplemento por su ID
apiRouter.get("/suplemento/:id", (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const id = parseInt(req.params.id);
      const suplemento = procesado.find((item) => item.id === id);

      if (suplemento) {
        res.send(suplemento);
      } else {
        res.status(404).send("Suplemento no encontrado");
      }
    } catch (error) {
      res.status(404).send("Suplemento no encontrado");
    }
  });
});

// Obtener un suplemento por su ID y obtener el titulo
apiRouter.get("/suplemento/:id/titulo", (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const id = parseInt(req.params.id);
      const suplemento = procesado.find((item) => item.id === id);

      if (suplemento) {
        res.send(suplemento.titulo);
      } else {
        res.status(404).send("Suplemento no encontrado");
      }
    } catch (error) {
      res.status(404).send("Suplemento no encontrado");
    }
  });
});

// Obtener un suplemento por su ID y obtener la descripcion
apiRouter.get("/suplemento/:id/descripcion", async (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const id = parseInt(req.params.id);
      const suplemento = procesado.find((item) => item.id === id);

      if (suplemento) {
        res.send(suplemento.descripcion);
      } else {
        res.status(404).send("Suplemento no encontrado");
      }
    } catch (error) {
      res.status(404).send("Suplemento no encontrado");
    }
  });
});

// Obtener un suplemento por su ID y obtener el precio
apiRouter.get("/suplemento/:id/precio", (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const id = parseInt(req.params.id);
      const suplemento = procesado.find((item) => item.id === id);
      if (suplemento) {
        res.send(suplemento.precio);
      } else {
        res.status(404).send("Suplemento no encontrado");
      }
    } catch (error) {
      res.status(404).send("Suplemento no encontrado");
    }
  });
});

// Obtener un suplemento por su ID y obtener el imagenes
apiRouter.get("/suplemento/:id/imagenes", (req, res) => {
  extraerProductos(async (resultado) => {
    try {
      const procesado = await manejarRespuesta(resultado);
      const id = parseInt(req.params.id);
      const suplemento = procesado.find((item) => item.id === id);
      if (suplemento) {
        res.send(suplemento.image);
      } else {
        res.status(404).send("Suplemento no encontrado");
      }
    } catch (error) {
      res.status(404).send("Suplemento no encontrado");
    }
  });
});

// Agregar un nuevo suplemento
apiRouter.post("/suplemento", (req, res) => {
  console.log("Se realizo una peticion");
  insertarProducto(req.body, (codigo) => {
    if (codigo !== 200) {
      return res.status(400).send("No se pudo insertar los datos");
    }
    return res.status(200).send("Suplemento insertado correctamente");
  });
});

// Actualizar un suplemento existente
apiRouter.put("/suplemento/:id", (req, res) => {
  const id = parseInt(req.params.id);
  actualizarProducto(req.body, (codigo) => {
    if (codigo !== 200) {
      return res.status(404).send("Suplemento no encontrado");
    }
    return res.status(200).send("Registro actualizado correctamente");
  });
});

// Eliminar un suplemento
apiRouter.delete("/suplemento/:id", (req, res) => {
  const id = parseInt(req.params.id);
  eliminarProducto({ id }, (codigo) => {
    console.log(codigo);
    if (codigo !== 200) return res.status(404).send("Suplemento no encontrado");

    return res.status(200).send("Suplemento eliminado correctamente");
  });
});

module.exports = apiRouter;
