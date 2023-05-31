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

const encontrarPorId = async () => {
  try {
    const procesado = await manejarRespuesta(resultado);
    const id = parseInt(req.params.id);
    const suplemento = procesado.find((item) => item.id === id);
  } catch (error) {
    throw new error("No encontrado");
  }
};

module.exports = {
  procesarRespuesta,
  manejarRespuesta,
};
