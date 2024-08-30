import { useState } from "react";
import { KTCardBody } from "../../../../../../../_zeus/helpers";
import { registerEmployee } from "../../core/_requests";
import { appStateService } from "../../../../../../services/appState.service";
import Swal from 'sweetalert2';

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

const CalendarButton = () => {

    const [form, setForm] = useState<EmployeeForm>({
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

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (event: any) => {

        event.preventDefault();

        if (!form.area || !form.cargo || !form.firmaDigital || !form.nacionalidad ||
            !form.estadoCivil || !form.genero || !form.dni || !form.fechaNacimiento ||
            !form.nombres || !form.apellidoPaterno || !form.apellidoMaterno ||
            !form.distrito || !form.direccion || !form.corpEmail || !form.perEmail ||
            !form.telefono || !form.fechaIngresoArea || !form.FechaIngresoEmp ||
            !form.tipoRol || !form.status || !form.sedeTrabajo) {

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
                icon: "warning",
                title: "Campos vacíos, porfavor rellenar todos los campos"
            });

            return;
        }

        const data = new FormData();

        data.append('area', form.area);
        data.append('cargo', form.cargo);
        data.append('firmaDigital', form.firmaDigital);
        if (form.recFacial) {
            data.append('recFacial', form.recFacial);
        }
        data.append('nacionalidad', form.nacionalidad);
        data.append('estadoCivil', form.estadoCivil);
        data.append('genero', form.genero);
        data.append('dni', form.dni);
        data.append('fechaNacimiento', form.fechaNacimiento);
        data.append('nombres', form.nombres);
        data.append('apellidoPaterno', form.apellidoPaterno);
        data.append('apellidoMaterno', form.apellidoMaterno);
        data.append('distrito', form.distrito);
        data.append('direccion', form.direccion);
        data.append('corpEmail', form.corpEmail);
        data.append('perEmail', form.perEmail);
        data.append('telefono', form.indicativoTel + "" + form.telefono);
        data.append('fechaIngresoArea', form.fechaIngresoArea);
        data.append('FechaIngresoEmp', form.FechaIngresoEmp);
        data.append('tipoRol', form.tipoRol);
        data.append('status', form.status);
        data.append('sedeTrabajo', form.sedeTrabajo);


        try {

            // const resp = await registerEmployee(data);

            // if (resp) {

            // } 

            appStateService.setEmployeeSubject(form);

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
                title: "Trabajador creado correctamente"
            });

            const closeButton = document.getElementById('closeButton');
            if (closeButton) {
                closeButton.click();
            }

        } catch (error) {
            console.error('Error en la solicitud:', error);
        }

    };

    return (
        <KTCardBody>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-success btn-sm" type="button">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Importar a Excel
                </button>
                <button className="btn btn-success btn-sm" type="button">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Exportar a Excel
                </button>
                <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i className="bi bi-plus-circle-fill"></i>
                    Nuevo Trabajador
                </button>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Nuevo Trabajador
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="inputtext" className="col-form-label">DNI(*)</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" id="inputtext" name="dni" value={form.dni} onChange={handleChange} className="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="inputtext" className="col-form-label">Nombres(*)</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" id="inputtext" name="nombres" value={form.nombres} onChange={handleChange} className="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="inputtext" className="col-form-label">Ape. Materno(*)</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" id="inputtext" name="apellidoMaterno" value={form.apellidoMaterno} onChange={handleChange} className="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="inputtext" className="col-form-label">Ape. Paterno(*)</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" id="inputtext" name="apellidoPaterno" value={form.apellidoPaterno} onChange={handleChange} className="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="inputtext" className="col-form-label">Fecha de cumpleaños(*)</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="date" id="inputtext" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} className="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="selecttext" className="col-form-label">Cargo(*)</label>
                                            </div>
                                            <div className="col-6">
                                                {/* <input type="text" id="inputtext" className="form-control input-sm"/> */}
                                                <select className="form-select select-sm" id="selecttext" name="cargo" value={form.cargo} onChange={handleChange} aria-label="Default select example">
                                                    <option selected>Seleccione una opción</option>
                                                    <option value="">Seleccione el cargo</option>
                                                    <option value="Gerente">Gerente</option>
                                                    <option value="Jefe">Jefe</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="selecttext" className="col-form-label">Área(*)</label>
                                            </div>
                                            <div className="col-6">
                                                {/* <input type="text" id="inputtext" className="form-control input-sm"/> */}
                                                <select className="form-select select-sm" id="selecttext" name="area" value={form.area} onChange={handleChange} aria-label="Default select example">
                                                    <option value="">Seleccione el area</option>
                                                    <option value="Gerencia">Gerencia</option>
                                                    <option value="Seguridad Industrial">Seguridad Industrial</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="inputtext" className="col-form-label">Fecha de ingreso a la empresa(*)</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="date" id="inputtext" name="FechaIngresoEmp" value={form.FechaIngresoEmp} onChange={handleChange} className="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="inputtext" className="col-form-label">Fecha de ingreso al área(*)</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="date" id="inputtext" name="fechaIngresoArea" value={form.fechaIngresoArea} onChange={handleChange} className="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="direccionInput" className="form-label">Direccion</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" className="form-control" id="direccionInput" name="direccion" value={form.direccion} onChange={handleChange} placeholder="" />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="distritoSelect" className="form-label">Distrito</label>
                                            </div>
                                            <div className="col-6">
                                                <select className="form-select" id="distritoSelect" name="distrito" value={form.distrito} onChange={handleChange} aria-label="Distritos">
                                                    <option>Seleccione un distrito</option>
                                                    <option>Distrito 1</option>
                                                    <option>Distrito 2</option>
                                                    <option>Distrito 3</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="cEmailInput" className="form-label">Email corporativo</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" className="form-control" id="cEmailInput" name="corpEmail" value={form.corpEmail} onChange={handleChange} placeholder="" />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="pEmailInput" className="form-label">Email personal</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" className="form-control" id="pEmailInput" name="perEmail" value={form.perEmail} onChange={handleChange} placeholder="" />
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
                                                    <option>Seleccione una nacionalidad</option>
                                                    <option value="1">Peruano</option>
                                                    <option value="2">Estado Unidense</option>
                                                    <option value="3">Canadiense</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="labelselect" className=" form-label">
                                                    Genero
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <select
                                                    className="form-select"
                                                    id="labelselect"
                                                    aria-label="Select example"
                                                    name="genero" value={form.genero} onChange={handleChange}
                                                >
                                                    <option>Seleccione un Genero</option>
                                                    <option value="Masculino">Masculino</option>
                                                    <option value="Femenino">Femenino</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="estadoCivilSelect" className="form-label">
                                                    Estado civil
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <select className="form-select"
                                                    id="estadoCivilSelect"
                                                    name="estadoCivil" value={form.estadoCivil} onChange={handleChange}
                                                    aria-label="estado civil select">
                                                    <option>Seleccione un estado civil</option>
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
                                                <label htmlFor="estadoCivilSelect" className="form-label">
                                                    Indicativo y telefono
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <div className="row">
                                                    <div className="col-5">
                                                        <input type="number" className="form-control"
                                                            id="indicativoInput" name="indicativoTel" value={form.indicativoTel}
                                                            onChange={handleChange} placeholder="50" />
                                                    </div>
                                                    <div className="col-7">
                                                        <input type="number" className="form-control" id="tPersonalInput"
                                                            name="telefono" value={form.telefono}
                                                            onChange={handleChange} placeholder="111111" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="recFacialInput" className="form-label">Reconocimiento facial</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="file" className="form-control" id="recFacialInput"
                                                    name="recFacial" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="firmaDigitalInput" className="form-label">Firma digital</label>
                                            </div>
                                            <div className="col-6">
                                                <input type="text" className="form-control" id="firmaDigitalInput"
                                                    name="firmaDigital" value={form.firmaDigital} onChange={handleChange} placeholder="" />
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="statusSelect" className="form-label">
                                                    Status
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <select className="form-select"
                                                    id="statusSelect"
                                                    name="status" value={form.status} onChange={handleChange}
                                                    aria-label="status select">
                                                    <option>Seleccione un status</option>
                                                    <option>Activo</option>
                                                    <option>Inactivo</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="sedeSelect" className="form-label">
                                                    Sede de trabajo
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <select className="form-select"
                                                    id="sedeSelect"
                                                    name="sedeTrabajo" value={form.sedeTrabajo} onChange={handleChange}
                                                    aria-label="sede select">
                                                    <option>Seleccione una sede</option>
                                                    <option>Sede 1</option>
                                                    <option>Sede 2</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                            <div className="col-6">
                                                <label htmlFor="rolSelect" className="form-label">
                                                    Tipo de rol
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <select className="form-select"
                                                    id="rolSelect"
                                                    name="tipoRol" value={form.tipoRol} onChange={handleChange}
                                                    aria-label="rol select">
                                                    <option>Seleccione un rol</option>
                                                    <option>Jefe</option>
                                                    <option>Asistente</option>
                                                    <option>Colaborador</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" id="closeButton" data-bs-dismiss="modal">Cerrar</button>
                                            <button type="submit" className="btn btn-success">Guardar</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </KTCardBody>
    )
}

export { CalendarButton }