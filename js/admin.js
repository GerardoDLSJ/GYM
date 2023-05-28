const menuIzquierdo = document.querySelector(".menu-izquierdo");

menuIzquierdo.addEventListener("click", (e) => {
  //string
  const claseMenu = e.target.classList;

  // Selecciona el contenedor
  const contenedor = document.querySelector(".pagina"),
    flechaIzq = document.querySelector(".fa-arrow-left"),
    flechaDer = document.querySelector(".fa-arrow-right");

  if (claseMenu.contains("fa-arrow-left")) {
    // cerrar el menú lateral
    contenedor.classList.add("no-menu");
    e.target.style.display = "none";
    flechaDer.style.display = "block";
  } else if (claseMenu.contains("fa-arrow-right")) {
    contenedor.classList.remove("no-menu");
    e.target.style.display = "none";
    flechaIzq.style.display = "block";
  }
});

// ESTE EVENTO CARGA EL AÑADIR
agregarSuplementoBoton.addEventListener("click", cargarFormularioSuplemento);

function cargarFormularioSuplemento() {
  const $main = document.getElementById("root");
  limpiarElementoHTML($main);
  //TODO: Poner este codigo en el modal
  //   const formulario = document.createElement("form");
  //   formulario.classList.add("formulario");
  //   formulario.innerHTML = `
  //             <h2>AÑADIR SUPLEMENTO</h2>
  //             <input class="formulario-campo" type="url" placeholder="URL imagen" required />
  //             <input  class="formulario-campo" type="text" placeholder="Nombre del suplemento" required />
  //             <input  class="formulario-campo" type="text" placeholder="Costo" required/>
  //             <input type="submit" value="GUARDAR">
  //   `;

  $main.innerHTML = `
    <h2>SUPLEMENTOS</h2>
    <div>
    
    </div>
  `;
}

limpiarElementoHTML = (elemento) => {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
};

function construirModal() {}
