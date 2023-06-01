const { jsPDF } = window.jspdf;
document.addEventListener("DOMContentLoaded", () => {
  const api = "baedc6559501461182186ab3c8ebeb46";
  const resultado = document.querySelector("#resultado");
  const rangoElement = document.querySelector(
    ".contenedor-calorias .form-range"
  );
  const rangoLabel = document.querySelector(".contenedor-calorias .form-label");
  const tipoDieta = document.querySelector("#tipo-dieta");
  const formularioDieta = document.querySelector("#formulario-dieta");
  const plazoDieta = document.querySelector("#plazo-dieta");
  const placeAlert = document.querySelector("#alertPlaceHolder");

  rangoLabel.textContent = `Rango máximo de calorias por dia: ${rangoElement.value}`;

  rangoElement.addEventListener("input", (e) => {
    rangoLabel.textContent = `Rango máximo de calorias por dia: ${e.target.value}`;
  });

  formularioDieta.addEventListener("submit", comprobarCampos);

  function comprobarCampos(e) {
    e.preventDefault();
    if (tipoDieta.value === "" || plazoDieta.value === "") {
      mostrarAlerta("Seleccione todos los campos", "danger");
      return;
    }
    obtenerComidas(tipoDieta.value, plazoDieta.value, rangoElement.value);
  }

  function mostrarAlerta(mensaje, tipo) {
    const alerta = document.querySelector("#divAlert");
    if (alerta) {
      alerta.remove();
    }
    const divAlert = document.createElement("div");
    divAlert.id = "divAlert";
    divAlert.classList.add(
      "text-center",
      "alert",
      "d-block",
      "w-50",
      "p-3",
      "centrar"
    );
    divAlert.textContent = mensaje;
    divAlert.classList.add(`alert-${tipo}`);

    document
      .querySelector("#contenedor-principal")
      .insertBefore(divAlert, document.querySelector("#contenedor-form"));

    setTimeout(() => {
      divAlert.remove();
    }, 3000);
  }

  async function obtenerComidas(tipoDieta, plazoDieta, calorias) {
    const url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${api}&&timeFrame=${plazoDieta}&&targetcalories=${calorias}&&diet=${tipoDieta}`;

    await fetch(url)
      .then((resultado) => resultado.json())
      .then((respuesta) => {
        if (plazoDieta === "week") {
          mostrarDietaSemanal(respuesta.week);
          return;
        }
        mostrarDietaDia(respuesta);
      });
  }

  // MOSTRAR DIETA SEMANAL
  function mostrarDietaSemanal(respuesta = {}) {
    limpiarHTML(resultado);

    const btnDescargar = document.createElement("button");
    btnDescargar.innerHTML = `<i class="fa-solid fa-file-pdf"></i>
                            Descargar PDF`;
    btnDescargar.classList.add("btn", "btn-danger");

    const tabla = document.createElement("TABLE");
    tabla.classList.add("table", "table-bordered", "border-warning");

    const tbody = document.createElement("tbody");

    tbody.classList.add("cuerpo-tabla");

    tabla.innerHTML = `<thead class="encabezado">
                                <th class="text-center">DÍA</th>
                                <th class="text-center">ALMUERZO</th>
                                <th class="text-center">COMIDA</th>
                                <th class="text-center">CENA</th>
                                <th class="text-center">TOTAL CALORÍAS</th>
                               
                          </thead>
                          `;
    for (const day in respuesta) {
      const { meals, nutrients } = respuesta[day];
      const [comidaMañana, comidaTarde, comidaCena] = meals;
      const { calories } = nutrients;

      const tr = document.createElement("tr");

      const tdDia = document.createElement("td");
      tdDia.classList.add("text-uppercase", "fw-bold", "text-center");
      tdDia.textContent = `${day}`;

      const tdAlmuerzo = document.createElement("td");
      tdAlmuerzo.textContent = comidaMañana.title;

      const tdComida = document.createElement("td");
      tdComida.textContent = comidaTarde.title;

      const tdCena = document.createElement("td");
      tdCena.textContent = comidaCena.title;

      const tdCalorias = document.createElement("td");
      tdCalorias.textContent = `${calories}Kcal`;

      tr.appendChild(tdDia);
      tr.appendChild(tdAlmuerzo);
      tr.appendChild(tdComida);
      tr.appendChild(tdCena);
      tr.appendChild(tdCalorias);
      tbody.appendChild(tr);

      tabla.appendChild(tbody);
    }
    resultado.appendChild(btnDescargar);
    resultado.appendChild(tabla);
    btnDescargar.addEventListener("click", () => descargarPDF("Semanal"));
  }

  // MOSTRAR COMIDAS DE UN SOLO DIA
  function mostrarDietaDia({ meals, nutrients }) {
    limpiarHTML(resultado);
    const tabla = document.createElement("TABLE");
    const tbody = document.createElement("tbody");
    tbody.classList.add("cuerpo-tabla");
    tabla.classList.add("table", "table-bordered");

    const btnDescargar = document.createElement("button");
    btnDescargar.innerHTML = `<i class="fa-solid fa-file-pdf"></i>
                            Descargar PDF`;
    btnDescargar.classList.add("btn", "btn-danger");

    tabla.innerHTML = `<thead class="encabezado">
                                <th class="text-center"></th>
                                <th class="text-center">Almuerzo</th>
                                <th class="text-center">Comida</th>
                                <th class="text-center">Cena</th>
                                <th class="text-center">Total Calorias</th>
                               
                      </thead>
        `;
    console.log(meals);
    console.log(nutrients);
    const [almuerzo, comida, cena] = meals;
    const { calories } = nutrients;
    const tr = document.createElement("tr");

    const tdDia = document.createElement("td");
    tdDia.classList.add("text-uppercase", "fw-bold", "text-center");
    tdDia.textContent = `Comidas`;

    const tdAlmuerzo = document.createElement("td");
    tdAlmuerzo.textContent = almuerzo.title;

    const tdComida = document.createElement("td");
    tdComida.textContent = comida.title;

    const tdCena = document.createElement("td");
    tdCena.textContent = cena.title;

    const tdCalorias = document.createElement("td");
    tdCalorias.textContent = `${calories}kcal`;

    tr.appendChild(tdDia);
    tr.appendChild(tdAlmuerzo);
    tr.appendChild(tdComida);
    tr.appendChild(tdCena);
    tr.appendChild(tdCalorias);
    tbody.appendChild(tr);

    tabla.appendChild(tbody);
    resultado.appendChild(btnDescargar);
    resultado.appendChild(tabla);

    btnDescargar.addEventListener("click", () => descargarPDF("Dia"));
  }

  function limpiarHTML(elemento) {
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
  }

  function descargarPDF(tipo) {
    const tabla = document.querySelector(".table");
    const doc = new jsPDF();

    doc.autoTable({ html: ".table", styles: { halign: "center" } });

    doc.save(`Dieta_${tipo}.pdf`);
  }
});
