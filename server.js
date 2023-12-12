import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
//Criando o nosso server
const server = fastify()

//Rota principal
server.get('/', () => {
    return 'Rota padrão'
})

//Outras rotas
//Rota responsavel por criar dados
server.post('/filme', (request, reply) => {
// Acessando dados do corpo da requisição
    const {titulo, genero, duraçao} = request.body
// Exibindo dados   
    database.create({
        titulo: titulo,
        genero: genero,
        duraçao: duraçao,
    })
//Retorna o status 201 dizendo que a solicitação foi criada
    return reply.status(201).send
})

//Buscando o filme
server.get('/filme', (request) => {
    //Pegando a busca
    const search = request.query.search
    //Retornando a busca
    console.log(search)
    //Acessando o database
    const filmes = database.list(search)
    //Retornando o filme pesquisado
    console.log(filmes)
    return filmes
})

//Atualiza o livro
server.put('/filmes/:id', (request, reply) => {
    //Passando o id do livro
    const filmeId = request.params.id
    //Passando o restante do conteudo
    const {titulo, genero, duraçao} = request.body
    const filme = database.update(filmeId, {
        titulo: titulo,
        genero: genero,
        duraçao: duraçao,
    })
    //Retornando status 204 sem conteudo 
    return reply.status(204).send()
})

//Exclui o objeto expecifico de acordo com o ID
server.delete('/filmes/:id', (request, reply) => {
    const filmeId = request.params.id
    //Vai ser excluido do banco de dados o filme com id adicionado.
    database.delete(filmeId)
    //E então retorna o status 204, que é usado para dizer que a ação foi realizada com sucesso mas não retorna nada.
    return reply.status(204).send()
}) 

//Passando a porta em que o servidor está rodando.
server.listen({
    port: 3333,
})