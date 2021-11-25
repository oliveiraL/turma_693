Vimos
* teoria do node
* modulos, os, http, event

Atividade
    * Subir um servidor na porta 3000.
Rotas:
    /health -> total de memoria, porcentagem de memoria utilizada, cpu
    /contatos -> listar tudo
        [
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


    /contatos/${apelido} -> mostrar um objeto especifico 
        ex: /contatos/lucio
            {
                apelido: 'lucio',
                nome: 'Lucio Oliveira',
                email: 'lucio.oliveira@lets.code.com'
            }

    /qualqueroutra -> 404

[
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