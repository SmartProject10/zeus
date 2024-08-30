import { KTCardBody } from "../../../../../../../_zeus/helpers";

const CalendarTable = () => {
  return (
    <KTCardBody className="py-4 card card-grid min-w-full">
      {/* <div className="table-responsive">
        HOla xd
      </div> */}
      <p>Filtros de busqueda</p>
      <form>
        <div className="row g-7">

          <div className="col-6">
            <label htmlFor="areaSelect" className="form-label">Area</label>
            <select className="form-select" id="areaSelect" aria-label="Nombre del area">
              <option>Seleccione el area</option>
              <option>Area 1</option>
              <option>Area 2</option>
              <option>Area 3</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="cargoInput" className="form-label">Cargo</label>
            <select className="form-select" id="cargoInput" aria-label="Nombre del cargo">
              <option>Seleccione el cargo</option>
              <option>cargo 1</option>
              <option>Cargo 2</option>
              <option>Cargo 3</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="firmaDigitalInput" className="form-label">Firma digital</label>
            <input type="text" className="form-control" id="firmaDigitalInput" placeholder="Nombre del firmante" />
          </div>

          <div className="col-6">
            <label htmlFor="recFacialInput" className="form-label">Reconocimiento facial</label>
            <input type="file" className="form-control" id="recFacialInput" />
          </div>

          <div className="col-6">
            <label htmlFor="labelselect" className="required form-label">
              Nacionalidad
            </label>
            <select
              className="form-select"
              id="labelselect"
              aria-label="Select example"
            >
              <option>Seleccione una nacionalidad</option>
              <option value="1">Peruano</option>
              <option value="2">Estado Unidense</option>
              <option value="3">Canadiense</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="estadoCivilSelect" className="form-label">
              Estado civil
            </label>
            <select className="form-select" id="estadoCivilSelect" aria-label="estado civil select">
              <option>Seleccione un estado civil</option>
              <option>Soltero</option>
              <option>Casado</option>
              <option>Divorciado</option>
              <option>Conviviente</option>
              <option>Viudo/a</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="labelselect" className=" form-label">
              Genero
            </label>
            <select
              className="form-select"
              id="labelselect"
              aria-label="Select example"
            >
              <option>Seleccione un Genero</option>
              <option value="1">Masculino</option>
              <option value="2">Femenino</option>
            </select>
          </div>

          <div className="col-md-6 col-sm-12">
            <label className="form-label" htmlFor="inputlabel">DNI</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tu DNI"
              id="inputlabel"
            />
          </div>

          <div className="col-6">
            <label className="form-label" htmlFor="inputlabel">Fecha Nacimiento</label>
            <input
              type="date"
              className="form-control"
              id="inputlabel"
            />
          </div>

          <div className="col-6">
            <label htmlFor="nombresInput" className="form-label">Nombres</label>
            <input type="text" className="form-control" id="nombresInput" placeholder="Nombres del trabajador" />
          </div>

          <div className="col-6">
            <label htmlFor="aPaternoInput" className="form-label">Apellido Paterno</label>
            <input type="text" className="form-control" id="aPaternoInput" placeholder="Apellido paterno del trabajador" />
          </div>

          <div className="col-6">
            <label htmlFor="aMaternoInput" className="form-label">Apellido Materno</label>
            <input type="text" className="form-control" id="aMaternoInput" placeholder="Apellido materno del trabajador" />
          </div>

          <div className="col-6">
            <label htmlFor="distritoInput" className="form-label">Distrito</label>
            <input type="text" className="form-control" id="distritoInput" placeholder="Nombre del distrito" />
          </div>

          <div className="col-6">
            <label htmlFor="direccionInput" className="form-label">Direccion</label>
            <input type="text" className="form-control" id="direccionInput" placeholder="Direccion del trabajador" />
          </div>

          <div className="col-6">
            <label htmlFor="cEmailInput" className="form-label">Email corporativo</label>
            <input type="text" className="form-control" id="cEmailInput" placeholder="Email corporativo del trabajador" />
          </div>

          <div className="col-6">
            <label htmlFor="pEmailInput" className="form-label">Email personal</label>
            <input type="text" className="form-control" id="pEmailInput" placeholder="Email personal del trabajador" />
          </div>

          <div className="col-6">
            <div className="row">
              <div className="col-3">
                <label htmlFor="indicativoInput" className="form-label">Indicativo</label>
                <input type="number" className="form-control" id="indicativoInput" placeholder="57" />
              </div>
              <div className="col-9">
                <label htmlFor="tPersonalInput" className="form-label">Telefono personal</label>
                <input type="number" className="form-control" id="tPersonalInput" placeholder="Telefono personal del trabajador" />
              </div>
            </div>
          </div>

          <div className="col-6">
            <label className="form-label" htmlFor="fechaAreaInput">Fecha de ingreso al area</label>
            <input
              type="date"
              className="form-control"
              aria-label="Fecha de ingreso area"
              id="fechaAreaInput"
            />
          </div>

          <div className="col-6">
            <label className="form-label" htmlFor="fechaEmpInput">Fecha de ingreso a la empresa</label>
            <input
              type="date"
              className="form-control"
              aria-label="Fecha ingreso a la empresa"
              id="fechaEmpInput"
            />
          </div>

          <div className="col-6">
            <label className="form-label" htmlFor="rolSelect">Tipo de rol</label>
            <select className="form-select" id="rolSelect" aria-label="rol select">
              <option>Jefe</option>
              <option>Asistente</option>
              <option>Colaborador</option>
            </select>
          </div>

          <div className="col-6">
            <label className="form-label" htmlFor="statusInput">Status</label>
            <select className="form-select" id="statusInput" aria-label="status select">
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>

          <div className="col-6">
            <label className="form-label" htmlFor="sedeInput">Sede de trabajo</label>
            <select className="form-select" id="sedeInput" aria-label="Sede de trabajo trabajador">
              <option>Sede 1</option>
              <option>Sede 2</option>
              <option>Sede 3</option>
            </select>
          </div>

        </div>
      </form>
      <hr />

      <div className="row justify-content-between">
        <div className="col-4">
          <p className="mt-5">
            <i className="bi bi-calendar3"></i>
            Trabajadores
          </p>
        </div>
        <div className="col-4">
          <div className="input-group input-group-sm  mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="DNI/Trabajador/Área"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-success btn-sm"
              type="button"
              id="button-addon2"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped gy-7 gs-7">
          <thead>
            <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200 text-center">
              <th className="min-w-50px">Nro</th>
              <th className="min-w-200px">DNI</th>
              <th className="min-w-200px">Trabajador</th>
              <th className="min-w-200px">Cargo</th>
              <th className="min-w-200px">Área</th>
              <th className="min-w-200px">Jefe Inmediato</th>
              <th className="min-w-200px">Correo</th>
              <th className="min-w-200px">Fecha Ingeso Empresa</th>
              <th className="min-w-200px">Fecha Nacimiento</th>
              <th className="min-w-200px">Estado</th>
              <th className="min-w-500px">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>1</td>
              <td>123456789</td>
              <td>b1 c1 k1</td>
              <td>Gerente</td>
              <td>Gerencia</td>
              <td>Luis Tellez</td>
              <td>Luis@gmail.com</td>
              <td>22/05/2020</td>
              <td>06/05/1998</td>
              <td>Activo</td>
              <td>
                <div className="d-grid gap-2 d-md-flex">
                  <button className="btn btn-success btn-sm" type="button">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Importar a Excel
                  </button>
                  <button className="btn btn-success btn-sm" type="button">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Exportar a Excel
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <i className="bi bi-plus-circle-fill"></i>
                    Nuevo Trabajador
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>1234567810</td>
              <td>A1, B2, C2</td>
              <td>Jefe</td>
              <td>Seguridad Industrial</td>
              <td>Carlos Diaz</td>
              <td>Carlos@gmail.com</td>
              <td>22/05/2020</td>
              <td>06/05/1998</td>
              <td>Activo</td>
              <td>
                <div className="d-grid gap-2 d-md-flex">
                  <button className="btn btn-success btn-sm" type="button">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Importar a Excel
                  </button>
                  <button className="btn btn-success btn-sm" type="button">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Exportar a Excel
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <i className="bi bi-plus-circle-fill"></i>
                    Nuevo Trabajador
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </KTCardBody>
  );
};

export { CalendarTable };
