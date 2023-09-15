
import 'dotenv/config'

import usuarioController from './controller/usuarioController.js'
import filmeController from './controller/filmeController.js'

import cors from 'cors'
import express from 'express'


const server = express()


server.use(cors())
server.use(express.json())

server.use('/storage/capaFilmes', express.static('/storage/capaFilmes'))

server.use(usuarioController)
server.use(filmeController)

server.listen(process.env.PORT, 
            () => console.log(`A API está funcionando na porta ${process.env.PORT}`))