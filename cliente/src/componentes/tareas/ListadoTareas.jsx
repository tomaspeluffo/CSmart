import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group';


const ListadoTareas = () => {

    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    // Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext; 
 
    // Si no hay proyecto seleccionado
    if( !proyecto) return <h2>Seleciona un Proyecto</h2>

    // Array Destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto; 
    

    // Elimina un Proyecto
    const onClickEliminar = () =>{
        eliminarProyecto(proyectoActual.id)
    }

    return ( 
        <Fragment>
            <h2>Proyect: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : 
                    <TransitionGroup>
                      {tareasproyecto.map(tarea =>(
                        <CSSTransition
                            key= {tarea.id}
                            timeout ={200}
                            classNames="tarea"
                        >   
                            <Tarea 
                                tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                }

                <button
                    type="button"
                    className="btn btn-eliminar"
                    onClick={onClickEliminar}
                >Eliminar Proyecto &times;</button>
            </ul>

            

        </Fragment>
     );
}
 
export default ListadoTareas;