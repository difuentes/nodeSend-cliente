import React from 'react'
import Link from 'next/link';

const Header = () => {
    return ( 

        <header className="py-8 flex flex-col md:flex-row items-center justify-between">

            <Link href="/">
                <img className="w-64 mb-8 md:mb-8" src="logo.svg" />
            </Link>
           
            <div>
                    <Link href="/login">
                         <a className="bg-red-700 px-5 py-3 rounded-lg text-white font-bold ">Inicio Sesion   </a>
                    </Link>

                    <Link href="/crearcuenta">
                         <a className="bg-blue-500 mx-2 hover:bg-blue-400 text-white font-bold py-3 px-5 border-b-4 border-blue-700 hover:border-blue-500 rounded">Crear Cuenta </a>
                    </Link>    
            </div>
        </header>

     );
}
 
export default Header;