const dgram = require('dgram');
const readline = require('readline');
const client = dgram.createSocket('udp4');

const name = process.argv[2]

client.on('message', msg => {
    const message = JSON.parse(msg)
    console.log(`${message.name}: ${message.msg}`)
});


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sendMessage(){
    rl.question('', (message) => {
        const msgSend = {
            name: name,
            msg: message
        }
        client.send(Buffer.from(JSON.stringify(msgSend)), 5000, 'localhost')
        rl.close()
    });
}




