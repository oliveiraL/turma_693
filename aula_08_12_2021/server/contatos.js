const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'contatos',
    password: 'admin',
    port: 5432,
})
client.connect()

async function getAll() {
    const result = await client.query('SELECT * FROM contato')
    return result.rows.map(contato => {
        return {
            id: contato.contato_id,
            apelido: contato.apelido,
            email: contato.email,
            endereco: contato.endereco,
            telefone: contato.telefone
        }
    })
}

module.exports = {
    client: client,
    getAll: getAll
}

