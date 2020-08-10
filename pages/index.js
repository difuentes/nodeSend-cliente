import React,{useEffect,useContext} from 'react';
import Loyout from '../components/Layout';
import authContext from '../context/auth/authContext'

const Index = () => {

    //extraer user autenticado de LocalStorage
    const AuthContext = useContext(authContext);
    const {usuarioAutenticado} = AuthContext;

    useEffect(()=>{
        usuarioAutenticado();
    },[])

  return ( 
      <Loyout>
          <h1>Home</h1>
        
      </Loyout>

   );
}
 
export default Index;