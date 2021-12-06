const fs = require('fs')


// readdirCallBack('/Users/luciooliveira', (err, arquivos) => {
//     console.log(arquivos)
// })

// readdirCallBack2('/Users/lucioolivei', (err, arquivos) => {
//     if(arquivos)
//         console.log('2 ',arquivos)
//     else
//         console.log('2', err)
// })

const promise = readdirPromise('/Users/luciooliveira/workspace/lets_code/turma_693')
const promise2 =  readDirAsync('/Users/luciooliveira/workspace/lets_code12312')

// const result = Promise.all([promise, promise2])
// result.then(arquivos => console.log(arquivos)).catch(err => console.log(err))

const result = Promise.allSettled([promise, promise2])
result.then((results) => results.forEach((result) => console.log(result)))

// console.log('1 ', promise)
// console.log('2 ',promise2)

// promise.then(console.log).catch(console.log)

// promise2.then(console.log).catch(console.log)

function readdirPromise(path){
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, arquivos) => {
            if(arquivos) {
                resolve(arquivos)
            } else reject(err)
        })
    })
}

async function readDirAsync(path) {
    return await fs.promises.readdir(path)
}

function readdirCallBack(path, callback){
    fs.readdir(path, callback)
}

function readdirCallBack2(path, call){
    readdirPromise(path)
    .then(arq => call(undefined, arq))
    .catch(err => call(err, undefined))
}