//chamada das bibliotecas padroes do node
const http = require('http') //funcoes http
const url = require('url')
const fs = require('fs')
const queryString = require('query-string')



const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res)=> {

    let resposta
    const urlparse = url.parse(req.url, true)
    //receber informacoes do usuario
    const params = queryString.parse(urlparse.search)

    //criar um usuario
    if(urlparse.pathname == '/criar-usuario') {
        
        //salvar as informacoes
        fs.writeFile('users/'+params.id+'.txt', JSON.stringify(params), function (err) {
            if(err) throw err
            console.log('saved!')

            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            res.end(resposta)
        })

        resposta = 'usuario criado com sucesso'
    //selecionar usuario
    } else if(urlparse.pathname == '/selecionar-usuario') {
        
        fs.readFile('users/'+params.id+'.txt', function(err,data) {
            resposta = data

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(resposta)

        })
    }
    //remover o usuario
    else if(urlparse.pathname == '/remover-usuario') {
        fs.unlink('users/'+params.id+'.txt', function(err, data){
            console.log('arquivo deletado')
            resposta = err ? 'usuario nao encontrado' : 'usuario removido'

            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            res.end(resposta)

        })
    }
    //atualiza
    
})
//execucao
server.listen(port, hostname, ()=> {
    console.log(`server running at http://${hostname}:${port}/`)
})
//exemplor que podem ser executados para teste do server
//http://127.0.0.1:3000/criar-usuario?nome=gabriel&id=1&idade=22
//http://127.0.0.1:3000/selecionar-usuasrio?id=1
//http://127.0.0.1:3000/remover-usuario?id=1