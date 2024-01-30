// //Selectores
// const form = document.querySelector(".sign-in-form");
// const user = document.querySelector("#sign-in-user");
// const password = document.querySelector("#sign-in-password");

// //URL de forma global 

// const URL = "http://localhost:3000/users";


// form.addEventListener("submit", async (e) => {
//     e.preventDefault()

//     await login()
// })

// async function login() {
//     //1. Petición por email
//     const response = await fetch(`${URL}?email=${email.value}`)
//     const data = await response.json()
//     //2. Esta registrado ese email
//     console.log(data)
//     if (!data.length) {
//         console.log("Email no resgistrado")
//         return
//     }

//     //3. Comparar las contraseñas
//     if (data[0].password === password.value) {
//         //Con el objeto window podemos redireccionar al usuario
//         window.location.href = "index.html";
//         localStorage.setItem("isAuthorizated", "true")
//     } else {
//         console.log("Credenciales incorrectas")
//     }

// }
