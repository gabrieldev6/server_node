//incluindo uma biblioteca
const http = require('http')
const url = require('url')
const queryString = require('query-string')


//definicao de endereco / url
const hostname = '127.0.0.1'
const port = 3000

//implementacao da regra de negocio
const server = http.createServer((req, res) =>{

    //pegar a pergunta na url
    console.log(req.url)
    const params = queryString.parse(url.parse(req.url, true).search)
    //nessa parte do codigo ele vai fazer o tratamento dos parametros que estao na url, que estao contidos em req.url
    //transformando eles em formato de json
    
    let resposta
    ///verificar a pergunta e escolher uma resposta
    if(params.pergunta == 'melhor-filme') {
        resposta = 'star wars'
    } else if(params.pergunta == 'melhor-tecnologia-backend') {
        resposta = 'nodejs'
    } else {
        resposta = 'nao sei, desculpe :('
    }
    //retornar a resposta escolhida
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(resposta)
})

//execucao
server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}`)
})
//exemplor que podem ser executados para teste do server
//localhost:3000/?pergunta=melhor-filme