import React, { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { TokenContext } from "../../Context/tokenContext";
export default function NavBar() {
  let { token ,setToken } = useContext(TokenContext);
  let navigate = useNavigate();

  function logOut(){
    localStorage.removeItem('userToken')

    setToken(null)
    navigate('/login')

  }





  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={""}>
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token ? (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to={"profile"}
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link " onClick={logOut}>Logout</button>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"register"}
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to={"login"}>
                    Login
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
