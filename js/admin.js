//Agregar link de api
const url = "http://127.0.0.1:5000/api/suplementos/";
const contenedor = document.querySelector("tbody");
let resultados = "";

const modalArticulo = new bootstrap.Modal(
  document.getElementById("modalArticulo")
);
const formArticulo = document.querySelector("form");
const URLimg = document.getElementById("URLimg");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const costo = document.getElementById("costo");
const btnGuardar = document.querySelector(".btnGuardarEstilo");
let opcion = "";

btnCrear.addEventListener("click", () => {
  URLimg.value = "";
  nombre.value = "";
  descripcion.value = "";
  costo.value = "";
  modalArticulo.show();
  opcion = "crear";
});

//Funcion para mostrar los resultados
const mostrar = (articulos) => {
  articulos.forEach((articulo) => {
    resultados += `
    <tr>
        <td>${articulo.id}</td>
        <td><img src="${articulo.image}" style="height: 5rem; display: flex; justify-items: center; align-items: center;" alt="Imagen"></td>
        <td>${articulo.titulo}</td>
        <td>${articulo.descripcion}</td>
        <td>${articulo.precio}</td>
        <td class="text-center">
          <a class="btnEditar btn btn-primary" onclick="edit('${articulo.id}','${articulo.image}','${articulo.titulo}','${articulo.descripcion}','${articulo.precio}')">Editar</a>
          <a class="btnEliminar btn btn-danger">Eliminar</a>
        </td>
    </tr>
    `;
  });
  contenedor.innerHTML = resultados;
};

//Procedimiento  mostrar
fetch(url)
  .then((response) => response.json())
  .then((data) => mostrar(data))
  .catch((error) => console.log("error url", error));

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

//Procedimeinto borrar
on(document, "click", ".btnEliminar", (e) => {
  const fila = e.target.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  alertify.confirm(
    "¿Estas seguro que quieres eliminar el producto?",
    function () {
      fetch(url + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => location.reload());
      alertify.success("Eliminado");
    },
    function () {
      alertify.error("Cencelado");
    }
  );
});

//Procedimeinto editar
let idform = 0;

function edit(id, img, titulo, des, precio) {
  idform = id;
  URLimg.value = img;
  nombre.value = titulo;
  descripcion.value = des;
  costo.value = precio.replace("$", "");
  opcion = "editar";

  modalArticulo.show();
}

//Procedimiento para crear y editar
btnGuardar.addEventListener("click", (e) => {
  e.preventDefault();
  if (opcion == "crear") {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        URLimg: URLimg.value,
        nombre: nombre.value,
        descripcion: descripcion.value,
        costo: costo.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const nuevoArticulo = [];
        nuevoArticulo.push(data);
        mostrar(nuevoArticulo);
      });
  }
  if (opcion == "editar") {
    fetch(`http://127.0.0.1:5000/api/suplemento/${idform}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idform,
        titulo: nombre.value,
        precio: costo.value.toString(),
        descripcion: descripcion.value,
        image: URLimg.value,
      }),
    }).then((response) => location.reload());
  }
  modalArticulo.hide();
});

//BUSCADOR
(function (document) {
  "bucador";

  var LightTableFilter = (function (Arr) {
    var _input;

    function _onInputEvent(e) {
      _input = e.target;
      var tables = document.getElementsByClassName(
        _input.getAttribute("data-table")
      );
      Arr.forEach.call(tables, function (table) {
        Arr.forEach.call(table.tBodies, function (tbody) {
          Arr.forEach.call(tbody.rows, _filter);
        });
      });
    }
    function _filter(row) {
      var text = row.textContent.toLowerCase(),
        val = _input.value.toLowerCase();
      row.style.display = text.indexOf(val) === -1 ? "none" : "table-row";
    }

    return {
      init: function () {
        var inputs = document.getElementsByClassName("light-table-filter");
        Arr.forEach.call(inputs, function (input) {
          input.oninput = _onInputEvent;
        });
      },
    };
  })(Array.prototype);

  document.addEventListener("readystatechange", function () {
    if (document.readyState === "complete") {
      LightTableFilter.init();
    }
  });
})(document);
