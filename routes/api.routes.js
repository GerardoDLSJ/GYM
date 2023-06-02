const { Router } = require("express");
const apiController = require("../controllers/api");

const apiRouter = Router();

// RUTA DEFAULT
apiRouter.get("/", apiController.apiDefault);

// Obtener todos los suplementos
apiRouter.get("/suplementos", apiController.obtenerSuplementos);

// Buscar suplemento por título Ejemplo /suplemento?titulo=elite
apiRouter.get("/suplemento", apiController.obtenerSuplementoTitulo);

// Obtener un suplemento por su ID
apiRouter.get("/suplemento/:id", apiController.obtenerSuplementoPorID);

// Obtener un suplemento por su ID y obtener el titulo
apiRouter.get("/suplemento/:id/titulo", apiController.obtenerTituloPorID);

// Obtener un suplemento por su ID y obtener la descripcion
apiRouter.get(
  "/suplemento/:id/descripcion",
  apiController.obtenerDescripcionPorID
);

// Obtener un suplemento por su ID y obtener el precio
apiRouter.get("/suplemento/:id/precio", apiController.obtenerPrecioPorID);

// Obtener un suplemento por su ID y obtener el imagenes
apiRouter.get("/suplemento/:id/imagenes", apiController.obtenerImagenesPorID);

// Agregar un nuevo suplemento
apiRouter.post("/suplemento", apiController.agregarNuevoSuplemento);

// Actualizar un suplemento existente
apiRouter.put("/suplemento/:id", apiController.actualizarSuplemento);

// Eliminar un suplemento
apiRouter.delete("/suplemento/:id", apiController.eliminarSuplemento);

module.exports = apiRouter;
