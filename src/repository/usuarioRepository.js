
import { con } from "./connection.js";


export async function InserirUsuario (usuario) {

    const comando = 
        ` INSERT INTO TB_USUARIO_FILME (NM_USUARIO, DS_EMAIL, DS_SENHA)
                VALUES(?, ?, ?) `

    const [resposta] = await con.query(comando, [usuario.nome, usuario.email, usuario.senha])
    usuario.id = resposta.insertId

    return usuario;
}


export async function Login (email, senha) {
    const comando = 
        ` SELECT    
            ID_USUARIO      id,
            NM_USUARIO      nome,
            DS_EMAIL        email
            
            FROM    TB_USUARIO_FILME  
            WHERE   DS_EMAIL = ? 
            AND     DS_SENHA = ? `

    const [resposta] = await con.query(comando, [email, senha])
    
    return resposta[0];
}


