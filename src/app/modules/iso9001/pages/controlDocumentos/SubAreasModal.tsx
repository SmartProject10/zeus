import React, { useEffect, useState } from 'react';
import { AreasResponse, SubAreasResponse } from './core/_models';
import Swal from 'sweetalert2';
import { BASE_URL } from '@zeus/app/modules/iso45001/pages/accidentes/core/_requests';

interface SubAreasModalProps {
    saveSubArea: (subarea: SubAreasResponse[]) => void; // Pasar arreglo completo
}

const SubAreasModal = ({ saveSubArea }: SubAreasModalProps) => {
    const initialValues: SubAreasResponse = {
        area: '',
        subArea: '',
        sistemaGestion: '',
        nomenclatura: ''
    };

    let apiUrl = `${BASE_URL}/api/control-documentos`

    const [formData, setFormData] = useState(initialValues);
    const [tableData, setTableData] = useState<SubAreasResponse[]>([]); // Nuevos datos
    const [areas, setAreas] = useState<AreasResponse[]>([]); // Datos del backend
    const [dataSourceSubAreas, setDataSourceSubAreas] = useState<SubAreasResponse[]>([]); // Datos de subáreas en la BD
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false); // Estado para el modal

    const closeModalButtonRef = React.createRef<HTMLButtonElement>();

    // Obtener las subareas desde el backend
    const fetchSubAreas = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/getSubAreas`);
            const data = await response.json();

            if (Array.isArray(data)) {
                setDataSourceSubAreas(data); // Guardar los datos del backend
            } else {
                setDataSourceSubAreas([]);
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar las subareas.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const getAreas = async () => {
        try {
            const response = await fetch(`${apiUrl}/getAreas`);
            const data = await response.json();

            if (Array.isArray(data)) {
                setAreas(data); // Guardar los datos del backend
            } else {
                setAreas([]);
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar las areas.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddTableData = () => {
        const { area, subArea, sistemaGestion, nomenclatura } = formData;

        if (!area || !subArea || !sistemaGestion || !nomenclatura) {
            Swal.fire({
                icon: 'error',
                title: 'Por favor rellene todos los campos',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        const data = { ...formData };

        // Agregar solo los nuevos datos
        setTableData((prevData) => [...prevData, data]);
        setFormData(initialValues); // Resetear el formulario
    };

    // Manejar la eliminación, diferenciando si está en la base de datos o es nuevo
    const handleDeleteTableData = async (data: SubAreasResponse, index: number) => {
        if (data._id) {
            // Si el documento tiene un ID, significa que está guardado en la base de datos, así que lo eliminamos del servidor.
            Swal.fire({
                title: '¿Está seguro que desea eliminar la subárea?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        // Llamar al backend para eliminar
                        const response = await fetch(`${apiUrl}/deleteSubArea/${data._id}`, { method: 'DELETE' });
                        if (!response.ok) {
                            throw new Error('Error al eliminar la subárea');
                        }

                        // Eliminar del estado
                        setDataSourceSubAreas((prevData) => prevData.filter((doc) => doc._id !== data._id));
                        Swal.fire('Eliminado', 'La subárea ha sido eliminada', 'success');
                        getAreas();
                    } catch (error) {
                        Swal.fire('Error', 'No se pudo eliminar la subárea', 'error');
                    }
                }
            });
        } else {
            // Si no tiene ID, es un documento nuevo que aún no se ha guardado
            setTableData((prevData) => prevData.filter((subArea) => subArea.subArea !== data.subArea)); // Identificar por subArea
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Combinar los datos nuevos y los existentes
        const allDocuments = [...dataSourceSubAreas, ...tableData];

        try {
            saveSubArea(allDocuments); // Guardar todos los datos
            closeModalButtonRef.current?.click(); // Cerrar modal si el guardado fue exitoso
            setTableData([]); // Limpiar los nuevos datos
        } catch (error) {
            Swal.fire('Error', 'No se pudo guardar la subárea', 'error');
        }
    };

    // Excluir las áreas que ya están seleccionadas como subáreas
    const getAvailableAreas = () => {
        const selectedSubAreas = tableData.map((data) => data.subArea); // Subáreas ya seleccionadas
        return areas.filter((area) => !selectedSubAreas.includes(area.area))
            .sort((a, b) => a.area.localeCompare(b.area)); // Excluir las seleccionadas
    };

    const getAvailableSubAreas = () => {
        const selectedArea = formData.area; // Área seleccionada actualmente
        const selectedSubAreas = tableData.map((data) => data.subArea); // Subáreas ya seleccionadas temporalmente

        // Obtener las áreas que ya están siendo usadas como "Área" en la tabla
        const areasUsedAsArea = [...dataSourceSubAreas, ...tableData].map(item => item.area);

        // Obtener todas las áreas como posibles subáreas, excluyendo las que ya están como área en la tabla y el área seleccionada
        const areasAsSubAreas = areas
            .map(area => area.area)
            .filter(area => area !== selectedArea && !areasUsedAsArea.includes(area)) // Excluir el área seleccionada y las que están como área en la tabla
            .sort((a, b) => a.localeCompare(b)); // Ordenar alfabéticamente

        // Lista de todas las subáreas ya guardadas en la base de datos
        const subAreasFromDb = dataSourceSubAreas
            .map(subArea => subArea.subArea)
            .filter(subArea => subArea !== selectedArea) // Excluir si ya está guardada
            .sort((a, b) => a.localeCompare(b)); // Ordenar alfabéticamente

        // Combinar las áreas y subáreas de la base de datos, filtrando las ya seleccionadas
        const allSubAreas = [...areasAsSubAreas, ...subAreasFromDb]
            .filter(subArea => !selectedSubAreas.includes(subArea)); // Filtrar las seleccionadas temporalmente

        return allSubAreas;
    };

    useEffect(() => {
        const modal = document.getElementById('staticBackdropSubArea');

        const handleModalOpen = () => {
            setModalOpen(true);
        };

        const handleModalClose = () => {
            setModalOpen(false);
        };

        modal?.addEventListener('shown.bs.modal', handleModalOpen);
        modal?.addEventListener('hidden.bs.modal', handleModalClose);

        return () => {
            modal?.removeEventListener('shown.bs.modal', handleModalOpen);
            modal?.removeEventListener('hidden.bs.modal', handleModalClose);
        };
    }, []);

    // Ejecutar fetchSubAreas cuando el modal se abre
    useEffect(() => {
        if (modalOpen) {
            fetchSubAreas();
            getAreas();
            // getAvailableSubAreas();
        }
    }, [modalOpen]);

    // Combinar los datos de la base de datos con los datos del formulario
    const combinedTableData = [...dataSourceSubAreas, ...tableData];

    return (
        <div className="modal fade" id="staticBackdropSubArea" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title">Nueva Sub-Area</h1>
                        <button ref={closeModalButtonRef} type="button" className="btn-close" id="closeModalButton" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card shadow-none mb-0">
                            <div className="card-body bg-secondary ">
                                <div className="row gy-4 mb-10">
                                    <div className="col-sm-6">
                                        <label className="required form-label">Área</label>
                                        <select
                                            name="area"
                                            className="form-select"
                                            value={formData.area}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Seleccione</option>
                                            {getAvailableAreas().map((area) => (
                                                <option key={area._id} value={area.area}>{area.area}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="subarea" className="required form-label">Subárea</label>
                                        <select
                                            name="subArea"
                                            className="form-select"
                                            value={formData.subArea}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Seleccione</option>
                                            {getAvailableSubAreas().map((area, index) => (
                                                <option key={index} value={area}>{area}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="sistemaGestion" className="required form-label">Sistema de gestión</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Sistema de Gestión"
                                            name="sistemaGestion"
                                            value={formData.sistemaGestion}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="nomenclatura" className="required form-label">Nomenclatura</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nomenclatura"
                                            name="nomenclatura"
                                            value={formData.nomenclatura}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-12 text-end">
                                        <button
                                            type="button"
                                            onClick={handleAddTableData}
                                            className="btn btn-sm btn-primary">
                                            Agregar
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="table-responsive mt-10">
                                    <table className="table table-secondary table-row-gray-300 align-middle gs-7">
                                        <thead>
                                            <tr className="fw-bold border-bottom-2 border-gray-200">
                                                <th>Area</th>
                                                <th>Sub-Area</th>
                                                <th>Sistema de Gestion</th>
                                                <th>Nomenclatura</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {combinedTableData?.length > 0 ? (
                                                combinedTableData.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{data.area}</td>
                                                        <td>{data.subArea}</td>
                                                        <td>{data.sistemaGestion}</td>
                                                        <td>{data.nomenclatura}</td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteTableData(data, index)}
                                                                    className="btn btn-sm btn-icon btn-active-icon-danger btn-active-light-danger"
                                                                >
                                                                    <i className="fas fa-trash fs-4"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr className="text-center">
                                                    <td colSpan={6}>Sin datos</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button disabled={tableData.length === 0} type="submit" className="btn btn-success">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubAreasModal;
