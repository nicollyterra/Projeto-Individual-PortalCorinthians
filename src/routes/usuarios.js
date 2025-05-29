const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const multer = require("multer");
const path = require("path");

// Configuração de armazenamento com multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // Crie esta pasta!
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post("/cadastrar", upload.single('imagem_usuario'), function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/buscar/:id", function (req, res) {
    usuarioController.buscarPorId(req, res);
});

router.post("/enviar/:id", upload.single('img_relato'), function (req, res) {
    usuarioController.enviar(req, res);
});


router.post("/votar/:id", function (req, res) {
    usuarioController.votar(req, res);
});

router.get("/buscarVotoId/:id", function (req, res) {
    usuarioController.buscarVotoId(req, res);
});

router.get("/buscarSolici", function (req, res) {
    usuarioController.buscarSolici(req, res);
});

router.post("/aceitar", function (req, res) {
    usuarioController.aceitar(req, res);
});

router.get("/postsAceitos", function (req, res) {
     usuarioController.postsAceitos(req, res);
})

router.get("/kpiVotos", function (req, res) {
     usuarioController.kpiVotos(req, res); 
})

router.get("/kpiUsers", function (req, res) {
     usuarioController.kpiUsers(req, res); 
})

router.get("/usuarios", function (req, res) {
     usuarioController.usuarios(req, res); 
})

router.get("/kpiJogMaisVot", function (req, res) {
     usuarioController.kpiJogMaisVot(req, res); 
})

router.get("/kpiJogMensVot", function (req, res) {
     usuarioController.kpiJogMensVot(req, res); 
})


module.exports = router;