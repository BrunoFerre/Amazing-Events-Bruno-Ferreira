const contenedorStatsOne = document.getElementById("mayor")
const contenedorStatsTwo = document.getElementById("menor")
const contenedorStasThree = document.getElementById("largo")

let date; 
let datosEvents;


fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(respuesta => respuesta.json())
    .then(data => {
         datosEvents = data.events
         date = data.currentDate
        const arrayOrdenado = Array.from(datosEvents).sort(function (a, b) {
            return b.capacity - a.capacity
        })
        console.log(arrayOrdenado);

        let eventosPasados = datosEvents.filter(evento => evento.date < date)
        console.log(eventosPasados);
        eventosPasados.sort((a, b) => calcularPorcentajeAlto(a.assistance, a.capacity) - calcularPorcentajeAlto(b.assistance, b.capacity))
        
        let nombreMayor = arrayOrdenado[0].name
        let capacidadMayor = arrayOrdenado[0].capacity
        
        let eventoMenor = eventosPasados[0];
        let eventoMayor = eventosPasados[eventosPasados.length - 1];
        
        let porcentajeOne = calcularPorcentajeAlto(eventoMayor.assistance, eventoMayor.capacity).toFixed(1)
        let porcentajeTwo= calcularPorcentajeAlto(eventoMenor.assistance,eventoMenor.capacity).toFixed(1)

        primerTabla(eventoMayor, contenedorStatsOne, porcentajeOne)
        primerTabla(eventoMenor, contenedorStatsTwo, porcentajeTwo)
        segundaTable(nombreMayor,contenedorStasThree,capacidadMayor)
    }
    )
    .catch(error => console.log(error))

function calcularPorcentajeAlto(assistance, capacidad) {
    let porcentaje = (assistance / capacidad) * 100
    return porcentaje 
}

function primerTabla(evento, hmtlContain,porcentaje) {
    hmtlContain.innerHTML = ` 
     <td>${evento.name} ${porcentaje} %</td>
    `
}
function segundaTable(evento, hmtlContain,porcentaje) {
    hmtlContain.innerHTML = ` 
     <td>${evento} ${porcentaje}</td>
    `
}
