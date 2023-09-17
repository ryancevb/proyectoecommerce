
let receivedProd = localStorage.getItem("Id-Prod");
let container = document.getElementById("infoProd");
let containercomm = document.getElementById("containercommProd");
console.log(receivedProd);

let item = [];

//Fetch para obtener la informacion de los productos
async function callJSON() {
    try {
        const response = await fetch("https://japceibal.github.io/emercado-api/products/" + receivedProd + ".json")
        const data = await response.json()
        item = data;
        console.log(item)
        return showInfo(item)
    } catch (error) {
        console.log(error)
    }

}

callJSON()

function showInfo(item) {
    container.innerHTML = "";
    console.log(item)

    console.log(item)
    container.innerHTML += `
        
        <div class ="card">
         <p class="title">Nombre</p>
         <p class="description"> ${item.name} </p>
        </div>

        
        <div class ="card">
        <p  class="title">Descripción</p>
        <p class="description"> ${item.description} </p>
        </div>

        <div class ="card">
        <p class="title">Costo</p>
        <p class="description"> ${item.currency} ${item.cost} </p>
        </div>
    
        <div class ="card">
        <p  class="title">Vendidos</p>
        <p class="description">${item.soldCount}</p>
        </div>
        <div class ="card">
        <p  class="title">Categorias</p>
        <p class="description" >${item.category}</p>
        </div>

        <div id = "imgInfo">
        <div class = "img">
        <img src="img/prod`+ receivedProd + `_1.jpg" style="width:100%">
        </div>
        <div class = "img">
        <img src="img/prod`+ receivedProd + `_2.jpg" style="width:100%">
        </div>
        <div class = "img">
        <img src="img/prod`+ receivedProd + `_3.jpg" style="width:100%">
        </div>
        <div class = "img">
        <img src="img/prod`+ receivedProd + `_4.jpg" style="width:100%">
        </div>
        </div>
            `;


}


//Llamamos a los comentarios
async function callJSONcomm() {
    try {
        const response = await fetch("https://japceibal.github.io/emercado-api/products_comments/" + receivedProd + ".json")
        const data = await response.json()
        com = data;
        console.log(com)
        return showInfocomm(com)
    } catch (error) {
        console.log(error)
    }
}
callJSONcomm()
function showInfocomm(com) {
    containercomm.innerHTML = "";
    console.log(com)

    console.log(com)
    containercomm.innerHTML += ""
    for (let i = 0; i < com.length; i++) {
        containercomm.innerHTML += `
        
        <div class ="comms">
        <p class ="name">${com[i].user}</p><!– Nombre –>
        <p class = "date">${com[i].dateTime}</p><!– Date –>
       
        <span class="fa fa-star checked">${com[i].score} </span> <!– Puntuación –>
        
        <p>${com[i].description} <!– Descripción –></p>
        </div>
            `;
    }
}

// Desafiate  - Ingresar comentarios

document.addEventListener('DOMContentLoaded', function () {

    var today = new Date();
    var dateNow = today.toLocaleString('sv-SE');
    let userEmail = localStorage.getItem("correo");
    const formulario = document.querySelector('#comments form');
    const containerCommProd = document.getElementById('containercommProd');


    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log(dateNow)
        const comentario = document.getElementById('floatingTextarea').value;
        const puntuacion = document.getElementById('options').value;
        const nuevoParrafo = document.createElement('p');

        nuevoParrafo.innerHTML = `
        <div class="comms"> 
        <p class ="name">${userEmail}</p>
        <p class = "date">${dateNow}</p>
        <span class="fa fa-star checked">${puntuacion}
        </span> <br>
        <p>${comentario} </p></div>`;

        containerCommProd.appendChild(nuevoParrafo);


        document.getElementById('floatingTextarea').value = '';
    });
});
