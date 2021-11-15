import React, { Fragment } from "react";
import { Redirect, Router } from "react-router";
import LoginPage from "./Login/LoginPage.jsx";
import NavbarComponents from "./shared/components/navbar/NavbarComponents";
import { BrowserRouter as Rou, Switch, Route, Link } from 'react-router-dom'
import GesServicePage from "./gestionServicios/GesServicePage.jsx";
import GesVentasPage from "./gestionVentas/GesVentasPage.jsx"
import GesUsuariosPage from "./gestionUsuarios/GesUsuariosPage.jsx"
import RegServicePage from "./RegistroServicio/RegServicePage.jsx";
import EditarUsuarioPage from "./editarUsuario/EditarUsuarioPage.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import ForbidenComponent from "./shared/components/fordiben/ForbidenComponent.jsx";
import RegistrarProducto from "./regVenta/RegVentasPage.jsx";
import RegVentasPage from "./gestionVentas/RegVentasPage.jsx";
import HomePage from "./home/HomePage.jsx";
import ElementContextProvider from "./context/elementContext.js";
import UpdateServicePage from "./updateService/UpdateServicePage.jsx";
import Editar from "./gestionVentas/Editar"


function App() {
  

  return (
    <ElementContextProvider>
    

    <Rou>
      <NavbarComponents />

      <Switch>


        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/ges-service" exact>
          <GesServicePage />
        </Route>
        <Route path="/ges-usuarios" exact>
          <GesUsuariosPage />
        </Route>
    
        <Route path="/ges-ventas" exact>
          <GesVentasPage />
        </Route>
        <Route path="/reg-ventas" exact>
          <RegVentasPage />
        </Route>
        <Route path="/edit-venta">
          <Editar />
          </Route>
    
    
        <Route path="/reg-service" exact>
          <RegServicePage />
        </Route>
        <Route path="/edit-usuario">
          <EditarUsuarioPage />

        </Route>
        <Route path="/register">

        </Route>
        <Route path="/forbiden" exact>
          <ForbidenComponent />

        </Route>
        <Route path = "/update-service" exact>
     <UpdateServicePage/>
        </Route>


      </Switch>
    </Rou>
    </ElementContextProvider>    
  );
}

export default App;
