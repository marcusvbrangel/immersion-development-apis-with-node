const service = require('./service')

async function main(){

    try {

        const result = await service.obterPessoa('a')
        const names = []
        
        // ------------------- loop for ---------------------------------
        // console.time('for')
        // for (let i = 0; i <= result.results.length -1; i++){
        //     const pessoa = result.results[i]
        //     names.push(pessoa.name)
        // }
        // console.timeEnd('for')          // for: 0.152ms
        

        // ------------------- loop forin ---------------------------------
        // console.time('forin')
        // for (let i in result.results){
        //     const pessoa = result.results[i]
        //     names.push(pessoa.name)
        // }
        // console.timeEnd('forin')          // forin: 0.321ms


        // ------------------- loop forof ---------------------------------
        console.time('forof')
        for (pessoa of result.results){
            names.push(pessoa.name)
        }
        console.timeEnd('forof')          // forof: 0.299ms

        console.log('names', names)

    } catch (error) {
        console.error('error interno',error)
    }
}

main()

