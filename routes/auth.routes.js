const { Router } = require("express");
const usuarios = require("../usuarios.json");
const authRouter = Router();
const { comprobarCredenciales } = require("../database/admin");
//Endpoint public (No autenticado y no autorizado)
authRouter.get("/publico", (req, res) => res.send("Endpoint público"));

//Endpoint autenticado
authRouter.post("/autenticacion", (req, res) => {
  // Extraer datos del req.body
  // Comprobar si alguno viene vació
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send(`No has sido autenticado`);

  comprobarCredenciales({ email, password }, (codigo) => {
    if (codigo !== 200) {
      return res.status(401).send(`No has sido autenticado`);
    }

    res.status(200).send(`Usuario autenticado`);
  });
});

module.exports = authRouter;
