# HTTP e Axios

- Fazer requests HTTP usando o módulo [http](https://nodejs.org/api/http.html) do node.js;
- Fazer requests HTTP usando a lib [axios](npmjs.com/package/axios);


## Instruções para rodar
```shell
npm i
npm start
```

## Exercício
Implementar na API criada nas aulas anteriores as seguintes funcionalidades:
1. Ao salvar um contato, buscar o nome do seu Pokémon favorito fazendo uma chamada para a [API externa do Pokémon](https://pokeapi.co/api/v2/pokemon/1) passando como id o tamanho atual da lista de contatos + 1. E.g. se a lista de contatos tem 2 entradas, o id passado para a API deveria ser o 3;
2. Ao salvar um contato, buscar o nome do seu personagem do Star Wars favorito fazendo uma chamada para a [API externa do Star Wars](https://swapi.dev/api/people/1) com a mesma lógica do Pokémon. Nesse ponto, seu contato deveria ser salvo como algo parecido com:
```
{
    "nome": "Bruce Wayne",
    "telefone": "+555199999-9999",
    "pokemon-favorito": "bulbasaur",
    "star-wars-favorito": "Luke Skywalker",
}
```
3. Fazer as duas chamadas em paralelo e usando a [API de Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise);
4. Os seguintes comandos devem funcionar ou com [cURL](https://curl.se/) ou no [Postman](https://www.postman.com/):
   - GET → retorna lista de contatos como JSON
   - POST → adiciona novo contato com nome e telefone e o servidor deve adicionar "pokemon-favorito" e "star-wars-favorito".
```shell
curl -X POST "http://localhost:8000/" -H 'Content-Type: application/json' -d '{"nome": "Bruce Wayne", "telefone":"+555199999-9999"}'
curl -X POST "http://localhost:8000/" -H 'Content-Type: application/json' -d '{"nome": "Alfred", "telefone":"+555199999-0000"}'
 
[
  {
    "nome": "foo",
    "telefone": "+5551984756267",
    "pokemon-favorito": "bulbasaur",
    "star-wars-favorito": "Luke Skywalker"
  },
  {
    "nome": "Alfred",
    "telefone": "+555199999-0000",
    "pokemon-favorito": "ivysaur",
    "star-wars-favorito": "C-3PO"
  }
]

```