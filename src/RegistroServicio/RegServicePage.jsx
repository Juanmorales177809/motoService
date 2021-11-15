import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RegStyles.css";

function RegServicePage() {
  const [service, setService] = useState({
    detalle: "",
    valor: 0,
    estado: "",
  });

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  let { detalle, valor, estado } = service;

  const handleSubmit = () => {
    if (detalle == "" || valor == 0 || estado == "") {
      alert("Todos los campos deben estar rellenados");
      return;
    }
    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    };

    fetch("http://localhost:3001/add-service", requestInit)
      .then((res) => res.json())
      .then((res) => console.log(res));

    window.location.href = "/ges-service";
  };

  return (
    <Fragment>
      <div>
        <h2 class="te">GESTIÓN DE SERVICIOS</h2>
        <div className="row">
          <div className="col ">
            <a class="texti0 te0">Registro de Servicios</a>
          </div>
        </div>
        <hr class="lin"></hr>
        <div class="basic_info recuadro">
          <div className="row">
            <div class="col drp"></div>
            <div className="col">
              <div class="input-group mb-3">
                <input
                  name="detalle"
                  onChange={handleChange}
                  type="text"
                  class="form-control intu"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default "
                  placeholder="Detalle"
                />
              </div>
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputNombre" class="col-sm-2 col-form-label valor">
              Valor
            </label>
            <div class="col-sm-8">
              <input
                name="valor"
                onChange={handleChange}
                type="number"
                class="form-control pesos"
                id="inputNombre"
                placeholder="$"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <div class="form-check radi">
              <input
                name="estado"
                onChange={handleChange}
                class="form-check-input"
                type="radio"
                id="flexRadioDefault1"
                value="Activo"
              />

              <label class="form-check-label" for="flexRadioDefault1">
                Activo
              </label>
            </div>
            <div class="form-check radi">
              <label class="form-check-label" for="flexRadioDefault2">
                No Activo
              </label>
              <input
                name="estado"
                onChange={handleChange}
                class="form-check-input"
                type="radio"
                id="flexRadioDefault2"
                value="Inactivo"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          class="btn btn-primary but2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Guardar
        </button>

        <hr class="lin"></hr>
      </div>
    </Fragment>
  );
}

export default RegServicePage;
