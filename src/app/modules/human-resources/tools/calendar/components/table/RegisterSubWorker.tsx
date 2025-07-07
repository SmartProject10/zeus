import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { KTCardBody } from '../../../../../../../_zeus/helpers'
import { appStateService } from '../../../../../../services/appState.service'
import { dayMonthYear } from '../../../../../../utils/dateFormat'
import { EmployeeRequest, EmployeeResponse } from '../../core/_models'
import { getFilteredEmployees, putEmployeeService } from '../../core/_requests'
import ModalSubWorker from './ModalSubWorker';
import { mockEmployees } from './mockData';
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

interface EmployeeForm {
    area: string
    cargo: string
    firmaDigital: string
    recFacial: string
    nacionalidad: string
    estadoCivil: string
    genero: string
    dni: string
    fechaNacimiento: string
    nombres: string
    apellidoPaterno: string
    apellidoMaterno: string
    distrito: string
    direccion: string
    correoTrabajo: string
    correoPersonal: string
    telefonoPersonal: string
    fechaIngresoArea: string
    fechaIngresoEmpresa: string
    fechaFinContrato: string
    rollSistemaDigitalizado: string
    status: string
    sedeTrabajo: string
    indicativoTel: string
    codigoTrabajador?: string
}

const RegisterSubWorker = () => {
    const [employees, setEmployees] = useState<EmployeeResponse[]>([])
    const [filteredEmployees, setFilteredEmployees] = useState<EmployeeResponse[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [limitPerPage, setLimitPerPage] = useState<number>(10)
    const handleAddOrUpdateEmployee = (employee: EmployeeForm) => {
        setFilteredEmployees((prev) => {
            const existingIndex = prev.findIndex((e) => e.dni === employee.dni);
            if (existingIndex !== -1) {
                const updatedEmployees = [...prev];
                updatedEmployees[existingIndex] = { ...updatedEmployees[existingIndex], ...employee };
                return updatedEmployees;
            } else {
                const newEmployee: EmployeeResponse = {
                    ...employee,
                    _id: '',
                    reconocimientoFacial: '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    tipoContrato: '',
                    tallaCamiseta: '',
                    tallaPantalon: '',
                    tallaZapatos: '',
                    indicativoTelLaboral: '',
                    telefonoLaboral: '',
                    codigoTrabajador: employee.codigoTrabajador || '',
                };
                return [...prev, newEmployee];
            }
        });
    };
    const [idEmployee, setIdEmployee] = useState('')
    const [formData, setFormData] = useState<EmployeeForm>({
        area: '',
        cargo: '',
        firmaDigital: '',
        recFacial: '',
        nacionalidad: '',
        estadoCivil: '',
        genero: '',
        dni: '',
        fechaNacimiento: '',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        distrito: '',
        direccion: '',
        correoTrabajo: '',
        correoPersonal: '',
        telefonoPersonal: '',
        fechaIngresoArea: '',
        fechaIngresoEmpresa: '',
        fechaFinContrato: '',
        rollSistemaDigitalizado: '',
        status: '',
        sedeTrabajo: '',
        indicativoTel: '',
        codigoTrabajador: '',
    })
    const [activeModal, setActiveModal] = useState<boolean>(false)

    useEffect(() => {
        const employeesInit = async () => {
            try {
                const filters = `?limit=${limitPerPage}`
                const response = await getFilteredEmployees(filters)
                if (response.status == 200) {
                    setTotalPages(response.data.totalPages)
                    setCurrentPage(response.data.currentPage)
                    const employees: EmployeeResponse[] = response.data.trabajadores
                    const mappedEmployees = employees.map(employee => ({
                        ...employee,
                        indicativoTel: employee.indicativoTel || ''
                    }))
                    appStateService.setEmployeesSubject(mappedEmployees)
                }
            } catch (error: any) {
                console.error(error)
            }
        }
        employeesInit()

        const employeesSubj = appStateService.getEmployeesSubject().subscribe((employees: EmployeeResponse[]) => {
            const mappedEmployees = employees.map(employee => ({
                ...employee,
                fechaFinContrato: employee.fechaFinContrato || '',
                fechaIngresoArea: employee.fechaIngresoArea || '',
                fechaIngresoEmpresa: employee.fechaIngresoEmpresa || '',
                dni: employee.dni || '',
                apellidoPaterno: employee.apellidoPaterno || '',
                apellidoMaterno: employee.apellidoMaterno || '',
                nombres: employee.nombres || '',
                direccion: employee.direccion || '',
                distrito: employee.distrito || '',
                correoTrabajo: employee.correoTrabajo || '',
                correoPersonal: employee.correoPersonal || '',
                telefonoPersonal: employee.telefonoPersonal || '',
                nacionalidad: employee.nacionalidad || '',
                genero: employee.genero || '',
                estadoCivil: employee.estadoCivil || '',
                rollSistemaDigitalizado: employee.rollSistemaDigitalizado || '',
                area: employee.area || '',
                cargo: employee.cargo || '',
                sedeTrabajo: employee.sedeTrabajo || '',
                status: employee.status || '',
                firmaDigital: employee.firmaDigital || '',
                reconocimientoFacial: employee.reconocimientoFacial || '',
                fechaNacimiento: employee.fechaNacimiento || '',
                indicativoTel: employee.indicativoTel || '',
                codigoTrabajador: employee.codigoTrabajador || '',
            }))
            setEmployees(mappedEmployees)
            setFilteredEmployees(mappedEmployees)
        })

        const activeModalSubj = appStateService.getActiveModalSubject().subscribe((state: boolean) => {
            setActiveModal(state)
        })

        return () => {
            employeesSubj.unsubscribe()
            activeModalSubj.unsubscribe()
        }
    }, [])

    useEffect(() => {
        applyFilters()
    }, [formData])

    useEffect(() => {
        setEmployees(mockEmployees);
        setFilteredEmployees(mockEmployees);
    }, []);

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    function showModalEmployee(id: string) {
        setIdEmployee(id)
        appStateService.setActiveModalSubject()
    }

    const applyFilters = async () => {
        const filters = `?area=${formData.area}&cargo=${formData.cargo}&limit=${limitPerPage}`;
        try {
            const response = await getFilteredEmployees(filters);
            if (response.status == 200) {
                const limitedEmployees = response.data.trabajadores.slice(0, 5);
                setFilteredEmployees(limitedEmployees);
            }
        } catch (e: any) {
            console.error(e);
        }
    };

    async function selectPageNavigate(page: number) {
        const filters = `?area=${formData.area}&cargo=${formData.cargo}&dni=${formData.dni.replace(' ', '%20')}&apellidoPaterno=${formData.apellidoPaterno.replace(' ', '%20')}&apellidoMaterno=${formData.apellidoMaterno.replace(' ', '%20')}&estadoCivil=${formData.estadoCivil}&genero=${formData.genero}&nacionalidad=${formData.nacionalidad}&distrito=${formData.distrito}&direccion=${formData.direccion.replace(' ', '%20')}&status=${formData.status}&page=${page}&limit=${limitPerPage}`
        try {
            const response: any = await getFilteredEmployees(filters)
            if (response.status == 200) {
                setCurrentPage(response.data.currentPage)
                setTotalPages(response.data.totalPages)
                setFilteredEmployees(response.data.trabajadores)
            }
        } catch (e: any) {
            console.error(e)
        }
    }

    function changeStatusEmployee(state: boolean, employee: EmployeeResponse) {
        Swal.fire({
            icon: 'question',
            title: '¿Estas segur@ de realizar esta acción?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si',
            confirmButtonColor: '#1b84ff',
        }).then((result) => {
            if (result.isConfirmed) {
                if (state == true) {
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
                                reconocimientoFacial: '',
                                firmaDigital: employee.firmaDigital,
                                area: employee.area,
                                cargo: employee.cargo,
                                rollSistemaDigitalizado: employee.rollSistemaDigitalizado,
                                fechaIngresoArea: employee.fechaIngresoArea,
                                fechaIngresoEmpresa: employee.fechaIngresoEmpresa,
                                fechaFinContrato: employee.fechaFinContrato || '',
                                status: 'Activo',
                                sedeTrabajo: employee.sedeTrabajo,
                                codigoTrabajador: employee.codigoTrabajador,
                                tipoContrato: employee.tipoContrato,
                                tallaCamiseta: employee.tallaCamiseta,
                                tallaPantalon: employee.tallaPantalon,
                                tallaZapatos: employee.tallaZapatos,
                            }
                            const response = await putEmployeeService(employee._id, request)
                            if (response.status == 200) {
                                appStateService.putEmployeeSubject(employee._id, request)
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.onmouseenter = Swal.stopTimer
                                        toast.onmouseleave = Swal.resumeTimer
                                    },
                                })
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Estado del trabajador modificado correctamente',
                                })
                            }
                        }
                        editEmployee()
                    } catch (e: any) {
                        console.error(e)
                    }
                } else {
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
                                reconocimientoFacial: '',
                                firmaDigital: employee.firmaDigital,
                                area: employee.area,
                                cargo: employee.cargo,
                                rollSistemaDigitalizado: employee.rollSistemaDigitalizado,
                                fechaIngresoArea: employee.fechaIngresoArea,
                                fechaIngresoEmpresa: employee.fechaIngresoEmpresa,
                                status: 'Inactivo',
                                sedeTrabajo: employee.sedeTrabajo,
                                fechaFinContrato: employee.fechaFinContrato || '',
                                codigoTrabajador: employee.codigoTrabajador,
                                tipoContrato: employee.tipoContrato,
                                tallaCamiseta: employee.tallaCamiseta,
                                tallaPantalon: employee.tallaPantalon,
                                tallaZapatos: employee.tallaZapatos,
                            }
                            const response = await putEmployeeService(employee._id, request)
                            if (response.status == 200) {
                                appStateService.putEmployeeSubject(employee._id, request)
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.onmouseenter = Swal.stopTimer
                                        toast.onmouseleave = Swal.resumeTimer
                                    },
                                })
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Estado del trabajador modificado correctamente',
                                })
                            }
                        }
                        editEmployee()
                    } catch (e: any) {
                        console.error(e)
                    }
                }
            }
        })
    }

    async function navigatePage(action: string) {
        if (action == 'next') {
            const filters = `?area=${formData.area}&cargo=${formData.cargo}&dni=${formData.dni.replace(' ', '%20')}&apellidoPaterno=${formData.apellidoPaterno.replace(' ', '%20')}&apellidoMaterno=${formData.apellidoMaterno.replace(' ', '%20')}&estadoCivil=${formData.estadoCivil}&genero=${formData.genero}&nacionalidad=${formData.nacionalidad}&distrito=${formData.distrito}&direccion=${formData.direccion.replace(' ', '%20')}&status=${formData.status}&page=${currentPage + 1}&limit=${limitPerPage}`
            try {
                const response: any = await getFilteredEmployees(filters)
                if (response.status == 200) {
                    setCurrentPage(response.data.currentPage)
                    setTotalPages(response.data.totalPages)
                    setFilteredEmployees(response.data.trabajadores)
                }
            } catch (e: any) {
                console.error(e)
            }
        } else if (action == 'previous') {
            const filters = `?area=${formData.area}&cargo=${formData.cargo}&dni=${formData.dni.replace(' ', '%20')}&apellidoPaterno=${formData.apellidoPaterno.replace(' ', '%20')}&apellidoMaterno=${formData.apellidoMaterno.replace(' ', '%20')}&estadoCivil=${formData.estadoCivil}&genero=${formData.genero}&nacionalidad=${formData.nacionalidad}&distrito=${formData.distrito}&direccion=${formData.direccion.replace(' ', '%20')}&status=${formData.status}&page=${currentPage - 1}&limit=${limitPerPage}`
            try {
                const response: any = await getFilteredEmployees(filters)
                if (response.status == 200) {
                    setCurrentPage(response.data.currentPage)
                    setTotalPages(response.data.totalPages)
                    setFilteredEmployees(response.data.trabajadores)
                }
            } catch (e: any) {
                console.error(e)
            }
        }
    }

    const exportFilteredEmployeesToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredEmployees)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Trabajadores')
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' })
        saveAs(data, 'reporteEmpleadosFiltrados.xlsx')
    }

    const exportEmployeeToExcel = (employee: EmployeeResponse) => {
        const employeeArray: EmployeeResponse[] = []
        employeeArray.push(employee)
        const worksheet = XLSX.utils.json_to_sheet(employeeArray)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Trabajadores')
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' })
        saveAs(data, 'reporteEmpleado.xlsx')
    }

    return (
        <KTCardBody className="py-4 card card-grid min-w-full">
            {activeModal ? <ModalSubWorker idEmployee={idEmployee}></ModalSubWorker> : ''}

            <p>Filtros de búsqueda</p>
            <form>
                <div className="row g-1">
                    {[
                        { label: 'Área', name: 'area', type: 'select', options: ['Gerencia', 'Seguridad Industrial'] },
                        { label: 'Cargo', name: 'cargo', type: 'select', placeholder: 'Cargo' },
                        { label: 'Dni', name: 'dni', type: 'input', placeholder: 'Número de dni' },
                        { label: 'Apellido paterno', name: 'apellidoPaterno', type: 'input', placeholder: 'Apellido paterno' },
                        { label: 'Apellido materno', name: 'apellidoMaterno', type: 'input', placeholder: 'Apellido materno' },
                        { label: 'Estado civil', name: 'estadoCivil', type: 'select', options: ['Soltero', 'Casado', 'Divorciado', 'Conviviente', 'Viudo/a'] },
                        { label: 'Género', name: 'genero', type: 'select', options: ['Masculino', 'Femenino'] },
                        { label: 'Nacionalidad', name: 'nacionalidad', type: 'select', options: ['Peruano', 'Estado Unidense', 'Canadiense', 'Panameña'] },
                        { label: 'Distrito', name: 'distrito', type: 'select', options: ['Distrito 1', 'Distrito 2', 'Distrito 3'] },
                        { label: 'Dirección', name: 'direccion', type: 'input', placeholder: 'Dirección' },
                        { label: 'Status trabajador', name: 'status', type: 'select', options: ['Activo', 'Inactivo'] },
                    ].map((field, index) => (
                        <div className="col-2" key={index}>
                            <label htmlFor={`${field.name}Input`} className="form-label-sm d-block mb-1">
                                {field.label}
                            </label>
                            {field.type === 'input' ? (
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id={`${field.name}Input`}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name as keyof EmployeeForm] || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <select
                                    className="form-select form-select-sm"
                                    id={`${field.name}Select`}
                                    name={field.name}
                                    value={formData[field.name as keyof EmployeeForm] || ''}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        applyFilters();
                                    }}
                                >
                                    <option value="">Seleccione</option>
                                    {field.options?.map((option, i) => (
                                        <option key={i} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))}
                </div>
            </form>
            <hr />
            <p>{'Coincidencias' + ': ' + filteredEmployees.length}</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-success btn-sm disabled" type="button">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Importar a Excel
                </button>
                <button
                    onClick={exportFilteredEmployeesToExcel}
                    className="btn btn-success btn-sm"
                    type="button"
                >
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
                            <th className="min-w-200px">Ape. Paterno</th>
                            <th className="min-w-200px">Ape. Materno</th>
                            <th className="min-w-200px">Fecha. Naci</th>
                            <th className="min-w-200px">Área</th>
                            <th className="min-w-200px">Cargo</th>
                            <th className="min-w-200px">Código Trabajador</th>
                            <th className="min-w-200px">F. Ingreso Empresa</th>
                            <th className="min-w-200px">F. ingreso Area</th>
                            <th className="min-w-200px">Dirección</th>
                            <th className="min-w-200px">Distrito</th>
                            <th className="min-w-200px">Email. Corp</th>
                            <th className="min-w-200px">Email. Pers</th>
                            <th className="min-w-200px">Nacionalidad</th>
                            <th className="min-w-200px">Género</th>
                            <th className="min-w-200px">Estado Civil</th>
                            <th className="min-w-200px">Teléfono personal</th>
                            <th className="min-w-200px">Teléfono laboral</th>
                            <th className="min-w-200px">Firma Digital</th>
                            <th className="min-w-200px">Sede Trabajo</th>
                            <th className="min-w-200px">Status</th>
                            <th className="min-w-200px">Opciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredEmployees.length > 0 && filteredEmployees.map((employee, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{employee.dni}</td>
                                <td>{employee.nombres}</td>
                                <td>{employee.apellidoPaterno}</td>
                                <td>{employee.apellidoMaterno}</td>
                                <td>{dayMonthYear(employee.fechaNacimiento)}</td>
                                <td>{employee.area}</td>
                                <td>{employee.cargo}</td>
                                <td>{employee.codigoTrabajador}</td>
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
                                <td>{employee.telefonoLaboral}</td>
                                <td>{employee.firmaDigital}</td>
                                <td>{employee.sedeTrabajo}</td>
                                <td>
                                    <div className="form-check form-switch d-flex justify-content-center">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id={`statusSwitch-${employee._id}`}
                                            checked={employee.status === 'Activo'}
                                            onChange={() => {
                                                Swal.fire({
                                                    icon: 'question',
                                                    title: '¿Estas segur@ de realizar esta acción?',
                                                    showCancelButton: true,
                                                    cancelButtonText: 'Cancelar',
                                                    confirmButtonText: 'Si',
                                                    confirmButtonColor: '#1b84ff',
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        const newStatus = employee.status === 'Activo' ? 'Inactivo' : 'Activo'
                                                        setFilteredEmployees(prev =>
                                                            prev.map(emp =>
                                                                emp._id === employee._id
                                                                    ? { ...emp, status: newStatus }
                                                                    : emp
                                                            )
                                                        )
                                                        changeStatusEmployee(employee.status === 'Activo', employee)
                                                    }
                                                })
                                            }}
                                            style={{ width: '40px', height: '20px' }}
                                        />
                                        <label
                                            className="form-check-label ms-2"
                                            htmlFor={`statusSwitch-${employee._id}`}
                                        >
                                            {employee.status}
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-grid gap-2 d-md-flex">
                                        <div className="d-flex align-items-center gap-2">
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => {
                                                    setIdEmployee(employee._id);
                                                    setActiveModal(true);
                                                }}
                                                type="button"
                                            >
                                                <i className="bi bi-person-lines-fill me-1"></i>
                                                Editar
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => {
                                                Swal.fire({
                                                    title: '¿Estás seguro?',
                                                    text: "Esta acción eliminará todos los datos del empleado",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#d33',
                                                    cancelButtonColor: '#3085d6',
                                                    confirmButtonText: 'Sí, eliminar',
                                                    cancelButtonText: 'Cancelar'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        setFilteredEmployees(prevEmployees =>
                                                            prevEmployees.filter(emp => emp._id !== employee._id)
                                                        );
                                                        Swal.fire(
                                                            '¡Eliminado!',
                                                            'El empleado ha sido eliminado.',
                                                            'success'
                                                        )
                                                    }
                                                })
                                            }}
                                            className="btn btn-sm btn-danger"
                                            type="button"
                                        >
                                            <i className="bi bi-trash-fill" style={{ fontSize: '0.75rem' }}></i>
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
                            <button onClick={() => navigatePage('previous')} className="page-link">
                                <i className="previous"></i>
                            </button>
                        </li>
                        {[...Array(totalPages)].map((page, i) => (
                            <li
                                key={i}
                                className={currentPage == i + 1 ? 'page-item active' : 'page-item'}
                            >
                                <button
                                    onClick={() => selectPageNavigate(i + 1)}
                                    className="page-link "
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={currentPage == totalPages ? 'page-item next disabled' : 'page-item next'}>
                            <button onClick={() => navigatePage('next')} className="page-link">
                                <i className="next"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            <hr />
        </KTCardBody>
    )
}

export { RegisterSubWorker }