const container = document.getElementById('sections')

  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    
  
    .then(datosApis => {

      let eventos = datosApis.events
      
      const queryString = location.search
      let params = new URLSearchParams(queryString)
      const id = params.get("id")
      const evento = eventos.find(event => event._id == id)
      Detalle(evento,container)
  
    
    })
  .catch(error => console.log(error.message))

function Detalle( evento, contenedor) {
  contenedor.innerHTML = `<div class='card bg-dark text-white' id="card">
  <img src='${evento.image}' class='card-img-top p-1' alt='...'>
  <div class='card-body d-flex align-items-center flex-wrap justify-content-center'>
    <h4 class='card-title w-100 text-center '>${evento.name}</h4>
    <p class="card-text">${evento.description}</p>
  </div>
    <div class='card-footer d-flex justify-content-around align-items-center p-2'>
    <p>Price: ${evento.price}</p>
    <p>Category: ${evento.category}</p>
    <p>Asistance: ${evento.assistance}</p>
    </div>
</div>'`
  }