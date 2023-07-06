const containerCards = document.getElementById("container")

console.log(containerCards);
const events= data.events
function pintarCards(array,ubicacion){
  let cards=""
  for (const events of array) {
    cards+=`<div class='card bg-dark text-white'>
    <img src='${events.image}' class='card-img-top p-1' alt='...'>
    <div class='card-body'>
      <h5 class='card-title'>${events.name}</h5>
      <p class="card-text">${events.description}</p>
      <div class="d-flex justify-content-between align-items-center">
        <p>Price: ${events.price}</p>
        <a href="./assets/pages/details.html" class=" btn btn-primary">Details</a>
      </div>
    </div>
  </div>'`
  }
  ubicacion.innerHTML = cards
}
pintarCards(events,containerCards)