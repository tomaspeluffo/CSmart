import React, {useReducer} from 'react';
import alertaReducer from './alertaReducer'
import alertaContext from './alertaContext'

import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types/Index'

const AlertaState = (props) =>{

    const initialState = {
        alerta: null
    }

    const [state, dispatch] = useReducer(alertaReducer, initialState);

    // Funciones
    const mostrarAlerta = (msg, categoria) =>{
        dispatch({
            type: MOSTRAR_ALERTA,
            payload:{ msg, categoria}
        });

        // Despues de 5 segundos limpia la alerta
        setTimeout(() =>{
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 7000)
    }    



    return (
        <alertaContext.Provider
            value = {{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;