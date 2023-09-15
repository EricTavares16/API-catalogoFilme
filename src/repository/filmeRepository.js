
import { con } from "./connection.js";



export async function InserirFilme (filme) {

    const comando = 
    `    INSERT INTO TB_CATALOGO_FILMES (ID_USUARIO, NM_FILME, DS_SINOPSE, VL_AVALIACAO, DT_LANCAMENTO,  BT_DISPONIVEL)
    
            VALUES(?, ?, ?, ?, ?, ?)`

    const [reposta] = await con.query(comando, 
        
        [   
            filme.usuario, 
            filme.nome, 
            filme.sinopse, 
            filme.avaliacao, 
            filme.lancamento, 
            filme.disponivel
        ])

    filme.id = reposta.insertId

    return filme;
}


export async function MostrarFilmes () {

    const comando = 
    `   SELECT * FROM 
            TB_CATALOGO_FILMES`

    const [reposta] = await con.query(comando)
    return reposta;
}


export async function AlterarImagem (imagem, id) {

    const comando = 
    `   UPDATE TB_CATALOGO_FILMES
            SET IMG_FILME   =   ?
            WHERE ID_FILME  =   ?`

    const [resposta] = await con.query(comando, [imagem, id])
    return resposta.affectedRows
}


export async function AlterarFilme (id, filme) {

    const comando = 
    `   UPDATE TB_CATALOGO_FILMES
            SET     NM_FILME        = ?, 
                    DS_SINOPSE      = ?, 
                    VL_AVALIACAO    = ?, 
                    DT_LANCAMENTO   = ?,  
                    BT_DISPONIVEL   = ?
                    
            WHERE ID_FILME = ?`

    const [reposta] = await con.query(comando, 

        [
            filme.nome, 
            filme.sinopse, 
            filme.avaliacao, 
            filme.lancamento, 
            filme.disponivel,
            id
        ])
    
    let linhas = reposta.affectedRows
    return linhas;
    
}


export async function  DeletarFilme (id) {

    const comando = 
    `   DELETE FROM TB_CATALOGO_FILMES
            WHERE ID_FILME = ?`

    const [reposta] = await con.query(comando, [id])

    let linhas = reposta.affectedRows

    return linhas;
}

