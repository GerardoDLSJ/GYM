const { comprobarCredenciales } = require("../database/admin");
const {
  respuestaExitosa,
  respuestaError,
} = require("../helpers/respuestaJSend");
const controllerAuth = {};

controllerAuth.rutaPublica = (req, res) =>
  res.status(200).json({ msg: "Endpoint público" });

controllerAuth.comprobarUsuario = (req, res) => {
  // Extraer datos del req.body
  // Comprobar si alguno viene vació
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json(
      respuestaExitosa("fail", {
        email: "El correo es requerido",
        password: "La contraseña es requerida",
      })
    );

  comprobarCredenciales({ email, password }, (codigo) => {
    if (codigo !== 200) {
      return res
        .status(401)
        .json(respuestaExitosa("fail", { mensaje: "Usuario no autenticado" }));
    }

    res.status(200).json(
      respuestaExitosa("success", {
        mensaje: "Usuario autenticado correctamente",
      })
    );
  });
};

module.exports = controllerAuth;
