import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/filme', (request, reply) => {
// Acessando dados do corpo da requisição
    const {titulo, genero, duraçao} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        titulo: titulo,
        genero: genero,
        duraçao: duraçao,
    })

    return reply.status(201).send
})

server.get('/filme', (request) => {
    const search = request.query.search
    console.log(search)
    const filmes = database.list(search)
    console.log(filmes)
    return filmes
})

server.put('/filmes/:id', (request, reply) => {
    const filmeId = request.params.id
    const {titulo, genero, duraçao} = request.body
    const filme = database.update(filmeId, {
        titulo: titulo,
        genero: genero,
        duraçao: duraçao,
    })
    return reply.status(204).send()
})

server.delete('/filmes/:id', (request, reply) => {
    const filmeId = request.params.id

    database.delete(filmeId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})