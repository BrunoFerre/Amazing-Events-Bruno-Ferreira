import {showCards,showCheckBoxs,filterCrossed} from './modules/function.js'
const container = document.getElementById('upcoming')
const htmlChecks = document.getElementById('inputCont')
fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(resonse=> resonse.json())
    .then(dataApis => {
        let events = dataApis.events   
        const date = dataApis.currentDate
        const upEvent = events.filter(event => event.date >= date)
        
        let repeatCategories = events.map(event => event.category)
        let categories = Array.from(new Set(repeatCategories))

        showCards(upEvent,container)
        showCheckBoxs(categories, htmlChecks)
        const searchInput = document.getElementById("search")

        //filtercheck
        htmlChecks.addEventListener('change', () => {
            container.innerHTML = ''
            let catFiltro=[]
            let checkSeleccionado = document.querySelectorAll('input[type="checkbox"]:checked')
            checkSeleccionado.forEach(function(inputs) {
                catFiltro.push(inputs.value)
                console.log(catFiltro);
               })
            let filter = filterCrossed(upEvent, catFiltro, searchInput.value)
            showCards(filter,container)
        })
        
        searchInput.addEventListener('keyup', () => {
             container.innerHTML = ''
            let catFiltro=[]
            let checkSeleccionado = document.querySelectorAll('input[type="checkbox"]:checked')
            checkSeleccionado.forEach(inputs=>catFiltro.push(inputs.value)  
               )
            let filter = filterCrossed(upEvent, catFiltro, searchInput.value)
            showCards(filter,container)
        })
    })



