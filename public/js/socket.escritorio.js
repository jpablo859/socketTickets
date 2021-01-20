//comando para establecer la comunicacion

var socket = io();

let searchParams = new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let escritorio = searchParams.get('escritorio');
let label = $('small');
console.log(escritorio)

$('h1').text(`Escritorio ${escritorio}`)

$('button').on('click', () => {
    socket.emit('atenderTicket', {escritorio}, (resp) => {
        if(!resp.numero) {
            alert(resp);
            return false;
        }
        label.text(resp.numero);
    })
})

/*

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket)
    });
})

$(() => {
    socket.emit('ticketActual', null, (ticketActual) => {
        label.text(ticketActual)
    });
})
*/