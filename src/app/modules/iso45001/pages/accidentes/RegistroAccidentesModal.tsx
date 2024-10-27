import Swal from 'sweetalert2';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { AccidentesResponse, RegistrosResponse } from './core/_models';

interface RegistroAccidentesModalProps {
    reporteSeleccionado: AccidentesResponse | null;
    mode: 'create' | 'edit' | 'view';
    saveRegistro: (registro: RegistrosResponse) => void;
    selectedRegistro: RegistrosResponse | null;
    isCreatingNew: boolean;
}

function RegistroAccidentesModal({ reporteSeleccionado, mode, saveRegistro, selectedRegistro, isCreatingNew }: RegistroAccidentesModalProps) {

    const initialValuesRegistro: RegistrosResponse = {
        noRegistro: '',
        razonSocialEmpleadorPrincipal: '',
        sedeEmpleadorPrincipal: '',
        rucEmpleadorPrincipal: '',
        noTrabajadoresEmpleadorPrincipal: 0,
        tipoActividadEconomicaEmpleadorPrincipal: '',
        direccionEmpleadorPrincipal: '',
        distritoEmpleadorPrincipal: '',
        departamentoEmpleadorPrincipal: '',
        provinciaEmpleadorPrincipal: '',
        noTrabajadoresAfiliadosSCTREmpleadorPrincipal: 0,
        noTrabajadoresNoAfiliadosSCTREmpleadorPrincipal: 0,
        nombreAseguradoraEmpleadorPrincipal: '',
        razonSocialEmpleadorIntermediacion: '',
        sedeEmpleadorIntermediacion: '',
        rucEmpleadorIntermediacion: '',
        noTrabajadoresEmpleadorIntermediacion: 0,
        tipoActividadEconomicaEmpleadorIntermediacion: '',
        direccionEmpleadorIntermediacion: '',
        distritoEmpleadorIntermediacion: '',
        departamentoEmpleadorIntermediacion: '',
        provinciaEmpleadorIntermediacion: '',
        noTrabajadoresAfiliadosSCTREmpleadorIntermediacion: 0,
        noTrabajadoresNoAfiliadosSCTREmpleadorIntermediacion: 0,
        nombreAseguradoraEmpleadorIntermediacion: '',
        nombreTrabajador: '',
        apPatTrabajador: '',
        apMatTrabajador: '',
        dniTrabajador: '',
        edadTrabajador: 0,
        sexoTrabajador: '',
        areaTrabajador: '',
        cargoTrabajador: '',
        trabajador: '',
        antiguedadPuestoTrabajador: 0,
        tipoContratoTrabajador: '',
        tiempoExperienciaTrabajador: '',
        capacitadoTareaTrabajador: '',
        noHorasTrabajadasJornadaLabTrabajador: 0,
        fechaOcurrenciaAccidente: '',
        horaOcurrenciaAccidente: '',
        fechaInicioInvestigacionAccidente: '',
        lugarExactoAccidente: '',
        areaAccidente: '',
        gravedadAccidenteTrabajo: '',
        gradoAccidenteIncapacitante: '',
        centroSalud: '',
        medicoTratante: '',
        diagnosticoMedico: '',
        fechaDescansoMedico: '',
        diasDescansoMedico: 0
    };

    // Opciones de áreas, cargos y trabajadores
    const areaOptions = [
        { id: "1", name: 'Gerencia' },
        { id: "2", name: 'Seguridad industrial' }
    ];

    const datosEmpleador = [
        { id: "1", razonSocial: "Empresa de prueba número 1 S.A.", ruc: "12345678911", sede: "Norte", noTrabajadores: 100 },
        { id: "2", razonSocial: "Empresa de prueba número 2 S.A.", ruc: "32165498733", sede: "Sur", noTrabajadores: 50 },
        { id: "3", razonSocial: "Empresa de prueba número 3 S.A.", ruc: "98745612302", sede: "Oeste", noTrabajadores: 20 },
    ];

    const [formDataRegistro, setFormDataRegistro] = useState<RegistrosResponse>(initialValuesRegistro);
    const [formDataReporte, setFormDataReporte] = useState<AccidentesResponse | null>(null);
    const [fileList, setFileList] = useState<File[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
    const isViewMode = mode === 'view';
    const [gravedadAccidenteIncapacitante, setGravedadAccidenteIncapacitante] = useState(false);

    // Actualizar los valores cuando `selectedRegistro` cambia
    useEffect(() => {
        if (selectedRegistro && mode !== 'create') {
            setFormDataRegistro(selectedRegistro); // Cargamos los datos del registro
        } else {
            setFormDataRegistro(initialValuesRegistro);
        }
    }, [selectedRegistro, mode]);

    // Actualizar los valores cuando `reporteSeleccionado` cambia
    useEffect(() => {
        if (reporteSeleccionado) {
            setFormDataReporte(reporteSeleccionado); // Inicializamos el form con el reporte seleccionado
        } else {
            setFormDataReporte(null);
        }
    }, [reporteSeleccionado]);

    // Actualización de los inputs del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormDataRegistro({ ...formDataRegistro, [name]: value });

        if (name === "razonSocialEmpleadorIntermediacion") {
            const empleador = datosEmpleador.find(e => e.razonSocial === value);
            if (empleador) {
                setFormDataRegistro({
                    ...formDataRegistro,
                    razonSocialEmpleadorIntermediacion: value,
                    rucEmpleadorIntermediacion: empleador.ruc,
                    sedeEmpleadorIntermediacion: empleador.sede,
                    noTrabajadoresEmpleadorIntermediacion: empleador.noTrabajadores
                })
            }
        }

        if (name === "rucEmpleadorIntermediacion") {
            const empleador = datosEmpleador.find(e => e.ruc === value);
            if (empleador) {
                setFormDataRegistro({
                    ...formDataRegistro,
                    rucEmpleadorIntermediacion: value,
                    razonSocialEmpleadorIntermediacion: empleador.razonSocial,
                    sedeEmpleadorIntermediacion: empleador.sede,
                    noTrabajadoresEmpleadorIntermediacion: empleador.noTrabajadores
                })
            }
        }

        if (name === "gravedadAccidenteTrabajo") {
            // setGravedadAccidenteIncapacitante(value === "Incapacitante");
            if (value === "Incapacitante") {
                setGravedadAccidenteIncapacitante(true);  // Activar el segundo select
            } else {
                setGravedadAccidenteIncapacitante(false);  // Desactivar el segundo select
                setFormDataRegistro((prevState) => ({
                    ...prevState,
                    gradoAccidenteIncapacitante: "",  // Restablecer el valor del segundo select
                }));
            }
        }
    };

    // Mostrar modal de vista previa de imagen
    const handleFileClick = (file: string) => {
        setPreviewImage(file);
        setShowPreviewModal(true);
    };

    const handleClosePreviewModal = () => {
        setShowPreviewModal(false);
        setPreviewImage(null);
    };

    const handleCloseModal = () => {
        setFormDataRegistro(initialValuesRegistro);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formDataRegistro) {
            // Convertir los campos numéricos antes de enviar
            const updatedFormData = {
                ...formDataRegistro,
                noTrabajadoresEmpleadorPrincipal: Number(formDataRegistro.noTrabajadoresEmpleadorPrincipal),
                noTrabajadoresAfiliadosSCTREmpleadorPrincipal: Number(formDataRegistro.noTrabajadoresAfiliadosSCTREmpleadorPrincipal),
                noTrabajadoresNoAfiliadosSCTREmpleadorPrincipal: Number(formDataRegistro.noTrabajadoresNoAfiliadosSCTREmpleadorPrincipal),
                noTrabajadoresEmpleadorIntermediacion: Number(formDataRegistro.noTrabajadoresEmpleadorIntermediacion),
                noTrabajadoresAfiliadosSCTREmpleadorIntermediacion: Number(formDataRegistro.noTrabajadoresAfiliadosSCTREmpleadorIntermediacion),
                noTrabajadoresNoAfiliadosSCTREmpleadorIntermediacion: Number(formDataRegistro.noTrabajadoresNoAfiliadosSCTREmpleadorIntermediacion),
                edadTrabajador: Number(formDataRegistro.edadTrabajador),
                antiguedadPuestoTrabajador: Number(formDataRegistro.antiguedadPuestoTrabajador),
                noHorasTrabajadasJornadaLabTrabajador: Number(formDataRegistro.noHorasTrabajadasJornadaLabTrabajador),
                diasDescansoMedico: Number(formDataRegistro.diasDescansoMedico),
                idReporteAccidente: reporteSeleccionado?._id
            };
            if (isCreatingNew) {
                delete updatedFormData._id;  // Eliminar el _id si es un reporte nuevo
            }
            saveRegistro(updatedFormData);
        }

        const closeButton = document.getElementById('closeButton');
        if (closeButton) {
            closeButton.click();
        }
    };

    return (
        <div
            className="modal fade"
            id="staticBackdropRegistro"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="staticBackdropRegistroLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title" id="staticBackdropRegistroLabel">
                            {isCreatingNew ? 'Nuevo registro' : isViewMode ? 'Ver registro' : 'Editar registro'}
                        </h1>
                        <button
                            type="button"
                            id="closeButton"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => handleCloseModal()}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {/* Columna Izquierda (Registro de Accidentes) */}
                            {/* Columna Izquierda */}
                            <div className="col-md-7" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                                <div className="border-end">
                                    <h3>Registro de Accidentes</h3>

                                    {/* Sección de Número de Registro */}
                                    <div className="card mb-4 shadow">
                                        <div className="card-body">
                                            <div className="row gy-3">
                                                <div className="col-sm-3">
                                                    <label className="form-label">No de Registro:</label>
                                                    <input
                                                        type="text"
                                                        name="noRegistro"
                                                        className="form-control"
                                                        value={formDataRegistro.noRegistro}
                                                        onChange={handleInputChange}
                                                        required
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Sección de Datos del empleador principal */}
                                    <div className="card mb-4 shadow">
                                        <div className="card-header bg-secondary d-flex align-items-center" style={{ minHeight: '60px' }}>
                                            <h5 className="mb-0">Datos del empleador principal</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="row gy-3">
                                                <div className="col-sm-6">
                                                    <label className="form-label">Razón social:</label>
                                                    <input
                                                        type="text"
                                                        name="razonSocialEmpleadorPrincipal"
                                                        className="form-control"
                                                        value={formDataRegistro.razonSocialEmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Sede:</label>
                                                    <select
                                                        name="sedeEmpleadorPrincipal"
                                                        className="form-select"
                                                        value={formDataRegistro.sedeEmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    >
                                                        <option value="">Seleccione sede</option>
                                                        <option value="Norte">Norte</option>
                                                        <option value="Sur">Sur</option>
                                                        <option value="Oeste">Oeste</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">RUC:</label>
                                                    <input
                                                        type="text"
                                                        name="rucEmpleadorPrincipal"
                                                        className="form-control"
                                                        value={formDataRegistro.rucEmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">No. de trabajadores:</label>
                                                    <input
                                                        type="number"
                                                        name="noTrabajadoresEmpleadorPrincipal"
                                                        className="form-control"
                                                        value={formDataRegistro.noTrabajadoresEmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Tipo de actividad económica:</label>
                                                    <input
                                                        type="text"
                                                        name="tipoActividadEconomicaEmpleadorPrincipal"
                                                        className="form-control"
                                                        value={formDataRegistro.tipoActividadEconomicaEmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Dirección:</label>
                                                    <input
                                                        type="text"
                                                        name="direccionEmpleadorPrincipal"
                                                        className="form-control"
                                                        value={formDataRegistro.direccionEmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Distrito:</label>
                                                    <input
                                                        type="text"
                                                        name="distritoEmpleadorPrincipal"
                                                        className="form-control"
                                                        value={formDataRegistro.distritoEmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Departamento:</label>
                                                    <input
                                                        type="text"
                                                        name="departamentoEmpleadorPrincipal"
                                                        className="form-control"
                                                        value={formDataRegistro.departamentoEmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Provincia:</label>
                                                    <input
                                                        type="text"
                                                        name="provinciaEmpleadorPrincipal"
                                                        className="form-control"
                                                        value={formDataRegistro.provinciaEmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">No. de trabajadores afiliados al SCTR:</label>
                                                    <input
                                                        type="number"
                                                        name="noTrabajadoresAfiliadosSCTREmpleadorPrincipal"
                                                        className="form-control"
                                                        value={formDataRegistro.noTrabajadoresAfiliadosSCTREmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">No. de trabajadores no afiliados al SCTR:</label>
                                                    <input
                                                        type="number"
                                                        name="noTrabajadoresNoAfiliadosSCTREmpleadorPrincipal"
                                                        className="form-control"
                                                        value={formDataRegistro.noTrabajadoresNoAfiliadosSCTREmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Nombre de la aseguradora:</label>
                                                    <input
                                                        type="text"
                                                        name="nombreAseguradoraEmpleadorPrincipal"
                                                        className="form-control"
                                                        value={formDataRegistro.nombreAseguradoraEmpleadorPrincipal}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección de Datos del empleador de intermediación, tercerización, contratista, subcontratista, otros */}
                                    <div className="card mb-4 shadow-sm">
                                        <div className="card-header bg-secondary d-flex align-items-center" style={{ minHeight: '60px' }}>
                                            <h5 className="mb-0">Datos del empleador de intermediación, tercerización, contratista, subcontratista, otros</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="row gy-3">
                                                <div className="col-sm-6">
                                                    <label className="form-label">Razón social:</label>
                                                    <input
                                                        type="text"
                                                        name="razonSocialEmpleadorIntermediacion"
                                                        className="form-control"
                                                        value={formDataRegistro.razonSocialEmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Sede:</label>
                                                    <select
                                                        name="sedeEmpleadorIntermediacion"
                                                        className="form-select"
                                                        value={formDataRegistro.sedeEmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    >
                                                        <option value="">Seleccione sede</option>
                                                        <option value="Norte">Norte</option>
                                                        <option value="Sur">Sur</option>
                                                        <option value="Oeste">Oeste</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">RUC:</label>
                                                    <input
                                                        type="text"
                                                        name="rucEmpleadorIntermediacion"
                                                        className="form-control"
                                                        value={formDataRegistro.rucEmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">No. de trabajadores:</label>
                                                    <input
                                                        type="number"
                                                        name="noTrabajadoresEmpleadorIntermediacion"
                                                        className="form-control"
                                                        value={formDataRegistro.noTrabajadoresEmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Tipo de actividad económica:</label>
                                                    <input
                                                        type="text"
                                                        name="tipoActividadEconomicaEmpleadorIntermediacion"
                                                        className="form-control"
                                                        value={formDataRegistro.tipoActividadEconomicaEmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Dirección:</label>
                                                    <input
                                                        type="text"
                                                        name="direccionEmpleadorIntermediacion"
                                                        className="form-control"
                                                        value={formDataRegistro.direccionEmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Distrito:</label>
                                                    <input
                                                        type="text"
                                                        name="distritoEmpleadorIntermediacion"
                                                        className="form-control"
                                                        value={formDataRegistro.distritoEmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Departamento:</label>
                                                    <input
                                                        type="text"
                                                        name="departamentoEmpleadorIntermediacion"
                                                        className="form-control"
                                                        value={formDataRegistro.departamentoEmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Provincia:</label>
                                                    <input
                                                        type="text"
                                                        name="provinciaEmpleadorIntermediacion"
                                                        className="form-control"
                                                        value={formDataRegistro.provinciaEmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">No. de trabajadores afiliados al SCTR:</label>
                                                    <input
                                                        type="number"
                                                        name="noTrabajadoresAfiliadosSCTREmpleadorIntermediacion"
                                                        className="form-control"
                                                        value={formDataRegistro.noTrabajadoresAfiliadosSCTREmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">No. de trabajadores no afiliados al SCTR:</label>
                                                    <input
                                                        type="number"
                                                        name="noTrabajadoresNoAfiliadosSCTREmpleadorIntermediacion"
                                                        className="form-control"
                                                        value={formDataRegistro.noTrabajadoresNoAfiliadosSCTREmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Nombre de la aseguradora:</label>
                                                    <input
                                                        type="text"
                                                        name="nombreAseguradoraEmpleadorIntermediacion"
                                                        className="form-control"
                                                        value={formDataRegistro.nombreAseguradoraEmpleadorIntermediacion}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección de Datos del trabajador */}
                                    <div className="card mb-4 shadow-sm">
                                        <div className="card-header bg-secondary d-flex align-items-center" style={{ minHeight: '60px' }}>
                                            <h5 className="mb-0">Datos del trabajador</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="row gy-3">
                                                <div className="col-sm-6">
                                                    <label className="form-label">Nombre(s):</label>
                                                    <input
                                                        type="text"
                                                        name="nombreTrabajador"
                                                        className="form-control"
                                                        value={formDataRegistro.nombreTrabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Apellido Paterno:</label>
                                                    <input
                                                        type="text"
                                                        name="apPatTrabajador"
                                                        className="form-control"
                                                        value={formDataRegistro.apPatTrabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Apellido Materno:</label>
                                                    <input
                                                        type="text"
                                                        name="apMatTrabajador"
                                                        className="form-control"
                                                        value={formDataRegistro.apMatTrabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">N° DNI:</label>
                                                    <input
                                                        type="text"
                                                        name="dniTrabajador"
                                                        className="form-control"
                                                        value={formDataRegistro.dniTrabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Edad:</label>
                                                    <input
                                                        type="number"
                                                        name="edadTrabajador"
                                                        className="form-control"
                                                        value={formDataRegistro.edadTrabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Sexo:</label>
                                                    <input
                                                        type="text"
                                                        name="sexoTrabajador"
                                                        className="form-control"
                                                        value={formDataRegistro.sexoTrabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="area" className="required form-label">
                                                        Área
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="area"
                                                        id="areaTrabajador"
                                                        name="areaTrabajador"
                                                        value={formDataRegistro.areaTrabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="cargo" className="required form-label">
                                                        Cargo
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="cargo"
                                                        id="cargoTrabajador"
                                                        name="cargoTrabajador"
                                                        value={formDataRegistro.cargoTrabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-4">
                                                    <label htmlFor="trabajador" className="required form-label">
                                                        Trabajador
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="trabajador"
                                                        id="trabajador"
                                                        name="trabajador"
                                                        value={formDataRegistro.trabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Antigüedad en el puesto:</label>
                                                    <input
                                                        type="text"
                                                        name="antiguedadPuestoTrabajador"
                                                        className="form-control"
                                                        value={formDataRegistro.antiguedadPuestoTrabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Tipo de contrato:</label>
                                                    <input
                                                        type="text"
                                                        name="tipoContratoTrabajador"
                                                        className="form-control"
                                                        value={formDataRegistro.tipoContratoTrabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Tiempo de experiencia:</label>
                                                    <input
                                                        type="text"
                                                        name="tiempoExperienciaTrabajador"
                                                        className="form-control"
                                                        value={formDataRegistro.tiempoExperienciaTrabajador}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Capacitado en la tarea:</label>
                                                    <input
                                                        type="text"
                                                        name="capacitadoTareaTrabajador"
                                                        className="form-control"
                                                        value={formDataRegistro.capacitadoTareaTrabajador}
                                                        onChange={handleInputChange}
                                                        // required
                                                        // readOnly
                                                        disabled={isViewMode}
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">No. de horas trabajadas:</label>
                                                    <input
                                                        type="number"
                                                        name="noHorasTrabajadasJornadaLabTrabajador"
                                                        className="form-control"
                                                        value={formDataRegistro.noHorasTrabajadasJornadaLabTrabajador}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección de Investigación del accidente de trabajo */}
                                    <div className="card mb-4 shadow-sm">
                                        <div className="card-header bg-secondary d-flex align-items-center" style={{ minHeight: '60px' }}>
                                            <h5 className="mb-0">Investigación del accidente de trabajo</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="row gy-3">
                                                <div className="col-sm-6">
                                                    <label className="form-label">Fecha de ocurrencia del accidente:</label>
                                                    <input
                                                        type="date"
                                                        name="fechaOcurrenciaAccidente"
                                                        className="form-control"
                                                        value={formDataRegistro.fechaOcurrenciaAccidente}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Hora del accidente:</label>
                                                    <input
                                                        type="time"
                                                        name="horaOcurrenciaAccidente"
                                                        className="form-control"
                                                        value={formDataRegistro.horaOcurrenciaAccidente}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Inicio de la investigación:</label>
                                                    <input
                                                        type="date"
                                                        name="fechaInicioInvestigacionAccidente"
                                                        className="form-control"
                                                        value={formDataRegistro.fechaInicioInvestigacionAccidente}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Lugar exacto del accidente:</label>
                                                    <input
                                                        type="text"
                                                        name="lugarExactoAccidente"
                                                        className="form-control"
                                                        value={formDataRegistro.lugarExactoAccidente}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Área del accidente:</label>
                                                    <select
                                                        name="areaAccidente"
                                                        className="form-select"
                                                        value={formDataRegistro.areaAccidente}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    >
                                                        <option value="">Seleccione</option>
                                                        {areaOptions.map((area) => (
                                                            <option key={area.id} value={area.id}>{area.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Gravedad del accidente de trabajo:</label>
                                                    <select
                                                        name="gravedadAccidenteTrabajo"
                                                        className="form-select"
                                                        value={formDataRegistro.gravedadAccidenteTrabajo}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    >
                                                        <option value="">Seleccione</option>
                                                        <option value="Leve">Leve</option>
                                                        <option value="Incapacitante">Incapacitante</option>
                                                        <option value="Mortal">Mortal</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Grado del accidente incapacitante:</label>
                                                    <select
                                                        name="gradoAccidenteIncapacitante"
                                                        className="form-select"
                                                        value={formDataRegistro.gradoAccidenteIncapacitante}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode || !gravedadAccidenteIncapacitante}
                                                        required={gravedadAccidenteIncapacitante}
                                                    >
                                                        <option value="">Seleccione</option>
                                                        <option value="Parcial temporal">Parcial temporal</option>
                                                        <option value="Parcial permanente">Parcial permanente</option>
                                                        <option value="Total permanente">Total permanente</option>
                                                    </select>
                                                </div>

                                                <div className="col-sm-6">
                                                    <label className="form-label">Centro de salud:</label>
                                                    <input
                                                        type="text"
                                                        name="centroSalud"
                                                        className="form-control"
                                                        value={formDataRegistro.centroSalud}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Médico tratante:</label>
                                                    <input
                                                        type="text"
                                                        name="medicoTratante"
                                                        className="form-control"
                                                        value={formDataRegistro.medicoTratante}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Diagnóstico médico:</label>
                                                    <input
                                                        type="text"
                                                        name="diagnosticoMedico"
                                                        className="form-control"
                                                        value={formDataRegistro.diagnosticoMedico}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Descanso médico:</label>
                                                    <input
                                                        type="date"
                                                        name="fechaDescansoMedico"
                                                        className="form-control"
                                                        value={formDataRegistro.fechaDescansoMedico}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="form-label">Días de descanso médico:</label>
                                                    <input
                                                        type="number"
                                                        name="diasDescansoMedico"
                                                        className="form-control"
                                                        value={formDataRegistro.diasDescansoMedico}
                                                        onChange={handleInputChange}
                                                        disabled={isViewMode}
                                                    // required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Columna Derecha (Reporte de Accidentes) */}
                            <div className="col-md-5">
                                <div className="sticky-top">
                                    <h3>Reporte de Accidentes</h3>
                                    {/* Copiar el contenido del modal de ReporteAccidentesModal */}


                                    <div className="modal-body">
                                        <div className="card shadow-none">
                                            <div className="card-body bg-secondary card-blank">
                                                <div className="row gy-2">
                                                    <div className="col-sm-6">
                                                        <label htmlFor="fechaVencimiento" className="required form-label">
                                                            Fecha
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Fecha vencimiento"
                                                            id="fechaVencimiento"
                                                            value={reporteSeleccionado?.fecha ? reporteSeleccionado.fecha : ''}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="horaAccidente" className="required form-label">
                                                            Hora del accidente estimado
                                                        </label>
                                                        <input
                                                            disabled
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Hora del accidente"
                                                            id="horaAccidente"
                                                            value={reporteSeleccionado?.hora ? reporteSeleccionado.hora : ''}
                                                        />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="area" className="required form-label">
                                                            Área
                                                        </label>
                                                        <input
                                                            disabled
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="area"
                                                            id="area"
                                                            value={reporteSeleccionado?.area ? reporteSeleccionado.area : ''}
                                                        />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="cargo" className="required form-label">
                                                            Cargo
                                                        </label>
                                                        <input
                                                            disabled
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="cargo"
                                                            id="cargo"
                                                            value={reporteSeleccionado?.cargo ? reporteSeleccionado.cargo : ''}
                                                        />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="trabajador" className="required form-label">
                                                            Trabajador
                                                        </label>
                                                        <input
                                                            disabled
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="trabajador"
                                                            id="trabajador"
                                                            value={reporteSeleccionado?.trabajador ? reporteSeleccionado.trabajador : ''}
                                                        />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <label htmlFor="dni" className="required form-label">
                                                            DNI
                                                        </label>
                                                        <input
                                                            disabled
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Ingrese DNI"
                                                            id="dni"
                                                            value={reporteSeleccionado?.dni ? reporteSeleccionado.dni : ''}
                                                        />
                                                    </div>
                                                    {/* <div className="table-responsive mt-10">
                                                        <table className="table table-secondary table-row-gray-300 align-middle gs-7">
                                                            <thead>
                                                                <tr className="fw-bold border-bottom-2 border-gray-200">
                                                                    <th>Accidentado</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                    key={reporteSeleccionado?._id}
                                                                    className={`text-center ${reporteSeleccionado?._id === reporteSeleccionado?._id ? 'table-primary' : ''}`}
                                                                    // onClick={() => setSelectedAccidentado(reporteTemporal)}
                                                                    style={{ cursor: 'pointer' }}>
                                                                    <td>{reporteSeleccionado?.trabajador}</td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </div> */}
                                                    {/* Mostrar foto del accidentado seleccionado */}
                                                    {reporteSeleccionado && (
                                                        <div className="col-12 mt-3">
                                                            <div className="d-flex justify-content-center">
                                                                <img
                                                                    src={reporteSeleccionado.fotoTrabajador}
                                                                    alt={reporteSeleccionado.trabajador}
                                                                    style={{ maxWidth: '100%', maxHeight: '150px' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="col-12">
                                                        <label htmlFor="ubicacion" className="form-label">
                                                            Reportado por: {reporteSeleccionado?.reportadoPor ? reporteSeleccionado.reportadoPor : ''}
                                                        </label>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="ubicacion" className="form-label">
                                                            Descripción
                                                        </label>
                                                        <textarea
                                                            disabled
                                                            className={clsx(
                                                                'form-control'
                                                            )}
                                                            placeholder="Descripción"
                                                            id="descripcion"
                                                            value={reporteSeleccionado?.descripcion ? reporteSeleccionado.descripcion : ''}
                                                        />
                                                    </div>
                                                    {/* <div className="col-12 mt-3">
                                                        <label htmlFor="fileUpload" className="form-label">
                                                            Subir Imágenes
                                                        </label>
                                                        <input
                                                            disabled
                                                            type="file"
                                                            className="form-control"
                                                            id="fileUpload"
                                                            accept="image/*"
                                                            multiple
                                                            onChange={handleFileUpload}
                                                        />
                                                    </div> */}
                                                    {/* Lista de archivos subidos */}
                                                    <div className="col-12 mt-3">
                                                        <ul className="list-group">
                                                            {reporteSeleccionado?.imagenes.map((file, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="list-group-item d-flex justify-content-between align-items-center">
                                                                    {file}
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-link"
                                                                        onClick={() => handleFileClick(file)}>
                                                                        Vista Previa
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            id="closeButton"
                            data-bs-dismiss="modal"
                            onClick={() => handleCloseModal()}
                        >
                            Cerrar
                        </button>
                        {!isViewMode && (
                            <button type="submit" className="btn btn-success">
                                {isCreatingNew ? 'Crear registro' : 'Guardar cambios'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
            {/* Modal para vista previa de la imagen */}
            {showPreviewModal && (
                <div
                    className="modal fade show"
                    tabIndex={-1}
                    role="dialog"
                    style={{ display: 'block' }}
                    aria-labelledby="previewModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="previewModalLabel">
                                    Vista Previa
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleClosePreviewModal}
                                    aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex justify-content-center">
                                {previewImage ? (
                                    <img src={previewImage} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                ) : (
                                    <p>No hay imagen para mostrar</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClosePreviewModal}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegistroAccidentesModal;
