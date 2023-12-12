//Importando o ID aleatório.
import { randomUUID } from "crypto"

export class DatabaseMemory{
#filmes = new Map()

//Cria uma lista com os filmes
list(search){
    //Transformando os valores em Array
    return Array.from(this.#filmes.entries()).map((filmesArray) =>{

    //Criando método para acessar os dados do array.
    //Acessando primeira posição
        const id = filmesArray[0]
    //Acessando a segunda posição
        const data = filmesArray[1]

        return{
            id,
            ...data
        }
    })
    //Função para retornar apenas o resultado da pesquisa
    .filter(filme => {
        if (search){
        return filme.titulo.includes(search)
        }
        return true
    })
}
//Criando o filme
create(filme){
    //Criando um id aleatório
    const filmeId = randomUUID()
    this.#filmes.set(filmeId, filme)
}
//Atualixando o filme
update(id, filme){
    this.#filmes.set(id, filme)
}
//Deletando o filme 
delete(id, filme){
    this.#filmes.delete(id, filme)
}
}