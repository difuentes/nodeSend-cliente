import React ,{useReducer} from 'react';
import appContext from './appContext';

import{
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    LIMPIAR_STATE

} from '../../types'



export default(state,action) =>{

    switch(action.type){

        case MOSTRAR_ALERTA:
            return{
                ...state,
                mensaje_archivo: action.payload
            }
        case LIMPIAR_ALERTA:
            return{
                ...state,
                mensaje_archivo: null
            }
        case SUBIR_ARCHIVO_EXITO:
             return{
                ...state,
                nombre: action.payload.nombre,
                nombre_original :action.payload.nombre_original,
                cargando:null

             }
        case SUBIR_ARCHIVO_ERROR:
             return{
                ...state,
                nombre: action.payload.nombre,
                mensaje_archivo:action.payload,
                cargando:null
             }
        case SUBIR_ARCHIVO:
            return{
                ...state,
                cargando:true
            }
        case CREAR_ENLACE_EXITO:
            return{
                ...state,
                url:action.payload
            }
        case LIMPIAR_STATE :
            return{
                ...state,
                mensaje_archivo:null,
                nombre:'',
                nombre_original:'',
                cargando:null,
                descargar:1,
                password:'',
                autor:null,
                url:''
            }

        default:
            return state
    }
}