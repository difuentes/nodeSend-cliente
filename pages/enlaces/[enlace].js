import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';

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
    console.log(enlace);

    return ( 
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Descargar tu archivo :</h1>
            <div className="flex items-center justify-center mt-10">
                <a 
                download
                href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} 
                className="bg-red-500 text-center px-10 py-3 uppercase font-bold text-white cursor-pointer">
                Aqui</a>
            </div>
        </Layout>
     );
}
 
