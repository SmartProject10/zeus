import { useState } from 'react'
import Swal from 'sweetalert2'
import { KTCardBody } from '../../../../../../../_zeus/helpers'
import { appStateService } from '../../../../../../services/appState.service'
import { EmployeeRequest } from '../../core/_models'
import { registerEmployee } from '../../core/_requests'
import AcademicDataSection from '../table/register/academic'
import FamilyDataSection from '../table/register/family'
import ExternalTrainingSection from '../table/register/external'
import ContactDetailsSection from '../table/register/contact'
import LanguagesSection from '../table/register/languages'

export interface EmployeeForm {
    area: string
    cargo: string
    codigoTrabajador?: string
    firmaDigital: string
    reconocimientoFacial: string
    nacionalidad: string
    estadoCivil: string
    genero: string
    dni: string
    dniPdf?: string
    fechaNacimiento: string
    nombres: string
    apellidoPaterno: string
    apellidoMaterno: string
    distrito: string
    direccion: string
    correoTrabajo: string
    correoPersonal: string
    indicativoTel: number
    indicativoTelLaboral: number
    telefonoPersonal: number
    telefonoLaboral: number
    fechaIngresoArea: string
    fechaFinContrato?: string
    fechaIngresoEmpresa: string
    rollSistemaDigitalizado: string
    status: string
    sedeTrabajo: string
    partidaNacimiento?: string
    brevete?: Array<{ tipo: string; fechaVencimiento: string; numero: string; documento?: string }>
    tipoContrato?: string
    tallaCamiseta?: string
    tallaPantalon?: string
    tallaZapatos?: string
}

