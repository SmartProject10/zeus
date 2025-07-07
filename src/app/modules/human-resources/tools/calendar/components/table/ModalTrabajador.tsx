import { ReactNode, useEffect, useState } from 'react'
import { EmployeeResponse, EmployeeRequest } from '../../core/_models'
import Swal from 'sweetalert2'
import { deleteEmployeeService, getEmployeeById, putEmployeeService } from '../../core/_requests'
import { appStateService } from '../../../../../../services/appState.service'
import { dateInput } from '../../../../../../utils/dateFormat'
import AcademicDataSection from '../table/register/academic'
import FamilyDataSection from '../table/register/family'
import ExternalTrainingSection from '../table/register/external'
import ContactDetailsSection from '../table/register/contact'
import LanguagesSection from '../table/register/languages'

interface MyComponentProps {
    idEmployee: string
    children?: ReactNode
}

export interface EmployeeForm {
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
    codigoTrabajador: string
    indicativoTel: string
    telefonoLaboral?: string
    tipoContrato?: string
    tallaCamiseta?: string
    tallaPantalon?: string
    tallaZapatos?: string
    brevete?: Array<{ tipo: string; fechaVencimiento: string; numero: string; documento?: string }>
}

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
const ModalTrabajador: React.FC<MyComponentProps> = ({ idEmployee }) => {
    const [form, setForm] = useState<EmployeeForm>({
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
        tipoContrato: '',
        tallaCamiseta: '',
        tallaPantalon: '',
        tallaZapatos: '',
        brevete: [],
    })
    const [activeTab, setActiveTab] = useState<string>('trabajador');
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        const initEmployee = async () => {
            try {
                const response = await getEmployeeById(idEmployee);

                if (response.status === 200) {
                    const employee: EmployeeResponse = response.data;

                    setForm({
                        area: employee.area,
                        cargo: employee.cargo,
                        firmaDigital: employee.firmaDigital,
                        recFacial: '',
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
                        fechaFinContrato: dateInput(employee.fechaFinContrato),
                        rollSistemaDigitalizado: employee.rollSistemaDigitalizado,
                        status: employee.status,
                        sedeTrabajo: employee.sedeTrabajo,
                        indicativoTel: employee.indicativoTelLaboral,
                        codigoTrabajador: employee.codigoTrabajador,
                        tipoContrato: employee.tipoContrato,
                        tallaCamiseta: employee.tallaCamiseta,
                        tallaPantalon: employee.tallaPantalon,
                        tallaZapatos: employee.tallaZapatos,
                    });
                }
            } catch (error: any) {
                console.error(error);
            }
        };

        initEmployee();
    }, [idEmployee]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

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

                try {
                    const deleteEmployee = async () => {

                        const response = await deleteEmployeeService(id)

                        if (response.status == 200) {

                            appStateService.deleteEmployeeSubject(id)
                            appStateService.setActiveModalSubject()

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
                                title: 'Trabajador eliminado correctamente',
                            })
                        }
                    }

                    deleteEmployee()

                } catch (e: any) {
                    console.error(e)
                }

            } else if (result.isDenied) {
                // Swal.fire('Changes are not saved', '', 'info')
            }
        })

    }

    function putEmployee(id: string) {

        if (!form.area || !form.cargo || !form.firmaDigital || !form.nacionalidad ||
            !form.estadoCivil || !form.genero || !form.dni || !form.fechaNacimiento ||
            !form.nombres || !form.apellidoPaterno || !form.apellidoMaterno ||
            !form.distrito || !form.direccion || !form.correoTrabajo || !form.correoPersonal ||
            !form.telefonoPersonal || !form.fechaIngresoArea || !form.fechaIngresoEmpresa || !form.fechaFinContrato ||
            !form.rollSistemaDigitalizado || !form.status || !form.sedeTrabajo || !form.telefonoLaboral || !form.indicativoTel
            || !form.codigoTrabajador || !form.tipoContrato || !form.tallaCamiseta || !form.tallaPantalon
            || !form.tallaZapatos || !form.brevete) {

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
                icon: 'error',
                title: 'Porfavor, rellenar todos los campos.',
            })

            return
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
                            reconocimientoFacial: '',
                            firmaDigital: form.firmaDigital,
                            area: form.area,
                            fechaIngresoArea: form.fechaIngresoArea,
                            fechaIngresoEmpresa: form.fechaIngresoEmpresa,
                            fechaFinContrato: form.fechaFinContrato,
                            status: form.status,
                            sedeTrabajo: form.sedeTrabajo,
                            cargo: form.cargo,
                            rollSistemaDigitalizado: form.rollSistemaDigitalizado,
                            codigoTrabajador: form.codigoTrabajador,
                            tipoContrato: form.tipoContrato || '',
                            tallaCamiseta: form.tallaCamiseta,
                            tallaPantalon: form.tallaPantalon,
                            tallaZapatos: form.tallaZapatos,
                        }

                        const response = await putEmployeeService(id, request)

                        if (response.status == 200) {

                            appStateService.putEmployeeSubject(id, request)
                            appStateService.setActiveModalSubject()

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
                                title: 'Trabajador editado correctamente',
                            })
                        }

                    }

                    editEmployee()
                } catch (e: any) {
                    console.error(e)
                }

            } else if (result.isDenied) {
                // Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    function closeModal() {
        appStateService.setActiveModalSubject()
    }

    function toggleFechaFinContrato(value: string) {
        if (value === 'Indefinido') {
            setForm({
                ...form,
                fechaFinContrato: '',
            });
        }
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
                className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                <div
                    className="modal-content">
                    <div
                        className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel">
                            Datos Complementarios
                        </h1>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn-close"></button>
                    </div>
                    <div className="modal-body">
                        {/* Pestañas */}
                        <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mt-3 mb-2 fs-5">
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'trabajador' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('trabajador')}
                                >
                                    Información del Trabajador
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'datosFamiliares' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('datosFamiliares')}
                                >
                                    Datos Familiares
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'datosAcademicos' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('datosAcademicos')}
                                >
                                    Datos Académicos
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'externalTrainingSection' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('externalTrainingSection')}
                                >
                                    Capacitaciones Externas
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'contactDetailsSection' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('contactDetailsSection')}
                                >
                                    Contactos
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'languagesSection' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('languagesSection')}
                                >
                                    Idiomas
                                </button>
                            </li>
                        </ul>

                        {/* Contenido de las pestañas */}
                        <div className="tab-content">
                            {activeTab === 'trabajador' && (
                                <div className="tab-pane fade show active">
                                    {/* Contenido de la pestaña principal (ModalTrabajador) */}
                                    {form && (
                                        <div className="card">
                                            <button
                                                type="button"
                                                className={`btn ${editMode ? 'btn-success' : 'btn-secondary'} mb-3`}
                                                onClick={() => setEditMode(!editMode)}
                                            >
                                                {editMode ? 'Guardar Modo Edición' : 'Editar'}
                                            </button>
                                            <form>
                                                {[
                                                    { title: 'DNI (PDF)', name: 'dniPdf', type: 'file', value: '', disabled: !editMode },
                                                    { title: 'Nombres', name: 'nombres', type: 'text', value: form.nombres, disabled: !editMode },
                                                    { title: 'Apellido Paterno', name: 'apellidoPaterno', type: 'text', value: form.apellidoPaterno, disabled: !editMode },
                                                    { title: 'Apellido Materno', name: 'apellidoMaterno', type: 'text', value: form.apellidoMaterno, disabled: !editMode },
                                                    { title: 'Fecha de Nacimiento', name: 'fechaNacimiento', type: 'date', value: form.fechaNacimiento, disabled: !editMode },
                                                    {
                                                        title: 'Área', name: 'area', type: 'select', value: form.area, disabled: !editMode, options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: 'Area 1', label: 'Area 1' },
                                                            { value: 'Area 2', label: 'Area 2' }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Cargo', name: 'cargo', type: 'select', value: form.cargo, disabled: !editMode || !form.area, options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: 'Gerente', label: 'Gerente' },
                                                            { value: 'Jefe', label: 'Jefe' }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Código de trabajador',
                                                        name: 'codigoTrabajador',
                                                        type: 'text',
                                                        value: form.codigoTrabajador,
                                                        disabled: !editMode,
                                                    },
                                                    {
                                                        title: 'Tipo de contrato',
                                                        name: 'tipoContrato',
                                                        type: 'select',
                                                        value: form.tipoContrato,
                                                        disabled: !editMode,
                                                        options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: 'Indefinido', label: 'Indefinido' },
                                                            { value: 'Temporal', label: 'Sujeto a modalidad' },
                                                            { value: 'Parcial', label: 'Tiempo Parcial' },
                                                            { value: 'Teletrabajo', label: 'Teletrabajo' },
                                                        ],
                                                        onChange: (e: any) => {
                                                            handleChange(e);
                                                            if (e.target.value === 'Indefinido') {
                                                                setForm({ ...form, fechaFinContrato: '', tipoContrato: e.target.value });
                                                                const fechaFinContratoInput = document.getElementById('fechaFinContratoInput') as HTMLInputElement;
                                                                if (fechaFinContratoInput) {
                                                                    fechaFinContratoInput.disabled = true;
                                                                }
                                                            } else {
                                                                const fechaFinContratoInput = document.getElementById('fechaFinContratoInput') as HTMLInputElement;
                                                                if (fechaFinContratoInput) {
                                                                    fechaFinContratoInput.disabled = false;
                                                                }
                                                                setForm({ ...form, tipoContrato: e.target.value });
                                                            }
                                                        }
                                                    },
                                                    { title: 'Fecha de ingreso a la empresa', name: 'fechaIngresoEmpresa', type: 'date', value: form.fechaIngresoEmpresa, disabled: !editMode },
                                                    { title: 'Fecha de ingreso al área', name: 'fechaIngresoArea', type: 'date', value: form.fechaIngresoArea, disabled: !editMode },
                                                    {
                                                        title: 'Fecha de fin de contrato',
                                                        name: 'fechaFinContrato',
                                                        type: 'date',
                                                        value: form.fechaFinContrato,
                                                        disabled: !editMode || form.tipoContrato === 'Indefinido',
                                                        id: 'fechaFinContratoInput'
                                                    },
                                                    { title: 'Dirección', name: 'direccion', type: 'text', value: form.direccion, disabled: !editMode },
                                                    {
                                                        title: 'Distrito', name: 'distrito', type: 'select', value: form.distrito, disabled: !editMode, options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: 'Distrito 1', label: 'Distrito 1' },
                                                            { value: 'Distrito 2', label: 'Distrito 2' },
                                                            { value: 'Distrito 3', label: 'Distrito 3' }
                                                        ]
                                                    },
                                                    { title: 'Email corporativo (opcional)', name: 'correoTrabajo', type: 'email', value: form.correoTrabajo, disabled: !editMode },
                                                    { title: 'Email personal', name: 'correoPersonal', type: 'email', value: form.correoPersonal, disabled: !editMode },
                                                    {
                                                        title: 'Nacionalidad', name: 'nacionalidad', type: 'select', value: form.nacionalidad, disabled: !editMode, options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: 'Peruano', label: 'Peruano' },
                                                            { value: 'Estado Unidense', label: 'Estado Unidense' },
                                                            { value: 'Canadiense', label: 'Canadiense' }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Género', name: 'genero', type: 'select', value: form.genero, disabled: !editMode, options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: 'Masculino', label: 'Masculino' },
                                                            { value: 'Femenino', label: 'Femenino' }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Estado civil', name: 'estadoCivil', type: 'select', value: form.estadoCivil, disabled: !editMode, options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: 'Soltero', label: 'Soltero' },
                                                            { value: 'Casado', label: 'Casado' },
                                                            { value: 'Divorciado', label: 'Divorciado' },
                                                            { value: 'Conviviente', label: 'Conviviente' },
                                                            { value: 'Viudo/a', label: 'Viudo/a' }
                                                        ]
                                                    },
                                                    { title: 'Teléfono personal', name: 'telefonoPersonal', type: 'phone', value: form.telefonoPersonal, indicative: form.indicativoTel, disabled: !editMode },
                                                    {
                                                        title: 'Teléfono laboral',
                                                        name: 'indicativoTelLaboral',
                                                        type: 'phone',
                                                        value: form.telefonoLaboral,
                                                        indicative: form.indicativoTel,
                                                        disabled: !editMode,
                                                    },
                                                    { title: 'Firma digital (opcional)', name: 'firmaDigital', type: 'file', value: form.firmaDigital, disabled: !editMode },
                                                    {
                                                        title: 'Sede de trabajo', name: 'sedeTrabajo', type: 'select', value: form.sedeTrabajo, disabled: !editMode, options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: 'Sede 1', label: 'Sede 1' },
                                                            { value: 'Sede 2', label: 'Sede 2' }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Tipo de rol', name: 'rollSistemaDigitalizado', type: 'select', value: form.rollSistemaDigitalizado, disabled: !editMode, options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: 'Jefe', label: 'Jefe' },
                                                            { value: 'Asistente', label: 'Asistente' },
                                                            { value: 'Supervisor', label: 'Supervisor' },
                                                            { value: 'Colaborador', label: 'Colaborador' }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Brevete',
                                                        name: 'brevete',
                                                        type: 'custom',
                                                        value: form.brevete,
                                                        disabled: !editMode,
                                                        customComponent: (
                                                            <div className="row">
                                                                {form.brevete?.map((brevete, index) => (
                                                                    <div key={index} className="row mb-3">
                                                                        {/* Tipo de brevete */}
                                                                        <div className="col-md-4">
                                                                            <label className="form-label">Tipo de Brevete</label>
                                                                            <select
                                                                                className="form-select"
                                                                                name={`brevete[${index}].tipo`}
                                                                                value={brevete.tipo || ''}
                                                                                onChange={(event) => {
                                                                                    const updatedBrevete = [...(form.brevete || [])];
                                                                                    updatedBrevete[index].tipo = event.target.value;
                                                                                    setForm({ ...form, brevete: updatedBrevete });
                                                                                }}
                                                                                disabled={!editMode}
                                                                            >
                                                                                <option value="">Seleccione tipo</option>
                                                                                <option value="A-I">A-I: Sedanes, coupé, hatchback, SUV, pickups</option>
                                                                                <option value="A-IIa">A-IIa: Taxis, buses, ambulancias</option>
                                                                                <option value="A-IIb">A-IIb: Microbuses, minibuses</option>
                                                                                <option value="A-IIIa">A-IIIa: Vehículos de más de 6 toneladas</option>
                                                                                <option value="A-IIIb">A-IIIb: Chasis cabinado, remolques</option>
                                                                                <option value="A-IIIc">A-IIIc: Todos los vehículos anteriores</option>
                                                                            </select>
                                                                        </div>

                                                                        {/* Fecha de vencimiento */}
                                                                        <div className="col-md-4">
                                                                            <label className="form-label">Fecha de Vencimiento</label>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control"
                                                                                name={`brevete[${index}].fechaVencimiento`}
                                                                                value={brevete.fechaVencimiento || ''}
                                                                                onChange={(event) => {
                                                                                    const updatedBrevete = [...(form.brevete || [])];
                                                                                    updatedBrevete[index].fechaVencimiento = event.target.value;
                                                                                    setForm({ ...form, brevete: updatedBrevete });
                                                                                }}
                                                                                disabled={!editMode}
                                                                            />
                                                                        </div>

                                                                        {/* Número de brevete */}
                                                                        <div className="col-md-4">
                                                                            <label className="form-label">Número</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name={`brevete[${index}].numero`}
                                                                                value={brevete.numero || ''}
                                                                                onChange={(event) => {
                                                                                    const updatedBrevete = [...(form.brevete || [])];
                                                                                    updatedBrevete[index].numero = event.target.value;
                                                                                    setForm({ ...form, brevete: updatedBrevete });
                                                                                }}
                                                                                placeholder="Número de brevete"
                                                                                disabled={!editMode}
                                                                            />
                                                                        </div>

                                                                        {/* Botón para eliminar brevete */}
                                                                        <div className="col-12 mt-2">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-danger btn-sm"
                                                                                onClick={() => {
                                                                                    const updatedBrevete = (form.brevete || []).filter((_, i) => i !== index);
                                                                                    setForm({ ...form, brevete: updatedBrevete });
                                                                                }}
                                                                                disabled={!editMode}
                                                                            >
                                                                                Eliminar Brevete
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                {/* Botón para agregar nuevo brevete */}
                                                                {editMode && (
                                                                    <div className="col-12 mt-3">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-primary btn-sm"
                                                                            onClick={() => {
                                                                                const newBrevete = { tipo: '', fechaVencimiento: '', numero: '' };
                                                                                setForm({ ...form, brevete: [...(form.brevete || []), newBrevete] });
                                                                            }}
                                                                        >
                                                                            Agregar Brevete
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    },
                                                    {
                                                        title: 'Talla de camiseta',
                                                        name: 'tallaCamiseta',
                                                        type: 'select',
                                                        value: form.tallaCamiseta,
                                                        disabled: !editMode,
                                                        options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: 'XS', label: 'XS' },
                                                            { value: 'S', label: 'S' },
                                                            { value: 'M', label: 'M' },
                                                            { value: 'L', label: 'L' },
                                                            { value: 'XL', label: 'XL' },
                                                            { value: 'XXL', label: 'XXL' },
                                                            { value: 'XXXL', label: 'XXXL' }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Talla de pantalón',
                                                        name: 'tallaPantalon',
                                                        type: 'select',
                                                        value: form.tallaPantalon,
                                                        disabled: !editMode,
                                                        options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: '28', label: '28' },
                                                            { value: '30', label: '30' },
                                                            { value: '32', label: '32' },
                                                            { value: '34', label: '34' },
                                                            { value: '36', label: '36' },
                                                            { value: '38', label: '38' },
                                                            { value: '40', label: '40' },
                                                            { value: '42', label: '42' },
                                                            { value: '44', label: '44' }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Talla de zapatos',
                                                        name: 'tallaZapatos',
                                                        type: 'select',
                                                        value: form.tallaZapatos,
                                                        disabled: !editMode,
                                                        options: [
                                                            { value: '', label: 'Seleccione' },
                                                            { value: '35', label: '35 (22.5 cm)' },
                                                            { value: '36', label: '36 (23 cm)' },
                                                            { value: '37', label: '37 (23.5 cm)' },
                                                            { value: '38', label: '38 (24 cm)' },
                                                            { value: '39', label: '39 (24.5 cm)' },
                                                            { value: '40', label: '40 (25 cm)' },
                                                            { value: '41', label: '41 (26 cm)' },
                                                            { value: '42', label: '42 (26.5 cm)' },
                                                            { value: '43', label: '43 (27.5 cm)' },
                                                            { value: '44', label: '44 (28 cm)' },
                                                            { value: '45', label: '45 (29 cm)' },
                                                            { value: '46', label: '46 (30 cm)' }
                                                        ]
                                                    },
                                                ].filter(field => editMode || !field.disabled).map((field) => (
                                                    <div className="form-group row my-4" key={field.name}>
                                                        <label className="col-form-label col-lg-4 col-sm-12">
                                                            {field.title}
                                                        </label>
                                                        <div className="col-lg-8 col-md-9 col-sm-12">
                                                            {field.type === 'custom' && field.customComponent ? (
                                                                field.customComponent
                                                            ) : field.type === 'select' ? (
                                                                <select
                                                                    name={field.name}
                                                                    className="form-select"
                                                                    value={field.value as string}
                                                                    onChange={field.onChange || handleChange}
                                                                    disabled={field.disabled}
                                                                    id={field.name === 'fechaFinContrato' ? 'fechaFinContratoInput' : undefined}
                                                                >
                                                                    {field.options?.map(option => (
                                                                        <option key={option.value} value={option.value}>
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            ) : field.type === 'phone' ? (
                                                                <div className="row">
                                                                    <div className="col-5">
                                                                        <select
                                                                            className="form-select"
                                                                            name="indicativoTel"
                                                                            value={field.indicative as string}
                                                                            onChange={handleChange}
                                                                        >
                                                                            <option value="">Seleccione</option>
                                                                            <option value="1">Estados Unidos (+1)</option>
                                                                            <option value="51">Perú (+51)</option>
                                                                            <option value="52">México (+52)</option>
                                                                            <option value="44">Reino Unido (+44)</option>
                                                                            <option value="91">India (+91)</option>
                                                                            <option value="81">Japón (+81)</option>
                                                                            <option value="49">Alemania (+49)</option>
                                                                            <option value="33">Francia (+33)</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-7">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            name={field.name}
                                                                            value={field.value as string}
                                                                            onChange={handleChange}
                                                                            placeholder="Teléfono"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ) : field.type === 'file' ? (
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    name={field.name}
                                                                    onChange={(event: any) => {
                                                                        const file = event.target.files[0];
                                                                        setForm({
                                                                            ...form,
                                                                            [field.name]: file ? file.name : '',
                                                                        });
                                                                    }}
                                                                />
                                                            ) : (
                                                                <input
                                                                    type={field.type}
                                                                    className="form-control"
                                                                    name={field.name}
                                                                    value={field.value as string}
                                                                    onChange={handleChange}
                                                                    placeholder={field.title}
                                                                    id={field.name === 'fechaFinContrato' ? 'fechaFinContratoInput' : undefined}
                                                                    disabled={field.disabled}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="d-flex justify-content-end mt-8">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger me-2"
                                                        onClick={() => deleteEmployee(idEmployee)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={() => putEmployee(idEmployee)}
                                                    >
                                                        Guardar cambios
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === 'datosAcademicos' && (
                                <div className="tab-pane fade show active">
                                    <AcademicDataSection />
                                </div>
                            )}
                            {activeTab === 'datosFamiliares' && (
                                <div className="tab-pane fade show active">
                                    <FamilyDataSection />
                                </div>
                            )}
                            {activeTab === 'externalTrainingSection' && (
                                <div className="tab-pane fade show active">
                                    <ExternalTrainingSection />
                                </div>
                            )}
                            {activeTab === 'contactDetailsSection' && (
                                <div className="tab-pane fade show active">
                                    <ContactDetailsSection />
                                </div>
                            )}
                            {activeTab === 'languagesSection' && (
                                <div className="tab-pane fade show active">
                                    <LanguagesSection />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    // };
}
export default ModalTrabajador