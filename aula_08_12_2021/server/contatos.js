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
    const query = {
        text: 'insert into contato values ($1, $2, $3, $4, $5)',
        values: [id + 1, contato.apelido, contato.email, contato.endereco, contato.telefone]
    }
    return client
        .query(query)
        .then(res => res.rows[0])
}

async function getById(id){
    const result = await client.query('SELECT * FROM contato c where c.contato_id = $1', [id])
    if(!result.rowCount){
        throw {error: "not found", status: 404}
    }
    return result.rows.map(convertContatoToContatoDTO)[0]
}

async function updateById(id, contato){
    const query = {
        text: 'UPDATE contato SET apelido = $1, email = $2, endereco = $3, telefone = $4 WHERE contato_id = $5',
        values: [contato.apelido, contato.email, contato.endereco, contato.telefone, id]
    }
    return client
        .query(query)
        .then((res) => getById(id))
}

async function deleteById(id) {
    const query = {
        text: 'DELETE from contato WHERE contato_id = $1',
        values: [id]
    }
    const result = await client.query(query)
    if(!result.rowCount){
        throw {error: "not found", status: 404}
    }
}


async function getAll() {
    const result = await client.query('SELECT * FROM contato')
    return result.rows.map(convertContatoToContatoDTO)
}

function convertContatoToContatoDTO(contato) {
    return {
        id: contato.contato_id,
        apelido: contato.apelido,
        email: contato.email,
        endereco: contato.endereco,
        telefone: contato.telefone
    }
}

module.exports = {
    client: client,
    getAll: getAll,
    save: save,
    getById,
    updateById,
    deleteById
}
