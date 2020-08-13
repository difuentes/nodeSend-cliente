import {
    REGISTRO_EXISTOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} 
from '../../types'
import Login from '../../pages/login'

export default (state , action ) =>{
    switch(action.type){

        case REGISTRO_EXISTOSO:
            return{
                ...state,
                mensaje: action.payload
            }
         case REGISTRO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        case LIMPIAR_ALERTA:
            return{
                 ...state,
                 mensaje:null
            }
        case LOGIN_ERROR: 
                return{
                     ...state,
                     mensaje:action.payload
                }
        case LOGIN_EXITOSO: 
                localStorage.setItem('token',action.payload);
                return{
                     ...state,
                     token:action.payload,
                     autenticado : true
                }
        case USUARIO_AUTENTICADO:  
                return{
                     ...state,
                     usuario:action.payload,
                     autenticado: true
                }  
        case CERRAR_SESION: 
                localStorage.removeItem('token');
                return{
                     ...state,
                     usuario:null,
                     token:null,
                     autenticado:false,
                }              
        default:
            return state;
    }

}