const fs = require('fs');

class Ticket {
    
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

class TicketControl {
    
    constructor() {

        let data = require('../data/data.json');

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosTickets = data.ultimosTickets

       if(data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets
       } else {
            this.reiniciarContro();
       }
    }

    reiniciarContro() {
        
        this.ultimo = 0;
        this.ultimosTickets = [];
        this.grabarArchivo();
        
    }

    siguiente() {

        this.ultimo+=1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return this.getUltimoTicket();
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimosTickets() {
        return this.ultimosTickets;
    }

    atenderTicket(escritorio) {

        if(this.tickets.length === 0) return `No hay tickets`;

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimosTickets.unshift(atenderTicket);

        if(this.ultimosTickets.length > 4) {
            this.ultimosTickets.splice(-1,1);
        }

        this.grabarArchivo();
        return atenderTicket;

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosTickets: this.ultimosTickets
        }

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));

    }

}

module.exports = {TicketControl};