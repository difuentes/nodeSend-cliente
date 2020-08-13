import React,{useCallback,useState,useContext} from 'react'
import { useDropzone } from "react-dropzone";
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import Formulario from '../components/Formulario';

const Dropzone = () => {
    //Context APP
    const AppContext = useContext(appContext);
    const {mostrarAlerta,subirArchivo ,cargando,crearEnlace} = AppContext;
    //Context Auth
    const  AuthContext = useContext(authContext);
    const {usuario,autenticado} = AuthContext;
    //carga archivos erronea
    const onDropRejected =()=>{
        mostrarAlerta('no se puede subir archivo el limite es 1 MB,obten una cuenta gratis para subir archivos mas grandes');
    }
    //carga de archivos correcta
    const onDropAccepted = useCallback( async (acceptedFiles) =>{
        
        //crear un form data
        const formData = new FormData();
        //agregar archivo
        formData.append('archivo',acceptedFiles[0]);
        subirArchivo(formData,acceptedFiles[0].path);

    },[]);
    //extraer contenido de dropzone
    const {getRootProps,getInputProps,isDragActive,acceptedFiles} = useDropzone({onDropAccepted,onDropRejected,maxSize:1000000});
    //recuadro Archivo
    const archivos = acceptedFiles.map(archivo =>(
        <div>
            <li className="bg-white flex-1 p-3 missing-if-branch shadow-lg rounded">
            <p className="font-bold text-xl"> {archivo.path} </p> 
            <p className="text-sm text-gray-500 ">{(archivo.size / Math.pow(1024,2)).toFixed(2)} MB </p>   
            </li>
        </div>
       
    ));
    
    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-200">
            { acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul key={archivos.url}>
                        {archivos}
                    </ul>

                    { autenticado ? <Formulario/> : "no autenticcado" }

                    {cargando ? (<div className="spinner">
                                    <div className="cube1"></div>
                                    <div className="cube2"></div>
                    </div>) : 
                        (<button
                            type="button"
                            onClick={()=> crearEnlace()}
                            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                            >Crear Enlance
                        </button>) 
                    }
                    
        
                </div> 
                
            ) : (
                <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                <input {...getInputProps()} className="h-100" />
              
                    {
                        isDragActive ? <p className="text-2xl text-center text-gray-600">Suelta el archivo </p> : 
                        <div className="text-center">
                            <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aqui</p>
                            <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800">Selecciona archivos para subir</button>
                        </div>  
                    }
                </div>
            )}
        
        </div>
      );
}
 
export default Dropzone;

