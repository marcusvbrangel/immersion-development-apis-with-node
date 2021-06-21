
/**
 * ----------------------------------------------------
 *  SWAPI - The Star Wars API
 *  https://swapi.dev/
 * ----------------------------------------------------
 * */

const axios = require('axios')
const URL = `https://swapi.dev/api/people`

async function obterPessoa(nome){
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}

obterPessoa('r2')
    .then(function(result){
        console.log('resultado', result)
    })
    .catch(function(error){
        console.error('deu ruim', error)
    })

module.exports = {
    obterPessoa
}    
