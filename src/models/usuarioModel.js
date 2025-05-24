var database = require("../database/config")

 function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
         SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
     `;
     console.log("Executando a instrução SQL: \n" + instrucaoSql);
   return database.executar(instrucaoSql);
 }

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, dtNasc, email, senha, imagem_usuario) {
    var instrucao = `
        INSERT INTO usuario (nome, dtNasc, email, senha, imagem_usuario)
        VALUES ('${nome}', '${dtNasc}', '${email}', '${senha}', '${imagem_usuario}');
    `;
    return database.executar(instrucao);
}

function buscarPorId(idUsuario) {
    var instrucaoSql = `
        SELECT nome, email, imagem_usuario 
        FROM usuario 
        WHERE idUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function enviar(relato, img_relato, fkUsuario ) {
    var instrucao = `
        INSERT INTO post (relato, img_relato, fkUsuario, statusPost)
        VALUES ('${relato}', '${img_relato}', '${fkUsuario}', 0);
    `;
    return database.executar(instrucao);
}

function votar(fkJogador, fkUsuario) {
    var instrucao = `
        INSERT INTO votos (data_voto, fkUsuario_voto, fkJogador_voto)
        VALUES (current_timestamp(), ${fkUsuario}, ${fkJogador});
    `;
    return database.executar(instrucao);
}

function buscarVotoId (idUsuario) {
    var instrucaoSql = `
    SELECT nome, email, imagem_usuario 
        FROM usuario 
        WHERE idUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function buscarSolici (idUsuario) {
    var instrucaoSql = `
    SELECT p.idpost,
          p.relato,
          p.fkUsuario, 
          p.img_relato, 
          p.statusPost,
          u.nome FROM post as p
          JOIN usuario as u
          ON p.fkUsuario = u.idUsuario
          WHERE statusPost = 0;`;
    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar, 
    cadastrar,
    buscarPorId,
    enviar, 
    votar, 
    buscarVotoId, 
    buscarSolici
};