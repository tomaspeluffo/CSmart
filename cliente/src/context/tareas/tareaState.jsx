import React,{useReducer} from 'react'

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA, 
    VALIDAR_TAREA, 
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types/Index'

const shortid = require('shortid');

const TareaState = (props) =>{
    const initalState = {
        tareas : [
        {id: 1, nombre:"Elegir Plataforma", estado: true, proyectoId:1},
        {id: 2, nombre:"Elegir Colores", estado: false, proyectoId:2},
        {id: 3, nombre:"Elegir Colores", estado: false, proyectoId:3},
        {id: 4, nombre:"Elegir Plataformas de pago", estado: false, proyectoId:3},
        {id: 5, nombre:"Elegir Hosting", estado: true, proyectoId:1},
        {id: 6, nombre:"Elegir Plataformas de pago", estado:false, proyectoId:2},
        {id: 7, nombre:"Elegir Hosting", estado: true, proyectoId:3}

        ],
        tareasproyecto: null,
        errortarea: false, 
        tareaseleccionada: null

    }

    // Crear dispatch y state
    const[state, dispatch] =useReducer(TareaReducer, initalState );


    // Obtener las tareas de un proyecto
    const obtenerTareas = (proyectoID) =>{
        dispatch({
            type:TAREAS_PROYECTO,
            payload: proyectoID
        })
    }

    // Agregar tarea a proyecto selecionado
    const agregarTarea = (tarea) =>{
        tarea.id = shortid.generate()   
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    // Valida y muestra un error
    const validarTarea = () =>{
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    // Eliminar tarea por id
    const eliminarTarea = id =>{
        dispatch({
            type:ELIMINAR_TAREA,
            payload:id
        })
    }

    // Cambia el estado de cada tarea
    const cambiarEstadoTarea = tarea =>{
        dispatch({
            type:ESTADO_TAREA, 
            payload: tarea
        })
    }

    // Extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Edita o modifica una tarea
    const actualizarTarea = tarea =>{
        dispatch({
            type:ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    // Elimina la tarea seleccionada
    const limpiarTarea = ()=>{
        dispatch({
            type:LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea : state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;


