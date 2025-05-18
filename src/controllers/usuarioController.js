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
                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                        })
                        
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




module.exports = {
    autenticar,
    cadastrar
}