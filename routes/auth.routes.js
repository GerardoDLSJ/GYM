const { Router } = require("express");
const usuarios = require("../usuarios.json");
const authRouter = Router();

//Endpoint public (No autenticado y no autorizado)
authRouter.get("/publico", (req, res) => res.send("Endpoint público"));

//Endpoint autenticado
authRouter.post("/autenticacion", (req, res) => {
  // Extraer datos del req.body
  const { email, password } = req.body;
  // Comprobar si alguno viene vació
  if (!email || !password)
    return res.status(400).send(`No has sido autenticado`);
  // Encontrar el usuario por email
  const usuarioEncontrado = usuarios.find(
    (elemento) => elemento.email === email
  );
  // Si no se encontro ningun usuario con ese email
  if (!usuarioEncontrado) {
    res.status(400).send("No has sido autenticado");
    return;
  }
  // Si la contraseña ingresada no coincide con la contraseña del usuario
  if (usuarioEncontrado.password !== password) {
    return res.status(401).send("No has sido autenticado");
  }
  // Si la autenticación es correcta
  res.status(200).send(`Usuario ${email} autenticado`);
});

//Endpoint autorizado

module.exports = authRouter;
