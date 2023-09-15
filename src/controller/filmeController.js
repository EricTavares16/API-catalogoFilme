

import { Router } from "express";
import { AlterarFilme, AlterarImagem, DeletarFilme, InserirFilme, MostrarFilmes } from "../repository/filmeRepository.js";

import multer from "multer";

const server = Router()

const upload = multer ({dest: 'storage/capasFilmes'})


server.post('/filme', async (req, resp) => {

    try {

        const filmeInserir = req.body

        const filmeInserido = await InserirFilme(filmeInserir)

        resp.send(filmeInserido)

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})


server.get('/filmes', async (req, resp) => {

    try {

        const filmes = req.body

        const reposta = await MostrarFilmes(filmes)

        resp.send(reposta)

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})


server.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {

    try {

        const {id} = req.params

        const imagem = req.file.path
        
        const resposta = await AlterarImagem(imagem, id)

        if (resposta != 1)
            throw new Error ('A imagem não pode ser salva')  

        resp.status(204).send()
        
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }

})


server.put('/filme/:id', async (req, resp) => {

    try {

        const {id} = req.params

        const filme = req.body

        const reposta = await AlterarFilme(id, filme)

        resp.status(204).send()

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})


server.delete('/filme/:id', async (req, resp) => {

    try {

        const {id} = req.params

        const reposta = await DeletarFilme(id)

        resp.status(204).send()

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})



export default server;