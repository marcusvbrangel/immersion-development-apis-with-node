const service = require('./service')

Array.prototype.meuMap = (callback) => {
    const novoArrayMapeado = []
    for (let indice = 0; indice <= this.length -1; indice++) {
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado;
}

async function main(){

    try {

        const results = await service.obterPessoa(`a`)
        //const names = []

        // ------------------- array forEach ---------------------------------
        // console.time('forEach')
        // results.results.forEach((pessoa) => {
        //     names.push(pessoa.name)
        // })
        // console.timeEnd('forEach')          // forEach: 0.33ms


        // ------------------- array map ---------------------------------
        // console.time('map')
        // const names = results.results.map((pessoa) => pessoa.name)
        // console.timeEnd('map')          // map: 0.242ms


        // ------------------- array meuMap ---------------------------------
        console.time('meuMap')
        const names = results.results.meuMap((pessoa, indice) => {`[${indice}] ${pessoa.name}`})
        console.timeEnd('meuMap')          // meuMap: 0.242ms

        console.log('name', names)

    } catch (error) {
        console.error(`deu ruim`, error)        
    }

}

main()
