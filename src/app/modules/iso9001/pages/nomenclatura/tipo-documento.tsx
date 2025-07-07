import { useEffect, useState } from 'react';
import { KTCardBody } from '../../../../../_zeus/helpers';
import * as XLSX from 'xlsx';
import { useAuth } from '@zeus/@hooks/auth/useAuth.tsx'
import { saveAs } from 'file-saver';
import DocumentButton from '../buttons/documentButton';

interface TipoDocumentoForm {
    tipo: string;
    nomenclatura: string;
    fechaElaboracion: string;
    subidoPor: string;
}

const TipoDocumento = () => {
    const [tiposDocumento, setTiposDocumento] = useState<any[]>([]);
    const [filteredTiposDocumento, setFilteredTiposDocumento] = useState<any[]>([]);
    const [formData, setFormData] = useState<TipoDocumentoForm>({
        tipo: '',
        nomenclatura: '',
        fechaElaboracion: '',
        subidoPor: '',
    });
    const { currentUser } = useAuth()
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [newDocumentData, setNewDocumentData] = useState({
        tipo: '',
        nomenclatura: '',
        fechaElaboracion: '',
        subidoPor: '',
    });

    useEffect(() => {
        fetchTiposDocumento();
    }, []);

    const fetchTiposDocumento = async () => {
        // Simulación de datos
        try {
            // Datos de ejemplo para tipos de documento
            const response = [
                { tipo: 'Procedimiento', nomenclatura: 'PR', fechaElaboracion: '2023-01-15', subidoPor: 'Admin' },
                { tipo: 'Instructivo', nomenclatura: 'IT', fechaElaboracion: '2023-02-20', subidoPor: 'Usuario1' },
            ];
            console.log('Datos cargados:', response);
            setTiposDocumento(response);
            setFilteredTiposDocumento(response);
        } catch (error) {
            console.error('Error al obtener los tipos de documento:', error);
            // Mostrar mensaje de error al usuario
            alert('Error al cargar los tipos de documento. Por favor, intente nuevamente.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNewDocumentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewDocumentData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        const filtered = tiposDocumento.filter((doc) => {
            return (
                (formData.tipo ? doc.tipo.toLowerCase().includes(formData.tipo.toLowerCase()) : true) &&
                (formData.nomenclatura ? doc.nomenclatura.toLowerCase().includes(formData.nomenclatura.toLowerCase()) : true) &&
                (formData.fechaElaboracion ? doc.fechaElaboracion.includes(formData.fechaElaboracion) : true) &&
                (formData.subidoPor ? doc.subidoPor.toLowerCase().includes(formData.subidoPor.toLowerCase()) : true)
            );
        });
        setFilteredTiposDocumento(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [formData]);

    const handleModalOpen = () => {
        setActiveModal(true);
        setNewDocumentData({
            tipo: '',
            nomenclatura: '',
            fechaElaboracion: '',
            subidoPor: '',
        });
    };

    const handleModalClose = () => {
        setActiveModal(false);
    };

    const handleSaveNewDocument = () => {
        // Add the new document type to the list
        const newDocType = {
            tipo: newDocumentData.tipo,
            nomenclatura: newDocumentData.nomenclatura,
            fechaElaboracion: new Date().toISOString().split('T')[0],
            subidoPor: `${currentUser?.firstname} ${currentUser?.lastname}`,
        };

        setTiposDocumento([...tiposDocumento, newDocType]);
        setFilteredTiposDocumento([...tiposDocumento, newDocType]);

        // Close the modal
        handleModalClose();
    };


    const exportFilteredToExcel = () => {
        // Crear una hoja de trabajo a partir de los datos
        const worksheet = XLSX.utils.json_to_sheet(filteredTiposDocumento)

        // Crear un libro de trabajo y agregar la hoja de trabajo
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'TiposDocumento')

        // Generar un archivo de Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

        // Guardar el archivo usando file-saver
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' })

        saveAs(data, 'reporteTiposDocumento.xlsx')
    }

    return (
        <KTCardBody className="py-4 card card-grid min-w-full">
            <div className="d-flex justify-content-end mb-3">
                <DocumentButton onOpen={handleModalOpen} />
            </div>
            <h2 className="mb-4">Registro de Tipos de Documento</h2>
            <div className="alert alert-info" role="alert">
                <strong>Nota:</strong> Para registrar un nuevo tipo de documento, haga clic en el botón "Nuevo Documento".
                Complete el formulario y haga clic en "Registrar".
            </div>
            <hr />
            <p>Filtros de búsqueda</p>
            <form>
                <div className="row g-1">
                    <div className="col-md-3">
                        <label htmlFor="tipoInput" className="form-label-sm d-block mb-1">
                            Tipo
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="tipoInput"
                            name="tipo"
                            placeholder="Tipo de documento"
                            value={formData.tipo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="nomenclaturaInput" className="form-label-sm d-block mb-1">
                            Nomenclatura
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="nomenclaturaInput"
                            name="nomenclatura"
                            placeholder="Nomenclatura"
                            value={formData.nomenclatura}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
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
                    <div className="col-md-3">
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
            <p>{'Coincidencias: ' + filteredTiposDocumento.length}</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                    className="btn btn-success btn-sm disabled"
                    type="button">
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Importar a Excel
                </button>
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
                            <th className="min-w-200px">Tipo</th>
                            <th className="min-w-200px">Nomenclatura</th>
                            <th className="min-w-200px">Fecha de Elaboración</th>
                            <th className="min-w-200px">Subido Por</th>
                            <th className="min-w-200px">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredTiposDocumento.length > 0 &&
                            filteredTiposDocumento.map((doc, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{doc.tipo}</td>
                                    <td>{doc.nomenclatura}</td>
                                    <td>{doc.fechaElaboracion}</td>
                                    <td>{doc.subidoPor}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => {
                                                setNewDocumentData({
                                                    tipo: doc.tipo,
                                                    nomenclatura: doc.nomenclatura,
                                                    fechaElaboracion: doc.fechaElaboracion,
                                                    subidoPor: doc.subidoPor,
                                                });
                                                setActiveModal(true);
                                            }}
                                        >
                                            <i className="bi bi-pencil-fill"></i> Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                // Filter out the document at this index
                                                const newTiposDocumento = tiposDocumento.filter((_, i) => i !== index);
                                                setTiposDocumento(newTiposDocumento);
                                                setFilteredTiposDocumento(
                                                    filteredTiposDocumento.filter((_, i) => i !== index)
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
            {filteredTiposDocumento.length === 0 && <p className="text-center mb-5">No se encontraron tipos de documento</p>}

            {/* Modal for new document type */}
            {
                activeModal && (
                    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Nuevo Tipo de Documento</h5>
                                    <button type="button" className="btn-close" onClick={handleModalClose}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="newTipoInput" className="form-label">Tipo de Documento</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="newTipoInput"
                                                name="tipo"
                                                value={newDocumentData.tipo}
                                                onChange={handleNewDocumentInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="newNomenclaturaInput" className="form-label">Nomenclatura</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="newNomenclaturaInput"
                                                name="nomenclatura"
                                                value={newDocumentData.nomenclatura}
                                                onChange={handleNewDocumentInputChange}
                                                required
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancelar</button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSaveNewDocument}
                                        disabled={!newDocumentData.tipo || !newDocumentData.nomenclatura}
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </KTCardBody >
    );
};

export { TipoDocumento };