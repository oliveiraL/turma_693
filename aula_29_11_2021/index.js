// const dns = require('dns');

// dns.promises.resolveAny(
//     'class.letscode.com.br'
// ).then(console.log)
// .catch(console.log)

const { Resolver } = require('dns');

const resolver = new Resolver();
resolver.setServers(['205.251.197.183']);
resolver.resolveAny('letscode-academy.com', (err, info) => console.log(info));