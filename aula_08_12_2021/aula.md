# Aula 08/12/2021


* Criar um crud de contatos com banco de dados (POSTGRES).

(Criação, Atualização, Consulta, Remoção)

Contato
    * nome
    * apelido
    * email
    * endereco
    * telefone

docker run --name letscode-postgres -e "POSTGRES_PASSWORD=admin" -p 5432:5432 -d postgres

docker exec -it letscode-postgres psql -U postgres

create database contatos;

docker exec -it letscode-postgres psql -U postgres - d contatos

create table contato(
    contato_id int primary key,
    apelido varchar(255),
    email varchar(255) not null,
    endereco varchar(255),
    telefone varchar(255)
)

insert into contato values (
    0, 'lucio', 'lucio@letscode.com', 'rua sei la qual', '(11)12345-6789'
);