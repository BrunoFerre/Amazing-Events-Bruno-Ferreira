const containerCards = document.getElementById("container")
const events = data.events
const htmlChecks = document.getElementById('inputs')
let categoriasRepetidas = events.map(eventos => eventos.category)
let categoriasNoRepeat = Array.from(new Set(categoriasRepetidas))

function crearCards(eventos) {
  return `<div class='card bg-dark text-white'>
    <img src='${eventos.image}' class='card-img-top p-1' alt='...'>
    <div class='card-body d-flex align-items-center flex-wrap justify-content-center'>
      <h4 class='card-title w-100 text-center '>${eventos.name}</h4>
      <p class="card-text">${eventos.description}</p>
    </div>
      <div class='card-footer d-flex justify-content-around align-items-center p-2'>
      <p>Price: ${eventos.price}</p>
        <a href="./assets/pages/details.html?id=${eventos._id}" class="btn btn-primary ">Details</a>
      </div>
  </div>'`
}
function pintarCards(array, ubicacion) {
  let cards = ''
  if (array.length == 0) {
    cards += `<p class="display-1">NOT FOUND</P>`
    ubicacion.innerHTML = cards
    return false
  } else {
    ubicacion.innerHTML += ''
    for (let event of array) {
      ubicacion.innerHTML += crearCards(event)
    }
  }
}
function crearInputs(categorias) {
  return `<label class="btn btn-success">${categorias}
  <input type="checkbox" class="checkboxs"  name="options" id="inputs" value="${categorias}"></label>`
}
function pintarInputs(array, lugar) {
  for (let categorias of array) {
    lugar.innerHTML += crearInputs(categorias)
  }
}

pintarInputs(categoriasNoRepeat, htmlChecks)
pintarCards(events, containerCards)

const searchInput = document.getElementById("search")
const inputsCheck = document.getElementById('inputs')


function mostrarValor(input) {
  let valorSearch = input.value.toLowerCase()
  return valorSearch
}

inputsCheck.addEventListener("change", () => {
  containerCards.innerHTML = ''
  filtroCheck(events,containerCards)
})

searchInput.addEventListener('keyup', () => {
  containerCards.innerHTML = ''
  let value = mostrarValor(searchInput)
  console.log(value)
  let evento = events.filter(event => event.name.toLowerCase().includes(value))
  pintarCards(evento, containerCards)
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
  pintarCards(segundofiltro,ubicacionHTML)
  return segundofiltro
} 