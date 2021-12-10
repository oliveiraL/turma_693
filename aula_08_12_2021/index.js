const http = require('http')
const client = require('./server/contatos')

http.createServer(async (req, res) => {
    const url = req.url
    const method = req.method
    res.writeHead(200, { 'Content-Type': 'application/json' });
    try {
        if (method === 'GET' && url.includes('/contatos/')) {
            const id = getId(url)
            const contato = await client.getById(id)
            res.end(JSON.stringify(contato))
        } else if (method === 'GET' && url.includes('/contatos')) {
            const contatos = await client.getAll()
            console.log(JSON.stringify(contatos))
            res.end(JSON.stringify(contatos))
        } else if (method === 'POST' && url.includes('/contatos')) {
            const body = await getBody(req)
            const contato = await client.save(body)
            res.end(JSON.stringify(contato))
        } else if (method === 'PUT' && url.includes('/contatos/')) {
            const id = getId(url)
            const body = await getBody(req)
            const new_contato = await client.updateById(id, body)
            res.end(JSON.stringify(new_contato))
        } else if (method === 'DELETE' && url.includes('/contatos/')) {
            const id = getId(url)
            await client.deleteById(id)
            res.end()
        } else {
            res.writeHead(404);
            res.end('not found')
        }
    } catch (error) {
        if(error.status){
            res.writeHead(error.status);
        } else res.writeHead(500);
        res.end(JSON.stringify(error))
    }

}).listen(3000, () => console.log("Servidor UP"))

function getBody(req) {
    return new Promise((resolve) => {
        let chunks = '';
        req.on('data', chunk => {
            chunks += chunk.toString();
        });
        req.on('end', () => {
            resolve(JSON.parse(chunks))
        });
    });
}

function getId(url) {
    return url.substring('/contatos/'.length)
}