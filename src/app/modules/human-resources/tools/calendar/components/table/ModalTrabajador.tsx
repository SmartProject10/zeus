import { ReactNode, useEffect, useState } from "react";
import { EmployeeResponse, EmployeeRequest } from "../../core/_models";
import Swal from "sweetalert2";
import { deleteEmployeeService, getEmployeeById, putEmployeeService } from "../../core/_requests";
import { appStateService } from "../../../../../../services/appState.service";
import { dateInput } from "../../../../../../utils/dateFormat";

interface MyComponentProps {
    idEmployee: string,
    children?: ReactNode;
}

export interface EmployeeForm {
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

const ModalTrabajador: React.FC<MyComponentProps> = ({ idEmployee, children }) => {

    const [form, setForm] = useState<EmployeeForm>({
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

    useEffect(() => {

        const initEmployee = async () => {

            try {
                const response = await getEmployeeById(idEmployee);

                if (response.status == 200) {

                    const employee: EmployeeResponse = response.data;

                    setForm({
                        area: employee.area,
                        cargo: employee.cargo,
                        firmaDigital: employee.firmaDigital,
                        recFacial: "",
                        nacionalidad: employee.nacionalidad,
                        estadoCivil: employee.estadoCivil,
                        genero: employee.genero,
                        dni: employee.dni,
                        fechaNacimiento: dateInput(employee.fechaNacimiento),
                        nombres: employee.nombres,
                        apellidoPaterno: employee.apellidoPaterno,
                        apellidoMaterno: employee.apellidoMaterno,
                        distrito: employee.distrito,
                        direccion: employee.direccion,
                        correoTrabajo: employee.correoTrabajo,
                        correoPersonal: employee.correoPersonal,
                        telefonoPersonal: employee.telefonoPersonal,
                        fechaIngresoArea: dateInput(employee.fechaIngresoArea),
                        fechaIngresoEmpresa: dateInput(employee.fechaIngresoEmpresa),
                        rollSistemaDigitalizado: employee.rollSistemaDigitalizado,
                        status: employee.status,
                        sedeTrabajo: employee.sedeTrabajo
                    });
                }
            } catch (error: any) {
                console.error(error);
            }
        };

        initEmployee();

    }, []);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    function deleteEmployee(id: string) {

        Swal.fire({
            icon: "question",
            title: "¿Estas segur@ de realizar esta acción?",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si",
            confirmButtonColor: "#1b84ff"
        }).then((result) => {
            if (result.isConfirmed) {

                try {
                    const deleteEmployee = async () => {

                        const response = await deleteEmployeeService(id);

                        if(response.status == 200){

                            appStateService.deleteEmployeeSubject(id);
                            appStateService.setActiveModalSubject();
    
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
                                title: "Trabajador eliminado correctamente"
                            });
                        }
                    };

                    deleteEmployee();

                } catch (e: any) {
                    console.error(e);
                }

            } else if (result.isDenied) {

            }
        });


    };

    function putEmployee(id: string) {

        if (!form.area || !form.cargo || !form.firmaDigital || !form.nacionalidad ||
            !form.estadoCivil || !form.genero || !form.dni || !form.fechaNacimiento ||
            !form.nombres || !form.apellidoPaterno || !form.apellidoMaterno ||
            !form.distrito || !form.direccion || !form.correoTrabajo || !form.correoPersonal ||
            !form.telefonoPersonal || !form.fechaIngresoArea || !form.fechaIngresoEmpresa ||
            !form.rollSistemaDigitalizado || !form.status || !form.sedeTrabajo) {

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
                icon: "error",
                title: "Porfavor, rellenar todos los campos."
            });

            return;
        }


