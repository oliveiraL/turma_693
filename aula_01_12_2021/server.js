const fsPromises = require('fs').promises;
const path = require('path');
const axios = require('axios');
const http = require('http');

const POKE_API = 'https://pokeapi.co/api/v2/pokemon/';
const STAR_WARS_API = 'https://swapi.dev/api/people/';

async function readPreviousContacts(filePath) {
  const rawPreviousContacts = await fsPromises.readFile(filePath, 'utf-8');
  return JSON.parse(rawPreviousContacts);
}

function getBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', chunk => {
      chunks.push(chunk.toString());
    });
    req.on('end', () => {
      resolve(chunks)
    });
  });
  
  // return new Promise(async (resolve) => {
  //   const buffers = [];
  //
  //   for await (const chunk of req) {
  //     buffers.push(chunk);
  //   }
  //
  //   resolve(Buffer.concat(buffers).toString());
  // });
}

const server = http.createServer(async (req, res) => {
  const filePath = path.join(__dirname, 'contacts.txt');
  const { method } = req;
  
  
  switch (method) {
    case 'GET': {
      const previousContacts = await readPreviousContacts(filePath);
      res.writeHead(
        200,
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*',
        },
      ); // TODO adicionando headers de CORS para caso queira implementar um front pegando os contatos
      res.end(JSON.stringify(previousContacts));
      break;
    }
    case 'POST': {
      const rawBody = await getBody(req);
      const newContact = JSON.parse(rawBody);
      
      const previousContacts = await readPreviousContacts(filePath);
      const pokeId = previousContacts.length + 1;
      
      const chars = await Promise.all([
        axios.get(`${POKE_API}${pokeId}`),
        axios.get(`${STAR_WARS_API}${pokeId}`),
      ]);
      
      const [pokemon, starWars] = chars.map(c => c.data.name);
      
      const newContactWithPokemon = {
        ...newContact,
        'favorite-pokemon': pokemon,
        'favorite-star-wars': starWars,
      };
      
      const newContacts = previousContacts.concat(newContactWithPokemon);
      await fsPromises.writeFile(filePath, JSON.stringify(newContacts));
  
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newContacts));
      break;
    }
    case 'DELETE': {
      await fsPromises.writeFile(filePath, '[]');
      res.writeHead(200);
      res.end();
      break;
    }
    default: {
      res.writeHead(500);
      res.end();
    }
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log('server running on', PORT);
});