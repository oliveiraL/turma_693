const dgram = require('dgram');
const client = dgram.createSocket('udp4');
client.on('message', msg => console.log(msg.toString()));
client.send(Buffer.from('Olá servidor 2'), 5000, 'localhost', () => console.log('enviado'))