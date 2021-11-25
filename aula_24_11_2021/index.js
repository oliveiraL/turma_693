const os = require('os');
const EventEmitter = require('events');

const event = new EventEmitter()

const lista = [
    {
        apelido: 'lucio',
        nome: 'Lucio Oliveira',
        email: 'lucio.oliveira@lets.code.com'
    },
    {
        apelido: 'erich',
        nome: 'Erich',
        email: 'erich@lets.code.com'
    }
]


setInterval(() => {
    const { freemem, totalmem } = os

    const total = totalmem() / 1024 / 1024
    const free = freemem() / 1024 / 1024
    const status = {
        total: `${total} MB`,
        free: `${free} MB`
    }
    
    event.emit('status', status)
}, 1500);
