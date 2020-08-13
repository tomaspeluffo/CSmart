import React,{useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const FormTarea = () => {

    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    // Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const {tareaseleccionada, agregarTarea, validarTarea, errortarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext; 


    // Effect que detecta si hay una tarea seleccionada

    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre:""
            })
        }
        
    }, [tareaseleccionada])

    // State del formulario
    const [tarea, guardarTarea] =useState({
        nombre:"",
    })

    // Extraer el nombre del proyecto
    const {nombre} = tarea;

    // Si no hay proyecto seleccionado
    if( !proyecto) return null

    // Array Destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto; 

    // leer los valores del formulario

    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault()

        // Validar
        if(nombre.trim() === ""){
            validarTarea();
            return;
        }

        // Si es edicion o nueva tarea
        if(tareaseleccionada === null) {
            // Agregar al nuevo state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        }else{
            // Actualizar tarea existente
            actualizarTarea(tarea)

            // Elimina tarea seleccionada del state
            limpiarTarea()
        };

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        // Reiniciar el form
        guardarTarea({
            nombre:""
        })
    }
 
    return ( 

        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text" 
                        name="nombre" 
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primario btn-submit"    
                        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />

                </div>

            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> :null}
        </div>
     );
}
 
export default FormTarea;