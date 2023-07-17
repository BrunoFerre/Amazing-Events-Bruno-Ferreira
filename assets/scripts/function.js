const container = document.getElementById('container')
const htmlChecks = document.getElementById('inputCont')
fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(resonse=> resonse.json())
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
            let catFiltro=[]
            let checkSeleccionado = document.querySelectorAll('input[type="checkbox"]:checked')
            checkSeleccionado.forEach(function(inputs) {
                catFiltro.push(inputs.value)
                console.log(catFiltro);
               })
            let filter = filterCrossed(events, catFiltro, searchInput.value)
            showCards(filter,container)
        })
        searchInput.addEventListener('keyup', () => {
             container.innerHTML = ''
            let catFiltro=[]
            let checkSeleccionado = document.querySelectorAll('input[type="checkbox"]:checked')
            checkSeleccionado.forEach(inputs=>catFiltro.push(inputs.value)  
               )
            let filter = filterCrossed(events, catFiltro, searchInput.value)
            console.log(searchInput.value);
            showCards(filter,container)
        })
    })


function cards(event) {
      return `<div class='card bg-dark text-white'>
      <img src='${event.image}' class='card-img-top p-1' alt='...'>
      <div class='card-body d-flex align-items-center flex-wrap justify-content-center'>
        <h4 class='card-title w-100 text-center '>${event.name}</h4>
        <p class="card-text">${event.description}</p>
      </div>
        <div class='card-footer d-flex justify-content-around align-items-center p-2'>
        <p>Price: ${event.price}</p>
          <a href="./../pages/detail.html?id=${event._id}" class="btn btn-primary ">Details</a>
        </div>
    </div>'`
  }  
function showCards(arrayEvent,htmlContainer) {
    let card = ''
    if (arrayEvent == '') {
        card += `<p class='display-1'> ERROR IN FILTER</p>`
        htmlContainer.innerHTML= card
    } else {
        htmlContainer.innerHTML += ''
        for (const event of arrayEvent) {
            htmlContainer.innerHTML += cards(event)
        }
    }
}
function checkboxs(listCategories) {
    return `<label class="btn btn-success">${listCategories}
    <input type="checkbox" class="checkboxs"  name="options" id="inputs" value="${listCategories}"></label>`
}
function showCheckBoxs(list, htmlCont) {
    for (const categorie of list) {
        htmlCont.innerHTML +=checkboxs(categorie)
    }
}

function filterCheck(listEvents,categoria) {
    if (categoria == '') {
      return listEvents
    }
    return aux = listEvents.filter(event => categoria.includes(event.category)|| categoria.includes(''))
}

function filterSearch(list, text) {
    return list.filter(event=>event.name.toLowerCase().includes(text.toLowerCase()))
}
function filterCrossed(listaEVent,categorie,text) {
    let checkF = filterCheck(listaEVent, categorie)
    let searchSearc = filterSearch(checkF, text)
    return searchSearc
}