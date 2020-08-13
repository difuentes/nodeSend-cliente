import React ,{useState,useContext}from 'react';
import appContext from '../context/app/appContext'

const Formulario = () => {

    const [tienePass,setTienePass] = useState(false);

    //Context APP
    const AppContext = useContext(appContext);
    const {agregarPassword,AgregarDescargas} = AppContext;


    return ( 
        <div className="w-full mt-10">
            <div className="">
                <label className="text-lg ml-2 text-gray-800">Eliminar Tras:</label>
                <select 
                className="apperance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:border-gray-500"
                onChange={(e)=>AgregarDescargas(e.target.value)}
                >
                    <option selected disabled value="" >--- Seleccione ---</option>
                    <option value="1">1  Descarga</option >
                    <option value="5">5  Descargas</option >
                    <option value="10">10 Descargas</option >
                    <option value="15">15 Descargas</option >
                    <option value="20">20 Descargas</option >
                </select>
            </div>
            <div className="mt-4">
                <div className="flex  ml-2">
                    <input 
                    onChange={() => setTienePass(!tienePass)}
                    className="mt-2 mr-2" 
                    type="checkbox"/>
                    <label className="text-lg text-gray-800 mr-2">Proteger con Contraseña</label>
                </div>

                {tienePass ? (
                    <input
                    onChange={(e) => agregarPassword(e.target.value)}
                    type="password"
                    className="appercase-none w-full mt-2 bg-white border border-gray-400 txt-black py-3 px-4 pr-8 rounded leading-none focus:border-gray-500"
                    />
              
                ) : null}
                
            </div>
           
        </div>
     );
}
 
export default Formulario;