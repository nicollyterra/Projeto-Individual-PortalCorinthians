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


module.exports = router;