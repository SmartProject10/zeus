import { useEffect, useState } from "react";
import { KTCardBody } from "../../../../../../../_zeus/helpers";
import { appStateService } from "../../../../../../services/appState.service";
import { Employee } from "../../core/_models";

interface EmployeeForm {
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

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const employeesSub = appStateService.getEmployeesSubject().subscribe((employees:Employee[]) => {
      console.log(employees);
      setEmployees(employees);
    })
    return () => employeesSub.unsubscribe();
  }, []);

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
              placeholder="Número de dni"
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
              placeholder="Apellido paterno"
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
              placeholder="Apellido materno"
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
              <option value="">Seleccione el distrito</option>
              <option value="Distrito 1">Distrito 1</option>
              <option value="Distrito 2">Distrito 2</option>
              <option value="Distrito 3">Distrito 3</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="direccionInput" className="form-label">Dirección</label>
            <input type="text" className="form-control" id="direccionInput" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleInputChange} />
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
              <th className="min-w-200px">Nombres</th>
              <th className="min-w-200px">Ape. Materno</th>
              <th className="min-w-200px">Ape. Paterno</th>
              <th className="min-w-200px">Fecha. Naci</th>
              <th className="min-w-200px">Cargo</th>
              <th className="min-w-200px">area</th>
              <th className="min-w-200px">F. Ingreso Empresa</th>
              <th className="min-w-200px">F. ingreso Area</th>
              <th className="min-w-500px">Direccion</th>
              <th className="min-w-500px">Distrito</th>
              <th className="min-w-500px">Email Corp</th>
              <th className="min-w-500px">Email Pers</th>
              <th className="min-w-500px">Nacionalidad</th>
              <th className="min-w-500px">Genero</th>
              <th className="min-w-500px">Estado Civil</th>
              <th className="min-w-500px">Telefono</th>
              <th className="min-w-500px">Firma Digital</th>
              <th className="min-w-500px">Status</th>
              <th className="min-w-500px">Sede Trabajo</th>
              <th className="min-w-500px">Tipo De Rol</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{employee.dni}</td>
                <td>{employee.nombres}</td>
                <td>{employee.apellidoMaterno}</td>
                <td>{employee.apellidoPaterno}</td>
                <td>{employee.fechaNacimiento}</td>
                <td>{employee.cargo}</td>
                <td>{employee.area}</td>
                <td>{employee.FechaIngresoEmp}</td>
                <td>{employee.fechaIngresoArea}</td>
                <td>{employee.direccion}</td>
                <td>{employee.distrito}</td>
                <td>{employee.corpEmail}</td>
                <td>{employee.perEmail}</td>
                <td>{employee.nacionalidad}</td>
                <td>{employee.genero}</td>
                <td>{employee.estadoCivil}</td>
                <td>{employee.indicativoTel+""+employee.telefono}</td>
                <td>{employee.firmaDigital}</td>
                <td>{employee.status}</td>
                <td>{employee.sedeTrabajo}</td>
                <td>{employee.tipoRol}</td>
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
                    {/* <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <i className="bi bi-plus-circle-fill"></i>
                      Nuevo Trabajador
                    </button> */}
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
