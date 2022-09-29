const express = require("express");
const Atendimento = require("../controllers/atendimentos")


module.exports = app =>{
    
    app.use(express.urlencoded({extend:true}));
    app.use(express.json());

    app.post("/atendimentos", (req, res) => {
        const atendimento = req.body;
        Atendimento.cadastrarAtendimento(atendimento, res);
    })

    app.get("/atendimentos", (req, res) =>{
        Atendimento.listarAtendimentos(res)
    })

    app.get("/atendimentos/:id", (req, res) =>{
        const id = parseInt(req.params.id)
        Atendimento.buscaPorId(id, res)
    })

    app.delete("/atendimentos/:id", (req, res) =>{
        const id = parseInt(req.params.id)
        Atendimento.apagarAtendimento(id, res)
    })

    app.put("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        Atendimento.alterarAtendimento(id, valores, res);
    })


       
}