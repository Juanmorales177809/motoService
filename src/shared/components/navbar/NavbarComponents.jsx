import React from "react";
import { Link } from 'react-router-dom'
import './NavbarStyles.css'
import { useAuth0 } from "@auth0/auth0-react";


function NavbarComponents() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();


  return (

    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark nav">
      <div class="container-fluid contain">
        <Link to="/" class="navbar-brand nav" href="#">MotoService</Link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/ges-usuarios" class="nav-link active nav" aria-current="page" href="#">Usuarios</Link>
            </li>
            <li class="nav-item">
              <Link to="/ges-ventas" class="nav-link nav" href="#">Ventas</Link>
            </li>
            <li class="nav-item">
              <Link to="/ges-service" class="nav-link nav" href="#">Servicios</Link>
            </li>
            <li class="nav-item">
            </li>
          </ul>
        </div>
        <form class="d-flex">
          {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
          {/* <a class="" type="submit" onClick={() => loginWithRedirect()}>{isAuthenticated ? user.email: "Login"}</a> */}

        </form>
        <div class="dropdown">
          <a class=" dropdown-toggle navv0" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
            {isAuthenticated ? user.name : "Usuario"}
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li><button class="dropdown-item navv" type="button" onClick={() => loginWithRedirect()}>{isAuthenticated ? user.nickname : "login"}</button></li>
            
              {isAuthenticated ? <li> <button class="dropdown-item navv" type="button" onClick={() => logout({returnTo: window.location.origin })}>Sign out</button>

              </li> : null}
            
          </ul>
        </div>
      </div>
    </nav>




  )
}
export default NavbarComponents;