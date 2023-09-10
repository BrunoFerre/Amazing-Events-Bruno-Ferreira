import { showCards, showCheckBoxs, filterCrossed } from './modules/function.js'

const container = document.getElementById('container')
const htmlChecks = document.getElementById('inputCont')

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(resonse => resonse.json())
  .then(dataApis => {
    let events = dataApis.events
    let repeatCategories = events.map(event => event.category)
    let categories = Array.from(new Set(repeatCategories))
    showCards(events, container)
    showCheckBoxs(categories, htmlChecks)
    const searchInput = document.getElementById("search")

    //filtercheck
    htmlChecks.addEventListener('change', () => {
      container.innerHTML = ''
      let catFiltro = []
      let checkSeleccionado = document.querySelectorAll('input[type="checkbox"]:checked')
      checkSeleccionado.forEach(function (inputs) {
        catFiltro.push(inputs.value)
      })
      let filter = filterCrossed(events, catFiltro, searchInput.value)
      showCards(filter, container)
    })
    searchInput.addEventListener('keyup', () => {
      container.innerHTML = ''
      let catFiltro = []
      let checkSeleccionado = document.querySelectorAll('input[type="checkbox"]:checked')
      checkSeleccionado.forEach(inputs => catFiltro.push(inputs.value)
      )
      let filter = filterCrossed(events, catFiltro, searchInput.value)
      showCards(filter, container)
    })
  })