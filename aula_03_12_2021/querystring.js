const querystring = require('querystring');


const data = querystring.stringify({empresa:'Almeida & Almeida & Associados', pergunta:'como maximizar minhas vendas?'});

console.log(data) 

const data2 = querystring.parse('empresa=Almeida%20%26%20Almeida%20%26%20Associados&pergunta=como%20maximizar%20minhas%20vendas%3F');

console.log(data2); 

const site = 'https://noticias.com/noticias/como adestrar seu golden retriever/';
const encoded = querystring.escape(site);
console.log(encoded);

const encoded2 = 'https%3A%2F%2Fnoticias.com%2Fnoticias%2Fcomo%20adestrar%20seu%20golden%20retriever%2F';

const site2 = querystring.unescape(encoded2);
console.log(site2);