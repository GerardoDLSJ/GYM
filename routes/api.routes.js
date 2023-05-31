const express = require("express");
const { Router } = require("express");
const infoSuplemento = require("../suplementos.json");
const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.send("Este es una API de suplementos de proteina");
});

// Obtener todos los suplementos
apiRouter.get("/suplementos", (req, res) => {
  res.send(infoSuplemento);
});

// Buscar suplemento por título Ejemplo /suplemento?titulo=elite
apiRouter.get("/suplemento", (req, res) => {
  const tituloBuscado = req.query.titulo.toLowerCase(); // Buscasr sin importar si es mayuscula o minuscula
  const suplementosEncontrados = infoSuplemento.filter((suplemento) =>
    suplemento.titulo.toLowerCase().includes(tituloBuscado)
  );

  if (suplementosEncontrados.length > 0) {
    res.send(suplementosEncontrados);
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Obtener un suplemento por su ID
apiRouter.get("/suplemento/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const suplemento = infoSuplemento.find((item) => item.id === id);

  if (suplemento) {
    res.send(suplemento);
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Obtener un suplemento por su ID y obtener el titulo
apiRouter.get("/suplemento/:id/titulo", (req, res) => {
  const id = parseInt(req.params.id);
  const suplemento = infoSuplemento.find((item) => item.id === id);

  if (suplemento) {
    res.send(suplemento.titulo);
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Obtener un suplemento por su ID y obtener la descripcion
apiRouter.get("/suplemento/:id/descripcion", (req, res) => {
  const id = parseInt(req.params.id);
  const suplemento = infoSuplemento.find((item) => item.id === id);

  if (suplemento) {
    res.send(suplemento.descripcion);
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Obtener un suplemento por su ID y obtener el precio
apiRouter.get("/suplemento/:id/precio", (req, res) => {
  const id = parseInt(req.params.id);
  const suplemento = infoSuplemento.find((item) => item.id === id);

  if (suplemento) {
    res.send(suplemento.precio);
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Obtener un suplemento por su ID y obtener el imagenes
apiRouter.get("/suplemento/:id/imagenes", (req, res) => {
  const id = parseInt(req.params.id);
  const suplemento = infoSuplemento.find((item) => item.id === id);

  if (suplemento) {
    res.send(suplemento.image);
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Agregar un nuevo suplemento
apiRouter.post("/suplemento", (req, res) => {
  console.log("Se realizo una peticion");
  console.log(req.body);
  const nuevoSuplemento = req.body;
  infoSuplemento.push(nuevoSuplemento);
  res.send("Suplemento agregado correctamente");
});

// Actualizar un suplemento existente
apiRouter.put("/suplemento/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const suplementoActualizado = req.body;
  const indice = infoSuplemento.findIndex((item) => item.id === id);

  if (indice !== -1) {
    infoSuplemento[indice] = suplementoActualizado;
    res.send("Suplemento actualizado correctamente");
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Eliminar un suplemento
apiRouter.delete("/suplemento/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = infoSuplemento.findIndex((item) => item.id === id);

  if (indice !== -1) {
    infoSuplemento.splice(indice, 1);
    res.send("Suplemento eliminado correctamente");
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

module.exports = apiRouter;
