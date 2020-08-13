import React, {Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    // State para proyecto

    const [ proyecto, guardarProyecto] = useState({
        nombre: ""
    });

    // Extraemos el nombre

    const {nombre} = proyecto;

    // Lee los contenidos del input
    const onChangeProyecto = e =>{
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envia un proyecto

    const onSubmitProyecto = e =>{
        e.preventDefault()

        // Validar el proyecto
        if(nombre === ""){
            mostrarError();
            return
        }

        // Agregar al state
        agregarProyecto(proyecto)

        // Reinicial el form
        guardarProyecto({
            nombre:""   
        })

    }


    // Mostar el fomulario
    const onClickFormulario = () =>{
        mostrarFormulario()
    }


    return ( 

        <Fragment>
        <button
            type="button"
            className=" btn btn-block btn-primario"
            onClick={onClickFormulario}
        > Nuevo Proyecto</button>

       { formulario 
       ?  <form 
            className="formulario-nuevo-proyecto"
            onSubmit={onSubmitProyecto}
        >

            <input 
                type="text" 
                className="input-text" 
                placeholder="Nombre Proyecto"
                name="nombre"
                value={nombre}
                onChange={onChangeProyecto}
            />

           <button
                type="submit"
                className="btn btn-block btn-primario"
           >Agregar Proyecto</button>

        </form> 
        : null}

        {errorformulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null}

        </Fragment>
     );
}
 
export default NuevoProyecto;