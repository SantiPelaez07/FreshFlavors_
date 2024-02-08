const input = document.querySelector(".input_ingredients")
const recetas = document.getElementById("recetas")
const carouselContainer = document.querySelector(".owl-carousel")
const modal = document.querySelector(".modal-dialog")
let nodoRaroPrueba
let ingredientesReseta

carouselContainer.addEventListener("click",function (event) {
    if (event.target.classList.contains("btn-buscar")) {
        let datos=event.target.getAttribute("ingredientes")
        let calorias=event.target.getAttribute("calorias")
        let datosArray=datos.split("#")
        modal.innerHTML=""
        modal.innerHTML=`
            <div class="modal-content">
            <div class="modal-body">
            <h2>${event.target.getAttribute("nombreplato")}</h2>
                <img src="${event.target.getAttribute("imagenplato")}" alt="">
                <p>calorias: ${Number.parseInt(calorias)}</p>
            <ul class="list-group" id="listIngredientes"></ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
            </div>
            </div>
        `
        let listIngredientes=document.getElementById("listIngredientes")
        listIngredientes.innerHTML=""
        datosArray.forEach(element => {
            listIngredientes.innerHTML+=`<li class="list-group-item">${element}</li> `
        })
    }
})

const btnBuscar = document.querySelector(".create_recipe");

document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    const StorageUser = localStorage.getItem("datoUser");
    console.log(StorageUser);
    input.value = StorageUser
    if(StorageUser){
        getData(StorageUser);
    }

})

btnBuscar.addEventListener("click", async (event) => {
    event.preventDefault();
    localStorage.removeItem("datoUser");
    let receta = input.value
    const data = await llamarURL(receta)
    nodoRaroPrueba.innerHTML=''
    data.forEach(dato =>{
        console.log()
        ingredientes=dato.recipe.ingredientLines.join("#")
        nodoRaroPrueba.innerHTML+=`
        <div class="owl-item" style="width: 385px; margin-right: 15px;"><div class="item" id="recetas">
         <div class="card  w-75 h-75 d-flex justify-content-center align-items-center">
            <img src="${dato.recipe.image}">
            <div class="card-body text-center">
                <div class="card-title">
                    <h4 class="h4">${dato.recipe.label}</h4>
                </div>
                <button type="button" imagenplato="${dato.recipe.image}" calorias="${Math.round(dato.recipe.calories)}" nombreplato="${dato.recipe.label}" ingredientes="${ingredientes}" class="btn  btn-buscar d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Ver receta
            </button>
            </div>
        </div>
    </div></div>
        
        `
})
input.value = ""
})


async function getData (StorageUser){
    const data = await llamarURL(StorageUser)
    nodoRaroPrueba.innerHTML=''
    data.forEach(dato =>{
        console.log("aqui estamos")
        ingredientes=dato.recipe.ingredientLines.join("#")
        nodoRaroPrueba.innerHTML+=`
        <div class="owl-item" style="width: 385px; margin-right: 15px;"><div class="item" id="recetas">
         <div class="card  w-75 h-75 d-flex justify-content-center align-items-center">
            <img src="${dato.recipe.image}">
            <div class="card-body text-center">
                <div class="card-title">
                    <h4 class="h4">${dato.recipe.label}</h4>
                </div>
                <button type="button" imagenplato="${dato.recipe.image}" calorias="${Math.round(dato.recipe.calories)}" nombreplato="${dato.recipe.label}" ingredientes="${ingredientes}" class="btn btn-primary btn-buscar d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Ver receta
            </button>
            </div>
        </div>
    </div></div>
        
        `
})
}
  


document.addEventListener("DOMContentLoaded", async () => {
    const data = await llamarURL('salad')
    imprimirDatos(data )
    nodoRaroPrueba = document.querySelector('body > div > div.row > div > div > div.owl-stage-outer > div')
})

// Construye la URL para la solicitud a la API
async function llamarURL(receta) {
    const URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${receta}&app_id=60b8ad5f&app_key=%20fd01c7d8e5a4cd1b3775a5a92b4ef8e1`;
    // Realiza una solicitud fetch a la API con la URL construida
    const response = await fetch(URL)
    //convierto la URL(response) en un json (objeto {})
    const data = await response.json()
    //llamo a data para obtener los datos de la API
    return data.hits
}


function imprimirDatos(data, nodo = carouselContainer ) {
   
    nodo.innerHTML = ""
    data.forEach(element => {
        nodo.innerHTML += `
          <div class="item" id="recetas">
         <div class="card  w-75 h-75 d-flex justify-content-center align-items-center">
            <img src="${element.recipe.image}"
                alt="" class="card-img-top ">
            <div class="card-body text-center">
                <div class="card-title">
                    <h4>${element.recipe.label}</h4>
                </div>
                <button type="button"  class="btn btn-primary d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Ver receta
            </button>
            </div>
        </div>
    </div>


    `

    });

    (()=>{
        $('.owl-carousel').owlCarousel({
            loop: false,
            margin: 15,
            nav: true,
            dots: false,
            autoplay:false,
            autoplayTimeout:2000,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        })
    })()
    

}

const btnPrincipal = document.querySelector(".btn-animation");

btnPrincipal.addEventListener("click", async (event) => {
    event.preventDefault();
    let receta = inputPrincipal.value
    const data = await llamarURL(receta)
    nodoRaroPrueba.innerHTML=''
    data.forEach(dato =>{
        console.log()
        ingredientes=dato.recipe.ingredientLines.join("#")
        nodoRaroPrueba.innerHTML+=`
        <div class="owl-item" style="width: 385px; margin-right: 15px;"><div class="item" id="recetas">
         <div class="card  w-75 h-75 d-flex justify-content-center align-items-center">
            <img src="${dato.recipe.image}">
            <div class="card-body text-center">
                <div class="card-title">
                    <h4 class="h4">${dato.recipe.label}</h4>
                </div>
                <button type="button" imagenplato="${dato.recipe.image}" calorias="${Math.round(dato.recipe.calories)}" nombreplato="${dato.recipe.label}" ingredientes="${ingredientes}" class="btn btn-primary btn-buscar d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Ver receta
            </button>
            </div>
        </div>
    </div></div>
        
        `
})
})











 // recetas.innerHTML += `       
        // <div class="card">
        //     <img src="${element.recipe.image}"
        //         alt="" class="card-img-top ">
        //     <div class="card-body text-center">
        //         <div class="card-title">   
        //         </div>
        //     <button class="btn btn-primary mx-auto d-block px-4 py-2 rounded-pill ">ver receta</button>
        //     </div>
        // </div>`

        // data.forEach((iterador) => {
    //     console.log(iterador);
    //     card.innerHTML += `





    //     `
    // });