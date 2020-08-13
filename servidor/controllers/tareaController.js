const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const { validationResult} = require('express-validator')


// Crea una nueva tarea
exports.crearTarea = async (req, res) =>{

    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    
    try {
        // Extrer el proyecyo y ver si existe
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto acual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autoizado'})
        }

        // Creamos la tarea
        const tarea = new Tarea(req.body);  
        await tarea.save()
        res.json({tarea})

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
        
    }
    
}

// Obitene las tareas por proyecto
exports.obtenerTareas = async (req, res) =>{

    try {
        // Extraemos el proyecto
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: "No se encontro el proyecto"})
        }

        // Revisar si el proyecto corresponde al usuario adecuado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg : "No autorizado"})
        }

        // Obtener la tareas por proyecto
        const tareas = await Tarea.find({proyecto})
        res.json({tareas    })
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Hubo un error")
    }
}

exports.actualizarTarea = async (req, res) =>{

    try {
        // Extraemos el proyecto y nombre de la tarea
        const {proyecto, nombre, estado} = req.body;

        // Corroborar si existe la tarea
        let tareaExiste = await Tarea.findById(req.params.id);
        if(!tareaExiste){
            return res.status(404).json({msg: 'No existe la tarea'})
        }
    
        // Crear un objeto con la nueva info
        const nuevaTarea = {};
        if(nombre){
            nuevaTarea.nombre = nombre
        }

        if(estado){
            nuevaTarea.estado = estado
        }

        // Guardar la tarea
        tareaExiste = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea, {new: true});

        res.json({nuevaTarea  })
 
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.eliminarTarea= async (req, res) =>{
        
        try {
        // Extraemos el proyecto y nombre de la tarea
        const {proyecto} = req.body;

        // Corroborar si existe la tarea
        let tareaExiste = await Tarea.findById(req.params.id);
        if(!tareaExiste){
            return res.status(404).json({msg: 'No existe la tarea'})
        }

        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        // Eliminar
        await Tarea.findOneAndDelete({_id:req.params.id})
        res.json({msg:'Tarea eliminada'})
            
        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error')
        }
    
}