const contenedorCard = document.getElementById("sections")
const events = data.events
console.log(events)

const param = location.search
console.log(param)

const paramEvent = new URLSearchParams(param)
console.log(paramEvent)

const idDetails = paramEvent.get("id")
console.log(idDetails)

let unicEven = events.find(event => event._id === idDetails )
console.log(unicEven);



function cardsDetails(html, event) {
  html.innerHTML =  `<div class='card bg-dark text-white'>
  <img src='${event.image}' class='card-img-top p-1' alt='...'>
  <div class='card-body d-flex align-items-center flex-wrap justify-content-center'>
    <h4 class='card-title w-100 text-center '>${event.name}</h4>
    <p class="card-text">${event.description}</p>
  </div>
    <div class='card-footer d-flex  align-items-center p-2 flex-wrap'>
    <p class='d-flex w-50' >Price: ${event.price}</p>
    <p class='d-flex w-50' >Assistance: ${event.assistance}</p>
    <p class='d-flex w-50' >Place: ${event.place}</p>
    <p class='d-flex w-50' >Category: ${event.category}</p>
    </div>
</div>'`
}
cardsDetails(contenedorCard,unicEven) 