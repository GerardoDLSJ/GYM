const { Router } = require("express");
const authRouter = Router();
const controllerAuth = require("../controllers/auth");

//Endpoint public (No autenticado)
authRouter.get("/", controllerAuth.rutaPublica);

//Endpoint autenticado
authRouter.post("/autenticacion", controllerAuth.comprobarUsuario);

module.exports = authRouter;
