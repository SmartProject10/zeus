import { useEffect, useState } from 'react';
import { KTCardBody } from '../../../../../_zeus/helpers';
import * as XLSX from 'xlsx';
import { useAuth } from '@zeus/@hooks/auth/useAuth.tsx';
import { saveAs } from 'file-saver';
import AreasButton from '../buttons/areasgButton';
import { areas as areaOptions } from './data/areasData';

// Usa `areaOptions` en lugar de definir las áreas directamente
interface AreaForm {
    area: string;
    sistemaGestion: string;
    nomenclatura: string;
    fechaElaboracion: string;
    subidoPor: string;
}

const Areas = () => {
    const [areas, setAreas] = useState<any[]>([]);
    const [filteredAreas, setFilteredAreas] = useState<any[]>([]);
    const [formData, setFormData] = useState<AreaForm>({
        area: '',
        sistemaGestion: '',
        nomenclatura: '',
        fechaElaboracion: '',
        subidoPor: '',
    });
    const { currentUser } = useAuth();
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [newAreaData, setNewAreaData] = useState<{
        area: string;
        sistemaGestion: string;
        nomenclatura: string;
        customArea?: string;
    }>({
        area: '',
        sistemaGestion: '',
        nomenclatura: '',
    });

    useEffect(() => {
        fetchAreas();
    }, []);

    const fetchAreas = async () => {
        try {
            const response = [
                { area: 'Contabilidad', sistemaGestion: 'ISO 9001', nomenclatura: 'CONT', fechaElaboracion: '2023-01-15', subidoPor: 'Admin' },
                { area: 'Recursos Humanos', sistemaGestion: 'ISO 9001', nomenclatura: 'RRHH', fechaElaboracion: '2023-02-20', subidoPor: 'Usuario1' },
            ];
            setAreas(response);
            setFilteredAreas(response);
        } catch (error) {
            console.error('Error al obtener las áreas:', error);
            alert('Error al cargar las áreas. Por favor, intente nuevamente.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNewAreaInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewAreaData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        const filtered = areas.filter((area) => {
            return (
                (formData.area ? area.area.toLowerCase().includes(formData.area.toLowerCase()) : true) &&
                (formData.sistemaGestion ? area.sistemaGestion.toLowerCase().includes(formData.sistemaGestion.toLowerCase()) : true) &&
                (formData.nomenclatura ? area.nomenclatura.toLowerCase().includes(formData.nomenclatura.toLowerCase()) : true) &&
                (formData.fechaElaboracion ? area.fechaElaboracion.includes(formData.fechaElaboracion) : true) &&
                (formData.subidoPor ? area.subidoPor.toLowerCase().includes(formData.subidoPor.toLowerCase()) : true)
            );
        });
        setFilteredAreas(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [formData]);

    const handleModalOpen = () => {
        setActiveModal(true);
        setNewAreaData({
            area: '',
            sistemaGestion: '',
            nomenclatura: '',
        });
    };

    const handleModalClose = () => {
        setActiveModal(false);
    };

    const handleSaveNewArea = () => {
        const newArea = {
            area: newAreaData.area === 'Otros' ? newAreaData.customArea : newAreaData.area,
            sistemaGestion: newAreaData.sistemaGestion,
            nomenclatura: newAreaData.nomenclatura,
            fechaElaboracion: new Date().toISOString().split('T')[0],
            subidoPor: `${currentUser?.firstname} ${currentUser?.lastname}`,
        };

        setAreas([...areas, newArea]);
        setFilteredAreas([...areas, newArea]);

        handleModalClose();
    };

    const exportFilteredToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredAreas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Areas');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'reporteAreas.xlsx');
    };

    return (
        <KTCardBody className="py-4 card card-grid min-w-full">
            <div className="d-flex justify-content-end mb-3">
                <AreasButton onOpen={handleModalOpen} />
            </div>
            <h2 className="mb-4">Áreas / Sistemas de Gestión</h2>
            <div className="alert alert-info" role="alert">
                <strong>Nota:</strong> Para registrar una nueva área, haga clic en el botón "Nueva Área/SG".
            </div>
            <hr />
            <p>Filtros de búsqueda</p>
            <form>
                <div className="row g-1">
                    <div className="col-md-3">
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
                    <div className="col-md-3">
                        <label htmlFor="sistemaGestionInput" className="form-label-sm d-block mb-1">
                            Sistema de Gestión
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="sistemaGestionInput"
                            name="sistemaGestion"
                            placeholder="Sistema de Gestión"
                            value={formData.sistemaGestion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2">
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
                    <div className="col-md-2">
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
            <p>{'Coincidencias: ' + filteredAreas.length}</p>
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
                            <th className="min-w-200px">Área</th>
                            <th className="min-w-200px">Sistema de Gestión</th>
                            <th className="min-w-200px">Nomenclatura</th>
                            <th className="min-w-200px">Fecha de Elaboración</th>
                            <th className="min-w-200px">Subido Por</th>
                            <th className="min-w-200px">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredAreas.length > 0 &&
                            filteredAreas.map((area, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{area.area}</td>
                                    <td>{area.sistemaGestion}</td>
                                    <td>{area.nomenclatura}</td>
                                    <td>{area.fechaElaboracion}</td>
                                    <td>{area.subidoPor}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => {
                                                setNewAreaData({
                                                    area: area.area,
                                                    sistemaGestion: area.sistemaGestion,
                                                    nomenclatura: area.nomenclatura,
                                                });
                                                setActiveModal(true);
                                            }}
                                        >
                                            <i className="bi bi-pencil-fill"></i> Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                const newAreas = areas.filter((_, i) => i !== index);
                                                setAreas(newAreas);
                                                setFilteredAreas(
                                                    filteredAreas.filter((_, i) => i !== index)
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
            {filteredAreas.length === 0 && <p className="text-center mb-5">No se encontraron áreas</p>}

            {activeModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nueva Área/SG</h5>
                                <button type="button" className="btn-close" onClick={handleModalClose}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="newAreaInput" className="form-label">Área</label>
                                        <select
                                            className="form-select"
                                            id="newAreaInput"
                                            name="area"
                                            value={newAreaData.area}
                                            onChange={handleNewAreaInputChange}
                                            required
                                        >
                                            <option value="">Seleccione un área</option>
                                            {areaOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newSistemaGestionInput" className="form-label">Sistema de Gestión</label>
                                        <input
                                            type="text"
                                            className="form-control mt-2"
                                            id="newSistemaGestionInput"
                                            name="sistemaGestion"
                                            value={newAreaData.sistemaGestion}
                                            onChange={handleNewAreaInputChange}
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
                                            value={newAreaData.nomenclatura}
                                            onChange={handleNewAreaInputChange}
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
                                    onClick={handleSaveNewArea}
                                    disabled={!newAreaData.area || !newAreaData.nomenclatura}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </KTCardBody>
    );
};

export { Areas };