const CalendarButton = ({ onAddOrUpdateEmployee }: { onAddOrUpdateEmployee: (employee: EmployeeRequest) => void }) => {
    const [activeTab, setActiveTab] = useState<string>('trabajador')
    const [idEmployee, setIdEmployee] = useState<string>('')

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }

    const [form, setForm] = useState<EmployeeForm>({
        area: '',
        cargo: '',
        codigoTrabajador: '',
        firmaDigital: '',
        reconocimientoFacial: '',
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
        indicativoTel: 0,
        indicativoTelLaboral: 0,
        telefonoPersonal: 0,
        telefonoLaboral: 0,
        fechaIngresoArea: '',
        fechaIngresoEmpresa: '',
        fechaFinContrato: '',
        rollSistemaDigitalizado: '',
        status: '',
        sedeTrabajo: '',
        dniPdf: '',
        partidaNacimiento: '',
        brevete: [],
        tipoContrato: '',
        tallaCamiseta: '',
        tallaPantalon: '',
        tallaZapatos: '',
    })

    const handleChange = (event: any) => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        if (
            !form.area ||
            !form.cargo ||
            !form.firmaDigital ||
            !form.nacionalidad ||
            !form.estadoCivil ||
            !form.genero ||
            !form.dni ||
            !form.fechaNacimiento ||
            !form.nombres ||
            !form.apellidoPaterno ||
            !form.apellidoMaterno ||
            !form.distrito ||
            !form.direccion ||
            !form.correoTrabajo ||
            !form.correoPersonal ||
            !form.telefonoPersonal ||
            !form.fechaIngresoArea ||
            !form.fechaIngresoEmpresa ||
            !form.fechaFinContrato ||
            !form.rollSistemaDigitalizado ||
            !form.status ||
            !form.sedeTrabajo ||
            !form.telefonoLaboral ||
            !form.indicativoTel ||
            !form.indicativoTelLaboral ||
            !form.codigoTrabajador ||
            !form.tipoContrato ||
            !form.tallaCamiseta ||
            !form.tallaPantalon ||
            !form.tallaZapatos
        ) {
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
                title: 'Porfavor rellene todos los campos',
            })
            return
        }

        const newEmployee: EmployeeRequest = {
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
            telefonoPersonal: form.indicativoTel + ' ' + form.telefonoPersonal,
            reconocimientoFacial: '',
            firmaDigital: form.firmaDigital,
            area: form.area,
            cargo: form.cargo,
            rollSistemaDigitalizado: form.rollSistemaDigitalizado,
            fechaIngresoArea: form.fechaIngresoArea,
            fechaFinContrato: form.fechaFinContrato,
            fechaIngresoEmpresa: form.fechaIngresoEmpresa,
            status: form.status,
            sedeTrabajo: form.sedeTrabajo,
            codigoTrabajador: form.codigoTrabajador,
            tipoContrato: form.tipoContrato,
            tallaCamiseta: form.tallaCamiseta,
            tallaPantalon: form.tallaPantalon,
            tallaZapatos: form.tallaZapatos,
        }

        try {
            onAddOrUpdateEmployee(newEmployee)
            const resp = await registerEmployee(newEmployee)
            if (resp.status == 201) {
                appStateService.setEmployeeSubject(resp.data)
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
                    title: 'Trabajador creado correctamente',
                })
                const closeButton = document.getElementById('closeButton')
                if (closeButton) {
                    closeButton.click()
                }
            } else {
                console.log(resp)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error)
        }
    }

    function sortTable(columnIndex: number, direction: 'asc' | 'desc') {
        const rows = Array.from(document.querySelectorAll<HTMLTableRowElement>('#historyTable tbody tr'))
        const sortedRows = rows.sort((a, b) => {
            const aValue = a.children[columnIndex]?.textContent || ''
            const bValue = b.children[columnIndex]?.textContent || ''
            return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        })
        const tbody = document.querySelector('#historyTable tbody')
        if (tbody) {
            sortedRows.forEach((row) => tbody.appendChild(row))
        }
    }

    return (
        <div>
            <KTCardBody>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-info btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#historyModal">
                        Ver Historial
                    </button>

                    <div
                        className="modal fade"
                        id="historyModal"
                        tabIndex={-1}
                        aria-labelledby="historyModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="historyModalLabel">
                                        Historial de cambios
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buscar en el historial..."
                                            onChange={(e) => {
                                                const searchValue = e.target.value.toLowerCase()
                                                const rows = document.querySelectorAll<HTMLTableRowElement>('#historyTable tbody tr')
                                                rows.forEach((row) => {
                                                    const cells = Array.from(row.children)
                                                    const matches = cells.some((cell) =>
                                                        cell.textContent?.toLowerCase().includes(searchValue),
                                                    )
                                                        ; (row as HTMLElement).style.display = matches ? '' : 'none'
                                                })
                                            }}
                                        />
                                    </div>
                                    <table className="table table-striped" id="historyTable">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div>Fecha</div>
                                                    <div className="d-flex justify-content-between align-items-center mt-1">
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(0, 'asc')}>
                                                            <i className="bi bi-sort-up"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(0, 'desc')}>
                                                            <i className="bi bi-sort-down"></i>
                                                        </button>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div>Hora</div>
                                                    <div className="d-flex justify-content-between align-items-center mt-1">
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(1, 'asc')}>
                                                            <i className="bi bi-sort-up"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(1, 'desc')}>
                                                            <i className="bi bi-sort-down"></i>
                                                        </button>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div>Trabajador</div>
                                                    <div className="d-flex justify-content-between align-items-center mt-1">
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(2, 'asc')}>
                                                            <i className="bi bi-sort-up"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(2, 'desc')}>
                                                            <i className="bi bi-sort-down"></i>
                                                        </button>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div>Área</div>
                                                    <div className="d-flex justify-content-between align-items-center mt-1">
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(3, 'asc')}>
                                                            <i className="bi bi-sort-up"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(3, 'desc')}>
                                                            <i className="bi bi-sort-down"></i>
                                                        </button>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div>Cargo</div>
                                                    <div className="d-flex justify-content-between align-items-center mt-1">
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(4, 'asc')}>
                                                            <i className="bi bi-sort-up"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(4, 'desc')}>
                                                            <i className="bi bi-sort-down"></i>
                                                        </button>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div>Acciones</div>
                                                    <div className="d-flex justify-content-between align-items-center mt-1">
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(5, 'asc')}>
                                                            <i className="bi bi-sort-up"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-link p-0" onClick={() => sortTable(5, 'desc')}>
                                                            <i className="bi bi-sort-down"></i>
                                                        </button>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>2023-10-01</td>
                                                <td>08:00</td>
                                                <td>Juan Pérez</td>
                                                <td>Recursos Humanos</td>
                                                <td>Gerente</td>
                                                <td>Creación de cuenta</td>
                                            </tr>
                                            <tr>
                                                <td>2023-10-02</td>
                                                <td>09:00</td>
                                                <td>Ana Gómez</td>
                                                <td>Finanzas</td>
                                                <td>Analista</td>
                                                <td>Actualización de datos</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <script type="text/javascript">
                        {`
                        function filterTable(columnIndex, value) {
                            const rows = document.querySelectorAll("#historyTable tbody tr");
                            rows.forEach((row) => {
                                const cell = row.children[columnIndex];
                                if (cell) {
                                    const matches = cell.textContent?.toLowerCase().includes(value.toLowerCase());
                                    row.style.display = matches ? "" : "none";
                                }
                            });
                        }
                    `}
                    </script>
                    <button
                        className={`btn btn-sm ${form.reconocimientoFacial ? 'btn-success' : 'btn-danger'}`}
                        type="button"
                        onClick={() => {
                            setForm({ ...form, reconocimientoFacial: form.reconocimientoFacial ? '' : 'enabled' });
                            if (form.reconocimientoFacial === 'enabled') {
                                const modal = document.getElementById('facialRecognitionWarningModal');
                                if (modal) {
                                    (modal as any).classList.add('show');
                                    modal.setAttribute('aria-hidden', 'false');
                                    modal.style.display = 'block';
                                }
                            }
                        }}
                    >
                        {form.reconocimientoFacial ? 'Desactivar Reconocimiento Facial' : 'Activar Reconocimiento Facial'}
                    </button>

                    {/* Modal for warning after multiple clicks */}
                    <div
                        className="modal fade"
                        id="facialRecognitionWarningModal"
                        tabIndex={-1}
                        aria-labelledby="facialRecognitionWarningModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="facialRecognitionWarningModalLabel">
                                        Advertencia
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => {
                                            const modal = document.getElementById('facialRecognitionWarningModal');
                                            if (modal) {
                                                (modal as any).classList.remove('show');
                                                modal.setAttribute('aria-hidden', 'true');
                                                modal.style.display = 'none';
                                            }
                                        }}
                                    ></button>
                                </div>
                                <div className="modal-body text-center">
                                    <p>Por favor, asegúrese de que su rostro esté centrado y bien iluminado.</p>
                                    <div
                                        className="camera-container rounded-circle overflow-hidden border border-primary mx-auto"
                                        style={{ width: '200px', height: '200px' }}
                                    >
                                        <video
                                            id="cameraStream"
                                            autoPlay
                                            playsInline
                                            className="w-100 h-100"
                                        ></video>
                                    </div>
                                    <div
                                        id="capturedImageContainer"
                                        className="mt-3"
                                        style={{ display: 'none' }}
                                    >
                                        <img
                                            id="capturedImage"
                                            alt="Captured"
                                            className="rounded-circle border border-success mx-auto d-block"
                                            style={{ width: '200px', height: '200px' }}
                                        />
                                        <div className="d-flex justify-content-center gap-2 mt-2">
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => {
                                                    const imageContainer = document.getElementById('capturedImageContainer');
                                                    const video = document.getElementById('cameraStream') as HTMLVideoElement;
                                                    if (imageContainer && video) {
                                                        imageContainer.style.display = 'none';
                                                        video.style.display = 'block';
                                                    }
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => {
                                                    const modal = document.getElementById('facialRecognitionWarningModal');
                                                    if (modal) {
                                                        (modal as any).classList.remove('show');
                                                        modal.setAttribute('aria-hidden', 'true');
                                                        modal.style.display = 'none';
                                                    }
                                                }}
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            const video = document.getElementById('cameraStream') as HTMLVideoElement;
                                            const canvas = document.createElement('canvas');
                                            const context = canvas.getContext('2d');
                                            if (video && context) {
                                                canvas.width = video.videoWidth;
                                                canvas.height = video.videoHeight;
                                                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                                                const imageData = canvas.toDataURL('image/png');
                                                const capturedImage = document.getElementById('capturedImage') as HTMLImageElement;
                                                const imageContainer = document.getElementById('capturedImageContainer');
                                                if (capturedImage && imageContainer) {
                                                    capturedImage.src = imageData;
                                                    imageContainer.style.display = 'block';
                                                    video.style.display = 'none';
                                                }
                                            }
                                        }}
                                    >
                                        Capturar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className={`btn btn-sm ${form.firmaDigital ? 'btn-success' : 'btn-danger'}`}
                        type="button"
                        onClick={() => setForm({ ...form, firmaDigital: form.firmaDigital ? '' : 'enabled' })}
                    >
                        {form.firmaDigital ? 'Desactivar Token' : 'Activar Token'}
                    </button>
                    <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i className="bi bi-plus-circle-fill"></i>
                        Agregar Trabajador
                    </button>
                </div>

                <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                    Nuevo Trabajador
                                </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
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
                                            className={`nav-link ${activeTab === 'datosAcademicos' ? 'active' : ''}`}
                                            onClick={() => handleTabChange('datosAcademicos')}
                                        >
                                            Datos Académicos
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
                                <div className="tab-content">
                                    {activeTab === 'trabajador' && (
                                        <div className="tab-pane fade show active">
                                            {form && (
                                                <div className="card">
                                                    <div className="card-body">
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6 d-flex align-items-center">
                                                                    <label htmlFor="dniPdfInput" className="required col-form-label me-2">
                                                                        DNI / PDF
                                                                    </label>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-link p-0 position-relative"
                                                                        title="Subir PDF"
                                                                        onClick={() => {
                                                                            const fileInput = document.getElementById('dniPdfInput') as HTMLInputElement
                                                                            if (fileInput) {
                                                                                fileInput.click()
                                                                            }
                                                                        }}
                                                                        style={{
                                                                            animation: 'blink-animation 1s infinite',
                                                                        }}
                                                                    >
                                                                        <i
                                                                            className="bi bi-upload fs-3 text-primary"
                                                                            style={{
                                                                                fontSize: '2rem',
                                                                                textShadow: '0 0 5px rgba(0, 123, 255, 0.8)',
                                                                            }}
                                                                        ></i>
                                                                    </button>
                                                                    <input
                                                                        type="file"
                                                                        id="dniPdfInput"
                                                                        name="dniPdf"
                                                                        accept=".pdf"
                                                                        style={{ display: 'none' }}
                                                                        onChange={(event: any) => {
                                                                            const file = event.target.files[0]
                                                                            if (file) {
                                                                                setForm({
                                                                                    ...form,
                                                                                    dniPdf: file.name,
                                                                                })
                                                                            }
                                                                        }}
                                                                        required
                                                                    />
                                                                    <style>
                                                                        {`
                                                                            @keyframes blink-animation {
                                                                                0% { opacity: 1; }
                                                                                50% { opacity: 0.5; }
                                                                                100% { opacity: 1; }
                                                                            }
                                                                        `}
                                                                    </style>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="text"
                                                                        id="inputtext"
                                                                        name="dni"
                                                                        value={form.dni}
                                                                        onChange={handleChange}
                                                                        placeholder="Número de Identificacion"
                                                                        className="form-control input-sm"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="inputtext" className="required col-form-label">
                                                                        Nombres
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="text"
                                                                        id="inputtext"
                                                                        name="nombres"
                                                                        value={form.nombres}
                                                                        onChange={handleChange}
                                                                        placeholder="Nombres"
                                                                        className="form-control input-sm"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="inputtext" className="required col-form-label">
                                                                        Apellido Paterno
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="text"
                                                                        id="inputtext"
                                                                        name="apellidoPaterno"
                                                                        value={form.apellidoPaterno}
                                                                        onChange={handleChange}
                                                                        placeholder="Apellido"
                                                                        className="form-control input-sm"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="inputtext" className="required col-form-label">
                                                                        Apellido Materno
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="text"
                                                                        id="inputtext"
                                                                        name="apellidoMaterno"
                                                                        value={form.apellidoMaterno}
                                                                        onChange={handleChange}
                                                                        placeholder="Apellido"
                                                                        className="form-control input-sm"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="inputtext" className="required col-form-label">
                                                                        Fecha de Nacimiento
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="date"
                                                                        id="inputtext"
                                                                        name="fechaNacimiento"
                                                                        value={form.fechaNacimiento}
                                                                        onChange={handleChange}
                                                                        className="form-control input-sm"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="areaSelect" className="required col-form-label">
                                                                        Área
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <select
                                                                        id="areaSelect"
                                                                        name="area"
                                                                        value={form.area}
                                                                        onChange={handleChange}
                                                                        className="form-select"
                                                                        required
                                                                    >
                                                                        <option value="">Seleccione</option>
                                                                        <option value="Recursos Humanos">Recursos Humanos</option>
                                                                        <option value="Finanzas">Finanzas</option>
                                                                        <option value="Tecnología">Tecnología</option>
                                                                        <option value="Marketing">Marketing</option>
                                                                        <option value="Operaciones">Operaciones</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="selecttext" className="required col-form-label">
                                                                        Cargo
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <select
                                                                        className="form-select select-sm"
                                                                        id="selecttext"
                                                                        name="cargo"
                                                                        value={form.cargo}
                                                                        onChange={handleChange}
                                                                        aria-label="Default select example"
                                                                        disabled={!form.area}
                                                                        required
                                                                    >
                                                                        <option value="">Seleccione</option>
                                                                        <option value="Gerente">Gerente</option>
                                                                        <option value="Jefe">Jefe</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="codigoTrabajadorInput" className="col-form-label">
                                                                        Código de trabajador
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="text"
                                                                        id="codigoTrabajadorInput"
                                                                        name="codigoTrabajador"
                                                                        value={form.codigoTrabajador}
                                                                        onChange={handleChange}
                                                                        placeholder="Código de trabajador"
                                                                        className="form-control input-sm"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="tipoContratoSelect" className="required form-label">
                                                                        Tipo de contrato
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <select
                                                                        className="form-select"
                                                                        id="tipoContratoSelect"
                                                                        name="tipoContrato"
                                                                        value={form.tipoContrato || ''}
                                                                        onChange={(e) => {
                                                                            handleChange(e)
                                                                            if (e.target.value === 'Indefinido') {
                                                                                setForm({ ...form, fechaFinContrato: '' })
                                                                                const fechaFinContratoInput = document.getElementById('fechaFinContratoInput') as HTMLInputElement
                                                                                if (fechaFinContratoInput) {
                                                                                    fechaFinContratoInput.disabled = true
                                                                                }
                                                                            } else {
                                                                                const fechaFinContratoInput = document.getElementById('fechaFinContratoInput') as HTMLInputElement
                                                                                if (fechaFinContratoInput) {
                                                                                    fechaFinContratoInput.disabled = false
                                                                                }
                                                                            }
                                                                        }}
                                                                        aria-label="Tipo de contrato"
                                                                        required
                                                                    >
                                                                        <option value="">Seleccione</option>
                                                                        <option value="Indefinido">Indefinido</option>
                                                                        <option value="Temporal">Sujeto a modalidad</option>
                                                                        <option value="Parcial">Tiempo Parcial</option>
                                                                        <option value="Teletrabajo">Teletrabajo</option>
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
                                                                    <input
                                                                        type="date"
                                                                        id="inputtext"
                                                                        name="fechaIngresoEmpresa"
                                                                        value={form.fechaIngresoEmpresa}
                                                                        onChange={handleChange}
                                                                        className="form-control input-sm"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="inputtext" className="required col-form-label">
                                                                        Fecha de ingreso al área
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="date"
                                                                        id="inputtext"
                                                                        name="fechaIngresoArea"
                                                                        value={form.fechaIngresoArea}
                                                                        onChange={handleChange}
                                                                        className="form-control input-sm"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="fechaFinContratoInput" className="required col-form-label">
                                                                        Fecha de fin de contrato
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="date"
                                                                        id="fechaFinContratoInput"
                                                                        name="fechaFinContrato"
                                                                        value={form.fechaFinContrato || ''}
                                                                        onChange={handleChange}
                                                                        className="form-control input-sm"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="direccionInput" className="required form-label">
                                                                        Dirección
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="direccionInput"
                                                                        name="direccion"
                                                                        value={form.direccion}
                                                                        onChange={handleChange}
                                                                        placeholder="Dirección"
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="distritoSelect" className="required form-label">
                                                                        Distrito
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <select
                                                                        className="form-select"
                                                                        id="distritoSelect"
                                                                        name="distrito"
                                                                        value={form.distrito}
                                                                        onChange={handleChange}
                                                                        aria-label="Distritos"
                                                                        required
                                                                    >
                                                                        <option>Seleccione</option>
                                                                        <option>Distrito 1</option>
                                                                        <option>Distrito 2</option>
                                                                        <option>Distrito 3</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="cEmailInput" className="form-label">
                                                                        Email corporativo (opcional)
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        id="cEmailInput"
                                                                        name="correoTrabajo"
                                                                        value={form.correoTrabajo}
                                                                        onChange={handleChange}
                                                                        placeholder="Email"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="pEmailInput" className="required form-label">
                                                                        Email personal
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        id="pEmailInput"
                                                                        name="correoPersonal"
                                                                        value={form.correoPersonal}
                                                                        onChange={handleChange}
                                                                        placeholder="Email"
                                                                        required
                                                                    />
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
                                                                        name="nacionalidad"
                                                                        value={form.nacionalidad}
                                                                        onChange={handleChange}
                                                                        aria-label="Select example"
                                                                        required
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
                                                                        name="genero"
                                                                        value={form.genero}
                                                                        onChange={handleChange}
                                                                        required
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
                                                                    <select
                                                                        className="form-select"
                                                                        id="estadoCivilSelect"
                                                                        name="estadoCivil"
                                                                        value={form.estadoCivil}
                                                                        onChange={handleChange}
                                                                        aria-label="estado civil select"
                                                                        required
                                                                    >
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
                                                                    <label htmlFor="telefonoPersonalInput" className="form-label">
                                                                        Teléfono personal
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="row">
                                                                        <div className="col-5">
                                                                            <select
                                                                                className="form-select"
                                                                                id="paisPersonalSelect"
                                                                                name="indicativoTel"
                                                                                value={form.indicativoTel}
                                                                                onChange={handleChange}
                                                                            >
                                                                                <option value="">Seleccione</option>
                                                                                <option value="54">Argentina (+54)</option>
                                                                                <option value="591">Bolivia (+591)</option>
                                                                                <option value="55">Brasil (+55)</option>
                                                                                <option value="56">Chile (+56)</option>
                                                                                <option value="57">Colombia (+57)</option>
                                                                                <option value="506">Costa Rica (+506)</option>
                                                                                <option value="593">Ecuador (+593)</option>
                                                                                <option value="503">El Salvador (+503)</option>
                                                                                <option value="502">Guatemala (+502)</option>
                                                                                <option value="504">Honduras (+504)</option>
                                                                                <option value="52">México (+52)</option>
                                                                                <option value="505">Nicaragua (+505)</option>
                                                                                <option value="507">Panamá (+507)</option>
                                                                                <option value="595">Paraguay (+595)</option>
                                                                                <option value="51">Perú (+51)</option>
                                                                                <option value="1">Puerto Rico (+1)</option>
                                                                                <option value="598">Uruguay (+598)</option>
                                                                                <option value="58">Venezuela (+58)</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-7">
                                                                            <input
                                                                                type="number"
                                                                                className="form-control"
                                                                                id="telefonoPersonalInput"
                                                                                name="telefonoPersonal"
                                                                                value={form.telefonoPersonal}
                                                                                onChange={handleChange}
                                                                                placeholder="Teléfono personal"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="telefonoLaboralInput" className="form-label">
                                                                        Teléfono laboral
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="row">
                                                                        <div className="col-5">
                                                                            <select
                                                                                className="form-select"
                                                                                id="paisLaboralSelect"
                                                                                name="indicativoTelLaboral"
                                                                                value={form.indicativoTelLaboral || ''}
                                                                                onChange={handleChange}
                                                                            >
                                                                                <option value="">Seleccione</option>
                                                                                <option value="54">Argentina (+54)</option>
                                                                                <option value="591">Bolivia (+591)</option>
                                                                                <option value="55">Brasil (+55)</option>
                                                                                <option value="56">Chile (+56)</option>
                                                                                <option value="57">Colombia (+57)</option>
                                                                                <option value="506">Costa Rica (+506)</option>
                                                                                <option value="593">Ecuador (+593)</option>
                                                                                <option value="503">El Salvador (+503)</option>
                                                                                <option value="502">Guatemala (+502)</option>
                                                                                <option value="504">Honduras (+504)</option>
                                                                                <option value="52">México (+52)</option>
                                                                                <option value="505">Nicaragua (+505)</option>
                                                                                <option value="507">Panamá (+507)</option>
                                                                                <option value="595">Paraguay (+595)</option>
                                                                                <option value="51">Perú (+51)</option>
                                                                                <option value="1">Puerto Rico (+1)</option>
                                                                                <option value="598">Uruguay (+598)</option>
                                                                                <option value="58">Venezuela (+58)</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-7">
                                                                            <input
                                                                                type="number"
                                                                                className="form-control"
                                                                                id="telefonoLaboralInput"
                                                                                name="telefonoLaboral"
                                                                                value={form.telefonoLaboral || ''}
                                                                                onChange={handleChange}
                                                                                placeholder="Teléfono laboral"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {form.reconocimientoFacial && (
                                                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                    <div className="col-6">
                                                                        <label htmlFor="recFacialButton" className="form-label">
                                                                            Reconocimiento facial
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-primary w-100"
                                                                            id="recFacialButton"
                                                                            onClick={() => {
                                                                                const modal = document.getElementById('facialRecognitionModal')
                                                                                if (modal) {
                                                                                    ; (modal as any).classList.add('show')
                                                                                    modal.setAttribute('aria-hidden', 'false')
                                                                                    modal.style.display = 'block'
                                                                                }
                                                                            }}
                                                                        >
                                                                            Activar cámara
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div
                                                                className="modal fade"
                                                                id="facialRecognitionModal"
                                                                tabIndex={-1}
                                                                aria-labelledby="facialRecognitionModalLabel"
                                                                aria-hidden="true"
                                                            >
                                                                <div className="modal-dialog modal-dialog-centered">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="facialRecognitionModalLabel">
                                                                                Captura de reconocimiento facial
                                                                            </h5>
                                                                            <button
                                                                                type="button"
                                                                                className="btn-close"
                                                                                data-bs-dismiss="modal"
                                                                                aria-label="Close"
                                                                                onClick={() => {
                                                                                    const modal = document.getElementById('facialRecognitionModal')
                                                                                    if (modal) {
                                                                                        ; (modal as any).classList.remove('show')
                                                                                        modal.setAttribute('aria-hidden', 'true')
                                                                                        modal.style.display = 'none'
                                                                                    }
                                                                                }}
                                                                            ></button>
                                                                        </div>
                                                                        <div className="modal-body text-center">
                                                                            <p>Por favor, asegúrese de que su rostro esté centrado y bien iluminado.</p>
                                                                            <div
                                                                                className="camera-container rounded-circle overflow-hidden border border-primary mx-auto"
                                                                                style={{ width: '200px', height: '200px' }}
                                                                            >
                                                                                <video
                                                                                    id="cameraStream"
                                                                                    autoPlay
                                                                                    playsInline
                                                                                    className="w-100 h-100"
                                                                                ></video>
                                                                            </div>
                                                                            <div
                                                                                id="capturedImageContainer"
                                                                                className="mt-3"
                                                                                style={{ display: 'none' }}
                                                                            >
                                                                                <img
                                                                                    id="capturedImage"
                                                                                    alt="Captured"
                                                                                    className="rounded-circle border border-success mx-auto d-block"
                                                                                    style={{ width: '200px', height: '200px' }}
                                                                                />
                                                                                <div className="d-flex justify-content-center gap-2 mt-2">
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-danger btn-sm"
                                                                                        onClick={() => {
                                                                                            const imageContainer = document.getElementById('capturedImageContainer')
                                                                                            const video = document.getElementById('cameraStream') as HTMLVideoElement
                                                                                            if (imageContainer && video) {
                                                                                                imageContainer.style.display = 'none'
                                                                                                video.style.display = 'block'
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        Eliminar
                                                                                    </button>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-secondary btn-sm"
                                                                                        onClick={() => {
                                                                                            const modal = document.getElementById('facialRecognitionModal')
                                                                                            if (modal) {
                                                                                                ; (modal as any).classList.remove('show')
                                                                                                modal.setAttribute('aria-hidden', 'true')
                                                                                                modal.style.display = 'none'
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        Guardar
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-primary"
                                                                                onClick={() => {
                                                                                    const video = document.getElementById('cameraStream') as HTMLVideoElement
                                                                                    const canvas = document.createElement('canvas')
                                                                                    const context = canvas.getContext('2d')
                                                                                    if (video && context) {
                                                                                        canvas.width = video.videoWidth
                                                                                        canvas.height = video.videoHeight
                                                                                        context.drawImage(video, 0, 0, canvas.width, canvas.height)
                                                                                        const imageData = canvas.toDataURL('image/png')
                                                                                        const capturedImage = document.getElementById('capturedImage') as HTMLImageElement
                                                                                        const imageContainer = document.getElementById('capturedImageContainer')
                                                                                        if (capturedImage && imageContainer) {
                                                                                            capturedImage.src = imageData
                                                                                            imageContainer.style.display = 'block'
                                                                                            video.style.display = 'none'
                                                                                        }
                                                                                    }
                                                                                }}
                                                                            >
                                                                                Capturar
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="firmaDigitalInput" className="form-label">
                                                                        Firma digital (opcional)
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        type="file"
                                                                        className="form-control"
                                                                        id="firmaDigitalInput"
                                                                        name="firmaDigital"
                                                                        onChange={(event: any) => {
                                                                            const file = event.target.files[0]
                                                                            setForm({
                                                                                ...form,
                                                                                firmaDigital: file ? file.name : '',
                                                                            })
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                <div className="col-6">
                                                                    <label htmlFor="sedeSelect" className="required form-label">
                                                                        Sede de trabajo
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <select
                                                                        className="form-select"
                                                                        id="sedeSelect"
                                                                        name="sedeTrabajo"
                                                                        value={form.sedeTrabajo}
                                                                        onChange={handleChange}
                                                                        aria-label="sede select"
                                                                        required
                                                                    >
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
                                                                    <select
                                                                        className="required form-select"
                                                                        id="rolSelect"
                                                                        name="rollSistemaDigitalizado"
                                                                        value={form.rollSistemaDigitalizado}
                                                                        onChange={handleChange}
                                                                        aria-label="rol select"
                                                                        disabled={!form.area}
                                                                        required
                                                                    >
                                                                        <option>Seleccione</option>
                                                                        <option>Jefe</option>
                                                                        <option>Asistente</option>
                                                                        <option>Supervisor</option>
                                                                        <option>Colaborador</option>
                                                                    </select>
                                                                </div>
                                                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                    <div className="col-6">
                                                                        <label htmlFor="breveteInput" className="required form-label">
                                                                            Brevete
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        {form.brevete?.map((brevete, index) => (
                                                                            <div key={index} className="mb-3">
                                                                                <div className="row">
                                                                                    <div className="col-4">
                                                                                        <select
                                                                                            className="form-select"
                                                                                            name={`brevete[${index}].tipo`}
                                                                                            value={brevete.tipo}
                                                                                            onChange={(e) => {
                                                                                                const updatedBrevete = [...(form.brevete || [])]
                                                                                                updatedBrevete[index].tipo = e.target.value
                                                                                                setForm({ ...form, brevete: updatedBrevete })
                                                                                            }}
                                                                                            required
                                                                                        >
                                                                                            <option value="">Seleccione tipo</option>
                                                                                            <option value="A-I">
                                                                                                A-I: Sedanes, coupé, hatchback, SUV, pickups
                                                                                            </option>
                                                                                            <option value="A-IIa">
                                                                                                A-IIa: Taxis, buses, ambulancias, transporte interprovincial
                                                                                            </option>
                                                                                            <option value="A-IIb">A-IIb: Microbuses, minibuses</option>
                                                                                            <option value="A-IIIa">
                                                                                                A-IIIa: Vehículos de más de 6 toneladas, ómnibus urbanos/interurbanos
                                                                                            </option>
                                                                                            <option value="A-IIIb">A-IIIb: Chasis cabinado, remolques, grúas, volquetes</option>
                                                                                            <option value="A-IIIc">
                                                                                                A-IIIc: Todos los vehículos de categorías anteriores
                                                                                            </option>
                                                                                            <option value="B-I">
                                                                                                B-I: Triciclos no motorizados para transporte público especial
                                                                                            </option>
                                                                                            <option value="B-IIa">B-IIa: Bicimotos para pasajeros o mercancías</option>
                                                                                            <option value="B-IIb">B-IIb: Motocicletas y motocicletas con sidecar</option>
                                                                                            <option value="B-IIc">
                                                                                                B-IIc: Mototaxis y trimotos para transporte de pasajeros
                                                                                            </option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="col-4">
                                                                                        <div className="position-relative">
                                                                                            <input
                                                                                                type="date"
                                                                                                className="form-control"
                                                                                                name={`brevete[${index}].fechaVencimiento`}
                                                                                                value={brevete.fechaVencimiento}
                                                                                                onChange={(e) => {
                                                                                                    const updatedBrevete = [...(form.brevete || [])]
                                                                                                    updatedBrevete[index].fechaVencimiento = e.target.value
                                                                                                    setForm({ ...form, brevete: updatedBrevete })
                                                                                                }}
                                                                                                required
                                                                                            />
                                                                                            <div className="text-muted small mt-1 text-danger">
                                                                                                <i className="bi bi-info-circle-fill me-1"></i>
                                                                                                Fecha de vencimiento
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-4">
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            name={`brevete[${index}].numero`}
                                                                                            value={brevete.numero}
                                                                                            onChange={(e) => {
                                                                                                const updatedBrevete = [...(form.brevete || [])]
                                                                                                updatedBrevete[index].numero = e.target.value
                                                                                                setForm({ ...form, brevete: updatedBrevete })
                                                                                            }}
                                                                                            placeholder="Número"
                                                                                            required
                                                                                        />
                                                                                    </div>
                                                                                    <div className="mt-2">
                                                                                        <div className="d-flex align-items-center">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-outline-primary btn-sm"
                                                                                                onClick={() => {
                                                                                                    const fileInput = document.getElementById(`breveteDoc${index}`)
                                                                                                    if (fileInput) {
                                                                                                        fileInput.click()
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                <i className="bi bi-upload me-1"></i>
                                                                                                Subir documento
                                                                                            </button>
                                                                                            {brevete.documento && (
                                                                                                <span className="ms-2 text-success">
                                                                                                    <i className="bi bi-check-circle-fill me-1"></i>
                                                                                                    {typeof brevete.documento === 'string'
                                                                                                        ? brevete.documento.substring(0, 15) + '...'
                                                                                                        : 'Documento subido'}
                                                                                                </span>
                                                                                            )}
                                                                                        </div>
                                                                                        <input
                                                                                            type="file"
                                                                                            id={`breveteDoc${index}`}
                                                                                            className="d-none"
                                                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                                                            onChange={(e) => {
                                                                                                const file = e.target.files?.[0]
                                                                                                if (file) {
                                                                                                    const updatedBrevete = [...(form.brevete || [])]
                                                                                                    updatedBrevete[index] = {
                                                                                                        ...updatedBrevete[index],
                                                                                                        documento: file.name,
                                                                                                    }
                                                                                                    setForm({ ...form, brevete: updatedBrevete })
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-danger btn-sm mt-2"
                                                                                    onClick={() => {
                                                                                        const updatedBrevete = (form.brevete ?? []).filter((_, i) => i !== index)
                                                                                        setForm({ ...form, brevete: updatedBrevete })
                                                                                    }}
                                                                                >
                                                                                    Eliminar
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-primary btn-sm"
                                                                            onClick={() => {
                                                                                const newBrevete = { tipo: '', fechaVencimiento: '', numero: '' }
                                                                                setForm({ ...form, brevete: [...(form.brevete || []), newBrevete] })
                                                                            }}
                                                                        >
                                                                            Agregar Brevete
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                    <div className="col-6">
                                                                        <label htmlFor="tallaCamisetaSelect" className="form-label">
                                                                            Talla de camiseta/polo
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <select
                                                                            className="form-select"
                                                                            id="tallaCamisetaSelect"
                                                                            name="tallaCamiseta"
                                                                            value={form.tallaCamiseta || ''}
                                                                            onChange={handleChange}
                                                                            aria-label="Talla camiseta/polo select"
                                                                        >
                                                                            <option value="">Seleccione</option>
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
                                                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                    <div className="col-6">
                                                                        <label htmlFor="tallaPantalonSelect" className="form-label">
                                                                            Talla de pantalón
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <select
                                                                            className="form-select"
                                                                            id="tallaPantalonSelect"
                                                                            name="tallaPantalon"
                                                                            value={form.tallaPantalon || ''}
                                                                            onChange={handleChange}
                                                                            aria-label="Talla pantalón select"
                                                                        >
                                                                            <option value="">Seleccione</option>
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
                                                                <div className="row g-3 align-items-start justify-content-evenly mt-2">
                                                                    <div className="col-6">
                                                                        <label htmlFor="tallaZapatosSelect" className="form-label">
                                                                            Talla de zapatos
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <select
                                                                            className="form-select"
                                                                            id="tallaZapatosSelect"
                                                                            name="tallaZapatos"
                                                                            value={form.tallaZapatos || ''}
                                                                            onChange={handleChange}
                                                                            aria-label="Talla de zapatos select"
                                                                        >
                                                                            <option value="">Seleccione</option>
                                                                            <option value="35">35 (22.5 cm)</option>
                                                                            <option value="36">36 (23 cm)</option>
                                                                            <option value="37">37 (23.5 cm)</option>
                                                                            <option value="38">38 (24 cm)</option>
                                                                            <option value="39">39 (24.5 cm)</option>
                                                                            <option value="40">40 (25 cm)</option>
                                                                            <option value="41">41 (26 cm)</option>
                                                                            <option value="42">42 (26.5 cm)</option>
                                                                            <option value="43">43 (27.5 cm)</option>
                                                                            <option value="44">44 (28 cm)</option>
                                                                            <option value="45">45 (29 cm)</option>
                                                                            <option value="46">46 (30 cm)</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="d-flex justify-content-center gap-10 modal-footer">
                                                                <button type="button" className="btn btn-secondary" id="closeButton" data-bs-dismiss="modal">
                                                                    Cerrar
                                                                </button>
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-success"
                                                                    onClick={(e) => {
                                                                        if (form.firmaDigital === 'enabled') {
                                                                            e.preventDefault()
                                                                            const modal = document.getElementById('tokenVerificationModal')
                                                                            if (modal) {
                                                                                ; (modal as any).classList.add('show')
                                                                                modal.setAttribute('aria-hidden', 'false')
                                                                                modal.style.display = 'block'
                                                                            }
                                                                        } else {
                                                                            // Check if form is valid before changing tab
                                                                            const form = e.currentTarget.form
                                                                            if (form && form.checkValidity()) {
                                                                                e.preventDefault()
                                                                                handleTabChange('datosAcademicos')
                                                                            }
                                                                        }
                                                                    }}
                                                                >
                                                                    Guardar y continuar
                                                                </button>

                                                                <div
                                                                    className="modal fade"
                                                                    id="tokenVerificationModal"
                                                                    tabIndex={-1}
                                                                    aria-labelledby="tokenVerificationModalLabel"
                                                                    aria-hidden="true"
                                                                >
                                                                    <div className="modal-dialog modal-dialog-centered">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id="tokenVerificationModalLabel">
                                                                                    Registrar nuevo ticket
                                                                                </h5>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn-close"
                                                                                    onClick={() => {
                                                                                        const modal = document.getElementById('tokenVerificationModal')
                                                                                        if (modal) {
                                                                                            ; (modal as any).classList.remove('show')
                                                                                            modal.setAttribute('aria-hidden', 'true')
                                                                                            modal.style.display = 'none'
                                                                                        }
                                                                                    }}
                                                                                ></button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <div className="text-center mb-4">
                                                                                    <i className="bi bi-shield-lock fs-1 text-primary"></i>
                                                                                    <h4 className="mt-2">Se requiere firmar con token digital</h4>
                                                                                </div>
                                                                                <div className="alert alert-info" role="alert">
                                                                                    <p className="mb-0">Se ha enviado un código de verificación a su correo:</p>
                                                                                    <p className="fw-bold mb-0">
                                                                                        {form.correoTrabajo || 'correo@empresa.com'}
                                                                                    </p>
                                                                                </div>
                                                                                <div className="form-group mt-4">
                                                                                    <label htmlFor="tokenInput" className="form-label">
                                                                                        Ingrese el token digital recibido:
                                                                                    </label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control form-control-lg text-center"
                                                                                        id="tokenInput"
                                                                                        placeholder="Ejemplo: A1B2-C3D4-E5F6"
                                                                                        maxLength={14}
                                                                                    />
                                                                                    <div className="invalid-feedback">El token ingresado no es válido.</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="modal-footer d-flex justify-content-between">
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-secondary"
                                                                                    onClick={() => {
                                                                                        const modal = document.getElementById('tokenVerificationModal')
                                                                                        if (modal) {
                                                                                            ; (modal as any).classList.remove('show')
                                                                                            modal.setAttribute('aria-hidden', 'true')
                                                                                            modal.style.display = 'none'
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    Cancelar
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-primary"
                                                                                    onClick={() => {
                                                                                        const tokenInput = document.getElementById('tokenInput') as HTMLInputElement
                                                                                        if (tokenInput && tokenInput.value.length >= 8) {
                                                                                            const modal = document.getElementById('tokenVerificationModal')
                                                                                            if (modal) {
                                                                                                ; (modal as any).classList.remove('show')
                                                                                                modal.setAttribute('aria-hidden', 'true')
                                                                                                modal.style.display = 'none'
                                                                                            }
                                                                                            document
                                                                                                .querySelector('form')
                                                                                                ?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
                                                                                        } else {
                                                                                            if (tokenInput) {
                                                                                                tokenInput.classList.add('is-invalid')
                                                                                            }
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    Firmar
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
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
            </KTCardBody>
        </div>
    )
}

export { CalendarButton }
