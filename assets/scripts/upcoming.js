const containerUpcoming = document.getElementById("upcoming")

const upcomingEvents = data.events
const date =  data.currentDate
console.log(date);

function upcomingCards(array, lugar,fecha) {
    let cards=''
    for (events of array) {
        if (events.date>= fecha) {
            cards+=` <div class="card bg-dark text-white ">
            <img src="${events.image}" class="card-img-top p-1" alt="...">
            <div class="card-body">
              <h5 class="card-title">${events.name}</h5>
              <p class="card-text">${events.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <p>Price: ${events.price}</p>
                <a href="./../pages/details.html" class=" btn btn-primary">Details</a>
              </div>
            </div>
          </div>`
        }
    }
    lugar.innerHTML=cards
}
upcomingCards(upcomingEvents,containerUpcoming,date)