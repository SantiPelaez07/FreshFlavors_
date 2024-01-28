
document.addEventListener('DOMContentLoaded', function() {
  const name = document.querySelector(".suscription");
  const usuario = localStorage.getItem('usuario');
  if (usuario) {
    name.style.color = "black"
    name.style.fontWeight = 'bold';
    name.innerHTML = `${usuario}`;
    localStorage.removeItem('usuario');

      Swal.fire({
        title: `Bienvenido ${usuario}`,
        icon: "info"
      })


    // Limpiar después de usarlo
  }
});
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

formularioLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = document.getElementById("sign-in-user").value;
  const password = document.getElementById("sign-in-password").value;

  const URL = "http://localhost:3000/users"; 

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const usuarioValido = data.find((entry) => entry.user === user && entry.password === password);

    if (usuarioValido) {
      Swal.fire({
        title: "Inicio de sesión exitoso",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          localStorage.setItem('usuario', user);
          window.location.href = '../index.html';
        } 
      })     
    }else{
      Swal.fire({
        title: "Usuario no registrado",
        icon: "error"
      });
    }

  } catch (error) {
    console.error("Error al obtener datos del servidor:", error);
  }
} )




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
      Swal.fire({
        title: "Registro exitoso",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          location.reload(); 
        }
        
      })
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









