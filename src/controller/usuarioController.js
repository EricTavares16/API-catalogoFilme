


import { Router } from "express";

import { InserirUsuario, Login } from "../repository/usuarioRepository.js";

const server = Router()


server.post('/usuario', async (req, resp) => {

    try {

        const usuarioInserir = req.body

        const resposta  = await InserirUsuario(usuarioInserir)
        
        resp.send(resposta)

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.post('/usuario/login', async (req, resp) => {
    
    try {

        const {email, senha} = req.body

        const resposta  = await Login(email, senha)

        if(!resposta)
            throw new Error ('Credenciais inválidas')
        
        resp.send(resposta)

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

})



export default server