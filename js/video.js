//=========SELECTORES=========
const container = document.querySelector(".container")
const flagImgs = document.querySelectorAll("#flag-img")
const main = document.querySelector(".main")
const btnBack = document.querySelector("#btn-back")
const modalBody = document.querySelector('.modal-body');
const message = document.querySelector(`.message`)

let contryData;
let contryName;


//=========EVENTOS=========
window.addEventListener(`DOMContentLoaded`, async () => {
  contryData = await getData()
  showCards()
});

container.addEventListener("click", (event) => {

  const btnDetalles = event.target.classList.contains("detalles")

  if (btnDetalles === true) {
    const id = event.target.getAttribute("data-id")
    brigOne(id)
  }
})


//=========FUNCIONES=========
async function getData() {
  const URL = "http://localhost:3001/countries"

  const response = await fetch(URL)
  const data = await response.json()
  return data
}

function cardInformation() {
  container.innerHTML = ""
  contryData[0][contryName].forEach((contry, id) => {

    container.innerHTML += `
    <div class="card" style="width: 18rem;">
      <img src="${contry.image}"/> 
      <div class="card-body">
        <h5 class="card-title">${contry.title}</h5>
        <p class="card-text">${contry.description}</p>
        <button type="button" class="btn btn-warning detalles"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${id}">
             Detalles
        </button>
      </div>
    </div>`
  });
}

function showCards() {
  flagImgs.forEach(flag => {
    flag.addEventListener("click", function () {
      btnBack.classList.remove("visually-hidden")
      container.classList.remove("visually-hidden")
      contryName = flag.getAttribute("alt")
      main.classList.add("visually-hidden")
      cardInformation()
    })
  })
}

btnBack.addEventListener("click", function () {
  main.classList.toggle("visually-hidden")
  container.classList.toggle("visually-hidden")

  if (!main.classList.contains("visually-hidden")) {
    btnBack.classList.add("visually-hidden")
  }
})

async function brigOne(id) {
  const cardData = contryData[0][contryName][id]
  console.log(cardData);
  showMondal(cardData)
}

function showMondal(dataId) {

  modalBody.innerHTML = `
    <div class="card-body">

    <iframe width="465" height="315" src="${dataId.video_iframe}"
      title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
      clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
      
      <table class="table table-striped-columns">
        <tr>
        <td>Canal</td>
        <td>${dataId.channel_name}</td>
        </tr>       
      </table>

      <p>"¡Hola! En la descripción del video, encontrarás todos los ingredientes que necesitas, las herramientas requeridas y los tiempos de preparación detallados. ¡Espero que disfrutes al máximo el video! 😊",</p>
    </div>
      `
}
