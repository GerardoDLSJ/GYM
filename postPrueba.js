const nuevoSuplemento = {
    id: 100,
    titulo: 'Nuevo Suplemento',
    categoria: 'Categoria Ejemplo',
    precio: '$99.99',
    descripcion: 'Descripción del nuevo suplemento',
    image: [
      'https://www.example.com/images/image1.jpg',
      'https://www.example.com/images/image2.jpg'
    ]
};
  
  fetch('http://localhost:3000/suplemento', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoSuplemento)
  })
    .then(response => {
      if (response.ok) {
        console.log('Suplemento agregado correctamente');
      } else {
        throw new Error('Error al agregar el suplemento');
      }
    })
    .catch(error => {
      console.error(error);
    });
  