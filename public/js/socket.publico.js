//comando para establecer la comunicacion

var socket = io();

socket.on('ticketActual', (resp) => {
    html(resp.ultimos);
});

socket.on('ultimosTickets', (resp) => { 
    console.log(resp)
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    html(resp.ultimos);
});

const html = (data) => {
    data.map(({numero, escritorio}, i) => {
        $(`#lblTicket${i+1}`).text(`Ticket ${numero}`);
        $(`#lblEscritorio${i+1}`).text(`Módulo ${escritorio}`);
    })
}
