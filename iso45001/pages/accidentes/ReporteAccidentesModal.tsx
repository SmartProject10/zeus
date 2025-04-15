import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AccidentesResponse } from './core/_models';

const initialValues: AccidentesResponse = {
    _id: '',
    fecha: '',
    hora: '',
    area: '',
    cargo: '',
    trabajador: '',
    dni: '',
    descripcion: '',
    imagenes: [],
    fotoTrabajador: '',
    reportadoPor: '',
    elaboradoPor: '',
    estadoRegistro: '',
    registroAccidente: [],
    createdAt: '',
    updatedAt: ''
};

// Opciones de áreas, cargos y trabajadores
const areaOptions = [
    { id: "1", name: 'Gerencia' },
    { id: "2", name: 'Seguridad industrial' }
];

const cargoOptions = [
    { id: "1", name: 'Gerente', area: "1" },
    { id: "2", name: 'Jefe', area: "2" }
];

const trabajadorOptions = [
    { id: 1, name: 'Juan Pérez', cargo: '1', dni: '12345678', foto: '/man1.jpg' },
    { id: 2, name: 'María Gómez', cargo: '2', dni: '87654321', foto: '/woman1.jpg' },
    { id: 3, name: 'Carlos Rodriguez', cargo: '2', dni: '11223344', foto: '/man2.jpg' },
];

interface ReporteAccidentesModalProps {
    saveReporte: (reporte: AccidentesResponse) => void;
    reporte: AccidentesResponse | null;
    mode: 'create' | 'edit' | 'view';
    isCreatingNew: boolean;
}

