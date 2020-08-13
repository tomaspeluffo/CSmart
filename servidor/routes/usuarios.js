// Rutas para crear usuarios
const exrpress= require('express')
const router= exrpress.Router();
const usuarioController = require("../controllers/usuarioController")
const {check} = require('express-validator')
// Crea un usuario
// /api/usuarios

router.post('/', 
[
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('email', "Agrega un email valido").isEmail(),
    check('password', "El password es minimo de 6 caracteres").isLength({min:6}),
],
    usuarioController.crearUsuario
);

module.exports = router;

