const btn = document.getElementById('button');
const input = document.getElementById("email_id")

document.getElementById('form').addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_12erirj';
   


   if (input.value) {
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
      btn.value = 'Send Email';
      showAlert("Email enviado correctamente", "success", "Envío éxitoso")
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
   } else {
    showAlert("El campo está vacío")
   }


});




function showAlert(message, inconName = "error", title = "!Error") {
  Swal.fire({
      title: title,
      text: message,
      icon: inconName,
      toast: "true",
      timer: 2000,
      showConfirmButton: false,
      position: "bottom-right",
      confirmButtonText: 'Aceptar'
  })
}





//Animación del responsive del NavBar
const btnopenSidebar = document.querySelector(".openSidebar")
const sidebar = document.querySelector("#sidebar")
const option = document.querySelector(".option")

btnopenSidebar.addEventListener("click" , (e) => {
sidebar.classList.toggle("show") 

})

option.addEventListener("click", (event) => {
  sidebar.classList.toggle("show")
})


const inputPrincipal = document.querySelector(".input_ingredients");
const btnPrincipal = document.querySelector(".btn-animation");

btnPrincipal.addEventListener("click", (event) => {
  event.preventDefault();
    if (!inputPrincipal.value) {
    showAlert("No has ingresado ningún tipo de dato");
    return
  }

  console.log(inputPrincipal.value);
  localStorage.setItem("datoUser", inputPrincipal.value)
  window.location.href = "/recetas.html"
})


const btnReceta = document.querySelector(".btnRecetas")

btnReceta.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/recetas.html"
})


