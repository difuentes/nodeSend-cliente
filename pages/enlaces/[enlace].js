import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';
import React,{useState,useContext} from 'react'
import appContext from '../../context/app/appContext';
import Alerta from '../../components/alerta';


//respuesta que vamos a tener desde la api
export async function getServerSideProps({params}){

    const {enlace} = params
    const res = await clienteAxios.get(`/api/enlaces/${enlace}`);

    return {
        props:{
            enlace: res.data
        }
    }
}
//roting
export async function getServerSidePaths(){

    const enlaces = await clienteAxios.get('/api/enlaces');

    console.log("desde server"+ enlaces);
    return{

        paths: enlaces.data.enlaces.map((enlace) => ({
            params:{enlace: enlace.url}
        })),
        fallback:false
    }
}

export default ({enlace}) => {


   //Context APP
   const AppContext = useContext(appContext);
   const {mostrarAlerta,mensaje_archivo} = AppContext;


    const [tienePass,setTienePass] = useState(enlace.password);
    const [password,setpassword] = useState('');
    //console.log("tiene pass"+ tienePass)

    const verificarPass = async e =>{

        e.preventDefault(); 
        const data ={
            password
        }

        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`,data);
            setTienePass(resultado.data.password);
            
        } catch (error) {
            mostrarAlerta(error.response.data.msg)
        }

        
       // console.log(resultado)
    }

    return ( 
        <Layout>
            {
                tienePass ? (
                    <>  
                        <p className="font-bold text-center ml-5">Este enlace esta protegido con Contraseña ,Ingresala a continuacion</p>
                        {mensaje_archivo && <Alerta/>}
                        <div className="md:W-4/5 xl:w-3/5 mx-auto mb-32">  
                       
                            <div className="container mx-auto mt-5">
                            
                                <form
                                className="bg-white roundend shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={e => verificarPass(e)}
                                >

                                <div className="mb-4">
                               
                                    <label className="block text-black text-sm font-bold mb-2" htmlFor="password">Password</label>
                                    <input 
                                        value={password}
                                        onChange={e =>setpassword(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="password"
                                        id="password" placeholder="Ingrese su contraseña"
                                        />
                                        
                                </div>
                                <input 
                                type="submit" 
                                value="validar Password.." 
                                className="w-full bg-blue-400 py-2 uppercase text-white  font-bold rounded leading-tight focus:outline-none focus:shadow-outline"
                                />

                                </form>

                            </div>
                        </div>
                    </>
                    )
                :
                (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">Descargar tu archivo :</h1>
                        <div className="flex items-center justify-center mt-10">
                            <a 
                            download
                            href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} 
                            className="bg-red-500 text-center px-10 py-3 uppercase font-bold text-white cursor-pointer">
                            Aqui</a>
                        </div>
                    </>
                )
            }
            
        </Layout>
     );
}
 
