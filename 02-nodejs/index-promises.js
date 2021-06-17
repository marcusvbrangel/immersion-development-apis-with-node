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


const usuarioPromisse = obterUsuario()
// para manipular o sucesso, usamos a funcao .then
// para manipula a falha, usamos a funcao .catch
usuarioPromisse
    .then(function (usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){  // telefone
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id,
                },
                telefone: result
            }
        })
    })
    .then(function (resultado){ 
        const endereco = obterEnderecoAsync(resultado.usuario.id)        
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: endereco
            }
        })
    })
    .then(function (resultado){ // result === sucesso === usuario
        console.log('resultado:', resultado)
    })
    .catch(function (reject){ // reject === error
        console.error('Deu ruim', reject)
    })




// obterUsuario(function resolverUsuario(error, usuario){
//     // null || "" || 0   === false
//     if(error){
//         console.error('Deu ruim em Usuario', error)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
//         if(error1){
//             console.error('Deu ruim em Telefone', error1)
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
//             if(error2){
//                 console.error('Deu ruim em Endereco', error2)
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereco: ${endereco.rua}, ${endereco.numero}
//                 Telefone: ${telefone.telefone}
//             `)
//         })


//     })
    
// })