        Swal.fire({
            icon: "question",
            title: "¿Estas segur@ de realizar esta acción?",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si",
            confirmButtonColor: "#1b84ff"
        }).then((result) => {
            if (result.isConfirmed) {

                try {
                    const editEmployee = async () => {

                        const request: EmployeeRequest = {
                            dni: form.dni,
                            apellidoPaterno: form.apellidoPaterno,
                            apellidoMaterno: form.apellidoMaterno,
                            nombres: form.nombres,
                            direccion: form.direccion,
                            distrito: form.distrito,
                            correoTrabajo: form.correoTrabajo,
                            correoPersonal: form.correoPersonal,
                            nacionalidad: form.nacionalidad,
                            genero: form.genero,
                            estadoCivil: form.estadoCivil,
                            fechaNacimiento: form.fechaNacimiento,
                            telefonoPersonal: form.telefonoPersonal,
                            reconocimientoFacial: "",
                            firmaDigital: form.firmaDigital,
                            area: form.area,
                            cargo: form.cargo,
                            rollSistemaDigitalizado: form.rollSistemaDigitalizado,
                            fechaIngresoArea: form.fechaIngresoArea,
                            fechaIngresoEmpresa: form.fechaIngresoEmpresa,
                            status: form.status,
                            sedeTrabajo: form.sedeTrabajo
                        }

                        const response = await putEmployeeService(id, request);

                        if(response.status == 200){

                            appStateService.putEmployeeSubject(id, request);
                            appStateService.setActiveModalSubject();
    
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
                                title: "Trabajador editado correctamente"
                            });
                        }

                    };

                    editEmployee();
                } catch (e: any) {
                    console.error(e);
                }

            } else if (result.isDenied) {

            }
        });
    };

    function closeModal(){
        appStateService.setActiveModalSubject();
    };

    return (
        <div className="modal fade show" id="modal" data-bs-backdrop="static" data-bs-keyboard="false"
            aria-labelledby="staticBackdropLabel" aria-hidden="true"
            style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(1px)' }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Trabajador
                        </h1>
                        <button type="button" onClick={closeModal} className="btn-close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card">
                            <div className="card-body">

                                <form>
                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="inputtext" className="required col-form-label">
                                                DNI
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" id="inputtext" name="dni" value={form.dni}
                                                onChange={handleChange} placeholder="Identificacion" className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="inputtext" className="required col-form-label">
                                                Nombres
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" id="inputtext" name="nombres" value={form.nombres}
                                                onChange={handleChange} placeholder="Nombres" className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="inputtext" className="required col-form-label">
                                                Apellido Materno
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" id="inputtext" name="apellidoMaterno"
                                                value={form.apellidoMaterno} onChange={handleChange}
                                                placeholder="Apellido" className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="inputtext" className="required col-form-label">
                                                Apellido Paterno
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" id="inputtext" name="apellidoPaterno"
                                                value={form.apellidoPaterno} onChange={handleChange}
                                                placeholder="Apellido" className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="inputtext" className="required col-form-label">
                                                Fecha de cumpleaños
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="date" id="inputtext" name="fechaNacimiento"
                                                value={form.fechaNacimiento} onChange={handleChange}
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="selecttext" className="required col-form-label">
                                                Cargo
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <select className="form-select select-sm" id="selecttext"
                                                name="cargo" value={form.cargo} onChange={handleChange}
                                                aria-label="Default select example">
                                                <option value="">Seleccione</option>
                                                <option value="Gerente">Gerente</option>
                                                <option value="Jefe">Jefe</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="selecttext" className="required col-form-label">
                                                Área
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <select className="form-select select-sm" id="selecttext"
                                                name="area" value={form.area} onChange={handleChange}
                                                aria-label="Default select example">
                                                <option value="">Seleccione</option>
                                                <option value="Gerencia">Gerencia</option>
                                                <option value="Seguridad Industrial">Seguridad Industrial</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="inputtext" className="required col-form-label">
                                                Fecha de ingreso a la empresa
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="date" id="inputtext" name="FechaIngresoEmp"
                                                value={form.fechaIngresoEmpresa} onChange={handleChange}
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="inputtext" className="required col-form-label">
                                                Fecha de ingreso al área
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="date" id="inputtext" name="fechaIngresoArea"
                                                value={form.fechaIngresoArea} onChange={handleChange}
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="direccionInput" className="required form-label">
                                                Dirección
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" className="form-control" id="direccionInput"
                                                name="direccion" value={form.direccion} onChange={handleChange}
                                                placeholder="Dirección" />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="distritoSelect" className="required form-label">
                                                Distrito
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <select className="form-select" id="distritoSelect"
                                                name="distrito" value={form.distrito} onChange={handleChange}
                                                aria-label="Distritos">
                                                <option>Seleccione</option>
                                                <option>Distrito 1</option>
                                                <option>Distrito 2</option>
                                                <option>Distrito 3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="cEmailInput" className="required form-label">
                                                Email corporativo
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="email" className="form-control" id="cEmailInput"
                                                name="corpEmail" value={form.correoTrabajo} onChange={handleChange}
                                                placeholder="Email" />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="pEmailInput" className="required form-label">
                                                Email personal
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="email" className="form-control" id="pEmailInput"
                                                name="perEmail" value={form.correoPersonal} onChange={handleChange}
                                                placeholder="Email" />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="labelselect" className="required form-label">
                                                Nacionalidad
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <select
                                                className="form-select"
                                                id="labelselect"
                                                name="nacionalidad" value={form.nacionalidad} onChange={handleChange}
                                                aria-label="Select example"
                                            >
                                                <option>Seleccione</option>
                                                <option value="Peruano">Peruano</option>
                                                <option value="Estado Unidense">Estado Unidense</option>
                                                <option value="Canadiense">Canadiense</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="labelselect" className="required form-label">
                                                Género
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <select
                                                className="form-select"
                                                id="labelselect"
                                                aria-label="Select example"
                                                name="genero" value={form.genero} onChange={handleChange}
                                            >
                                                <option>Seleccione</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="estadoCivilSelect" className="required form-label">
                                                Estado civil
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <select className="form-select"
                                                id="estadoCivilSelect"
                                                name="estadoCivil" value={form.estadoCivil} onChange={handleChange}
                                                aria-label="estado civil select">
                                                <option>Seleccione</option>
                                                <option>Soltero</option>
                                                <option>Casado</option>
                                                <option>Divorciado</option>
                                                <option>Conviviente</option>
                                                <option>Viudo/a</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="estadoCivilSelect" className="required form-label">
                                                Indicativo
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-7">
                                                    <input type="text" className="form-control" id="tPersonalInput"
                                                        name="telefono" value={form.telefonoPersonal}
                                                        onChange={handleChange} placeholder="Telefono" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="recFacialInput" className="form-label">
                                                Reconocimiento facial
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="file" className="form-control" id="recFacialInput"
                                                name="recFacial" onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="firmaDigitalInput" className="required form-label">
                                                Firma digital
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" className="form-control" id="firmaDigitalInput"
                                                name="firmaDigital" value={form.firmaDigital}
                                                onChange={handleChange} placeholder="Firma.." />
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="statusSelect" className="required form-label">
                                                Status
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <select className="form-select"
                                                id="statusSelect"
                                                name="status" value={form.status} onChange={handleChange}
                                                aria-label="status select">
                                                <option>Seleccione</option>
                                                <option>Activo</option>
                                                <option>Inactivo</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="sedeSelect" className="required form-label">
                                                Sede de trabajo
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <select className="form-select"
                                                id="sedeSelect"
                                                name="sedeTrabajo" value={form.sedeTrabajo} onChange={handleChange}
                                                aria-label="sede select">
                                                <option>Seleccione</option>
                                                <option>Sede 1</option>
                                                <option>Sede 2</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="rolSelect" className="required form-label">
                                                Tipo de rol
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <select className="form-select"
                                                id="rolSelect"
                                                name="tipoRol" value={form.rollSistemaDigitalizado} onChange={handleChange}
                                                aria-label="rol select">
                                                <option>Seleccione</option>
                                                <option>Jefe</option>
                                                <option>Asistente</option>
                                                <option>Colaborador</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center gap-10 modal-footer">
                                        <button type="button" onClick={() => putEmployee(idEmployee)} 
                                            className="btn btn-primary">
                                            Editar
                                        </button>
                                        <button type="button" onClick={() => deleteEmployee(idEmployee)} 
                                            className="btn btn-danger">
                                            Eliminar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalTrabajador;