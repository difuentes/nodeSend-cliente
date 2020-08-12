import React ,{useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import clienteAxios from '../../config/axios'
import{
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR

} from '../../types'




const AppState = ({children}) =>{

    //initial state
    const initialState ={
        mensaje_archivo:null,
        nombre:'',
        nombre_original:'',
        cargando:null,
        descargar:1,
        password:'',
        autor:null,
        url:''
    }

    //crear dispath y state
    const [state,dispatch] = useReducer(appReducer,initialState);

    //mostrar alerta 
    const mostrarAlerta = msg =>{
        dispatch({
            type:MOSTRAR_ALERTA,
            payload:msg
        })
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    //subir archivo al servidor 
    const subirArchivo =  async (formData,nombreArchivo)=> {

        dispatch({
            type:SUBIR_ARCHIVO,
        })
       try {
        //consulta a la api
        const resultado = await clienteAxios.post('/api/archivos',formData);

        console.log(resultado.data);
        
        dispatch({
            type:SUBIR_ARCHIVO_EXITO,
            payload:{
                nombre: resultado.data.archivo,
                nombre_original:nombreArchivo
            }
        })
        
       } catch (error) {
           //console.log(error)
           dispatch({
               type:SUBIR_ARCHIVO_ERROR,
               payload:error.response.data.msg
           })
       }     
    } 

    //Crear Enlace una vez que se subio el archivo
    const crearEnlace = async () =>{
        const data = {
            nombre:state.nombre,
            nombre_original:state.nombre_original,
            descargar:state.descargar,
            password:state.password,
        
        }
        
        try {
            const resultado = await clienteAxios.post('/api/enlaces',data);
            console.log(resultado.data.msg)
            dispatch({
                 type:CREAR_ENLACE_EXITO,
                 payload:resultado.data.msg
            })

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <appContext.Provider
        value={{
            mensaje_archivo:state.mensaje_archivo,
            nombre:state.nombre,
            nombre_original:state.nombre_original,
            descargar:state.descargar,
            password:state.password,
            autor:state.autor,
            url:state.url,
            cargando:state.cargando,
            mostrarAlerta,
            crearEnlace,
            subirArchivo
        }}

        >
            {children}
        </appContext.Provider>
    )
}

export default AppState;