
const moment = require('moment');
const { restart } = require('nodemon');
const conexao = require('../bd/connection');

class Atendimentos{

    listarAtendimentos (res){
        const sql = "SELECT * FROM Atendimentos"

        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultados);
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultados)
            }
        })
    }

    apagarAtendimento(id, res){
        const sql = `DELETE FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro) =>{
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json({"message": "Registro excluído com sucesso!" })
            }
        })
    }

    alterarAtendimento(id, valores, res){
        const sql = `UPDATE Atendimentos SET ? WHERE id = ${id}`

        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores, id})
            }
        })
    }

    cadastrarAtendimento(req, res){
        const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss")

        const horario = req.horario;
        delete req.horario;

        const dataTemp = moment(req.data, "DD/MM/YYYY").format("YYYY-MM-DD ")
        
        const data = dataTemp + horario + ":00";
        

        const atendimentoDatado = {...req, dataCriacao, data}
        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (erro, result) => {
        if (erro){
            res.status(400).json(erro)
        }else{
          
            res.status(200).json( {"message": `Cadastrado com sucesso!`})
                      
        }
        })
    }
}

module.exports = new Atendimentos;






