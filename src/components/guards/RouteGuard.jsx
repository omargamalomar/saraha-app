import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

function RouteGuard({children}) {

    const {state: {isLoggedIn}} = useContext(AuthContext)

    return localStorage.getItem('token') ? <>
        {children}
    </> : <Navigate to={'/login'} />
    
}

export default RouteGuard