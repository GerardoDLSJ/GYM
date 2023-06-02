document.addEventListener("DOMContentLoaded", function () {
  renderSuplementos(""); //Muestra todos
});

async function renderSuplementos(suplemento) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const $suplementos = await fetch(
    `http://localhost:5000/api/suplemento?titulo=${suplemento}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((res) => {
      return templateSuplementos(res.data);
    });

  return $suplementos;
}

function templateSuplementos(suplementos) {
  const fragment = document.createDocumentFragment();
  const $template = document.querySelector(".grid");

  suplementos.forEach((suplemento) => {
   
    var titulo = suplemento.titulo;
    var imagen = suplemento.image;
    var precio = suplemento.precio;
    var descripcion = suplemento.descripcion;

    const $clonItemSuplemento = $template.content.cloneNode(true);
    $clonItemSuplemento.querySelector("#titulo").textContent = titulo;
    $clonItemSuplemento.querySelector("#image").src = imagen;
    $clonItemSuplemento.querySelector("#price").textContent = "$" + precio;
    $clonItemSuplemento.querySelector("article").addEventListener('click', function(){
      document.getElementById('exampleModalLabel').innerHTML = titulo;
    document.getElementById('info_modal').innerHTML = `
    <div>
      <div class="contenedor_mostrar" >
        <div class="mostrar_imagen"><img src="${imagen}" style="height: 8rem; display: flex; justify-items: center; align-items: center;" alt="Imagen"></div>
        <div class="mostrar_descripcion">${descripcion}</div>
      </div>
        <div class="mostrar_precio">Precio: $${precio}</div>
    </div>
    `
    const modalDescripcion = new bootstrap.Modal(
        document.getElementById("modalDescripcion")
      ); 
      modalDescripcion.show();
    });

    fragment.appendChild($clonItemSuplemento);
  });
  const main = document.querySelector(".grid");

  main.appendChild(fragment);
}

document
  .getElementById("main-search")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    const searchInput = document.querySelector(
      '.main-nav__search input[type="search"]'
    ).value;

    const searchTitle = document.querySelector(".spanSuplemento");

    searchTitle.textContent = ": " + searchInput;
    const items = document.querySelectorAll(".grid__item");
    items.forEach((item) => {
      item.remove();
    });
    renderSuplementos(searchInput);
  });



