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

    if (!relato || !img_relato) {
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
    let idPost = req.body.idPostagem;
    let statusPost = req.body.statusPostagem;

    usuarioModel.aceitar(idPost, statusPost)
        .then(resultado => {
            if (resultado.affectedRows == 1) {
                res.status(200).send("Ação confirmada.")
            }
        })
}

function postsAceitos(req, res) {
    usuarioModel.postsAceitos()
        .then(async resultado => {
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

function usuarios(req, res) {

    usuarioModel.usuarios()
        .then(async resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
                console.log('retorno dos users', resultado[0].usuarios)
            }
        })
}

function kpiJogMaisVot(req, res) {
    usuarioModel.kpiJogMaisVot()
        .then(async resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
                console.log('retorno dos dados', resultado[0].nome)
            }
        })
}

function kpiJogMensVot(req, res) {
    usuarioModel.kpiJogMensVot()
        .then(async resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
                console.log('retorno dos dados', resultado[0].nome)
            }
        })
}


let vt_votos = []
let vt_nomes = []

function chartJogadores(req, res) {
    usuarioModel.chartJogadores()
        .then(async resultado => {

            vt_votos = []
            vt_nomes = []

            for (let index = 0; index < resultado.length; index++) {
                console.log('retorno dos dados', resultado[index].voto_count)
                vt_votos.push(resultado[index].voto_count)
                console.log(vt_votos)
            }

            for (let index = 0; index < resultado.length; index++) {
                console.log('retorno dos dados', resultado[index].nome)
                vt_nomes.push(resultado[index].nome)
                console.log(vt_nomes)
            }

            res.json({
                nomes: vt_nomes,
                votos: vt_votos
            })
        })
}

let vt_dtCadastro = []

const mesesPtBr = {
    January: 'Janeiro',
    February: 'Fevereiro',
    March: 'Março',
    April: 'Abril',
    May: 'Maio',
    June: 'Junho',
    July: 'Julho',
    August: 'Agosto',
    September: 'Setembro',
    October: 'Outubro',
    November: 'Novembro',
    December: 'Dezembro'
};



function chartUsers(req, res) {
    usuarioModel.chartUsers()
        .then(async resultado => {

            console.log("oieeeee", resultado[0])

            vt_dtCadastro = []
            vt_nomeMes = []

            for (let i = 0; i < resultado.length; i++) {
                const mesIngles = resultado[i].mes_extenso;
                const mesPortugues = mesesPtBr[mesIngles];
                vt_dtCadastro.push(mesPortugues || mesIngles); // fallback para o nome original
            }

            for (let i = 0; i < resultado.length; i++) {
                console.log('retorno dos dados', resultado[i].total_usuarios)
                vt_nomeMes.push(resultado[i].total_usuarios)
                console.log(vt_nomeMes)
            }

            res.json({
                data_users: vt_dtCadastro,
                data_users_mes: vt_nomeMes
            })
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
    kpiUsers,
    usuarios,
    kpiJogMaisVot,
    kpiJogMensVot,
    chartUsers,
    chartJogadores
}