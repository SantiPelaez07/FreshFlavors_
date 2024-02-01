//Funcionalidad de la página de inicio del usuario logueado
//Selectores
const title = document.querySelector(".title");
const exit = document.querySelector("#exit");
const URL = "http://localhost:3000/users"

//Eventos
document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  getUser()
})

exit.addEventListener("click", (event) => {
  event.preventDefault();
  cerraSesion();
})


function incioUser(data) {
  title.innerHTML = ""
  title.innerHTML = `¡Bienvenido ${data}, estamos ansiosos de verte usando nuestros servicios!`
  console.log(data);
}


async function getUser(data) {
  const response = await fetch(URL, {
    method: "GET"
  });
  const data1 = await response.json();
  for (let i = 0; i <= data1.length; i++) {

    if (data1[i] == data) {
      title.innerHTML = ""
      title.innerHTML = `¡Bienvenido ${data1[i]}, estamos ansiosos de verte usando nuestros servicios!`
      console.log(data1[i]);
    }
  }
}

function cerraSesion() {
  localStorage.removeItem('token');
  window.location.href = '/index.html';
}