const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // certifique-se que essa pasta existe
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const nomeArquivo = `${Date.now()}${ext}`;
        cb(null, nomeArquivo);
    }
});

const upload = multer({ storage });

module.exports = upload;