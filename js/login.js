document.addEventListener("DOMContentLoaded", () => {
  const inputCorreo = document.querySelector("#correo");
  const inputContrasena = document.querySelector("#contrasena");
  const btnIngresar = document.querySelector(".botonnIniciarSesion");
  const alerta = document.querySelector(".alert");
  btnIngresar.addEventListener("click", autenticar);

  async function autenticar(e) {
    const email = inputCorreo.value;
    const password = inputContrasena.value;
    e.preventDefault();
    const respuesta = await comprobar(email, password);

    if (respuesta !== 200) {
      mostrarAlerta();

      return;
    }
    window.location = "../vistas/admin.html";
  }

  const comprobar = async (email, password) => {
    const url = "http://localhost:5000/auth/autenticacion";
    const datos = {
      email,
      password,
    };
    try {
      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });
      return respuesta.status;
    } catch (error) {
      //   console.log(error);
    }
  };

  const mostrarAlerta = () => {
    if (alerta.classList.contains("d-none")) {
      alerta.classList.remove("d-none");
      setTimeout(() => {
        alerta.classList.add("d-none");
      }, 5000);
    }
  };
});
