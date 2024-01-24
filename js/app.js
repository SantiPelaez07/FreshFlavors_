

const btn = document.getElementById('button');
const input = document.getElementById("email_id")

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_12erirj';
   


   if (input.value) {
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
      btn.value = 'Send Email';
      alert('Email enviado correctamente!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
   } else {
    alert("Pon algo")
   }


});