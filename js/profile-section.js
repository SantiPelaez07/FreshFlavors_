let listLocal;

//Botón de cancelar
const btnCancelar = document.querySelector(".btn-default");

//Button save Changes
const saveChanges = document.querySelector(".btn-primary")

//Sexo de la persona
const seleccionSexo = document.querySelector(".custom-select")

//Contraseña
  const contraseñaActual = document.getElementById("contraseña-actual");
  const nuevaContraseña = document.getElementById("nueva-contraseña");
  const confirmacionNuevaContraseña = document.getElementById("confirmacion-nueva-contraseña");


btnCancelar.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "/login_users.html"
  
})


seleccionSexo.addEventListener("input", (e) => {
  e.preventDefault();
    const imagenASeleccionar = document.querySelector(".img_sexo")
  if (seleccionSexo.value === "Mujer") {
    imagenASeleccionar.src = "../imagenes/imagenes-m-h/m.png";
  } else {
    imagenASeleccionar.src = "../imagenes/imagenes-m-h/h.png";
  }
})


//Todo correcto
//Eventos
document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();


    const inputUser = document.querySelector(".input-usuario")
    const inputEmail = document.querySelector(".input-email")


    const localUser = localStorage.getItem("datas")
    const listLocal = JSON.parse(localUser)
    getUser()
  
  
      function getUser() {
        inputUser.value = ""
        inputUser.value = `${listLocal[0].user}`

        inputEmail.value = "";
        inputEmail.value = `${listLocal[0].email}` 
      }

      const titleInicio = document.querySelector(".titleInicio")
      titleInicio.innerHTML =`User profile | ${listLocal[0].user}`
  
      const userLogin = document.querySelector(".dropbtn");
      userLogin.innerHTML = `${listLocal[0].user}`



saveChanges.addEventListener("click", (e) => {
  e.preventDefault();

  validarContraseña();
  editarDBJson();
})






function validarContraseña() {

  // if (!nuevaContraseña.value  && !confirmacionNuevaContraseña.value && !contraseñaActual.value) {
  //   editarDBJson(); 
  // }


  // console.log(contraseñaActual.value);
  // console.log(listLocal[0].password)

  if (contraseñaActual.value !== listLocal[0].password) {
    showAlert("La contraseña actual no es correcta")
    return
  }

  const { validated: validatedSegurity, message: messageError } = validatePasswordSegurity();


  if (!validatedSegurity) {
      showAlert(messageError)
      return
  }

  if (nuevaContraseña.value !== confirmacionNuevaContraseña.value) {
    showAlert("Las contraseñas no coinicden");
    return
  }

  showAlert("La contraseña fue cambiada con éxito", "¡Todo correcto!", "success" )
  contraseñaActual.value = "";
  nuevaContraseña.value = "";
  confirmacionNuevaContraseña.value = "";

}
 })





 function validatePasswordSegurity(){




  if (!nuevaContraseña.value  || !confirmacionNuevaContraseña.value) {
    return {validated: false, message: "Campos vacíos"}
  }


  //Deseamos que el usuario cree su registro apartir de una serie de exigencia para la seguridad de su contraseña, con esta funcion hacemos uso de una expresión regular.
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  if (regex.test(nuevaContraseña.value)) {
      return {validated: true}
  }

  return {validated: false, message: "La contraseña debe tener mayúsculas, minúsculas, un caracater especial y un rango de 8 a 15 caracateres"}
};









// Sweet Alert
function    showAlert(message, title = "Error!", icon =  "error" ) {
  Swal.fire({
      title: title,
      text: message,
      icon: icon,
      toast: "true",
      timer: 4000,
      showConfirmButton: false,
      position: "bottom-right",
      confirmButtonText: 'Aceptar'
  })
}






//Función para edita db.json

async function editarDBJson() {
  const URL = "http://localhost:3000/users";
  const data = localStorage.getItem("datas");
  const jsonData = JSON.parse(data);
  const IDData = jsonData[0].id; 

  // Nuevos datos
  const usuario  = document.querySelector(".input-usuario").value;
  const email = document.querySelector(".input-email").value;

  // Body Data
  const bodyData = {
    "email": email,
    "user": usuario
  };

  if (nuevaContraseña.value && confirmacionNuevaContraseña.value && contraseñaActual.value) {
    bodyData.password = nuevaContraseña.value;
  } else{
    bodyData.password = jsonData[0].password;
  }

  const response = await fetch(`${URL}/${IDData}`, {
    method: "PUT",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(bodyData) 
  });

  if (response.ok) {
    const newData = await response.json();
    // Actualizar datos en el Local Storage
    localStorage.setItem("datas", JSON.stringify([newData]));
    // Actualizar valores en el formulario
    document.querySelector(".input-usuario").value = newData.user;
    document.querySelector(".input-email").value = newData.email;
    alert("Datos actualizados correctamente");
  } else {
    alert("Error al actualizar datos");
  }
}
