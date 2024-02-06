let listLocal;

//Button save Changes
const saveChanges = document.querySelector(".btn-primary")

//Sexo de la persona
const seleccionSexo = document.querySelector(".custom-select")

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
  
  
    console.log(`Contraseña: ${localUser}`)
  
      function getUser() {
        inputUser.value = ""
        inputUser.value = `${listLocal[0].user}`

        inputEmail.value = "";
        inputEmail.value = `${listLocal[0].email}` 
      }



saveChanges.addEventListener("click", (e) => {
  e.preventDefault();

  validarContraseña();
})


function validarContraseña() {
  const contraseñaActual = document.getElementById("contraseña-actual");
  const nuevaContraseña = document.getElementById("nueva-contraseña");
  const confirmacionNuevaContraseña = document.getElementById("confirmacion-nueva-contraseña");
  console.log(contraseñaActual.value);
  console.log(listLocal[0].password)

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
  const nuevaContraseña = document.getElementById("nueva-contraseña");
  const confirmacionNuevaContraseña = document.getElementById("confirmacion-nueva-contraseña");

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
