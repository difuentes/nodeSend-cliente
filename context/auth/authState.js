import authContext from './authContext'
import React,{useReducer} from 'react'
import authReducer from './authReducer'
import clienteAxios from '../../config/axios';
import {
    REGISTRO_EXISTOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA
} from '../../types'

 
const AuthState = ({children}) => {

    //definir state inicial

    const initialState ={
        token:'',
        autenticado:null,
        usuario:null,
        mensaje:null
    }
    //definir reducer
     const [state,dispach] = useReducer(authReducer,initialState);

     //registrar Usuario
     const registrarUsuario = async datos =>{
         try {
             
            const respuesta = await clienteAxios.post('/api/usuarios',datos);
           
            dispach({
                type:REGISTRO_EXISTOSO,
                payload:respuesta.data.msg
            });

         

         } catch (error) {
               
                dispach({
                    type: REGISTRO_ERROR,
                    payload:error.response.data.msg
                })
         }

         //limpiar alerta 
            setTimeout(()=>{
                dispach({
                    type: LIMPIAR_ALERTA
                })
            },3000)
     }

     //usuario autenticado
        const usuarioAutenticado = nombre =>{
            dispach({
                type: USUARIO_AUTENTICADO,
                payload: nombre
            })
        }   

     
    return ( 
            <authContext.Provider
                value={{
                    usuario: state.usuario,
                    autenticado: state.autenticado,
                    token: state.token,
                    mensaje: state.mensaje,
                    registrarUsuario,
                    usuarioAutenticado
                }}
            >
                {children}
            </authContext.Provider>
                
     )
}
 
export default AuthState;