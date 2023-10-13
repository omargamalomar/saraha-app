import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import { AuthContext } from '../../../context/AuthContext'
import sarahaLogo from '../../../imgs/logo300.png'

function Navbar() {

    const {state: {isLoggedIn}, logOut} = useContext(AuthContext)

    return (
        <nav className="navbar shadow-lg py-2">
            <div className="container">
                <div >
                    <Link className="navbar-brand text-white fs-4 me-5 my-auto py-2" to={isLoggedIn?'/home':'/login'}>
                        <img src={sarahaLogo} className='saraha-logo my-auto'/>
                    </Link>
                </div>
                <div className="" id="navbarNavAltMarkup">
                    <div className="d-flex flex-row ms-auto">
                        {
                            !isLoggedIn ? <>
                                <Link className="nav-link text-white fs-4 me-3" aria-current="page" to="register">Register</Link>
                                <Link className="nav-link text-white fs-4 me-3" to="login">Login</Link>
                            </>
                            : <>
                                {/* <Link className="nav-link text-white fs-4 me-3" to="sendmessage/"></Link> */}
                                <Link className="nav-link text-white fs-4 me-3" to="home">Profile</Link>
                                <Link className="nav-link text-white fs-4 me-3" to="login" onClick={() => logOut()}>Logout</Link>
                            </>
                        }                        
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar