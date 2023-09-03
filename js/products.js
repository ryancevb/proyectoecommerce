let catid = localStorage.getItem("catID");
const product = document.getElementById("showProducts");
function showProducts(){
    const promise = fetch("https://japceibal.github.io/emercado-api/cats_products/"+ catid +".json");
        promise
            .then(response => response.json())
            .then(infoApi => {
                console.log(infoApi);
                let prod = infoApi.products

                product.innerHTML = "";
               for (let i = 0; i < prod.length; i++) {
                   product.innerHTML += `
                    <div id="container-prod">
                        <div>
                            <img id="div__img-prod" src=${prod[i].image} style= max-width:20vh>
                        </div>
                        <div><h5> ${prod[i].name} - ${prod[i].currency}  ${prod[i].cost}</h5>
                            <div id="container__div-sold"> ${prod[i].soldCount} vendidos   </div>
                            
                            <p>${prod[i].description}</p>
                        </div>
                    </div> `;
                }
                searchFilter(prod)
                sortElementsByPrice(prod)
                filteredArray(prod)//agregar la función que quiero se ejecute con los datos   
            });  // tuve que pasarle prod como argumento porque sino aparecía no definido
};

function filteredArray(prod) { //Creo la función y dentro el evento para que ocurra con el btn "Filtrar"
    document.getElementById("rangeFilterCount").addEventListener("click", function() {
            if ((document.getElementById("rangeFilterCountMin").value != '') || (document.getElementById("rangeFilterCountMax").value != '')) {
                const min = document.getElementById("rangeFilterCountMin").value; // Obtengo valor ingresado
                const max = document.getElementById("rangeFilterCountMax").value;
                product.innerHTML = ""; // con esto la idea era vaciar el html y luego agregar lo de abajo
                prod.forEach(element => { //por cada elemto de prod voy a realizar la condición
                    if (element.cost >= min && element.cost <= max ) {
                        console.log(element);
                        product.innerHTML += `
                            <div id="container-prod">
                                <div>
                                    <img id="div__img-prod" src=${element.image} style= max-width:20vh>
                                </div>
                                <div><h5> ${element.name} - ${element.currency}  ${element.cost}</h5>
                                    <div id="container__div-sold"> ${element.soldCount} vendidos   </div>
                                    <p>${element.description}<element/p>
                                </div>
                            </div> `; 
                    }
                })};
                cleanFilter();
})};

// agregamos un evento al botón Limpiar para que muestre todos los productos
function cleanFilter(){
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        // Limpio los input
        document.getElementById("rangeFilterCountMin").value= ""; 
        document.getElementById("rangeFilterCountMax").value = "";
        let cleanList =  document.getElementById("showProducts");;
        // Limpio los productos filtrados
        cleanList.innerHTML = ""; 
        // Obtengo la lista de productos 
        showProducts(); 
    })
}
// Ordenamos la lista de array con SORT
function sortElementsByPrice(prod){
    let array = prod.filter(elem => typeof elem.cost === "number");
    let arraySold = prod.filter(obj => typeof obj.soldCount === "number");

   // Filtrado de precio de forma Ascendente 
    document.getElementById("sortAsc").addEventListener("click", function(){
        array.sort(function(a, b) {
           return a.cost - b.cost;
        });
        showFilter(array);
        cleanFilter();
    });
        
//Filtrado de precio de forma Descendente 
    document.getElementById("sortDesc").addEventListener("click", function(){
        array.sort(function(a, b) {
            return b.cost - a.cost;
        });
        showFilter(array);
        cleanFilter();
    });

//Filtrado por RELEVANCIA segùn la cantidad vendida 
    document.getElementById("sortByCount").addEventListener("click", function(){
        arraySold.sort(function(a, b) {
            return b.soldCount - a.soldCount;
        });
        
        showFilter(arraySold);
        cleanFilter();
    });

}

// Se muestra el filtro en el HTML 
function showFilter(array){
    product.innerHTML= "";
    for (let i = 0; i < array.length; i++) {
        product.innerHTML += `
          <div id="container-prod">
            <div>
              <img id="div__img-prod" src=${array[i].image} style= max-width:20vh>
            </div>
            <div>
              <h5> ${array[i].name} - ${array[i].currency}  ${array[i].cost}</h5>
              <div id="container__div-sold"> ${array[i].soldCount} vendidos </div>
              <p>${array[i].description}</p>
            </div>
          </div> `;
      };
};
// Agregar la búsqueda de productos en tiempo real
function searchFilter(prod){
    let inputSearch = document.getElementById("input-search");
    inputSearch.addEventListener("input", function(){
        let searched = inputSearch.value.toLowerCase();
        console.log(searched);
        product.innerHTML = "";
        prod.forEach(element => {
        if ((element.name.toLowerCase().includes(searched)) || (element.description.toLowerCase().includes(searched))) {
                product.innerHTML += `
                    <div id="container-prod">
                        <div>
                            <img id="div__img-prod" src=${element.image} style= max-width:20vh>
                        </div>
                        <div><h5> ${element.name} - ${element.currency}  ${element.cost}</h5>
                            <div id="container__div-sold"> ${element.soldCount} vendidos   </div>
                            <p>${element.description}</p>
                        </div>
                    </div> `;
            }});
    })
}


showProducts();

//Llamado a tipo de productos a traves de su categoria
if (catid ==="101") {
    document.getElementById("categories").innerHTML = "Autos";
} else if (catid ==="102") {
    document.getElementById("categories").innerHTML = "Juguetes";
} else if (catid ==="103") {
    document.getElementById("categories").innerHTML = "Muebles";
}

