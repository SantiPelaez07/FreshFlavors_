
//Funcionalidad de la página de inicio del usuario logueado
//Selectores
const title = document.querySelector(".title");
const exit = document.querySelector("#exit");
const fristContainer = document.querySelector(".frist-container1")
const userLogin = document.querySelector(".dropbtn")
const URL = "http://localhost:3000/users"


//Eventos
document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  const localUser = localStorage.getItem("datas")
  const listLocal = JSON.parse(localUser)
  userLogin.innerHTML = `${listLocal[0].user}`
  getUser()

  const list = {
    id: listLocal.id,
    email: localUser.email,
    user: localUser,
    password: localUser
}

  console.log(`Contraseña: ${localUser}`)

    function getUser() {
      title.innerHTML = ""
      title.innerHTML = `¡Bienvenido ${listLocal[0].user}, estamos ansiosos de verte usando nuestros servicios!`
    }
  })

  exit.addEventListener("click", (event) => {
    event.preventDefault();
    cerraSesion();
  })

function cerraSesion() {
  localStorage.removeItem("datas");
  window.location.href = '/index.html';
}