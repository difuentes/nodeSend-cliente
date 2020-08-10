import React,{useEffect,useContext} from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';

const Header = () => {

    //extraer user autenticado de LocalStorage
    const AuthContext = useContext(authContext);
    const {usuarioAutenticado,usuario,cerraSesion} = AuthContext;

    useEffect(()=>{
        usuarioAutenticado();
    },[])

    return ( 
        
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">

            <Link href="/">
                <img className="w-64 mb-8 md:mb-8" src="logo.svg" />
            </Link>
           
            <div>
                 {usuario ? 
                 
                    (
                        <div className="flex items-center">
                         <p className="mr-2">Hola : {usuario.nombre} </p> 
                         <button 
                         onClick={()=>cerraSesion()}
                         type="button "
                         className="bg-red-700 px-5 py-3 mx-2 rounded-lg text-white font-bold" >Cerrar Sesion</button> 
                        </div>
                    ) :
                    (
                        <div>
                            <Link href="/login">
                                <a className="bg-red-700 px-5 py-3 rounded-lg text-white font-bold ">Inicio Sesion   </a>
                            </Link>

                            <Link href="/crearcuenta">
                                <a className="bg-blue-500 mx-2 hover:bg-blue-400 text-white font-bold py-3 px-5 border-b-4 border-blue-700 hover:border-blue-500 rounded">Crear Cuenta </a>
                            </Link>
                       </div> 
                     )
                }
                     
            </div>
        </header>

     );
}
 
export default Header;