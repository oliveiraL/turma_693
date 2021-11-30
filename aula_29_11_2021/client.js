const dgram = require('dgram');
const readline = require('readline');
const client = dgram.createSocket('udp4');


console.clear()
const name = process.argv[2]
console.log(`Entrando no chat ${name}`)


client.on('message', msg => {
    const message = JSON.parse(msg)
    console.log(`${message.name}: ${message.msg}`)
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

sendMessage()

function sendMessage() {
    rl.question('O que deseja escrever ?\n', (message) => {
        if (message === 'exit') {
            exit()
        } else {
            const msgSend = {
                name: name,
                msg: message
            }
            client.send(Buffer.from(JSON.stringify(msgSend)), 5000, 'localhost')
            sendMessage()
        }
    });
}


function exit() {
    rl.close()
    client.close()
}


