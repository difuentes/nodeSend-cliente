import React,{useCallback,useState} from 'react'
import { useDropzone } from "react-dropzone";
import clienteAxios from '../config/axios';

const Dropzone = () => {

    //carga archivos erronea
    const onDropRejected =()=>{
        
    }


    //carga de archivos correcta
    const onDropAccepted = useCallback( async (acceptedFiles) =>{
        
        //crear un form data
        const formData = new FormData();
        //agregar archivo
        formData.append('archivo',acceptedFiles[0]);
        //consulta a la api
        const resultado = await clienteAxios.post('/api/archivos',formData);

        console.log(resultado.data);

    },[]);

    //extraer contenido de dropzone
    const {getRootProps,getInputProps,isDragActive,acceptedFiles} = useDropzone({onDropAccepted,onDropRejected,maxSize:1000000});
    //recuadro Archivo
    const archivos = acceptedFiles.map(archivo =>(
        <li className="bg-white flex-1 p-3 missing-if-branch shadow-lg rounded">
           <p className="font-bold text-xl">{archivo.path}</p> 
           <p className="text-sm text-gray-500 ">{(archivo.size / Math.pow(1024,2)).toFixed(2)} MB </p>   
        </li>
    ));

    //Crear Enlace 
    const crearEnlace = () =>{
        console.log('creando enlace');
    }

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-200">
            { acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>
                    
                    <button
                        type="button"
                        onClick={()=>crearEnlace()}
                        className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                    >Crear Enlance
                    </button>

                </div> 
                
            ) : (
                <div {...getRootProps({className: 'dropzone -wfill py-32'})}>
                <input {...getInputProps()}  className="h-100" />

              
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

