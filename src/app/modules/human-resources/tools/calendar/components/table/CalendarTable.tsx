import { useState } from "react";
import { KTCardBody } from "../../../../../../../_zeus/helpers";

export interface EmployeeForm {
  area: string,
  cargo: string,
  firmaDigital: string,
  recFacial: null,
  nacionalidad: string,
  estadoCivil: string,
  genero: string,
  dni: string,
  fechaNacimiento: string,
  nombres: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  distrito: string,
  direccion: string,
  corpEmail: string,
  perEmail: string,
  indicativoTel: number,
  telefono: number,
  fechaIngresoArea: string,
  FechaIngresoEmp: string,
  tipoRol: string,
  status: string,
  sedeTrabajo: string
}


const CalendarTable = () => {
  const [formData, setFormData] = useState<EmployeeForm>({
    area: "",
    cargo: "",
    firmaDigital: "",
    recFacial: null,
    nacionalidad: "",
    estadoCivil: "",
    genero: "",
    dni: "",
    fechaNacimiento: "",
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    distrito: "",
    direccion: "",
    corpEmail: "",
    perEmail: "",
    indicativoTel: 0,
    telefono: 0,
    fechaIngresoArea: "",
    FechaIngresoEmp: "",
    tipoRol: "",
    status: "",
    sedeTrabajo: ""
  });

  const [employees, setEmployees] = useState([
    {
      nro: 1,
      dni: "123456789",
      trabajador: "b1 c1 k1",
      cargo: "Gerente",
      area: "Gerencia",
      jefeInmediato: "Luis Tellez",
      correo: "Luis@gmail.com",
      fechaIngresoEmp: "22/05/2020",
      fechaNacimiento: "06/05/1998",
      apellidoPaterno: "perez",
      apellidoMaterno: "Collante",
      estado: "Activo",
      direccion: "casa 1",
      distrito: "Distrito 1",
      nacionalidad: "Canadiense",
      genero: "Femenino",
      estadoCivil: "Casado"
    },
    {
      nro: 2,
      dni: "1234567810",
      trabajador: "A1, B2, C2",
      cargo: "Jefe",
      area: "Seguridad Industrial",
      jefeInmediato: "Carlos Diaz",
      correo: "Carlos@gmail.com",
      fechaIngresoEmp: "22/05/2020",
      fechaNacimiento: "06/05/1998",
      apellidoPaterno: "lopez",
      apellidoMaterno: "obregor",
      estado: "Activo",
      direccion: "casa 2",
      distrito: "Distrito 2",
      nacionalidad: "Peruano",
      genero: "Masculino",
      estadoCivil: "Soltero"
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const filteredEmployees = employees.filter(employee => {
    return (
      (!formData.area || employee.area === formData.area) &&
      (!formData.cargo || employee.cargo === formData.cargo) &&
      (!formData.dni || employee.dni.includes(formData.dni)) &&
      (!formData.apellidoPaterno || employee.apellidoPaterno.includes(formData.apellidoPaterno)) &&
      (!formData.apellidoMaterno || employee.apellidoMaterno.includes(formData.apellidoMaterno)) &&
      (!formData.direccion || employee.direccion?.includes(formData.direccion)) &&
      (!formData.distrito || employee.distrito?.includes(formData.distrito)) &&
      (!formData.nacionalidad || employee.nacionalidad?.includes(formData.nacionalidad)) &&
      (!formData.genero || employee.genero?.includes(formData.genero)) &&
      (!formData.estadoCivil || employee.estadoCivil?.includes(formData.estadoCivil))
    );
  });

  return (
    <KTCardBody className="py-4 card card-grid min-w-full">
      <p>Filtros de búsqueda</p>
      <form>
        <div className="row g-7">

          <div className="col-6">
            <label htmlFor="areaSelect" className="form-label">Area</label>
            <select
              className="form-select"
              id="areaSelect"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
            >
              <option value="">Seleccione el area</option>
              <option value="Gerencia">Gerencia</option>
              <option value="Seguridad Industrial">Seguridad Industrial</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="cargoInput" className="form-label">Cargo</label>
            <select
              className="form-select"
              id="cargoInput"
              name="cargo"
              value={formData.cargo}
              onChange={handleInputChange}
            >
              <option value="">Seleccione el cargo</option>
              <option value="Gerente">Gerente</option>
              <option value="Jefe">Jefe</option>
            </select>
          </div>

          <div className="col-md-6 col-sm-12">
            <label className="form-label" htmlFor="dniInput">DNI</label>
            <input
              type="text"
              className="form-control"
              id="dniInput"
              name="dni"
              value={formData.dni}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="aPaternoInput" className="form-label">Apellido Paterno</label>
            <input
              type="text"
              className="form-control"
              id="aPaternoInput"
              name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="aMaternoInput" className="form-label">Apellido Materno</label>
            <input
              type="text"
              className="form-control"
              id="aMaternoInput"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="estadoCivil" className="form-label">Estado civil</label>
            <select
              className="form-select"
              id="estadoCivil"
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleInputChange}
            >
              <option value="">Seleccione el estado</option>
              <option value="Soltero">Soltero</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Conviviente">Conviviente</option>
              <option value="Viudo/a">Viudo/a</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="genero" className="form-label">Genero</label>
            <select
              className="form-select"
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
            >
              <option value="">Seleccione el genero</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="labelselect" className="required form-label">
              Nacionalidad
            </label>
            <select
              className="form-select"
              id="labelselect"
              name="nacionalidad" value={formData.nacionalidad} onChange={handleInputChange}
              aria-label="Select example"
            >
              <option value="">Seleccione la nacionalidad</option>
              <option value="Peruano">Peruano</option>
              <option value="Estado Unidense">Estado Unidense</option>
              <option value="Canadiense">Canadiense</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="distritoSelect" className="form-label">Distrito</label>
            <select className="form-select" id="distritoSelect" name="distrito" value={formData.distrito} onChange={handleInputChange} aria-label="Distritos">
              <option value="">Seleccione la nacionalidad</option>
              <option value="Distrito 1">Distrito 1</option>
              <option value="Distrito 2">Distrito 2</option>
              <option value="Distrito 3">Distrito 3</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="direccionInput" className="form-label">Direccion</label>
            <input type="text" className="form-control" id="direccionInput" name="direccion" value={formData.direccion} onChange={handleInputChange} placeholder="" />
          </div>

          {/* Otros campos del formulario */}
        </div>
      </form>

      <hr />

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
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.nro}</td>
                <td>{employee.dni}</td>
                <td>{employee.trabajador}</td>
                <td>{employee.cargo}</td>
                <td>{employee.area}</td>
                <td>{employee.jefeInmediato}</td>
                <td>{employee.correo}</td>
                <td>{employee.fechaIngresoEmp}</td>
                <td>{employee.fechaNacimiento}</td>
                <td>{employee.estado}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </KTCardBody>
  );
};

export { CalendarTable };
