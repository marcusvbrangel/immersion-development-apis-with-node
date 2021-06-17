/*
0 - Obter um usuario
1 - Obter o numerio de telefone de um usuario a partir de seu Id
2 - Obter o endereco do usuario pelo Id
*/

// importamos um modulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    // quando sucesso => resolve
    // quando falha   => reject
    return new Promise(function resolvePromise(resolve, reject){

        setTimeout(function(){

            //return reject(new Error('deu ruim de verdade!!!'))

            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date(),
            })
        }, 1000)

    })
}

function obterTelefone(idUsuario){

    return new Promise(function resolvePromise(resolve, reject){
        
        setTimeout(function(){
            return resolve({
                telefone: '23423434234',
                ddd: 11,
            })
        }, 2000)

    })

}

function obterEndereco(idUsuario, callback){
    setTimeout(function(){
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

main()

// passo 01: adicionar a palavra async -> automaticamente ela retornara uma Promise
async function main(){

    try {

        console.time('medida-promise')
        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)

        // se obterTelefone nao depende de obterEnderecoAsync
        // e obterEnderecoAsync nao depende de obterTelefone
        // pode-se colocar dentro de Promisse.all, para executar em paralelo
        // Obs: os dois metodos acima dependem de obterUsuario,
        // por isto, devem ser chamado depois...
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome}, 
            Telefone: (${telefone.ddd}) ${telefone.telefone}, 
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise')    // medida-promise: 3.022s

    } catch (error) {
        console.error('Deu ruim', error)
    }

}


// // passo 01: adicionar a palavra async -> automaticamente ela retornara uma Promise
// async function main(){

//     try {

//         console.time('medida-promise')
//         const usuario = await obterUsuario()
//         const telefone = await obterTelefone(usuario.id)
//         const endereco = await obterEnderecoAsync(usuario.id)

//         console.log(`
//             Nome: ${usuario.nome}, 
//             Telefone: (${telefone.ddd}) ${telefone.telefone}, 
//             Endereco: ${endereco.rua}, ${endereco.numero}
//         `)
//         console.timeEnd('medida-promise')    // medida-promise: 5.025s

//     } catch (error) {
//         console.error('Deu ruim', error)
//     }

// }

