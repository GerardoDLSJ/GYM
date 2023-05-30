const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes/api.routes");
const authRouter = require("./routes/auth.routes");
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", apiRouter);
// Auth
app.use("/auth/", authRouter);
const puerto = 5000;
app.listen(puerto, () => {
  console.log(`El servidor esta escuchando en el puerto ${puerto}`);
});
