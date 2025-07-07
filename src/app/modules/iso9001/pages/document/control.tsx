import { useEffect, useState } from 'react';
import { KTCardBody } from '../../../../../_zeus/helpers';
import * as XLSX from 'xlsx';
import { useAuth } from '@zeus/@hooks/auth/useAuth.tsx';
import { saveAs } from 'file-saver';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Select from 'react-select';

// Mock data interfaces
interface DocumentControlForm {
    corporativo: string;
    proyecto: string;
    tipoDocumento: string;
    area: string;
    subArea: string;
    fechaElaboracion: string;
    subidoPor: string;
}

// se exportan los tipos de documento que fueron ingresados en el modal de tipo-documento
interface TipoDocumentoForm {
    tipo: string;
}
// se exportan los tipos de documento que fueron ingresados en el modal de corporativo
interface CorporativoForm {
    nombre: string;
}
// se exportan los tipos de documento que fueron ingresados en el modal de proyecto

interface ProyectoForm {
    nombre: string;
}

// Mock data
const tiposDocumento = [
    { value: 'procedimiento', label: 'Procedimiento' },
    { value: 'instructivo', label: 'Instructivo' },
    { value: 'manual', label: 'Manual' },
    { value: 'formato', label: 'Formato' },
    { value: 'politica', label: 'Política' },
];

const corporativos = [
    { value: 'corporativo1', label: 'Corporativo 1' },
    { value: 'corporativo2', label: 'Corporativo 2' },
    { value: 'corporativo3', label: 'Corporativo 3' },
];

const proyectos = [
    { value: 'proyecto1', label: 'Proyecto 1' },
    { value: 'proyecto2', label: 'Proyecto 2' },
    { value: 'proyecto3', label: 'Proyecto 3' },
];

const areas = [
    { value: 'contabilidad', label: 'Contabilidad' },
    { value: 'produccion', label: 'Producción' },
    { value: 'rrhh', label: 'Recursos Humanos' },
];

const subAreas = [
    { value: 'finanzas', label: 'Finanzas', area: 'contabilidad' },
    { value: 'impuestos', label: 'Impuestos', area: 'contabilidad' },
    { value: 'linea1', label: 'Línea 1', area: 'produccion' },
    { value: 'linea2', label: 'Línea 2', area: 'produccion' },
    { value: 'seleccion', label: 'Selección', area: 'rrhh' },
    { value: 'capacitacion', label: 'Capacitación', area: 'rrhh' },
];

const fuentes = [
    { value: 'arial', label: 'Arial' },
    { value: 'timesNewRoman', label: 'Times New Roman' },
    { value: 'calibri', label: 'Calibri' },
    { value: 'georgia', label: 'Georgia' },
];

// Define interface for DraggableItem props
interface DraggableItemProps {
    id: string;
    text: string;
    index: number;
    moveItem: (fromIndex: number, toIndex: number) => void;
}

// DnD components
const DraggableItem = ({ id, text, index, moveItem }: DraggableItemProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop(() => ({
        accept: 'item',
        hover: (item: { id: string; index: number }, monitor) => {
            if (item.index !== index) {
                moveItem(item.index, index);
                item.index = index;
            }
        },
    }));

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={`border rounded p-2 bg-white ${isDragging ? 'opacity-50' : ''}`}
            style={{ cursor: 'move' }}
            draggable="true"
            onClick={(e) => e.stopPropagation()}
        >
            {text}
        </div>
    );
};

