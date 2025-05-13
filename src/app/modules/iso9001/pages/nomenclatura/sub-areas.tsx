import { useEffect, useState } from 'react';
import { KTCardBody } from '../../../../../_zeus/helpers';
import * as XLSX from 'xlsx';
import { useAuth } from '@zeus/@hooks/auth/useAuth.tsx';
import { saveAs } from 'file-saver';
import SubareasButton from '../buttons/subareasButton';
import { areas } from './data/areasData';
import { subAreasByArea } from './data/areasData';

// Usa `areas` en lugar de definir las áreas directamente

interface SubAreaForm {
    area: string;
    subArea: string;
    sistemaGestion: string;
    nomenclatura: string;
    fechaElaboracion: string;
    subidoPor: string;
}

const SubAreas = () => {
    const [subAreas, setSubAreas] = useState<any[]>([]);
    const [filteredSubAreas, setFilteredSubAreas] = useState<any[]>([]);
    const [formData, setFormData] = useState<SubAreaForm>({
        area: '',
        subArea: '',
        sistemaGestion: '',
        nomenclatura: '',
        fechaElaboracion: '',
        subidoPor: '',
    });
    const { currentUser } = useAuth();
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [newSubAreaData, setNewSubAreaData] = useState<{
        area: string;
        subArea: string;
        sistemaGestion: string;
        nomenclatura: string;
        customArea?: string;
    }>({
        area: '',
        subArea: '',
        sistemaGestion: '',
        nomenclatura: '',
    });

    useEffect(() => {
        fetchSubAreas();
    }, []);

    const fetchSubAreas = async () => {
        try {
            const response = [
                { area: 'Contabilidad', subArea: 'Finanzas', sistemaGestion: 'ISO 9001', nomenclatura: 'CON-FIN', fechaElaboracion: '2023-01-15', subidoPor: 'Admin' },
                { area: 'Produccion', subArea: 'Línea 1', sistemaGestion: 'ISO 9001', nomenclatura: 'PRO-L1', fechaElaboracion: '2023-02-20', subidoPor: 'Usuario1' },
            ];
            setSubAreas(response);
            setFilteredSubAreas(response);
        } catch (error) {
            console.error('Error al obtener las sub-áreas:', error);
            alert('Error al cargar las sub-áreas. Por favor, intente nuevamente.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNewSubAreaInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewSubAreaData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Si cambia el área, actualizar sistema de gestión
        if (name === 'area') {
            setNewSubAreaData((prevState) => ({
                ...prevState,
                subArea: '',
                sistemaGestion: '',
            }));
        }
    };

    const applyFilters = () => {
        const filtered = subAreas.filter((item) => {
            return (
                (formData.area ? item.area.toLowerCase().includes(formData.area.toLowerCase()) : true) &&
                (formData.subArea ? item.subArea.toLowerCase().includes(formData.subArea.toLowerCase()) : true) &&
                (formData.sistemaGestion ? item.sistemaGestion.toLowerCase().includes(formData.sistemaGestion.toLowerCase()) : true) &&
                (formData.nomenclatura ? item.nomenclatura.toLowerCase().includes(formData.nomenclatura.toLowerCase()) : true) &&
                (formData.fechaElaboracion ? item.fechaElaboracion.includes(formData.fechaElaboracion) : true) &&
                (formData.subidoPor ? item.subidoPor.toLowerCase().includes(formData.subidoPor.toLowerCase()) : true)
            );
        });
        setFilteredSubAreas(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [formData]);

    const handleModalOpen = () => {
        setActiveModal(true);
        setNewSubAreaData({
            area: '',
            subArea: '',
            sistemaGestion: '',
            nomenclatura: '',
        });
    };

    const handleModalClose = () => {
        setActiveModal(false);
    };

    const handleSaveNewSubArea = () => {
        const newSubArea = {
            area: newSubAreaData.area,
            subArea: newSubAreaData.subArea,
            sistemaGestion: newSubAreaData.sistemaGestion,
            nomenclatura: newSubAreaData.nomenclatura,
            fechaElaboracion: new Date().toISOString().split('T')[0],
            subidoPor: `${currentUser?.firstname} ${currentUser?.lastname}`,
        };

        setSubAreas([...subAreas, newSubArea]);
        setFilteredSubAreas([...subAreas, newSubArea]);

        handleModalClose();
    };

    const exportFilteredToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredSubAreas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SubAreas');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'reporteSubAreas.xlsx');
    };

    return (
        <KTCardBody className="py-4 card card-grid min-w-full">
            <div className="d-flex justify-content-end mb-3">
                <SubareasButton onOpen={handleModalOpen} />
            </div>
            <h2 className="mb-4">Registro de Sub-Áreas</h2>
            <div className="alert alert-info" role="alert">
                <strong>Nota:</strong> Para registrar una nueva sub-área, haga clic en el botón "Nueva Sub-Área".
            </div>
            <hr />
            <p>Filtros de búsqueda</p>
            <form>
                <div className="row g-1">
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
                    <div className="col-md-2">
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
            <p>{'Coincidencias: ' + filteredSubAreas.length}</p>
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
                            <th className="min-w-150px">Área</th>
                            <th className="min-w-150px">Sub-Área</th>
                            <th className="min-w-200px">Sistema de Gestión/Sub-Área</th>
                            <th className="min-w-150px">Nomenclatura</th>
                            <th className="min-w-150px">Fecha de Elaboración</th>
                            <th className="min-w-150px">Subido Por</th>
                            <th className="min-w-200px">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredSubAreas.length > 0 &&
                            filteredSubAreas.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.area}</td>
                                    <td>{item.subArea}</td>
                                    <td>{item.sistemaGestion}</td>
                                    <td>{item.nomenclatura}</td>
                                    <td>{item.fechaElaboracion}</td>
                                    <td>{item.subidoPor}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => {
                                                setNewSubAreaData({
                                                    area: item.area,
                                                    subArea: item.subArea,
                                                    sistemaGestion: item.sistemaGestion,
                                                    nomenclatura: item.nomenclatura,
                                                });
                                                setActiveModal(true);
                                            }}
                                        >
                                            <i className="bi bi-pencil-fill"></i> Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                const newSubAreas = subAreas.filter((_, i) => i !== index);
                                                setSubAreas(newSubAreas);
                                                setFilteredSubAreas(
                                                    filteredSubAreas.filter((_, i) => i !== index)
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
            {filteredSubAreas.length === 0 && <p className="text-center mb-5">No se encontraron sub-áreas</p>}

            {activeModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nueva Sub-Área</h5>
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
                                            value={newSubAreaData.area}
                                            onChange={handleNewSubAreaInputChange}
                                            required
                                        >
                                            <option value="">Seleccione un área</option>
                                            {areas.map((area, index) => (
                                                <option key={index} value={area}>{area}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newSubAreaInput" className="form-label">Sub-Área</label>
                                        <select
                                            className="form-select"
                                            id="newSubAreaInput"
                                            name="subArea"
                                            value={newSubAreaData.subArea}
                                            onChange={handleNewSubAreaInputChange}
                                            disabled={!newSubAreaData.area}
                                            required
                                        >
                                            <option value="">Seleccione una sub-área</option>
                                            {newSubAreaData.area && subAreasByArea[newSubAreaData.area]?.map((subArea, index) => (
                                                <option key={index} value={subArea}>{subArea}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newSistemaGestionInput" className="form-label">Sistema de Gestión</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="newSistemaGestionInput"
                                            name="sistemaGestion"
                                            onChange={handleNewSubAreaInputChange}
                                            value={newSubAreaData.sistemaGestion}
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
                                            value={newSubAreaData.nomenclatura}
                                            onChange={handleNewSubAreaInputChange}
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
                                    onClick={handleSaveNewSubArea}
                                    disabled={!newSubAreaData.area || !newSubAreaData.subArea || !newSubAreaData.nomenclatura}
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

export { SubAreas };