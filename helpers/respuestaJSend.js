const respuestaExitosa = (tipo = "", data = {}) => {
  return {
    status: tipo,
    data,
  };
};

const respuestaError = (mensaje, data, codigo) => {
  return {
    status: "error",
    message: mensaje,
    data,
    code: codigo,
  };
};

module.exports = { respuestaExitosa, respuestaError };
