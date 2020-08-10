import authContext from './authContext'
import React,{useReducer} from 'react'
import authReducer from './authReducer'
import clienteAxios from '../../config/axios';
import {
    REGISTRO_EXISTOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types'

import tokenAuth from '../../config/tokenAuth';
import { async } from 'q';

 
const AuthState = ({children}) => {

    //definir state inicial
    const initialState ={
        token:typeof window !=='undefined' ? localStorage.getItem('token'):'',
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

     //autenticar usuarios 
     const iniciarSession = async datos =>{
         console.log(datos)
         try {
             const respuesta = await clienteAxios.post('/api/auth',datos);

             dispach({
                 type:LOGIN_EXITOSO,
                 payload:respuesta.data.token
             })
             
             
         } catch (error) {
            dispach({
                type:LOGIN_ERROR,
                payload:error.response.data.msg
            });
         }
     }

     //retornar usuario autenticado en base a JWT
     const usuarioAutenticado = async ()=> {
       const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
           const respuesta = await clienteAxios.get('/api/auth') ;
           dispach({
               type: USUARIO_AUTENTICADO,
               payload: respuesta.data.usuario
           })

        } catch (error) {
            dispach({
                type:LOGIN_ERROR,
                payload:error.response.data.msg
            });
        }
     }
     //cerrar Sesion 

     const cerraSesion = async () =>{
        dispach({
            type:CERRAR_SESION
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
                    usuarioAutenticado,
                    iniciarSession,
                    cerraSesion
                   
                }}
            >
                {children}
            </authContext.Provider>
                
     )
}
 
export default AuthState;