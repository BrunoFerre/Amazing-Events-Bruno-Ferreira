export function cards(event) {
  return `<div class='card bg-dark text-white'>
  <img src='${event.image}' class='card-img-top p-1' alt='...'>
  <div class='card-body d-flex align-items-center flex-wrap justify-content-center'>
    <h4 class='card-title w-100 text-center '>${event.name}</h4>
    <p class="card-text">${event.description}</p>
  </div>
    <div class='card-footer d-flex justify-content-around align-items-center p-2'>
    <p>Price: ${event.price}</p>
      <a href="./../assets/pages/details.html?id=${event._id}" class="btn btn-primary ">Details</a>
    </div>
</div>'`
}  
export function showCards(arrayEvent,htmlContainer) {
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
export function checkboxs(listCategories) {
return `<label class="btn btn-success">${listCategories}
<input type="checkbox" class="checkboxs"  name="options" id="inputs" value="${listCategories}"></label>`
}
export function showCheckBoxs(list, htmlCont) {
for (const categorie of list) {
    htmlCont.innerHTML +=checkboxs(categorie)
}
}
export function filterCheck(listEvents,categoria) {
if (categoria == '') {
  return listEvents
}
return listEvents.filter(event => categoria.includes(event.category)|| categoria.includes(''))
}

export function filterSearch(list, text) {
return list.filter(event=>event.name.toLowerCase().includes(text.toLowerCase()))
}
export function filterCrossed(listaEVent,categorie,text) {
let checkF = filterCheck(listaEVent, categorie)
let searchSearc = filterSearch(checkF, text)
return searchSearc
}