const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'contatos',
    password: 'admin',
    port: 5432,
})
client.connect()

function last_id() {
    return client.query('SELECT MAX(contato_id) FROM contato')
        .then(result => result.rows[0].max).catch(console.log)
}

async function save(contato) {
    const id = await last_id()
    console.log(id)
    const query = {
        text: 'insert into contato values ($1, $2, $3, $4, $5)',
        values: [id + 1, contato.apelido, contato.email, contato.endereco, contato.telefone]
    }
    return client
        .query(query)
        .then(res => res.rows[0])
}



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
    getAll: getAll,
    save: save
}
