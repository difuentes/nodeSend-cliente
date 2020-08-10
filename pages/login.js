import React,{useContext,useEffect} from 'react';
import Loyout from '../components/Layout';
import {useFormik} from 'formik';
import * as yup from 'yup';
import authContext from '../context/auth/authContext';
import Alerta  from '../components/alerta';
import  {useRouter} from 'next/router';


const Login = () => {

    //definir el context 
    const AuthContext = useContext(authContext);
    const {mensaje,iniciarSession,autenticado} = AuthContext;

    //next router 
    const router = useRouter();

    useEffect(()=>{
        if(autenticado){
            router.push('/');
        }
    },[autenticado])
 //formulario y validacion con fromik y yup
 const formik = useFormik({
    initialValues:{
        password:'',
        email:''
    },
    validationSchema: yup.object({
       
        email: yup.string().email('Correo no valido').required('Correo es obligatorio'),
        password: yup.string().required('contraseña debe ser obligatorio').min(8,'El password debe tener minimo 8 caracteres')
    }),
    onSubmit :(valores)=>{
        iniciarSession(valores)
    }
})


  return ( 
      <Loyout>
           <div className="md:W-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4 " ><span className="text-red-500">I</span>niciar <span className="text-red-500">S</span>esion</h2>
                {mensaje && <Alerta/>}
                <div className="flex justify-center mt-5">  
                    <div className="w-full max-w-lg">
                        <form
                         className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                         onSubmit={formik.handleSubmit}
                        >
                                 <div className="mb-4">
                                    <label className="block text-black text-sm font-bold mb-2" htmlFor="email">Correo</label>
                                    <input 
                                    type="email"
                                    value={formik.values.email} 
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} 
                                    id="email" 
                                    placeholder="Ingrese su email" 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-800">
                                                     <h3 className="font-bold mx-1">Error!</h3> 
                                                     <p className="mx-2 ">{formik.errors.email}</p>
                                                </div>):null 
                                        } 
                                </div>


                                <div className="mb-4">
                                    <label className="block text-black text-sm font-bold mb-2" htmlFor="password">Password</label>
                                    <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="password"
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    id="password" placeholder="Ingrese su contraseña" />
                                     

                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-800">
                                                     <h3 className="font-bold mx-1">Error!</h3> 
                                                     <p className="mx-2 ">{formik.errors.password}</p>
                                                </div>):null 
                                        } 
                                </div>

                               

                                <input type="submit" value="Inicia Sesion" className="w-full bg-blue-400 py-2 uppercase text-white  font-bold rounded leading-tight focus:outline-none focus:shadow-outline"/>
                        </form>

                    </div>

                </div>


             </div>
        
      </Loyout>

   );
}
 
export default Login;