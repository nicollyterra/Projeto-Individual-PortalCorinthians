var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        res.json(resultadoAutenticar)
                        
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var dtNasc = req.body.dtNasc;
    var email = req.body.email;
    var senha = req.body.senha;

    // Nome do arquivo da imagem enviada
    var imagem_usuario = req.file ? req.file.filename : null;

    if (!nome || !email || !senha || !dtNasc) {
        return res.status(400).send("Preencha todos os campos obrigatórios!");
    }

    usuarioModel.cadastrar(nome, dtNasc, email, senha, imagem_usuario)
        .then((resultado) => res.status(200).json(resultado))
        .catch((erro) => {
            console.log("Erro no cadastro:", erro);
            res.status(500).json(erro.sqlMessage || erro.message);
        });
}

function buscarPorId(req, res) {
    var idUsuario = req.params.id;

    usuarioModel.buscarPorId(idUsuario)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(404).send("Usuário não encontrado");
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar usuário por ID:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}


function enviar(req, res) {
    var relato = req.body.relato;
    var fkUsuario = req.body.fkUsuarioVincular;
    // Nome do arquivo da imagem enviada
    var img_relato = req.file ? req.file.filename : null;

    if (!relato|| !img_relato ) {
        return res.status(400).send("Preencha todos os campos obrigatórios!");
    }

    usuarioModel.enviar(relato, img_relato, fkUsuario)
        .then((resultado) => res.status(200).json(resultado))
        .catch((erro) => {
            console.log("Erro no envio:", erro);
            res.status(500).json(erro.sqlMessage || erro.message);
        });
        
}


function votar(req, res) {
    var voto_user = req.body.votoServer;
    var fkUsuario = req.params.id
    usuarioModel.votar(voto_user, fkUsuario)
        .then((resultado) => res.status(200).json(resultado))
        .catch((erro) => {
            console.log("Erro no envio:", erro);
            res.status(500).json(erro.sqlMessage || erro.message);
        });
        
} 

function buscarVotoId(req, res) {
    var idUsuario = req.params.id;

    usuarioModel.buscarVotoId(idUsuario)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(404).send("Usuário não encontrado");
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar usuário por ID:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}



function buscarSolici(req, res) {
    var idUsuario = req.params.id;

    usuarioModel.buscarSolici(idUsuario)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(404).send("Ainda não há relatos enviados...");
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar usuário por ID:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function aceitar(req, res) {
    let idPost = req.body.idPostagem ;
    let statusPost = req.body.statusPostagem ; 

    usuarioModel.aceitar(idPost, statusPost)
    .then (resultado => {
         if (resultado.affectedRows == 1) {
            res.status(200).send("Ação confirmada.")
         }
    })
}

function postsAceitos(req, res) {
    usuarioModel.postsAceitos()
    .then (async resultado => {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        }
    })
}

function kpiVotos(req, res) {
    usuarioModel.kpiVotos()
    .then(async resultado => {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
            console.log(resultado[0].votos)
        }
    })
}


function kpiUsers(req, res) {
    usuarioModel.kpiUsers()
    .then(async resultado => {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
            console.log('retorno dos dados', resultado[0].usuarios)
        }
    })
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
    kpiUsers
}