import { ReactNode, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Employee } from '../../../../../../../models/apimodels/Employee'

interface MyComponentProps {
    idEmployee: string
    children?: ReactNode
}

export interface EmployeeForm {
    _id: string;
	name: string | null;
	lastname: string | null;
	email: string;
	password: string | null;
	dni: string;
	mothers_lastname: string;
	fathers_lastname: string;
	birthDate: Date | string;
	companyAreaId: string;
	charge: string;
	entryDate: Date | string;
	contractTerminationDate: Date | string | null;
	areaEntryDate: Date | string;
	province: string;
	city: string;
	address: string;
	district: string;
	corporateEmail: string;
	nationalityId: string;
	gender: 'Masculino' | 'Femenino' | '';
	civilStatus: 'Soltero/a' | 'Casado/a' | 'Divorciado/a' | 'Conviviente' | 'Viudo/a' | '';
	personalPhone: string;
	facialRecognition: string | null;
	digitalSignature: string | null;
	status: 'Activo' | 'Inactivo' | '';
	employeeSiteId: string;
	rolId: string;
	sizePants: 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44;
	sizePolo: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
	sizeShoe: 36 | 38 | 40 | 42 | 44;
	companyIds: string[];
}

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
const ModalTrabajador: React.FC<MyComponentProps> = ({ idEmployee, children }) => {

    const [form, setForm] = useState<EmployeeForm>({
        _id: '',
        name: null,
        lastname: null,
        email: '',
        password: null,
        dni: '',
        mothers_lastname: '',
        fathers_lastname: '',
        birthDate: '',
        companyAreaId: '',
        charge: '',
        entryDate: '',
        contractTerminationDate: null,
        areaEntryDate: '',
        province: '',
        city: '',
        address: '',
        district: '',
        corporateEmail: '',
        nationalityId: '',
        gender: '',
        civilStatus: '',
        personalPhone: '',
        facialRecognition: null,
        digitalSignature: null,
        status: '',
        employeeSiteId: '',
        rolId: '',
        sizePants: 26,
        sizePolo: 'XS',
        sizeShoe: 36,
        companyIds: [],
    })

    useEffect(() => {

        const initEmployee = async () => {

            // try {
                   //actualizar con la api de "employee"
            //     const response = await backyService.employee.getById(idEmployee)

            //     if (response.status == 200) {

            //         const Employee: Employee = response.data

            //         setForm({
            //             name: Employee.name,
            //             lastname: Employee.lastname,
            //             email: Employee.email,
            //             dni: Employee.dni,
            //             mothers_lastname: Employee.mothers_lastname,
            //             fathers_lastname: Employee.fathers_lastname,
            //             birthDate: Employee.birthDate,
            //             companyAreaId: Employee.companyAreaId, 
            //             charge: Employee.charge, 
            //             entryDate: Employee.entryDate, 
            //             contractTerminationDate: Employee.contractTerminationDate,
            //             areaEntryDate: Employee.areaEntryDate, 
            //             province: Employee.province,
            //             city: Employee.city,
            //             address: Employee.address,
            //             district: Employee.district,
            //             corporateEmail: Employee.corporateEmail,
            //             nationalityId: Employee.nationalityId, 
            //             gender: Employee.gender,
            //             civilStatus: Employee.civilStatus,
            //             personalPhone: Employee.personalPhone,
            //             facialRecognition: Employee.facialRecognition,
            //             digitalSignature: Employee.digitalSignature,
            //             status: Employee.status,
            //             employeeSiteId: Employee.employeeSiteId,
            //             rolId: Employee.rolId,
            //             sizePants: Employee.sizePants,
            //             sizePolo: Employee.sizePolo,
            //             sizeShoe: Employee.sizeShoe,
            //         })
            //     }
            // } catch (error: any) {
            //     console.error(error)
            // }
        }

        initEmployee()

    }, [])

    const handleChange = (event: any) => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name]: value,
        })
    }

    function deleteEmployee(id: string) {

        Swal.fire({
            icon: 'question',
            title: '¿Estas segur@ de realizar esta acción?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si',
            confirmButtonColor: '#1b84ff',
        }).then((result) => {
            if (result.isConfirmed) {

                // try {
                //     const deleteEmployee = async () => {
                           //actualizar con la api de "employee"
                //         const response = await backyService.employee.delete(id)

                //         if(response.status == 200){

                //             appStateService.deleteEmployeeSubject(id)
                //             appStateService.setActiveModalSubject()

                //             const Toast = Swal.mixin({
                //                 toast: true,
                //                 position: 'top-end',
                //                 showConfirmButton: false,
                //                 timer: 3000,
                //                 timerProgressBar: true,
                //                 didOpen: (toast) => {
                //                     toast.onmouseenter = Swal.stopTimer
                //                     toast.onmouseleave = Swal.resumeTimer
                //                 },
                //             })
                //             Toast.fire({
                //                 icon: 'success',
                //                 title: 'Trabajador eliminado correctamente',
                //             })
                //         }
                //     }

                //     deleteEmployee()

                // } catch (e: any) {
                //     console.error(e)
                // }

            } else if (result.isDenied) {
                // Swal.fire('Changes are not saved', '', 'info')
            }
        })

    }

    function putEmployee(id: string) {

        if (
            !form.name?.trim() || 
            !form.lastname?.trim() || 
            !form.email.trim() || 
            !form.dni.trim() || 
            !form.mothers_lastname.trim() || 
            !form.fathers_lastname.trim() || 
            !form.birthDate.toString().trim() || 
            !form.companyAreaId.trim() || 
            !form.charge.trim() || 
            !form.entryDate.toString().trim() || 
            !form.contractTerminationDate || 
            !form.areaEntryDate.toString().trim() || 
            !form.province.trim() || 
            !form.city.trim() || 
            !form.address.trim() || 
            !form.district.trim() || 
            !form.corporateEmail.trim() || 
            !form.nationalityId.trim() || 
            !form.gender || 
            !form.civilStatus || 
            !form.personalPhone.trim() || 
            !form.facialRecognition || 
            !form.digitalSignature || 
            !form.status || 
            !form.employeeSiteId || 
            !form.rolId || 
            !form.sizePants || 
            !form.sizePolo || 
            !form.sizeShoe
          ) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "error",
              title: "Por favor, rellene todos los campos.",
            });
          
            return;
        }          

        Swal.fire({
            icon: 'question',
            title: '¿Estas segur@ de realizar esta acción?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si',
            confirmButtonColor: '#1b84ff',
        }).then((result) => {
            if (result.isConfirmed) {

                // try {
                //     const editEmployee = async () => {

                //         const request: Employee = {
                //             name: form.name,
                //             lastname: form.lastname,
                //             email: form.email,
                //             dni: form.dni,
                //             mothers_lastname: form.mothers_lastname,
                //             fathers_lastname: form.fathers_lastname,
                //             birthDate: form.birthDate,
                //             companyAreaId: form.companyAreaId, 
                //             charge: form.charge, 
                //             entryDate: form.entryDate, 
                //             contractTerminationDate: form.contractTerminationDate,
                //             areaEntryDate: form.areaEntryDate, 
                //             province: form.province,
                //             city: form.city,
                //             address: form.address,
                //             district: form.district,
                //             corporateEmail: form.corporateEmail,
                //             nationalityId: form.nationalityId, 
                //             gender: form.gender,
                //             civilStatus: form.civilStatus,
                //             personalPhone: form.personalPhone,
                //             facialRecognition: form.facialRecognition,
                //             digitalSignature: form.digitalSignature,
                //             status: form.status,
                //             employeeSiteId: form.employeeSiteId,
                //             rolId: form.rolId,
                //             sizePants: form.sizePants,
                //             sizePolo: form.sizePolo,
                //             sizeShoe: form.sizeShoe,
                //         }
                           //actualizar con la api de "employee"
                //         const response = await backyService.employee.put(id, request)

                //         if(response.status == 200){

                //             appStateService.putEmployeeSubject(id, request)
                //             appStateService.setActiveModalSubject()

                //             const Toast = Swal.mixin({
                //                 toast: true,
                //                 position: 'top-end',
                //                 showConfirmButton: false,
                //                 timer: 3000,
                //                 timerProgressBar: true,
                //                 didOpen: (toast) => {
                //                     toast.onmouseenter = Swal.stopTimer
                //                     toast.onmouseleave = Swal.resumeTimer
                //                 },
                //             })
                //             Toast.fire({
                //                 icon: 'success',
                //                 title: 'Trabajador editado correctamente',
                //             })
                //         }

                //     }

                //     editEmployee()
                // } catch (e: any) {
                //     console.error(e)
                // }

            } else if (result.isDenied) {
                // Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    function closeModal(){
        //appStateService.setActiveModalSubject()
    }

    return (
        <div
            className="modal fade show"
            id="modal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(1px)' }}>
            <div
                className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div
                    className="modal-content">
                    <div
                        className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel">
                            Trabajador
                        </h1>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn-close"></button>
                    </div>
                    <div
                        className="modal-body">
                        <div
                            className="card">
                            <div
                                className="card-body">

                                <form>
                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputNombre"
                                                className="col-form-label">
                                                Nombre
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="text"
                                                id="modal_trabajador_inputNombre"
                                                name="nombre"
                                                value={form.name || ""}
                                                onChange={handleChange}
                                                placeholder="Nombre"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputApellido"
                                                className="col-form-label">
                                                Apellido
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="text"
                                                id="modal_trabajador_inputApellido"
                                                name="apellido"
                                                value={form.lastname || ""}
                                                onChange={handleChange}
                                                placeholder="Apellido"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputEmail"
                                                className="col-form-label">
                                                Email personal
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="email"
                                                id="modal_trabajador_inputEmail"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="Email personal"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputDni"
                                                className="col-form-label">
                                                DNI
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="text"
                                                id="modal_trabajador_inputDni"
                                                name="dni"
                                                value={form.dni}
                                                onChange={handleChange}
                                                placeholder="Dni"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputApellidoMaterno"
                                                className="col-form-label">
                                                Apellido materno
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="text"
                                                id="modal_trabajador_inputApellidoMaterno"
                                                name="apellido_materno"
                                                value={form.mothers_lastname}
                                                onChange={handleChange}
                                                placeholder="Apellido materno"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputApellidoPaterno"
                                                className="col-form-label">
                                                Apellido paterno
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="text"
                                                id="modal_trabajador_inputApellidoPaterno"
                                                name="apellido_paterno"
                                                value={form.fathers_lastname}
                                                onChange={handleChange}
                                                placeholder="Apellido paterno"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputFechaDeNacimiento"
                                                className="col-form-label">
                                                Fecha de nacimiento
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="date"
                                                id="modal_trabajador_inputFechaDeNacimiento"
                                                name="fecha_de_nacimiento"
                                                value={form.birthDate.toString()}
                                                onChange={handleChange}
                                                placeholder="Fecha de nacimiento"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputArea"
                                                className="col-form-label">
                                                Área
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <select
                                                id="modal_trabajador_inputArea"
                                                name="área"
                                                value={form.companyAreaId}
                                                onChange={handleChange}
                                                className="form-control input-sm"
                                            >
                                                //acá deben ir todas las áreas de la empresa en la base de datos
                                                {/* <option value="">Seleccione un área</option>
                                                <option value="cargo1">Cargo 1</option>
                                                <option value="cargo2">Cargo 2</option>
                                                <option value="cargo3">Cargo 3</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div className="col-6">
                                            <label htmlFor="modal_trabajador_inputCargo" className="col-form-label">
                                                Cargo
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <select
                                                id="modal_trabajador_inputCargo"
                                                name="cargo"
                                                value={form.charge}
                                                onChange={handleChange}
                                                className="form-control input-sm"
                                            >
                                                //las opciones deben venir de acuerdo al área que se elija, porque cada área tiene sus cargos
                                                {/* <option value="">Seleccione un cargo</option>
                                                <option value="cargo1">Cargo 1</option>
                                                <option value="cargo2">Cargo 2</option>
                                                <option value="cargo3">Cargo 3</option> */}
                                            </select>
                                        </div>
                                    </div>


                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputFechaDeIngresoALaEmpresa"
                                                className="col-form-label">
                                                Fecha de ingreso a la empresa
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="date"
                                                id="modal_trabajador_inputFechaDeIngresoALaEmpresa"
                                                name="fecha_de_ingreso_a_la_empresa"
                                                value={form.entryDate.toString()}
                                                onChange={handleChange}
                                                placeholder="Fecha de ingreso a la empresa"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputFechaDeTerminoDeContrato"
                                                className="col-form-label">
                                                Fecha de termino de contrato
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="date"
                                                id="modal_trabajador_inputFechaDeTerminoDeContrato"
                                                name="fecha_de_termino_de_contrato"
                                                value={form.contractTerminationDate?.toString() || ""}
                                                onChange={handleChange}
                                                placeholder="Fecha de termino de contrato"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputFechaDeEntradaAlArea"
                                                className="col-form-label">
                                                Fecha de entrada al área
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="date"
                                                id="modal_trabajador_inputFechaDeEntradaAlArea"
                                                name="fecha_de_entrada_al_area"
                                                value={form.areaEntryDate.toString()}
                                                onChange={handleChange}
                                                placeholder="Fecha de entrada al área"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputProvincia"
                                                className="col-form-label">
                                                Provincia
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="text"
                                                id="modal_trabajador_inputProvincia"
                                                name="provincia"
                                                value={form.province}
                                                onChange={handleChange}
                                                placeholder="Provincia"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputCiudad"
                                                className="col-form-label">
                                                Ciudad
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="text"
                                                id="modal_trabajador_inputCiudad"
                                                name="ciudad"
                                                value={form.city}
                                                onChange={handleChange}
                                                placeholder="Ciudad"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputDireccion"
                                                className="col-form-label">
                                                Dirección
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="text"
                                                id="modal_trabajador_inputDireccion"
                                                name="direccion"
                                                value={form.address}
                                                onChange={handleChange}
                                                placeholder="Dirección"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputName"
                                                className="col-form-label">
                                                Distrito
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="text"
                                                id="modal_trabajador_inputName"
                                                name="distrito"
                                                value={form.district}
                                                onChange={handleChange}
                                                placeholder="Distrito"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputEmailCorporativo"
                                                className="col-form-label">
                                                Email corporativo
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="email"
                                                id="modal_trabajador_inputEmailCorporativo"
                                                name="email_corporativo"
                                                value={form.corporateEmail}
                                                onChange={handleChange}
                                                placeholder="Email corporativo"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputNacionalidad"
                                                className="col-form-label">
                                                Nacionalidad
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <select
                                                id="modal_trabajador_inputNacionalidad"
                                                name="nacionalidad"
                                                value={form.nationalityId}
                                                onChange={handleChange}
                                                className="form-control input-sm"
                                            >
                                                //las opciones deben venir de las nacionalidades de la base de datos
                                                {/* <option value="">Seleccione un cargo</option>
                                                <option value="cargo1">Cargo 1</option>
                                                <option value="cargo2">Cargo 2</option>
                                                <option value="cargo3">Cargo 3</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputGenero"
                                                className="col-form-label">
                                                Género
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <select
                                                id="modal_trabajador_inputGenero"
                                                name="genero"
                                                value={form.gender}
                                                onChange={handleChange}
                                                className="form-control input-sm"
                                            >
                                                <option value="">Seleccione género</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputEstadoCivil"
                                                className="col-form-label">
                                                Estado civil
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <select
                                                id="modal_trabajador_inputEstadoCivil"
                                                name="estado_civil"
                                                value={form.civilStatus}
                                                onChange={handleChange}
                                                className="form-control input-sm" 
                                            >
                                                <option value="">Seleccione estado civil</option>
                                                <option value="Soltero/a">Soltero/a</option>
                                                <option value="Casado/a">Casado/a</option>
                                                <option value="Divorciado/a">Divorciado/a</option>
                                                <option value="Conviviente">Conviviente</option>
                                                <option value="Viudo/a">Viudo/a</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputTelefonoPersonal"
                                                className="col-form-label">
                                                Teléfono personal
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="text"
                                                id="modal_trabajador_inputTelefonoPersonal"
                                                name="telefono_personal"
                                                value={form.personalPhone}
                                                onChange={handleChange}
                                                placeholder="Teléfono personal"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputReconocimientoFacial"
                                                className="col-form-label">
                                                Reconocimiento facial
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="file"
                                                id="modal_trabajador_inputReconocimientoFacial"
                                                name="reconocimiento_facial"
                                                onChange={handleChange}
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputFirmaDigital"
                                                className="col-form-label">
                                                Firma digital
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <input
                                                type="file"
                                                id="modal_trabajador_inputFirmaDigital"
                                                name="firma_digital"
                                                value={form.digitalSignature || ""}
                                                onChange={handleChange}
                                                placeholder="Firma digital"
                                                className="form-control input-sm" />
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputEstado"
                                                className="col-form-label">
                                                Estado
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <select
                                                id="modal_trabajador_inputEstado"
                                                name="estado"
                                                value={form.status}
                                                onChange={handleChange}
                                                className="form-control input-sm" 
                                            >
                                                <option value="">Seleccione estado</option>
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputSedeDeTrabajo"
                                                className="col-form-label">
                                                Sede de trabajo
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <select
                                                id="modal_trabajador_inputSedeDeTrabajo"
                                                name="sede_de_trabajo"
                                                value={form.employeeSiteId}
                                                onChange={handleChange}
                                                className="form-control input-sm" 
                                            >
                                                //las opciones vendrán de acuerdo a las sedes de la empresa que se registraron en ella
                                                {/* <option value="">Seleccione sede</option>
                                                <option value="cargo1">Cargo 1</option>
                                                <option value="cargo2">Cargo 2</option>
                                                <option value="cargo3">Cargo 3</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputRol"
                                                className="col-form-label">
                                                Rol
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <select
                                                id="modal_trabajador_inputRol"
                                                name="rol"
                                                value={form.rolId}
                                                onChange={handleChange}
                                                className="form-control input-sm" 
                                            >
                                                //las opciones vendrán de acuerdo a los roles en la base de datos
                                                {/* <option value="">Seleccione rol</option>
                                                <option value="cargo1">Cargo 1</option>
                                                <option value="cargo2">Cargo 2</option>
                                                <option value="cargo3">Cargo 3</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputTallePantalon"
                                                className="col-form-label">
                                                Talle pantalón
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <select
                                                id="modal_trabajador_inputTallePantalon"
                                                name="talle_pantalon"
                                                value={form.sizePants}
                                                onChange={handleChange}
                                                className="form-control input-sm"
                                            >
                                                <option value="">Seleccione talle de pantalón</option>
                                                <option value="26">26</option>
                                                <option value="28">28</option>
                                                <option value="30">30</option>
                                                <option value="32">32</option>
                                                <option value="34">34</option>
                                                <option value="36">36</option>
                                                <option value="38">38</option>
                                                <option value="40">40</option>
                                                <option value="42">42</option>
                                                <option value="44">44</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputTallePolo"
                                                className="col-form-label">
                                                Talle polo
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <select
                                                id="modal_trabajador_inputTallePolo"
                                                name="talle_polo"
                                                value={form.sizePolo}
                                                onChange={handleChange}
                                                className="form-control input-sm"
                                            >
                                                <option value="">Seleccione talle de polo</option>
                                                <option value="XS">XS</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                <option value="XXL">XXL</option>
                                                <option value="XXXL">XXXL</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        className="row g-3 align-items-start justify-content-evenly mt-2">
                                        <div
                                            className="col-6">
                                            <label
                                                htmlFor="modal_trabajador_inputTalleZapato"
                                                className="col-form-label">
                                                Talle zapato
                                            </label>
                                        </div>
                                        <div
                                            className="col-6">
                                            <select
                                                id="modal_trabajador_inputTalleZapato"
                                                name="talle_zapato"
                                                value={form.sizeShoe}
                                                onChange={handleChange}
                                                className="form-control input-sm"
                                            >
                                                <option value="">Seleccione talle de zapato</option>
                                                <option value="36">36</option>
                                                <option value="38">38</option>
                                                <option value="40">40</option>
                                                <option value="42">42</option>
                                                <option value="44">44</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        className="d-flex justify-content-center gap-10 modal-footer">
                                        <button
                                            type="button"
                                            onClick={() => putEmployee(idEmployee)}
                                            className="btn btn-primary">
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteEmployee(idEmployee)}
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
    )
}

export default ModalTrabajador
