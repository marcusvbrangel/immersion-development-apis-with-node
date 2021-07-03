
// npm install commander
// https://openbase.com/js/commander/versions#2.18.0

const Commander = require("commander")

const Database = require("./database")

const Heroi = require("./heroi")

async function main(){

    Commander
        .version("v1")
        .option("-n, --nome [value]", "Nome do heroi")
        .option("-p, --poder [value]", "Poder do heroi")
        .option("-i, --id [value]", "Id do heroi")

        .option("-c, --cadastrar", "Cadastrar um heroi")
        .option("-l, --listar", "Listar um heroi")
        .option("-r, --remover", "Remover um heroi pelo id")
        .option("-a, --atualizar [value]", "Atualizar um heroi pelo id")

        .parse(process.argv)
    
    const heroi = new Heroi(Commander)

    try {
        
        if (Commander.cadastrar){

            // node index.js --cadastrar --nome Aquaman --poder Marinho
            
            const resultado = await Database.cadastrar(heroi)

            if (!resultado){
                console.error("Heroi nao cadastrado!")
                return
            }

            console.log("Heroi cadastrado com sucesso!")

        }

        if (Commander.listar){

            // node index.js --listar

            const resultado = await Database.listar()
            console.log(resultado)
            return

        }

        if (Commander.remover){

            // limpar a base herois.json
            // node index.js --cadastrar --nome Aquaman --poder Marinho
            // node index.js --listar
            // node index.js --remover --id 1625185282065
            // node index.js --listar

            const resultado = await Database.remover(heroi.id)

            if (!resultado){
                console.error("Nao foi possivel remover o heroi!")
                return
            }

            console.log("Heroi removido com sucesso!")

        }

        if (Commander.atualizar){

            // node index.js --listar
            // node index.js --cadastrar --nome Aquaman --poder Marinho
            // node index.js --listar
            // node index.js --atualizar 1625186319985 --nome Chapolin
            // node index.js --atualizar 1625186319985 --poder "Marreta Bionica"

            const idParaAtualizar = parseInt(Commander.atualizar)

            // remover todas as chaves que estiverem com undefined | null...
            const dado = JSON.stringify(heroi)

            const heroiAtualizar = JSON.parse(dado)

            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)

            if (!resultado){
                console.error("Nao foi possivel atualizar o heroi!")
                return
            }

            console.log("Heroi atualizado com sucesso!")

        }

        
    } catch (error) {
        
        console.log("deu ruim", error)

    }

}    

main()

