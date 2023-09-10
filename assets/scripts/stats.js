const contenedorStatsOne = document.getElementById("mayor")
const contenedorStatsTwo = document.getElementById("menor")
const contenedorStasThree = document.getElementById("largo")
const $tableUp = document.getElementById('tbUp')
const $tablePast = document.getElementById('tbPast')
let date; 
let datosEvents;


fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(respuesta => respuesta.json())
    .then(data => {
        datosEvents = data.events

        date = data.currentDate
        let pastEVents = datosEvents.filter(event => event.date < date)
        let upEvents = datosEvents.filter(evento => evento.date >= date)

        let catRepeatPast = pastEVents.map(evento => evento.category)

        let catRepeatUP = upEvents.map(event => event.category)
        
        const arrayOrdenado = Array.from(datosEvents).sort(function (a, b) {
            return b.capacity - a.capacity
        })

        pastEVents.sort((a, b) => calcularPorcentajeAlto(a.assistance, a.capacity) - calcularPorcentajeAlto(b.assistance, b.capacity))
        
        let nombreMayor = arrayOrdenado[0].name
        let capacidadMayor = arrayOrdenado[0].capacity
        
        let eventoMenor = pastEVents[0];
        let eventoMayor = pastEVents[pastEVents.length - 1];
        
        let porcentajeOne = calcularPorcentajeAlto(eventoMayor.assistance, eventoMayor.capacity).toFixed(1)
        let porcentajeTwo= calcularPorcentajeAlto(eventoMenor.assistance,eventoMenor.capacity).toFixed(1)

        primerTabla(eventoMayor, contenedorStatsOne, porcentajeOne)
        primerTabla(eventoMenor, contenedorStatsTwo, porcentajeTwo)
        
        segundaTable(nombreMayor, contenedorStasThree, capacidadMayor)
        let noRepeatPast = Array.from(new Set(catRepeatPast))
        let noRepeatUp = Array.from(new Set(catRepeatUP))

        let objEventPast = noRepeatPast.map((categoria) => {
            let aux = {
                category: categoria
            }
            let catEvents = pastEVents.filter(evento => evento.category == categoria)
            const revenue = catEvents.reduce((acc, act) => acc + (act.price * act.assistance), 0)
            aux.revenue = revenue
            let porcAssist = catEvents.reduce((acc, act) => acc + (act.assistance / (act.capacity / 100)), 0) / catEvents.length
            aux.porcAssist=porcAssist.toFixed(2)
            return aux
        })

        let objEventUp = noRepeatUp.map((categoria) => {
            let aux = {
                category: categoria
            }
            let catEvents = upEvents.filter(evento => evento.category == categoria)
            const revenue = catEvents.reduce((acc, act) => acc + (act.price * act.estimate), 0)
            aux.revenue = revenue
            let porcEstimate = catEvents.reduce((acc, act) => acc + (act.estimate / (act.capacity / 100)), 0) / catEvents.length
            aux.porcEstimate=porcEstimate.toFixed(2)
            return aux
        })
   
        pintTableUp(objEventUp,$tableUp)
        pintTablePast(objEventPast,$tablePast)
    }
    )
    .catch(error => console.log(error))

function calcularPorcentajeAlto(assistance, capacidad) {
    let porcentaje = (assistance / capacidad) * 100
    return porcentaje 
}

function primerTabla(evento, hmtlContain,porcentaje) {
    hmtlContain.innerHTML = ` <tr>
     <td>${evento.name} ${porcentaje} %</td>
     </tr>`
}
function segundaTable(evento, hmtlContain,porcentaje) {
    hmtlContain.innerHTML = ` 
     <td>${evento} ${porcentaje}</td>
    `
}

function pintTableUp(eventos,container) {
    for (let event of eventos) {
      container.innerHTML += ` <tr class=''>
        <td >${event.category}</td>
        <td >$${event.revenue}</td>
        <td >${event.porcEstimate}%</td>
      </tr>
        `
    }
}
function pintTablePast(eventosPast,container) {
    for (let event of eventosPast) {
       container.innerHTML+= ` <tr>
        <td >${event.category}</td>
        <td >$${event.revenue}</td>
        <td >${event.porcAssist}%</td>
      </tr>
        `
    }
}   