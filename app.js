const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const infoSuplemento = require("./suplementos.json");

const puerto = 5000;
app.listen(puerto, () => {
  console.log(`El servidor esta escuchando en el puerto ${puerto}`);
});

app.get("/", (req, res) => {
  res.send("Este es una API de suplementos de proteina");
});

// Obtener todos los suplementos
app.get("/suplementos", (req, res) => {
  res.send(infoSuplemento);
});

// Buscar suplemento por título Ejemplo /suplemento?titulo=elite
app.get("/suplemento", (req, res) => {
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
app.get("/suplemento/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const suplemento = infoSuplemento.find((item) => item.id === id);

  if (suplemento) {
    res.send(suplemento);
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Obtener un suplemento por su ID y obtener el titulo
app.get("/suplemento/:id/titulo", (req, res) => {
  const id = parseInt(req.params.id);
  const suplemento = infoSuplemento.find((item) => item.id === id);

  if (suplemento) {
    res.send(suplemento.titulo);
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Obtener un suplemento por su ID y obtener la descripcion
app.get("/suplemento/:id/descripcion", (req, res) => {
  const id = parseInt(req.params.id);
  const suplemento = infoSuplemento.find((item) => item.id === id);

  if (suplemento) {
    res.send(suplemento.descripcion);
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Obtener un suplemento por su ID y obtener el precio
app.get("/suplemento/:id/precio", (req, res) => {
  const id = parseInt(req.params.id);
  const suplemento = infoSuplemento.find((item) => item.id === id);

  if (suplemento) {
    res.send(suplemento.precio);
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Obtener un suplemento por su ID y obtener el imagenes
app.get("/suplemento/:id/imagenes", (req, res) => {
  const id = parseInt(req.params.id);
  const suplemento = infoSuplemento.find((item) => item.id === id);

  if (suplemento) {
    res.send(suplemento.image);
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});

// Agregar un nuevo suplemento
app.post("/suplemento", (req, res) => {
  console.log("Se realizo una peticion");
  console.log(req.body);
  const nuevoSuplemento = req.body;
  infoSuplemento.push(nuevoSuplemento);
  res.send("Suplemento agregado correctamente");
});

// Actualizar un suplemento existente
app.put("/suplemento/:id", (req, res) => {
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
app.delete("/suplemento/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = infoSuplemento.findIndex((item) => item.id === id);

  if (indice !== -1) {
    infoSuplemento.splice(indice, 1);
    res.send("Suplemento eliminado correctamente");
  } else {
    res.status(404).send("Suplemento no encontrado");
  }
});
