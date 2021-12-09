const http = require('http')
const client = require('./server/contatos')

http.createServer(async (req, res) => {
    const url = req.url
    const method = req.method
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (method === 'GET' && url.includes('/contatos')) {
        const contatos = await client.getAll()
        console.log(JSON.stringify(contatos))
        res.end(JSON.stringify(contatos))
    } else if (method === 'POST' && url.includes('/contatos')) {
        const body = await getBody(req)
        const contato = await client.save(body)
        res.end(JSON.stringify(contato))
    } else if (method === 'PUT' && url.includes('/contatos')) {
        res.end("PUT contatos")
    } else if (method === 'DELETE' && url.includes('/contatos')) {
        res.end("DELETE contatos")
    } else {
        res.writeHead(404);
        res.end('not found')
    }

}).listen(3000, () => console.log("Servidor UP"))

function getBody(req) {
    return new Promise((resolve) => {
      let chunks = '';
      req.on('data', chunk => {
        chunks+=chunk.toString();
      });
      req.on('end', () => {
        resolve(JSON.parse(chunks))
      });
    });
}  