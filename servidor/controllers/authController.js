const Usuario = require("../models/Usuario")
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req)

    if(!errores.isEmpty()){
        res.status(400).json({errores: errores.array()})
    }

    // Extraer email y password del usuario

    const{ email, password} = req.body;

    try {
        // Revisar que sea un usuario resgistrado
        let usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({msg:"El usuario no esta registrado"})
        }

        // Revisar el password
        const passCorrecta = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecta){
            return res.status(400).json({msg: "Password Incorrecto"})
        }

        // Si todo es correcto crear y firmar el jwt
        const payload= {
            usuario: {
                id:usuario.id,

        }
        }

        // Firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn:3600 //1 hora
        }, (error, token) =>{
            if(error) throw error;
            
            // Mensaje de confirmacion
            res.json({token : token})
        }
        
    )} catch (error) {
        console.log(error);
    }

}