const containerUpcoming = document.getElementById("past")
const eventsArray = data.events
const date = data.currentDate
let categoriasRepetidas = eventsArray.map(eventos => eventos.category)
let categoriasNoRepeat = Array.from(new Set(categoriasRepetidas))

function crearInputs(categorias) {
  return `<label class="btn btn-success">${categorias}
  <input type="checkbox" class=""  name="options" id="${categorias}" value="${categorias}"></label>`
}
function pintarInputs(array, lugar) {
  for (let categorias of array) {
    lugar.innerHTML += crearInputs(categorias)
  }
}

function crearCards(elemento) {
   return ` <div class="card bg-dark text-white ">
   <img src="${elemento.image}" class="card-img-top p-1" alt="...">
   <div class="card-body">
     <h5 class="card-title">${elemento.name}</h5>
     <p class="card-text">${elemento.description}</p>
     <div class="d-flex justify-content-between align-items-center">
       <p>Price: ${elemento.price}</p>
       <a href="../pages/details.html?id=${elemento._id}" class=" btn btn-primary">Details</a>
     </div>
   </div>
 </div> ` 
}

function pintarCards(array,date,container) {
    for (const event of array ) {
      if (event.date < date) {
        container.innerHTML+=crearCards(event)
     }
    }
}
const inputsCheck = document.getElementById('inputs')

pintarInputs(categoriasNoRepeat,inputsCheck)
pintarCards(eventsArray, date, containerUpcoming)


const searchInput = document.getElementById("search")

function mostrarValor(input) {
  let valorSearch = input.value.toLowerCase()
  console.log(valorSearch);
  return valorSearch
}

inputsCheck.addEventListener("change", () => {
  containerUpcoming.innerHTML = ''
  filtroCheck(eventsArray,containerUpcoming)
})

searchInput.addEventListener('keyup', () => {
  containerUpcoming.innerHTML = ''
  let value = mostrarValor(searchInput)
  console.log(value)
  let evento = eventsArray.filter(event => event.name.toLowerCase().includes(value))
  pintarCards(evento,date,containerUpcoming)
})

function filtroCheck(array,ubicacionHTML) {
  ubicacionHTML.innerHTML=''
  let catFiltro = []
  let checkSeleccionado = document.querySelectorAll('input[type="checkbox"]:checked')
  checkSeleccionado.forEach(function(inputs) {
  catFiltro.push(inputs.value)
  console.log(catFiltro);
 })
  let segundofiltro = array.filter(event =>catFiltro.includes(event.category)||catFiltro.length == 0)
  pintarCards(segundofiltro,date,ubicacionHTML)
  return segundofiltro
} 