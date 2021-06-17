/*
0 - Obter um usuario
1 - Obter o numerio de telefone de um usuario a partir de seu Id
2 - Obter o endereco do usuario pelo Id
*/

function obterUsuario(callback){
    setTimeout(function(){
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date(),
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback){
    setTimeout(function(){
        return callback(null, {
            telefone: '23423434234',
            ddd: 11,
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback){
    setTimeout(function(){
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

obterUsuario(function resolverUsuario(error, usuario){
    // null || "" || 0   === false
    if(error){
        console.error('Deu ruim em Usuario', error)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
        if(error1){
            console.error('Deu ruim em Telefone', error1)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
            if(error2){
                console.error('Deu ruim em Endereco', error2)
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero}
                Telefone: ${telefone.telefone}
            `)
        })


    })
    
})


//const usuario = obterUsuario(resolverUsuario)

// const telefone = obterTelefone(usuario.id)

//console.log('usuario', usuario)
// console.log('telefone', telefone)



