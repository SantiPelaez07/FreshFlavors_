const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container")
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");


sign_up_btn.addEventListener("click",(e) => {
  e.preventDefault()
  container.classList.toggle("sign-up-mode");
});

sign_in_btn.addEventListener("click",(e) => {
  e.preventDefault()
  container.classList.toggle("sign-up-mode");
});

sign_up_btn2.addEventListener("click",(e) => {
  e.preventDefault()
container.classList.toggle("sign-up-mode2");
});

sign_in_btn2.addEventListener("click",(e) => {
  e.preventDefault()
container.classList.toggle("sign-in-mode2");
});







//Formularios


const formularioRegistro = document.querySelector(".sign-up-form")
const formularioLogin = document.querySelector(".sign-in-form")

formularioRegistro.addEventListener("submit", async (e) => {
  e.preventDefault();
  await obtenerDataRegistro();
  validarLogin();
})


async function obtenerDataRegistro() {
  const user = document.getElementById("sign-up-user").value;
  const password = document.getElementById("sign-up-password").value;

  const URL = "http://localhost:3000/users";

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, password })
    });

    if (response.ok) {
      alert("wepaaa")
      console.log("Usuario registrado exitosamente");
      // Puedes realizar acciones adicionales aquí después de un registro exitoso.
    } else {
      console.error("Error al registrar el usuario");
      // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje al usuario.
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    // Puedes manejar errores de red u otros aquí.
  }
}









