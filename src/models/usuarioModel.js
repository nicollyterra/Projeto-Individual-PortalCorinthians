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

function enviar(relato, img_relato, fkUsuario) {
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

function buscarVotoId(idUsuario) {
    var instrucaoSql = `
    SELECT nome, email, imagem_usuario 
        FROM usuario 
        WHERE idUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}



function buscarSolici(idUsuario) {
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

function aceitar(idPost, statusPost) {
    console.log("entrei no model do usuário, e executei a funcção aceitar", idPost, statusPost)
    var instrucaoSql = `
    UPDATE post SET statusPost = ${statusPost} WHERE idPost = ${idPost}`
    return database.executar(instrucaoSql);
}

function postsAceitos() {
    var instrucaoSql = `
    SELECT p.idpost,
          p.relato,
          p.fkUsuario, 
          p.img_relato, 
          p.statusPost,
          u.nome FROM post as p
          JOIN usuario as u
          ON p.fkUsuario = u.idUsuario
          WHERE statusPost = 1;`
    return database.executar(instrucaoSql);
}

function kpiVotos() {
    var instrucaoSql = `
   SELECT COUNT(idVoto) as votos FROM votos`
    return database.executar(instrucaoSql);
}

function kpiUsers() {
    var instrucaoSql = `
   SELECT COUNT(idUsuario) as usuarios FROM usuario`
    return database.executar(instrucaoSql);
}

function usuarios() {
    var instrucaoSql = `
    SELECT idUsuario, nome, email, date_format(dtNasc, '%d/%m/%Y') dtNasc FROM usuario WHERE statusUser = 1`
    return database.executar(instrucaoSql);
}

function kpiJogMaisVot() {
    var instrucaoSql = `
    select j.nome, 
		voto_count
    from (select fkJogador_voto, 
		count(*) as voto_count
        from votos  
        group by fkJogador_voto) as contagem 
    join jogador as j on contagem.fkJogador_voto = j.idJogador
    order by voto_count desc 
    limit 1;`
    return database.executar(instrucaoSql);
}

function kpiJogMensVot() {
    var instrucaoSql = `
    select j.nome, 
		voto_count
    from (select fkJogador_voto, 
		count(*) as voto_count
        from votos  
        group by fkJogador_voto) as contagem 
    join jogador as j on contagem.fkJogador_voto = j.idJogador
    order by voto_count
    limit 1;`
    return database.executar(instrucaoSql);
}

function chartUsers() {
    var instrucaoSql = `
  SELECT
     DATE_FORMAT(u.dt_cadastro, '%M') AS mes_extenso,
     MONTH(u.dt_cadastro) AS num_mes,
     COUNT(*) AS total_usuarios
  FROM (
     SELECT DISTINCT DATE_FORMAT(dt_cadastro, '%Y-%m') AS mes
     FROM usuario
) AS meses_distintos
  JOIN usuario u ON DATE_FORMAT(u.dt_cadastro, '%Y-%m') = meses_distintos.mes
  GROUP BY mes_extenso, num_mes
  ORDER BY num_mes; `
    return database.executar(instrucaoSql);
}

function chartJogadores() {
    var instrucaoSql = `
     select j.nome, 
		voto_count
    from (select fkJogador_voto, 
		count(*) as voto_count
        from votos  
        group by fkJogador_voto) as contagem 
    join jogador as j on contagem.fkJogador_voto = j.idJogador
    order by voto_count
    limit 5;`
    return database.executar(instrucaoSql);
}

function deleteUser(idUsuario) {
    var instrucaoSql = `
    UPDATE usuario SET statusUser = 0 WHERE idUsuario = ${idUsuario}`
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarPorId,
    enviar,
    votar,
    buscarVotoId,
    buscarSolici,
    aceitar,
    postsAceitos,
    kpiVotos,
    kpiUsers,
    usuarios,
    kpiJogMaisVot,
    kpiJogMensVot,
    chartUsers,
    chartJogadores, 
    deleteUser
};