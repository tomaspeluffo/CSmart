const express = require("express");
const conectarDb = require('./config/db')
const cors = require('cors')

// Crear el servidor
const app = express();

// Conectar a db
conectarDb();

// Habiliar cors
app.use(cors())

// Habilitar express.JSON
app.use(express.json({extended:true}))

// Puerto de la app
const PORT= process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// Arrancar la app
app.listen(PORT, () =>{
    console.log(`El servidor este funcionando en el puerto: ${PORT}`)
});
