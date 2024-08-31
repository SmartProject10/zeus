import { useEffect, useState } from "react";
import { KTCardBody } from "../../../../../../../_zeus/helpers";
import { appStateService } from "../../../../../../services/appState.service";
import { Employee } from "../../core/_models";
import { getEmployees } from "../../core/_requests";
import axios from "axios";

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

  useEffect(() => {

    const employeesSub = appStateService.getEmployeesSubject().subscribe((employees: Employee[]) => {
      setEmployees(employees);
    })

    // Get employees by api - !Future Update!
    // const getEmployees = async () => {
    //   const resp = await getEmployees();
    //   setEmployees(resp.data.data);
    // };
    // getEmployees();

    return () => employeesSub.unsubscribe();

  }, []);


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
        <div className="row g-1">

          <div className="col-2">
            <label htmlFor="areaSelect" className="form-label-sm d-block mb-1">
              Área
            </label>
            <select
              className="form-select form-select-sm"
              id="areaSelect"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
            >
              <option value="">Seleccione</option>
              <option value="Gerencia">Gerencia</option>
              <option value="Seguridad Industrial">Seguridad Industrial</option>
            </select>
          </div>

          <div className="col-2">
            <label htmlFor="cargoInput" className="form-label-sm d-block mb-1">
              Cargo
            </label>
            <select
              className="form-select form-select-sm"
              id="cargoInput"
              name="cargo"
              value={formData.cargo}
              onChange={handleInputChange}
            >
              <option value="">Seleccione</option>
              <option value="Gerente">Gerente</option>
              <option value="Jefe">Jefe</option>
            </select>
          </div>

          <div className="col-2">
            <label className="form-label-sm d-block mb-1" htmlFor="dniInput">
              Dni
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="dniInput"
              name="dni"
              placeholder="Número de dni"
              value={formData.dni}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-2">
            <label htmlFor="aPaternoInput" className="form-label-sm d-block mb-1">
              Apellido Paterno
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="aPaternoInput"
              name="apellidoPaterno"
              placeholder="Apellido paterno"
              value={formData.apellidoPaterno}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-2">
            <label htmlFor="aMaternoInput" className="form-label-sm d-block mb-1">
              Apellido Materno
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="aMaternoInput"
              name="apellidoMaterno"
              placeholder="Apellido materno"
              value={formData.apellidoMaterno}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-2">
            <label htmlFor="estadoCivil" className="form-label-sm d-block mb-1">
              Estado civil
            </label>
            <select
              className="form-select form-select-sm"
              id="estadoCivil"
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleInputChange}
            >
              <option value="">Seleccione</option>
              <option value="Soltero">Soltero</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Conviviente">Conviviente</option>
              <option value="Viudo/a">Viudo/a</option>
            </select>
          </div>

          <div className="col-2">
            <label htmlFor="genero" className="form-label-sm d-block mb-1">
              Género
            </label>
            <select
              className="form-select form-select-sm"
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
            >
              <option value="">Seleccione</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          <div className="col-2">
            <label htmlFor="labelselect" className="form-label-sm d-block mb-1">
              Nacionalidad
            </label>
            <select
              className="form-select form-select-sm"
              id="labelselect"
              name="nacionalidad" value={formData.nacionalidad} onChange={handleInputChange}
              aria-label="Select example"
            >
              <option value="">Seleccione</option>
              <option value="Peruano">Peruano</option>
              <option value="Estado Unidense">Estado Unidense</option>
              <option value="Canadiense">Canadiense</option>
            </select>
          </div>

          <div className="col-2">
            <label htmlFor="distritoSelect" className="form-label-sm d-block mb-1">
              Distrito
            </label>
            <select className="form-select form-select-sm" id="distritoSelect" name="distrito"
              value={formData.distrito} onChange={handleInputChange} aria-label="Distritos">
              <option value="">Seleccione</option>
              <option value="Distrito 1">Distrito 1</option>
              <option value="Distrito 2">Distrito 2</option>
              <option value="Distrito 3">Distrito 3</option>
            </select>
          </div>

          <div className="col-2">
            <label htmlFor="direccionInput" className="form-label-sm d-block mb-1">
              Dirección
            </label>
            <input type="text" className="form-control form-control-sm" id="direccionInput"
              name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleInputChange} />
          </div>

          <div className="col-2">
            <label htmlFor="statusSelect" className="form-label-sm d-block mb-1">
              Estado
            </label>
            <select className="form-select form-select-sm" id="statusSelect"
              name="status" value={formData.status} onChange={handleInputChange}>
              <option value="">Seleccione</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
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
              <th className="min-w-200px">Dni</th>
              <th className="min-w-200px">Nombres</th>
              <th className="min-w-200px">Ape. Materno</th>
              <th className="min-w-200px">Ape. Paterno</th>
              <th className="min-w-200px">Fecha. Naci</th>
              <th className="min-w-200px">Cargo</th>
              <th className="min-w-200px">Área</th>
              <th className="min-w-200px">F. Ingreso Empresa</th>
              <th className="min-w-200px">F. ingreso Area</th>
              <th className="min-w-500px">Dirección</th>
              <th className="min-w-500px">Distrito</th>
              <th className="min-w-500px">Email. Corp</th>
              <th className="min-w-500px">Email. Pers</th>
              <th className="min-w-500px">Nacionalidad</th>
              <th className="min-w-500px">Género</th>
              <th className="min-w-500px">Estado Civil</th>
              <th className="min-w-500px">Teléfono</th>
              <th className="min-w-500px">Firma Digital</th>
              <th className="min-w-500px">Status</th>
              <th className="min-w-500px">Sede Trabajo</th>
              <th className="min-w-500px">Tipo De Rol</th>
              <th className="min-w-500px">Opciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
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
                <td>{employee.indicativoTel + "" + employee.telefono}</td>
                <td>{employee.firmaDigital}</td>
                <td>{employee.status}</td>
                <td>{employee.sedeTrabajo}</td>
                <td>{employee.tipoRol}</td>
                <td>
                  <div className="d-grid gap-2 d-md-flex">

                    <div className="form-check form-switch form-check-custom form-check-solid">
                      <input className="form-check-input" type="checkbox" value="" id="statusSwitch" checked={true} />
                      <label className="form-label-sm ms-2" htmlFor="statusSwitch">
                        Activo
                      </label>
                    </div>
                    <button className="btn btn-sm btn-bg-light btn-active-color-primary">
                      Editar/modificar/actualizar
                    </button>
                    <button className="btn btn-sm btn-bg-light btn-active-color-primary">
                      Historial
                    </button>
                    <button className="btn btn-sm btn-bg-light btn-active-color-primary" type="button">
                      <i className="bi bi-file-earmark-spreadsheet-fill"></i>Importar a Excel
                    </button>
                    <button className="btn btn-sm btn-bg-light btn-active-color-primary" type="button">
                      <i className="bi bi-file-earmark-spreadsheet-fill"></i>Exportar a Excel
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
