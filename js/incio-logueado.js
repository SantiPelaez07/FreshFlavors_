
//Funcionalidad de la página de inicio del usuario logueado
//Selectores
const title = document.querySelector(".title");
const exit = document.getElementById("exit");
const option = document.querySelector("#salir")
const fristContainer = document.querySelector(".frist-container1")
const URL = "http://localhost:3000/users"


//Eventos
document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  const localUser = localStorage.getItem("datas")
  const listLocal = JSON.parse(localUser)

  const list = {
    id: listLocal.id,
    email: localUser.email,
    user: localUser,
    password: localUser
}

  console.log(`Contraseña: ${localUser  }`)
  // listLocal = JSON.parse(localUser)
  // console.log(listLocal);
  getUser()
  // selectPerfil();
  
// exit.addEventListener("click", (event) => {
//        event.preventDefault();
//        cerraSesion();
//      })
     

    function getUser() {
      title.innerHTML = ""
      title.innerHTML = `¡Bienvenido ${localUser[0].user}, estamos ansiosos de verte usando nuestros servicios!`
    }
  })

// let i, name
// for (i=0; i <= data1.length; i++) {

//   if (data1[i] == data) {
//     name = data1[i]
//   }

function cerraSesion() {
  localStorage.removeItem('token');
  window.location.href = '/index.html';
}