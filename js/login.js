const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container")
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");


sign_up_btn.addEventListener("click",() => {
  container.classList.toggle("sign-up-mode");
});

sign_in_btn.addEventListener("click",() => {
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


//Json server.
const formularioRegistro = document.querySelector(".sign-up-form")

formularioRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  obtenerData();
})


function obtenerData() {
  
}