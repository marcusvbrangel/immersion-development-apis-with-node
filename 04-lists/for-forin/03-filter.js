const { obterPessoa } = require('./service')

Array.prototype.meuFilter = function (callback){

    const lista = []

    for (index in this){

        const item = this[index]

        const result = callback(item, index, this)

        if (!result) continue;

        lista.push(item)

    }

    return lista;
}

async function main(){

    try {
        
        const { results } = await obterPessoa('a')

        // ------------------- array filter ---------------------------------
        // console.time('filter')
        // const familiaLars = results.filter(function (item){

        //     const result = item.name.toLowerCase().indexOf('lars') !== -1

        //     return result
        // })
        // console.timeEnd('filter')          // filter: 0.337ms


        // ------------------- array meuFilter ---------------------------------
        //console.time('meuFilter')
        const familiaLars = results.meuFilter((item, index, lista) => {

            console.log(`index: ${index}`, lista.length)

            return item.name.toLowerCase().indexOf('lars') !== -1

        })
        //console.timeEnd('meuFilter')          // meuFilter: 0.337ms


        const names = familiaLars.map((pessoa) => pessoa.name)
        
        console.log(names)

    } catch (error) {
        console.error(`deu ruim`, error)
    }

}

main()
