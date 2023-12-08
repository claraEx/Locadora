import { randomUUID } from "crypto"

export class DatabaseMemory{
#filmes = new Map()

list(search){
    return Array.from(this.#filmes.entries()).map((filmesArray) =>{
    // acessando primeira posição
        const id = filmesArray[0]
        const data = filmesArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(filme => {
        if (search){
            return filme.titulo.includes(search)
        }
        return true
    })
}
create(filme){
    const filmeId = randomUUID()
    this.#filmes.set(filmeId, filme)
}
update(id, filme){
    this.#filmes.set(id, filme)
}
delete(id, filme){
    this.#filmes.delete(id, filme)
}
}