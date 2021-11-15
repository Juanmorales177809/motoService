import React, { Fragment } from "react";
import './LoginStyles.css'
import NavbarComponents from "../shared/components/navbar/NavbarComponents";



function LoginPage() {

    return (
        <Fragment>
            <div className="container ">
                <h5 class="form-login container-mio ">Iniciar sesión</h5>
                <div className="row">
                    <input className="controls subir" type="text" name="usuario" value="" placeholder="Nombre de usuario" />
                </div>
                <div className="row">
                    <input className="controls subir1" type="password" name="contrasena" value="" placeholder="Contraseña" />
                </div>

            </div>
            <div className="form-login">
                <div class="sign-in-btn">
                    <p class="btn-text-sigin"><b>Iniciar Sesion</b></p>
                </div>

                <div class="google-btn">
                    <div class="google-icon-wrapper">
                        <img class="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                    </div>
                    <p class="btn-text"><b>Sign in with google</b></p>
                </div>

                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" for="flexCheckDefault">
                    Recordarme
                </label>

                <p><a href="#">Olvidaste tu contraseña?</a></p>





            </div>


        </Fragment>
    )
}

export default LoginPage;
