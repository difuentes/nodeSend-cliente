import React,{useEffect,useContext} from 'react';
import Loyout from '../components/Layout';
import authContext from '../context/auth/authContext'
import Link from 'next/link'
import DropZone from '../components/Dropzone'

const Index = () => {

    //extraer user autenticado de LocalStorage
    const AuthContext = useContext(authContext);
    const {usuarioAutenticado} = AuthContext;

    useEffect(()=>{
        usuarioAutenticado();
    },[])

  return ( 
      <Loyout>
          <div className="md:4/5 xl:w-3/5 mx-auto mb-32">
              <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                   <DropZone/>
                    
                    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                        <h2 className="uppercase text-4xl font-sans font-bold text-black-600 my-4">Compartir archivos de forma <span className="text-blue-500">sencilla </span>y<span className="text-blue-500"> privada</span></h2>
                        <p className="text-lg my-2  leading-looses"><span className="text-red-700">ReactNodeSend</span > te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado despues de ser descargado. asi que puedes mantener lo que compartes en <b className=" uppercase text-blue-700">Privado</b> y asegurarte de que tus cosas no permanezcan en linea para siempre </p>
                        <Link href="/crearcuenta">
                            <a className="uppercase text-red-500 font-bold text-lg hover:text-red-700">crea una cuenta para mayores beneficios</a>
                        </Link>     
                    </div>   
                    
                </div>
          </div>
        
      </Loyout>

   );
}
 
export default Index;