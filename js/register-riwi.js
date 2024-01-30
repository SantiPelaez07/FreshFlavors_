//
// JavaScript para el desplazamiento suave al hacer clic en el enlace "Quienes somos"
 document.querySelector('.option').addEventListener('click', function(e) {
     e.preventDefault(); // Evitar que el enlace cambie la URL
    document.getElementById('second-container').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('third-container').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('fourth-container').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('contactanos').scrollIntoView({ behavior: 'smooth' });
 });


//Animaciones
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
//Selectores
const form = document.querySelector(".sign-up-form");
const user = document.querySelector("#sign-up-user");
const email = document.querySelector("#sign-up-email");
const password = document.querySelector("#sign-up-password");

//URL globalizada
const URL = "http://localhost:3000/users"

form.addEventListener("submit", (event) => {
    // Eliminar las acciones por defecto
    event.preventDefault();

    //Invocamos la función para registrar un usuario
    registerUser()
}) 


async function registerUser() {

//Validacion de doble contraseña

    // dos contraseñas de un registro, en este caso no lo usaremos
    //1 - Las constraseñas deben ser iguales
    // const {validated, message} = validatePassword();
    //2 - Contraseña segura
    // console.log(validated, message)


// Validación de expresion regular: Hacemos uso de un alert en el cual se especifique que necesitamos una forma de contraseña para mayor seguridad


    const { validated: validatedSegurity, message: messageError } = validatePasswordSegurity();

    if (!validatedSegurity) {
        showAlert(messageError)
        return
    }

// Validación de email: (En este caso lo que vamos a hacer es responder a la pregunta "¿Este correo ya se encuentra en la base de datos?", ya que nos podemos apropiar del correo como un identificador unico e irrepetible, por lo cual es excelente para la validación, pero necesitamos de la asincronía, ya que debemos llamar a la base de datos)

    
//En este caso no nos funciona por medio del email ya que nuestra validacion la haremos por medio del nombre de usuario, el cual debe ser unico

if (await validateUser()) {
    //No podemos olvidar que show alert recibe como tal un argumento message, en el anterior caso se lo asignabamos desde el mensaje de error por medio de una desestructuracion, pero en este caso optaremos por darle el mensaje directemente por medio de un string como argumento 
    showAlert("El nombre ya se encuentra registrado.")
    return
}

if (await validateEmail()) {
    //No podemos olvidar que show alert recibe como tal un argumento message, en el anterior caso se lo asignabamos desde el mensaje de error por medio de una desestructuracion, pero en este caso optaremos por darle el mensaje directemente por medio de un string como argumento 
    showAlert("El Email ya se encuentra registrado.")
    return
}


//Arreglar este problema


  


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "Register in successfully"
  });




    //El db.json se rellena después de las validaciones 
    try {
        
     await fetch(URL, {
        method: "POST", 
        // Headers usar siempre de la misma forma(Estudiar mas en profundidad)
        headers: {
            "Content-Type" : "application/json"
        },
        //En el body siempre enviamos en forma de JSON.stringfy (Pasamos a string)
        body: JSON.stringify({"email": email.value,"user": user.value, "password": password.value})
    });

    } catch (error) {
        showAlert(error)
    }


    
}

//Funcion para validar las dos contraseñas de un registro, en este caso no lo usaremos
// function validatePassword() {
    
// }


function validatePasswordSegurity(){
    //Deseamos que el usuario cree su registro apartir de una serie de exigencia para la seguridad de su contraseña, con esta funcion hacemos uso de una expresión regular.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    if (regex.test(password.value)) {
        return {validated: true}
    }

    return {validated: false, message: "La contraseña debe tener mayusculas, minusculas, un caracater especial y un rango de 8 a 15 caracateres"}
};





async function validateUser(){
    const response = await fetch(`${URL}?user=${user.value}`);
    const data = await response.json();

    console.log(data);
    return data.length

    // Si el usuario existe, nos va a retornar 1, ya que será el unico usuario que aparece como existente, por ende al ser 1 lo podemos asocia como true. Resumen = data.lenght en este caso es = 1
}

async function validateEmail(){
    const response = await fetch(`${URL}?email=${email.value}`);
    const data = await response.json();

    console.log(data);
    return data.length

    // Si el usuario existe, nos va a retornar 1, ya que será el unico usuario que aparece como existente, por ende al ser 1 lo podemos asocia como true. Resumen = data.lenght en este caso es = 1
}









//Esto se toma la librería de showAlert, lo unico que modificamos es la parte de del text, y le asignamos lo que nos llegue por message
function showAlert(message) {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        toast: "true",
        timer: 4000,
        showConfirmButton: false,
        position: "bottom-right",
        confirmButtonText: 'Aceptar'
    })
}




//Login --- Organizar
//Selectores
const form1 = document.querySelector(".sign-in-form");
const user1 = document.querySelector("#sign-in-user");
const password1 = document.querySelector("#sign-in-password");

//URL de forma global 



form1.addEventListener("submit", (e) => {
    e.preventDefault()

    login()
})

async function login() {
    //1. Petición por email
    const response = await fetch(`${URL}?user=${user1.value}`)
    const data = await response.json()
    //2. Esta registrado ese usuario
    console.log(data)
    if (!data.length) {
        showAlert("El usuario no existe")

        return
    }

    //3. Comparar las contraseñas
    if (data[0].password === password1.value) {
        //Con el objeto window podemos redireccionar al usuario
        window.location.href = "index.html";
        localStorage.setItem("isAuthorizated", "true")
    } else {
        console.log("Credenciales incorrectas")
    }

}
