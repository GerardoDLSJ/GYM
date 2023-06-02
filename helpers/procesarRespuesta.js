function procesarRespuesta(resultado) {
  return (procesado = resultado.map((element) => {
    if (element.image[0] !== "[") {
      return element;
    }
    const array = JSON.parse(element.image);
    return { ...element, image: array };
  }));
}

const manejarRespuesta = (resultado) => {
  return new Promise((resolve, reject) => {
    if (resultado.length > 0) {
      resolve((procesado = procesarRespuesta(resultado)));
    } else {
      reject("No encontrado");
    }
  });
};

module.exports = {
  procesarRespuesta,
  manejarRespuesta,
};
