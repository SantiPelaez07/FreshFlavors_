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

btnopenSidebar.addEventListener("click" , (e) => {
e.preventDefault()
sidebar.classList.toggle("show")  
})  