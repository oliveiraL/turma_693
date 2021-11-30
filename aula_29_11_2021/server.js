const dgram = require('dgram');
const server = dgram.createSocket('udp4');
console.clear()

let clients = []

function addClient(address, port, name){
    const client = clients.find(client => client.address == address && client.port == port)
    if(!client){
        clients = [...clients, {
            address,
            port, 
            name
        }]
    }
    console.log(JSON.stringify(clients))
}

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    const client = JSON.parse(msg)
    addClient(rinfo.address, rinfo.port, client.name)
    const msgSend = {
        name: client.name,
        msg: client.msg
    }
    clients.forEach(c => {
        if(c.name !== client.name){
            server.send(Buffer.from(JSON.stringify(msgSend)), c.port, c.address)
        }
    })
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(5000, () => console.log("subi!"));