function ReporteAccidentesModal({ saveReporte, reporte, mode, isCreatingNew }: ReporteAccidentesModalProps) {
    const [formData, setFormData] = useState(initialValues);
    const [selectedAccidentado, setSelectedAccidentado] = useState<any>(null);
    const [fileList, setFileList] = useState<File[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
    const isViewMode = mode === 'view';

    useEffect(() => {
        if (reporte && mode !== 'create') {
            setFormData({
                ...reporte,
                area: areaOptions.find(area => area.name === reporte.area)?.id || '',
                cargo: cargoOptions.find(cargo => cargo.name === reporte.cargo)?.id || '',
                trabajador: trabajadorOptions.find(trabajador => trabajador.name === reporte.trabajador)?.id.toString() || '',
            });
            const accidentado = trabajadorOptions.find(t => t.name === reporte.trabajador);
            setSelectedAccidentado(accidentado || null);
        } else {
            setFormData({ ...initialValues, _id: undefined });
            setSelectedAccidentado(null);
        }
    }, [reporte, mode]);



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Manejo de selects en cascada
        if (name === 'area') {
            setFormData({ ...formData, area: value, cargo: '', trabajador: '', dni: '' });
        }

        if (name === 'cargo') {
            setFormData({ ...formData, cargo: value, trabajador: '' });
        }

        // Manejo de trabajador seleccionado
        if (name === 'trabajador') {
            const accidentado = trabajadorOptions.find(t => t.id.toString() === value);
            setSelectedAccidentado(accidentado || null);
            setFormData({ ...formData, trabajador: value, dni: accidentado?.dni || '' });
            // console.log(formData)
        }

        // Manejo del campo DNI manualmente
        if (name === 'dni') {
            const accidentado = trabajadorOptions.find(t => t.dni === value);
            if (accidentado) {
                const cargo = cargoOptions.find(c => c.id.toString() === accidentado.cargo);
                const area = areaOptions.find(a => a.id === cargo?.area);

                setSelectedAccidentado(accidentado || null);
                setFormData({
                    ...formData,
                    dni: value,
                    area: area?.id || '',
                    cargo: cargo?.id || '',
                    trabajador: accidentado.id.toString(),
                });
            } else {
                setSelectedAccidentado(null);
                setFormData({ ...formData, dni: value, area: '', cargo: '', trabajador: '' });
            }
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setFileList(files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setFormData({ ...formData, imagenes: [...formData.imagenes, ...newImages] });
    };

    const handleFileClick = (fileURL: string) => {
        setPreviewImage(fileURL);
        setShowPreviewModal(true);
    };

    const handleClosePreviewModal = () => {
        setShowPreviewModal(false);
        setPreviewImage(null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Si es un reporte nuevo, no debe tener _id
        const dataToSave = { ...formData };
        if (isCreatingNew) {
            delete dataToSave._id;  // Eliminar el _id si es un reporte nuevo
        }
        const areaNombre = areaOptions.find(area => area.id === dataToSave.area)?.name || '';
        const cargoNombre = cargoOptions.find(cargo => cargo.id === dataToSave.cargo)?.name || '';
        const trabajadorNombre = trabajadorOptions.find(trabajador => trabajador.id === Number(dataToSave.trabajador))?.name || '';

        dataToSave.area = areaNombre;
        dataToSave.cargo = cargoNombre;
        dataToSave.trabajador = trabajadorNombre;

        saveReporte(dataToSave);
        document.getElementById('closeModalButton')?.click();
    };

    // Filtrar cargos según el área seleccionada
    const filteredCargos = cargoOptions.filter((cargo) => cargo.area === formData.area);
    // Filtrar trabajadores según el cargo seleccionado
    const filteredTrabajadores = trabajadorOptions.filter((trabajador) => trabajador.cargo === formData.cargo);

    return (
        <div className="modal fade" id="staticBackdropReporte" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title">
                            {isCreatingNew ? 'Nuevo reporte' : isViewMode ? 'Ver reporte' : 'Editar reporte'}
                        </h1>
                        <button type="button" className="btn-close" id="closeModalButton" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row gy-4">
                            <div className="col-sm-6">
                                <label className="required form-label">Fecha</label>
                                <input
                                    type="date"
                                    name="fecha"
                                    className="form-control"
                                    value={formData.fecha}
                                    onChange={handleInputChange}
                                    disabled={isViewMode}
                                />
                            </div>
                            <div className="col-sm-6">
                                <label className="required form-label">Hora</label>
                                <input
                                    type="time"
                                    name="hora"
                                    className="form-control"
                                    value={formData.hora}
                                    onChange={handleInputChange}
                                    disabled={isViewMode}
                                />
                            </div>
                            <div className="col-sm-4">
                                <label className="required form-label">Área</label>
                                <select
                                    name="area"
                                    className="form-select"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                    disabled={isViewMode}
                                >
                                    <option value="">Seleccione</option>
                                    {areaOptions.map((area) => (
                                        <option key={area.id} value={area.id}>{area.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label className="required form-label">Cargo</label>
                                <select
                                    name="cargo"
                                    className="form-select"
                                    value={formData.cargo}
                                    onChange={handleInputChange}
                                    disabled={isViewMode}
                                >
                                    <option value="">Seleccione</option>
                                    {filteredCargos.map((cargo) => (
                                        <option key={cargo.id} value={cargo.id}>{cargo.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label className="required form-label">Trabajador</label>
                                <select
                                    name="trabajador"
                                    className="form-select"
                                    value={formData.trabajador}
                                    onChange={handleInputChange}
                                    disabled={isViewMode}
                                >
                                    <option value="">Seleccione</option>
                                    {filteredTrabajadores.map((trabajador) => (
                                        <option key={trabajador.id} value={trabajador.id.toString()}>{trabajador.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label className="required form-label">DNI</label>
                                <input
                                    type="text"
                                    name="dni"
                                    className="form-control"
                                    value={formData.dni}
                                    onChange={handleInputChange}
                                    disabled={isViewMode}
                                />
                            </div>
                            {selectedAccidentado && (
                                <div className="col-12 mt-3">
                                    <div className="d-flex justify-content-center">
                                        <img src={selectedAccidentado.foto} alt={selectedAccidentado.name} style={{ maxWidth: '100%', maxHeight: '150px' }} />
                                    </div>
                                </div>
                            )}
                            <div className="col-sm-12">
                                <label className="required form-label">Descripción</label>
                                <textarea
                                    name="descripcion"
                                    className="form-control"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    disabled={isViewMode}
                                ></textarea>
                            </div>
                            <div className="col-12 mt-3">
                                <label className="form-label">Subir Imágenes</label>
                                <input type="file" className="form-control" id="fileUpload" accept="image/*" multiple onChange={handleFileUpload} disabled={isViewMode} />
                            </div>
                            <div className="col-12 mt-3">
                                <ul className="list-group">
                                    {formData.imagenes.map((imageURL, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <img src={imageURL} alt={`imagen-${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                            <button type="button" className="btn btn-link" onClick={() => handleFileClick(imageURL)}>Vista Previa</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {!isViewMode && (
                            <button type="submit" className="btn btn-success">
                                {isCreatingNew ? 'Crear reporte' : 'Guardar cambios'}
                            </button>
                        )}
                    </div>
                </form>

                {/* Modal para vista previa de imágenes */}
                {showPreviewModal && (
                    <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }} aria-labelledby="previewModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="previewModalLabel">Vista Previa</h5>
                                    <button type="button" className="btn-close" onClick={handleClosePreviewModal}></button>
                                </div>
                                <div className="modal-body d-flex justify-content-center">
                                    {previewImage ? <img src={previewImage} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '100%' }} /> : <p>No hay imagen para mostrar</p>}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleClosePreviewModal}>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReporteAccidentesModal;

