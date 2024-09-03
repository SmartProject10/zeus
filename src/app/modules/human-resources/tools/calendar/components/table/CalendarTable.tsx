import { useEffect, useState } from "react";
import { KTCardBody } from "../../../../../../../_zeus/helpers";
import { appStateService } from "../../../../../../services/appState.service";
import { EmployeeRequest, EmployeeResponse } from "../../core/_models";
import { getEmployees, getFilteredEmployees, putEmployeeService } from "../../core/_requests";
import { dayMonthYear } from "../../../../../../utils/dateFormat";
import ModalTrabajador from "./ModalTrabajador";
import Swal from "sweetalert2";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface EmployeeForm {
  area: string,
  cargo: string,
  firmaDigital: string,
  recFacial: string,
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
  correoTrabajo: string,
  correoPersonal: string,
  telefonoPersonal: string,
  fechaIngresoArea: string,
  fechaIngresoEmpresa: string,
  rollSistemaDigitalizado: string,
  status: string,
  sedeTrabajo: string
}

const CalendarTable = () => {

  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeResponse[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limitPerPage, setLimitPerPage] = useState<number>(10);
  const [idEmployee, setIdEmployee] = useState("");
  const [formData, setFormData] = useState<EmployeeForm>({
    area: "",
    cargo: "",
    firmaDigital: "",
    recFacial: "",
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
    correoTrabajo: "",
    correoPersonal: "",
    telefonoPersonal: "",
    fechaIngresoArea: "",
    fechaIngresoEmpresa: "",
    rollSistemaDigitalizado: "",
    status: "",
    sedeTrabajo: ""
  });
  const [activeModal, setActiveModal] = useState<boolean>(false);

  useEffect(() => {

    const employeesInit = async () => {

      try {
        //const response = await getEmployees();
        let filters: string = `?limit=${limitPerPage}`;
        const response = await getFilteredEmployees(filters);

        if (response.status == 200) {
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
          const employees: EmployeeResponse[] = response.data.trabajadores;
          appStateService.setEmployeesSubject(employees);
        }

      } catch (error: any) {
        console.error(error);
      }

    };
    employeesInit();

    const employeesSubj = appStateService.getEmployeesSubject().subscribe((employees: EmployeeResponse[]) => {
      setEmployees(employees);
      setFilteredEmployees(employees);
    });

    const activeModalSubj = appStateService.getActiveModalSubject().subscribe((state: boolean) => {
      setActiveModal(state);
    });

    return () => {
      employeesSubj.unsubscribe();
      activeModalSubj.unsubscribe();
    };

  }, []);

  useEffect(() => {
    applyFilters();
  }, [formData]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // let filters:string = "?";
    // for(const key in formData){
    //   if(formData.hasOwnProperty(key)){
    //     if(formData[key as keyof EmployeeForm] != "" && formData[key as keyof EmployeeForm] != null){
    //       filters=filters+`${key}=${formData[key as keyof EmployeeForm]}&`
    //     }
    //   }
    // }
  };

  function showModalEmployee(id: string) {
    setIdEmployee(id);
    appStateService.setActiveModalSubject();
  };

  async function applyFilters() {

    let filters: string = `?area=${formData.area}&cargo=${formData.cargo}&dni=${formData.dni.replace(" ", "%20")}&apellidoPaterno=${formData.apellidoPaterno.replace(" ", "%20")}&apellidoMaterno=${formData.apellidoMaterno.replace(" ", "%20")}&estadoCivil=${formData.estadoCivil}&genero=${formData.genero}&nacionalidad=${formData.nacionalidad}&distrito=${formData.distrito}&direccion=${formData.direccion.replace(" ", "%20")}&status=${formData.status}&limit=${limitPerPage}`

    try {
      const response = await getFilteredEmployees(filters);
      console.log(response);

      if (response.status == 200) {
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setFilteredEmployees(response.data.trabajadores);
      }

    } catch (e: any) {
      console.error(e);
    }

  };

  async function selectPageNavigate(page: number) {

    let filters: string = `?area=${formData.area}&cargo=${formData.cargo}&dni=${formData.dni.replace(" ", "%20")}&apellidoPaterno=${formData.apellidoPaterno.replace(" ", "%20")}&apellidoMaterno=${formData.apellidoMaterno.replace(" ", "%20")}&estadoCivil=${formData.estadoCivil}&genero=${formData.genero}&nacionalidad=${formData.nacionalidad}&distrito=${formData.distrito}&direccion=${formData.direccion.replace(" ", "%20")}&status=${formData.status}&page=${page}&limit=${limitPerPage}`

    try {

      const response: any = await getFilteredEmployees(filters);

      if (response.status == 200) {
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setFilteredEmployees(response.data.trabajadores);
      }

    } catch (e: any) {
      console.error(e);
    }

  };

  function changeStatusEmployee(state: boolean, employee: EmployeeResponse) {


    Swal.fire({
      icon: "question",
      title: "¿Estas segur@ de realizar esta acción?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si",
      confirmButtonColor: "#1b84ff"
    }).then((result) => {
      if (result.isConfirmed) {
        if (state == true) {//Inactivo
          try {
            const editEmployee = async () => {

              const request: EmployeeRequest = {
                dni: employee.dni,
                apellidoPaterno: employee.apellidoPaterno,
                apellidoMaterno: employee.apellidoMaterno,
                nombres: employee.nombres,
                direccion: employee.direccion,
                distrito: employee.distrito,
                correoTrabajo: employee.correoTrabajo,
                correoPersonal: employee.correoPersonal,
                nacionalidad: employee.nacionalidad,
                genero: employee.genero,
                estadoCivil: employee.estadoCivil,
                fechaNacimiento: employee.fechaNacimiento,
                telefonoPersonal: employee.telefonoPersonal,
                reconocimientoFacial: "",
                firmaDigital: employee.firmaDigital,
                area: employee.area,
                cargo: employee.cargo,
                rollSistemaDigitalizado: employee.rollSistemaDigitalizado,
                fechaIngresoArea: employee.fechaIngresoArea,
                fechaIngresoEmpresa: employee.fechaIngresoEmpresa,
                status: "Activo",
                sedeTrabajo: employee.sedeTrabajo
              }

              const response = await putEmployeeService(employee._id, request);

              if (response.status == 200) {

                appStateService.putEmployeeSubject(employee._id, request);

                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "Estado del trabajador modificado correctamente"
                });
              }

            };
            editEmployee();

          } catch (e: any) {
            console.error(e);
          }
        } else {//Activo
          try {
            const editEmployee = async () => {

              const request: EmployeeRequest = {
                dni: employee.dni,
                apellidoPaterno: employee.apellidoPaterno,
                apellidoMaterno: employee.apellidoMaterno,
                nombres: employee.nombres,
                direccion: employee.direccion,
                distrito: employee.distrito,
                correoTrabajo: employee.correoTrabajo,
                correoPersonal: employee.correoPersonal,
                nacionalidad: employee.nacionalidad,
                genero: employee.genero,
                estadoCivil: employee.estadoCivil,
                fechaNacimiento: employee.fechaNacimiento,
                telefonoPersonal: employee.telefonoPersonal,
                reconocimientoFacial: "",
                firmaDigital: employee.firmaDigital,
                area: employee.area,
                cargo: employee.cargo,
                rollSistemaDigitalizado: employee.rollSistemaDigitalizado,
                fechaIngresoArea: employee.fechaIngresoArea,
                fechaIngresoEmpresa: employee.fechaIngresoEmpresa,
                status: "Inactivo",
                sedeTrabajo: employee.sedeTrabajo
              }

              const response = await putEmployeeService(employee._id, request);

              if (response.status == 200) {

                appStateService.putEmployeeSubject(employee._id, request);

                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "Estado del trabajador modificado correctamente"
                });
              }

            };
            editEmployee();

          } catch (e: any) {
            console.error(e);
          }
        }

      } else if (result.isDenied) {

      }
    });

  };

  async function navigatePage(action: string) {

    if (action == "next") {

      let filters: string = `?area=${formData.area}&cargo=${formData.cargo}&dni=${formData.dni.replace(" ", "%20")}&apellidoPaterno=${formData.apellidoPaterno.replace(" ", "%20")}&apellidoMaterno=${formData.apellidoMaterno.replace(" ", "%20")}&estadoCivil=${formData.estadoCivil}&genero=${formData.genero}&nacionalidad=${formData.nacionalidad}&distrito=${formData.distrito}&direccion=${formData.direccion.replace(" ", "%20")}&status=${formData.status}&page=${currentPage + 1}&limit=${limitPerPage}`

      try {

        const response: any = await getFilteredEmployees(filters);

        if (response.status == 200) {
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setFilteredEmployees(response.data.trabajadores);
        }

      } catch (e: any) {
        console.error(e);
      }

    } else if (action == "previous") {

      let filters: string = `?area=${formData.area}&cargo=${formData.cargo}&dni=${formData.dni.replace(" ", "%20")}&apellidoPaterno=${formData.apellidoPaterno.replace(" ", "%20")}&apellidoMaterno=${formData.apellidoMaterno.replace(" ", "%20")}&estadoCivil=${formData.estadoCivil}&genero=${formData.genero}&nacionalidad=${formData.nacionalidad}&distrito=${formData.distrito}&direccion=${formData.direccion.replace(" ", "%20")}&status=${formData.status}&page=${currentPage - 1}&limit=${limitPerPage}`

      try {

        const response: any = await getFilteredEmployees(filters);

        if (response.status == 200) {
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setFilteredEmployees(response.data.trabajadores);
        }

      } catch (e: any) {
        console.error(e);
      }

    };


  }

  const exportFilteredEmployeesToExcel = () => {

    // Crear una hoja de trabajo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(filteredEmployees);

    // Crear un libro de trabajo y agregar la hoja de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trabajadores");

    // Generar un archivo de Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Guardar el archivo usando file-saver
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(data, 'reporteEmpleadosFiltrados.xlsx');
  };

  const exportEmployeeToExcel = (employee:EmployeeResponse) => {

    let employeeArray:EmployeeResponse[] = []
    employeeArray.push(employee);

    // Crear una hoja de trabajo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(employeeArray);

    // Crear un libro de trabajo y agregar la hoja de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trabajadores");

    // Generar un archivo de Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Guardar el archivo usando file-saver
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(data, 'reporteEmpleado.xlsx');
  };


  return (
    <KTCardBody className="py-4 card card-grid min-w-full">

      {activeModal ? <ModalTrabajador idEmployee={idEmployee}></ModalTrabajador> : ""}

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
              Apellido paterno
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
              Apellido materno
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
              <option value="Panameña">Panameña</option>
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
              Status trabajador
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

      <p>{'Coincidencias' + ': ' + filteredEmployees.length}</p>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-success btn-sm disabled" type="button">
          <i className="bi bi-file-earmark-spreadsheet-fill"></i>
          Importar a Excel
        </button>
        <button onClick={exportFilteredEmployeesToExcel} className="btn btn-success btn-sm" type="button">
          <i className="bi bi-file-earmark-spreadsheet-fill"></i>
          Exportar a Excel
        </button>
      </div>

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
            {filteredEmployees.length > 0 && filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{employee.dni}</td>
                <td>{employee.nombres}</td>
                <td>{employee.apellidoMaterno}</td>
                <td>{employee.apellidoPaterno}</td>
                <td>{dayMonthYear(employee.fechaNacimiento)}</td>
                <td>{employee.cargo}</td>
                <td>{employee.area}</td>
                <td>{dayMonthYear(employee.fechaIngresoEmpresa)}</td>
                <td>{dayMonthYear(employee.fechaIngresoArea)}</td>
                <td>{employee.direccion}</td>
                <td>{employee.distrito}</td>
                <td>{employee.correoTrabajo}</td>
                <td>{employee.correoPersonal}</td>
                <td>{employee.nacionalidad}</td>
                <td>{employee.genero}</td>
                <td>{employee.estadoCivil}</td>
                <td>{employee.telefonoPersonal}</td>
                <td>{employee.firmaDigital}</td>
                <td>{employee.status}</td>
                <td>{employee.sedeTrabajo}</td>
                <td>{employee.rollSistemaDigitalizado}</td>
                <td>
                  <div className="d-grid gap-2 d-md-flex">

                    <div className="form-check form-switch form-check-custom form-check-solid">
                      <input className="form-check-input h-20px w-30px" type="checkbox" value="" id="statusSwitch"
                        onChange={(e: any) => changeStatusEmployee(e.target.checked, employee)} checked={employee.status == 'Activo' ? true : false} />
                      <label className="form-label-sm ms-2" htmlFor="statusSwitch">
                        {employee.status == 'Activo' ? 'Activo' : 'Inactivo'}
                      </label>
                    </div>
                    {/* <button className="btn btn-sm btn-bg-light btn-active-color-primary">
                      Editar/modificar/actualizar
                    </button> */}
                    <button className="btn btn-sm btn-bg-light btn-active-color-primary"
                      onClick={() => showModalEmployee(employee._id)}>
                      Ver detalle
                    </button>
                    <button className="btn btn-sm btn-bg-light btn-active-color-primary">
                      Historial
                    </button>
                    <button className="btn btn-sm btn-bg-light btn-active-color-primary disabled" type="button">
                      <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                      Importar a Excel
                    </button>
                    <button onClick={() => exportEmployeeToExcel(employee)}
                      className="btn btn-sm btn-bg-light btn-active-color-primary" type="button">
                      <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                      Exportar a Excel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEmployees.length == 0 && <p className="text-center mb-5">No se encontraron trabajadores</p>}

      {filteredEmployees.length != 0 && (
        <div className="mt-2">
          <ul className="pagination">
            <li className={currentPage == 1 ? 'page-item previous disabled' : 'page-item previous'}>
              <button onClick={() => navigatePage("previous")} className="page-link">
                <i className="previous"></i>
              </button>
            </li>
            {[...Array(totalPages)].map((page, i) => (
              <li className={currentPage == i + 1 ? 'page-item active' : 'page-item'}>
                <button onClick={() => selectPageNavigate(i + 1)} className="page-link ">
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={currentPage == totalPages ? 'page-item next disabled' : 'page-item next'}>
              <button onClick={() => navigatePage("next")} className="page-link">
                <i className="next"></i>
              </button>
            </li>
          </ul>
        </div>
      )}

      <hr />

    </KTCardBody>
  );
};

export { CalendarTable };
