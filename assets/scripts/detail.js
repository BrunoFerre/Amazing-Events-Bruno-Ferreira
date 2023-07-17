
  //  await fetch('https://mindhub-xj03.onrender.com/api/amazing')
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(datosApis => {
    eventos = datosApis.events
    console.log(eventos);
    const queryString = location.search
    let params = new URLSearchParams(queryString)
    const id = params.get("id")
    Detalle(id,eventos)
  })
  .catch(error => console.log(error.message))

function Detalle(id, eventos) {
  const evento = eventos.find(data => data._id == id)
  const contenedorCard = document.querySelector("#cards2")
  contenedorCard.innerHTML = `<div class='card' style='width:30rem;'>
     <img src='${evento.image}' class='card-img-top' alt='...' id='img_detalles'>
     <div class='card-body bg-primary'>
       <h5 class='card-title fs-2 text-center'>${evento.name}</h5>
       <p class='card-text fs-4'>${evento.description}</p>
     </div>
    <ul class='list-group list-group-flush'>
       <li class='list-group-item bg-info fs-5'>Category: ${evento.category}</li>
       <li class='list-group-item bg-info fs-5'>Place: ${evento.place}</li>
       <li class='list-group-item bg-info fs-5'>Price: ${evento.price}</li>
     </ul>
</div>`
  }