// Main Component
const ControlPage = () => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [filteredDocuments, setFilteredDocuments] = useState<any[]>([]);
    const [formData, setFormData] = useState<DocumentControlForm>({
        corporativo: '',
        proyecto: '',
        tipoDocumento: '',
        area: '',
        subArea: '',
        fechaElaboracion: '',
        subidoPor: '',
    });
    const { currentUser } = useAuth();
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [orientacion, setOrientacion] = useState<string>('');
    const [documentacion, setDocumentacion] = useState<string>('');
    const [selectedCorporativos, setSelectedCorporativos] = useState<any[]>([]);
    const [selectedProyectos, setSelectedProyectos] = useState<any[]>([]);
    const [selectedTipoDocumento, setSelectedTipoDocumento] = useState<any>(null);
    const [selectedFuente, setSelectedFuente] = useState<any>(null);
    const [nomenclaturaItems, setNomenclaturaItems] = useState([
        { id: 'corporativo', text: 'CORPORATIVO', active: false },
        { id: 'documento', text: 'DOCUMENTO', active: false },
        { id: 'proyecto', text: 'PROYECTO', active: false },
        { id: 'area', text: 'AREA', active: false },
        { id: 'subarea', text: 'SUB-AREA', active: false },
    ]);
    const [activeNomenclaturaItems, setActiveNomenclaturaItems] = useState<any[]>([]);
    const [encabezado, setEncabezado] = useState('');
    const [cuerpoPagena, setCuerpoPagina] = useState('');
    const [piePagina, setPiePagina] = useState('');

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = [
                {
                    corporativo: 'Corporativo 1',
                    proyecto: 'Proyecto A',
                    tipoDocumento: 'Manual',
                    area: 'Contabilidad',
                    subArea: 'Finanzas',
                    fechaElaboracion: '2023-01-15',
                    subidoPor: 'Admin'
                },
                {
                    corporativo: 'Corporativo 2',
                    proyecto: 'Proyecto B',
                    tipoDocumento: 'Procedimiento',
                    area: 'Producción',
                    subArea: 'Línea 1',
                    fechaElaboracion: '2023-02-20',
                    subidoPor: 'Usuario1'
                },
            ];
            setDocuments(response);
            setFilteredDocuments(response);
        } catch (error) {
            console.error('Error al obtener los documentos:', error);
            alert('Error al cargar los documentos. Por favor, intente nuevamente.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        const filtered = documents.filter((item) => {
            return (
                (formData.corporativo ? item.corporativo.toLowerCase().includes(formData.corporativo.toLowerCase()) : true) &&
                (formData.proyecto ? item.proyecto.toLowerCase().includes(formData.proyecto.toLowerCase()) : true) &&
                (formData.tipoDocumento ? item.tipoDocumento.toLowerCase().includes(formData.tipoDocumento.toLowerCase()) : true) &&
                (formData.area ? item.area.toLowerCase().includes(formData.area.toLowerCase()) : true) &&
                (formData.subArea ? item.subArea.toLowerCase().includes(formData.subArea.toLowerCase()) : true) &&
                (formData.fechaElaboracion ? item.fechaElaboracion.includes(formData.fechaElaboracion) : true) &&
                (formData.subidoPor ? item.subidoPor.toLowerCase().includes(formData.subidoPor.toLowerCase()) : true)
            );
        });
        setFilteredDocuments(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [formData]);

    const handleModalOpen = () => {
        setActiveModal(true);
    };

    const handleModalClose = () => {
        setActiveModal(false);
    };

    const exportFilteredToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredDocuments);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Documentos');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'reporteDocumentos.xlsx');
    };

    const handleOrientacionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrientacion(e.target.value);
    };

    const toggleNomenclaturaItem = (id: string) => {
        setNomenclaturaItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, active: !item.active } : item
            )
        );

        // Update active items list for reordering
        const updatedItems = nomenclaturaItems.find(item => item.id === id);
        if (updatedItems) {
            if (!updatedItems.active) {
                // Item was inactive, now active
                setActiveNomenclaturaItems([...activeNomenclaturaItems, updatedItems]);
            } else {
                // Item was active, now inactive
                setActiveNomenclaturaItems(activeNomenclaturaItems.filter(item => item.id !== id));
            }
        }
    };

    // Prevent page reload on drag operations
    useEffect(() => {
        const preventDefaults = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        };

        document.addEventListener('dragover', preventDefaults, false);
        document.addEventListener('drop', preventDefaults, false);

        return () => {
            document.removeEventListener('dragover', preventDefaults);
            document.removeEventListener('drop', preventDefaults);
        };
    }, []);

    const moveItem = (fromIndex: number, toIndex: number) => {
        const updatedItems = [...activeNomenclaturaItems];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        setActiveNomenclaturaItems(updatedItems);
    };

    const handleDocumentacionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDocumentacion(e.target.value);
    };

    const handleSaveDocument = () => {
        const newDocument = {
            corporativo: selectedCorporativos.map(item => item.label).join(', '),
            proyecto: selectedProyectos.map(item => item.label).join(', '),
            tipoDocumento: selectedTipoDocumento?.label || '',
            area: '', // Set from form
            subArea: '', // Set from form
            fechaElaboracion: new Date().toISOString().split('T')[0],
            subidoPor: `${currentUser?.firstname} ${currentUser?.lastname}`,
        };

        setDocuments([...documents, newDocument]);
        setFilteredDocuments([...documents, newDocument]);

        handleModalClose();
    };

    return (
        <KTCardBody className="py-4 card card-grid min-w-full">
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={handleModalOpen}
                >
                    <i className="bi bi-plus-circle me-1"></i>
                    Nuevo Documento
                </button>
            </div>
            <h2 className="mb-4">Control de Documentos</h2>
            <div className="alert alert-info" role="alert">
                <strong>Nota:</strong> Para registrar un nuevo documento, haga clic en el botón "Nuevo Documento".
            </div>
            <hr />
            <p>Filtros de búsqueda</p>
            <form>
                <div className="row g-1">
                    <div className="col-md-2">
                        <label htmlFor="corporativoInput" className="form-label-sm d-block mb-1">
                            Corporativo
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="corporativoInput"
                            name="corporativo"
                            placeholder="Corporativo"
                            value={formData.corporativo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="proyectoInput" className="form-label-sm d-block mb-1">
                            Proyecto
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="proyectoInput"
                            name="proyecto"
                            placeholder="Proyecto"
                            value={formData.proyecto}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="tipoDocumentoInput" className="form-label-sm d-block mb-1">
                            Tipo de Documento
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="tipoDocumentoInput"
                            name="tipoDocumento"
                            placeholder="Tipo de Documento"
                            value={formData.tipoDocumento}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="areaInput" className="form-label-sm d-block mb-1">
                            Área
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="areaInput"
                            name="area"
                            placeholder="Área"
                            value={formData.area}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-1">
                        <label htmlFor="subAreaInput" className="form-label-sm d-block mb-1">
                            Sub-Área
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="subAreaInput"
                            name="subArea"
                            placeholder="Sub-Área"
                            value={formData.subArea}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="fechaElaboracionInput" className="form-label-sm d-block mb-1">
                            Fecha de Elaboración
                        </label>
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            id="fechaElaboracionInput"
                            name="fechaElaboracion"
                            value={formData.fechaElaboracion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-1">
                        <label htmlFor="subidoPorInput" className="form-label-sm d-block mb-1">
                            Subido Por
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="subidoPorInput"
                            name="subidoPor"
                            placeholder="Subido por"
                            value={formData.subidoPor}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </form>
            <hr />
            <p>{'Coincidencias: ' + filteredDocuments.length}</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                    onClick={exportFilteredToExcel}
                    className="btn btn-success btn-sm"
                    type="button">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Exportar a Excel
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped gy-7 gs-7">
                    <thead>
                        <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200 text-center">
                            <th className="min-w-50px">Nro</th>
                            <th className="min-w-150px">Corporativo</th>
                            <th className="min-w-150px">Proyecto</th>
                            <th className="min-w-150px">Tipo de Documento</th>
                            <th className="min-w-150px">Área</th>
                            <th className="min-w-150px">Sub-Área</th>
                            <th className="min-w-150px">Fecha de Elaboración</th>
                            <th className="min-w-150px">Subido Por</th>
                            <th className="min-w-200px">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredDocuments.length > 0 &&
                            filteredDocuments.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.corporativo}</td>
                                    <td>{item.proyecto}</td>
                                    <td>{item.tipoDocumento}</td>
                                    <td>{item.area}</td>
                                    <td>{item.subArea}</td>
                                    <td>{item.fechaElaboracion}</td>
                                    <td>{item.subidoPor}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => {
                                                // Edit logic
                                                setActiveModal(true);
                                            }}
                                        >
                                            <i className="bi bi-pencil-fill"></i> Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                // Delete logic
                                                const newDocuments = documents.filter((_, i) => i !== index);
                                                setDocuments(newDocuments);
                                                setFilteredDocuments(
                                                    filteredDocuments.filter((_, i) => i !== index)
                                                );
                                            }}
                                        >
                                            <i className="bi bi-trash-fill"></i> Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {filteredDocuments.length === 0 && <p className="text-center mb-5">No se encontraron documentos</p>}

            {activeModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content shadow-lg border-0">
                            <div className="modal-header bg-light py-3">
                                <h4 className="modal-title fw-bold d-flex align-items-center">
                                    <i className="bi bi-file-earmark-text me-2 text-primary fs-3"></i>
                                    Nuevo Documento
                                </h4>
                                <button type="button" className="btn-close" onClick={handleModalClose}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="alert alert-light-primary d-flex align-items-center mb-4">
                                    <i className="bi bi-info-circle-fill me-2 fs-4 text-primary"></i>
                                    <div>Complete los siguientes campos para configurar su documento.</div>
                                </div>

                                <form>
                                    {/* Step 1: Orientación */}
                                    <div className="card border border-gray-200 shadow-sm mb-5">
                                        <div className="card-header bg-light py-3">
                                            <h5 className="card-title mb-0 fw-bold">
                                                <span className="badge bg-primary rounded-circle me-2">1</span>
                                                Orientación del Documento
                                            </h5>
                                        </div>
                                        <div className="card-body p-4">
                                            <select
                                                className="form-select form-select-lg"
                                                value={orientacion}
                                                onChange={handleOrientacionChange}
                                            >
                                                <option value="">Seleccione la orientación</option>
                                                <option value="horizontal">Horizontal</option>
                                                <option value="vertical">Vertical</option>
                                                <option value="ambas">Ambas orientaciones</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Step 2: Formato según orientación */}
                                    {orientacion && (
                                        <div className="card border border-gray-200 shadow-sm mb-5">
                                            <div className="card-header bg-light py-3">
                                                <h5 className="card-title mb-0 fw-bold">
                                                    <span className="badge bg-primary rounded-circle me-2">2</span>
                                                    Configuración de Formato
                                                </h5>
                                            </div>

                                        </div>
                                    )}

                                    {/* Step 3: Información del documento */}
                                    <div className="card border border-gray-200 shadow-sm mb-5">
                                        <div className="card-header bg-light py-3">
                                            <h5 className="card-title mb-0 fw-bold">
                                                <span className="badge bg-primary rounded-circle me-2">3</span>
                                                Información del Documento
                                            </h5>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold mb-2">Tipo de Documento</label>
                                                    <Select
                                                        options={tiposDocumento}
                                                        value={selectedTipoDocumento}
                                                        onChange={setSelectedTipoDocumento}
                                                        placeholder="Seleccione el tipo de documento"
                                                        className="mb-2"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                borderColor: '#d1d3e0',
                                                                boxShadow: 'none',
                                                                '&:hover': { borderColor: '#b5b5c3' }
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold mb-2">Tipo de Letra</label>
                                                    <Select
                                                        options={fuentes}
                                                        value={selectedFuente}
                                                        onChange={setSelectedFuente}
                                                        placeholder="Seleccione el tipo de letra"
                                                        className="mb-2"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                borderColor: '#d1d3e0',
                                                                boxShadow: 'none',
                                                                '&:hover': { borderColor: '#b5b5c3' }
                                                            }),
                                                            singleValue: (base, { data }) => ({
                                                                ...base,
                                                                fontFamily: data.value,
                                                            }),
                                                            option: (base, { data }) => ({
                                                                ...base,
                                                                fontFamily: data.value,
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row g-4 mt-4">
                                                <div className="col-12">
                                                    <h5 className="fw-bold mb-3">Documentación</h5>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold mb-2">Corporativo</label>
                                                    <Select
                                                        isMulti
                                                        options={corporativos}
                                                        value={selectedCorporativos}
                                                        onChange={(newValue) => setSelectedCorporativos([...newValue])}
                                                        placeholder="Seleccione uno o varios corporativos"
                                                        className="mb-2"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                borderColor: '#d1d3e0',
                                                                boxShadow: 'none',
                                                                '&:hover': { borderColor: '#b5b5c3' },
                                                            }),
                                                            multiValue: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#e1f0ff',
                                                                borderRadius: '4px',
                                                            }),
                                                            multiValueLabel: (base) => ({
                                                                ...base,
                                                                color: '#3699ff',
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold mb-2">Proyecto</label>
                                                    <Select
                                                        isMulti
                                                        options={proyectos}
                                                        value={selectedProyectos}
                                                        onChange={(newValue) => setSelectedProyectos([...newValue])}
                                                        placeholder="Seleccione uno o varios proyectos"
                                                        className="mb-2"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                borderColor: '#d1d3e0',
                                                                boxShadow: 'none',
                                                                '&:hover': { borderColor: '#b5b5c3' },
                                                            }),
                                                            multiValue: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#e1f0ff',
                                                                borderRadius: '4px',
                                                            }),
                                                            multiValueLabel: (base) => ({
                                                                ...base,
                                                                color: '#3699ff',
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 4: Nomenclatura */}
                                    <div className="card border border-gray-200 shadow-sm mb-4">
                                        <div className="card-header bg-light py-3">
                                            <h5 className="card-title mb-0 fw-bold">
                                                <span className="badge bg-primary rounded-circle me-2">4</span>
                                                Orden de Nomenclaturas
                                            </h5>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="alert alert-light-primary d-flex align-items-center mb-4">
                                                <i className="bi bi-info-circle me-2"></i>
                                                <div>Seleccione y organice los elementos que desea incluir en la nomenclatura del documento.</div>
                                            </div>

                                            <div className="d-flex flex-wrap gap-3 mb-4">
                                                {nomenclaturaItems.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className={`form-check form-switch form-check-custom form-check-solid`}
                                                    >
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`check-${item.id}`}
                                                            checked={item.active}
                                                            onChange={() => toggleNomenclaturaItem(item.id)}
                                                        />
                                                        <label className="form-check-label fw-semibold ms-2" htmlFor={`check-${item.id}`}>
                                                            {item.text}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>

                                            {activeNomenclaturaItems.length > 0 && (
                                                <div className="p-4 border rounded bg-light-warning">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <i className="bi bi-arrows-move me-2 text-warning fs-4"></i>
                                                        <p className="text-muted mb-0">
                                                            Arrastre los elementos para establecer el orden de la nomenclatura
                                                        </p>
                                                    </div>
                                                    <DndProvider backend={HTML5Backend}>
                                                        <div className="d-flex flex-wrap gap-3">
                                                            {activeNomenclaturaItems.map((item, index) => (
                                                                <DraggableItem
                                                                    key={item.id}
                                                                    id={item.id}
                                                                    text={item.text}
                                                                    index={index}
                                                                    moveItem={moveItem}
                                                                />
                                                            ))}
                                                        </div>
                                                    </DndProvider>

                                                    {activeNomenclaturaItems.length > 1 && (
                                                        <div className="mt-4 p-3 border rounded bg-white">
                                                            <h6 className="fw-bold mb-2">Vista previa de nomenclatura:</h6>
                                                            <div className="bg-light p-3 rounded fs-6">
                                                                {activeNomenclaturaItems.map((item, idx) => (
                                                                    <span key={idx}>
                                                                        <span className="badge bg-primary">{item.text}</span>
                                                                        {idx < activeNomenclaturaItems.length - 1 && <span className="mx-1">-</span>}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-body p-4">
                                        {orientacion === 'horizontal' || orientacion === 'ambas' ? (
                                            <div className="mb-4 p-4 border rounded bg-light-warning">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                    <i className="bi bi-layout-sidebar me-2"></i>
                                                    Formato Horizontal
                                                </h6>
                                                <div className="row g-4">
                                                    <div className="col-md-4">
                                                        <div className="card h-100 border-0 shadow-sm">
                                                            <div className="card-header bg-light d-flex align-items-center justify-content-center py-3">
                                                                <h6 className="mb-0 fs-5 fw-semibold text-center"><strong>Encabezado</strong></h6>
                                                            </div>
                                                            <div className="card-body">
                                                                <select
                                                                    className="form-select mb-3"
                                                                    value={encabezado}
                                                                    onChange={(e) => setEncabezado(e.target.value)}
                                                                >
                                                                    <option value="">Seleccione</option>
                                                                    <option value="primera">Primera cara</option>
                                                                    <option value="todas">Todas las caras</option>
                                                                </select>
                                                                <div className="text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary btn-sm px-4"
                                                                        onClick={() => window.location.href = '/iso9001/document/draw'}
                                                                        disabled={!encabezado}
                                                                    >
                                                                        <i className="bi bi-pencil me-1"></i> Dibujar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="card h-100 border-0 shadow-sm">
                                                            <div className="card-header bg-light d-flex align-items-center justify-content-center py-3">
                                                                <h6 className="mb-0 fs-5 fw-semibold text-center"><strong>Cuerpo de página</strong></h6>
                                                            </div>
                                                            <div className="card-body">
                                                                <select
                                                                    className="form-select mb-3"
                                                                    value={cuerpoPagena}
                                                                    onChange={(e) => setCuerpoPagina(e.target.value)}
                                                                >
                                                                    <option value="">Seleccione</option>
                                                                    <option value="primera">Primera cara</option>
                                                                </select>
                                                                <div className="text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary btn-sm px-4"
                                                                        onClick={() => window.location.href = '/iso9001/document/draw'}
                                                                        disabled={!cuerpoPagena}
                                                                    >
                                                                        <i className="bi bi-pencil me-1"></i> Dibujar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="card h-100 border-0 shadow-sm">
                                                            <div className="card-header bg-light d-flex align-items-center justify-content-center py-3">
                                                                <h6 className="mb-0 fs-5 fw-semibold text-center"><strong>Pie de página</strong></h6>
                                                            </div>
                                                            <div className="card-body">
                                                                <select
                                                                    className="form-select mb-3"
                                                                    value={piePagina}
                                                                    onChange={(e) => setPiePagina(e.target.value)}
                                                                >
                                                                    <option value="">Seleccione</option>
                                                                    <option value="primera">Primera cara</option>
                                                                    <option value="todas">Todas las caras</option>
                                                                </select>
                                                                <div className="text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary btn-sm px-4"
                                                                        onClick={() => window.location.href = '/iso9001/document/draw'}
                                                                        disabled={!piePagina}
                                                                    >
                                                                        <i className="bi bi-pencil me-1"></i> Dibujar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}

                                        {orientacion === 'vertical' || orientacion === 'ambas' ? (
                                            <div className="mb-4 p-4 border rounded bg-light-info">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                    <i className="bi bi-layout-text-window me-2"></i>
                                                    Formato Vertical
                                                </h6>
                                                <div className="row g-4">
                                                    <div className="col-md-4">
                                                        <div className="card h-100 border-0 shadow-sm">
                                                            <div className="card-header bg-light d-flex align-items-center justify-content-center py-3">
                                                                <h6 className="mb-0 fs-5 fw-semibold text-center"><strong>Encabezado</strong></h6>
                                                            </div>
                                                            <div className="card-body">
                                                                <select
                                                                    className="form-select mb-3"
                                                                    value={encabezado}
                                                                    onChange={(e) => setEncabezado(e.target.value)}
                                                                >
                                                                    <option value="">Seleccione</option>
                                                                    <option value="primera">Primera cara</option>
                                                                    <option value="todas">Todas las caras</option>
                                                                </select>
                                                                <div className="text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary btn-sm px-4"
                                                                        onClick={() => window.location.href = '/iso9001/document/draw'}
                                                                        disabled={!encabezado}
                                                                    >
                                                                        <i className="bi bi-pencil me-1"></i> Dibujar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="card h-100 border-0 shadow-sm">
                                                            <div className="card-header bg-light d-flex align-items-center justify-content-center py-3">
                                                                <h6 className="mb-0 fs-5 fw-semibold text-center"><strong>Cuerpo de página</strong></h6>
                                                            </div>
                                                            <div className="card-body">
                                                                <select
                                                                    className="form-select mb-3"
                                                                    value={cuerpoPagena}
                                                                    onChange={(e) => setCuerpoPagina(e.target.value)}
                                                                >
                                                                    <option value="">Seleccione</option>
                                                                    <option value="primera">Primera cara</option>
                                                                </select>
                                                                <div className="text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary btn-sm px-4"
                                                                        onClick={() => window.location.href = '/iso9001/document/draw'}
                                                                        disabled={!cuerpoPagena}
                                                                    >
                                                                        <i className="bi bi-pencil me-1"></i> Dibujar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="card h-100 border-0 shadow-sm">
                                                            <div className="card-header bg-light d-flex align-items-center justify-content-center py-3">
                                                                <h6 className="mb-0 fs-5 fw-semibold text-center"><strong>Pie de página</strong></h6>
                                                            </div>
                                                            <div className="card-body">
                                                                <select
                                                                    className="form-select mb-3"
                                                                    value={piePagina}
                                                                    onChange={(e) => setPiePagina(e.target.value)}
                                                                >
                                                                    <option value="">Seleccione</option>
                                                                    <option value="primera">Primera cara</option>
                                                                    <option value="todas">Todas las caras</option>
                                                                </select>
                                                                <div className="text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary btn-sm px-4"
                                                                        onClick={() => window.location.href = '/iso9001/document/draw'}
                                                                        disabled={!piePagina}
                                                                    >
                                                                        <i className="bi bi-pencil me-1"></i> Dibujar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer bg-light">
                                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                                    <i className="bi bi-x-circle me-1"></i> Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary px-4"
                                    onClick={handleSaveDocument}
                                    disabled={!selectedTipoDocumento || !orientacion || !documentacion || (documentacion === 'corporativo' && selectedCorporativos.length === 0) || (documentacion === 'proyecto' && selectedProyectos.length === 0)}
                                >
                                    <i className="bi bi-save me-1"></i> Guardar Documento
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </KTCardBody>
    );
};

export default ControlPage;