import '../styles/globals.css'
import AuthState from '../context/auth/authState'
import React from 'react'


function MyApp({ Component, pageProps }) {
  return(
    <AuthState>
        <Component{...pageProps} />
    </AuthState>
  )
}

export default MyApp
