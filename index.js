
const express = require('express');
const conexao = require("./bd/connection");
const tabela = require('./bd/tabela');
const routes = require("./routes/atendimentosRoute");




const app = express();

const port = 3000;

conexao.connect(erro =>{
    if(erro){
        console.log(erro.message);
    }else{
        tabela.init(conexao);
        
        routes(app);

        app.listen(port,() =>{
            console.log(`Servidor rodando na porta ${port}`);
        })
        
        app.get('/', (req, res) => {
            res.status(200).json({"message":"Bom dia, seja bem vindo!"})
        })
    }


})

module.exports = app;


