import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'

function LandingPage() {
    const {checkIfLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('landing page')
        if (checkIfLoggedIn()) {
            navigate('/home')
        } else {
            navigate('/login')
        }
    }, [])
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LandingPage