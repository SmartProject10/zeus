import { KTCardBody } from "../../../../../../../_zeus/helpers";

const CalendarTable = () => {
  return (
    <KTCardBody className="py-4 card card-grid min-w-full">
      {/* <div className="table-responsive">
        HOla xd
      </div> */}
      <p>Filtros de busqueda</p>
      <form>
        <div className="row">
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
            <label htmlFor="labelselect" className=" form-label">
              Genero
            </label>
            <select
              className="form-select"
              id="labelselect"
              aria-label="Select example"
            >
              <option>Seleccione una Genero</option>
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
              placeholder="Tu DNI"
              id="inputlabel"
            />
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
