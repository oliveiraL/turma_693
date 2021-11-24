const EventEmitter = require('events');
const event = new EventEmitter()

event.on('status', (message) => {
    console.table(message) 
})


event.on('status', (message) => {
    console.log(message) 
})

setInterval(() => {
    
}, 3000);