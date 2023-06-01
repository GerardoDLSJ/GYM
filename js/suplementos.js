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
      console.log(res);
      return templateSuplementos(res);
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

    const $clonItemSuplemento = $template.content.cloneNode(true);

    $clonItemSuplemento.querySelector("#titulo").textContent = titulo;
    $clonItemSuplemento.querySelector("#image").src = imagen;
    $clonItemSuplemento.querySelector("#price").textContent = precio;

    fragment.appendChild($clonItemSuplemento);
  });
  console.log(fragment);

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
