const os = require('os');
const http = require('http')

const contatos = [
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


http.createServer((req, res) => {
    const url = req.url
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if(url === '/health')
        res.end(JSON.stringify(getStatus()))
    else if (url === '/contatos' && req.method === 'GET'){
        res.end(JSON.stringify(contatos))
    } else if (url.includes('/contatos/')){
        const contato = getContato(url)
        if(contato)
            res.end(JSON.stringify(contato))
        else 
            return404(res)
    }
    else{
        return404(res)
    }

}).listen(3000, () => console.log('foi'))


function getContato(url){
    const apelido = url.substring('/contatos/'.length)
    return contatos.find(contato => contato.apelido === apelido)
}

function return404(res){
    res.writeHead(404);
    res.end('not found')
}

function getStatus() {
    const { freemem, totalmem, cpus } = os

    const total = parseInt(totalmem() / 1024 / 1024)
    const mem = parseInt(freemem() / 1024 / 1024)
    const percents = parseInt((mem / total) * 100)

    return {
        total: `${total} MB`,
        free: `${mem} MB`,
        usage: `${percents}%`,
        cpus: cpus()
    }
}