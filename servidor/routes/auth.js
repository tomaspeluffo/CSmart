// Rutas para authenticar usuario
const exrpress= require('express')
const router= exrpress.Router();
const {check} = require('express-validator')
const authController = require('../controllers/authController')

// Crea un usuario
// api/auth
router.post('/', 
[
    check('email', "Agrega un email valido").isEmail(),
    check('password', "El password es minimo de 6 caracteres").isLength({min:6}),
],
    authController.autenticarUsuario
);

module.exports = router;

