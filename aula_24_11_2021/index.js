const os = require('os');
const EventEmitter = require('events');

const event = new EventEmitter()



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
