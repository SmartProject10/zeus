import React, { useEffect, useState } from 'react';
import { TipoDocumentoResponse } from './core/_models';
import Swal from 'sweetalert2';
import { BASE_URL } from '@zeus/app/modules/iso45001/pages/accidentes/core/_requests';

interface TipoDocumentoModalProps {
    saveTipoDocumento: (tipoDocumento: TipoDocumentoResponse[]) => void; // Pasar arreglo completo
}

const TipoDocumentoModal = ({ saveTipoDocumento }: TipoDocumentoModalProps) => {
    const initialValues = {
        tipoDocumento: '',
        nomenclatura: ''
    };

    let apiUrl = `${BASE_URL}/api/control-documentos`

    const [formData, setFormData] = useState(initialValues);
    const [tableData, setTableData] = useState<TipoDocumentoResponse[]>([]); // Nuevos datos
    const [dataSourceTipoDocumento, setDataSourceTipoDocumento] = useState<TipoDocumentoResponse[]>([]); // Datos del backend
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false); // Estado para el modal

    const closeModalButtonRef = React.createRef<HTMLButtonElement>();

    // Obtener los tipos de documento desde el backend
    const fetchTipoDocumentos = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/getTiposDocumento`);
            const data = await response.json();

            if (Array.isArray(data)) {
                setDataSourceTipoDocumento(data); // Guardar los datos del backend
            } else {
                setDataSourceTipoDocumento([]);
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los tipos de documento.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddTableData = () => {
        const { tipoDocumento, nomenclatura } = formData;

        if (!tipoDocumento || !nomenclatura) {
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
    const handleDeleteTableData = async (data: TipoDocumentoResponse, index: number) => {
        if (data._id) {
            // Si el documento tiene un ID, significa que está guardado en la base de datos, así que lo eliminamos del servidor.
            Swal.fire({
                title: '¿Está seguro que desea eliminar el tipo de documento?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        // Llamar al backend para eliminar
                        const response = await fetch(`${apiUrl}/deleteTipoDocumento/${data._id}`, { method: 'DELETE' });
                        if (!response.ok) {
                            throw new Error('Error al eliminar el tipo de documento');
                        }

                        // Eliminar del estado
                        setDataSourceTipoDocumento((prevData) => prevData.filter((doc) => doc._id !== data._id));
                        Swal.fire('Eliminado', 'El tipo de documento ha sido eliminado', 'success');
                    } catch (error) {
                        Swal.fire('Error', 'No se pudo eliminar el tipo de documento', 'error');
                    }
                }
            });
        } else {
            console.log(index);
            // Si no tiene ID, es un documento nuevo que aún no se ha guardado
            const newArr = tableData.filter((d, i) => i === index)
            if (index > 0) {
                setTableData(newArr); // Solo afecta los nuevos datos
            } else setTableData([]);
            // console.log(newArr)
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Combinar los datos nuevos y los existentes
        const allDocuments = [...dataSourceTipoDocumento, ...tableData];

        try {
            saveTipoDocumento(allDocuments); // Guardar todos los datos
            closeModalButtonRef.current?.click(); // Cerrar modal si el guardado fue exitoso
            setTableData([]); // Limpiar los nuevos datos
        } catch (error) {
            Swal.fire('Error', 'No se pudo guardar el tipo de documento', 'error');
        }
    };

    useEffect(() => {
        const modal = document.getElementById('staticBackdropTipoDocumento');

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

    // Ejecutar fetchTipoDocumentos cuando el modal se abre
    useEffect(() => {
        if (modalOpen) {
            fetchTipoDocumentos();
        }
    }, [modalOpen]);

    // Combinar los datos de la base de datos con los datos del formulario
    const combinedTableData = [...dataSourceTipoDocumento, ...tableData];

    return (
        <div className="modal fade" id="staticBackdropTipoDocumento" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title">Nuevo Tipo de Documento</h1>
                        <button ref={closeModalButtonRef} type="button" className="btn-close" id="closeModalButton" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card shadow-none mb-0">
                            <div className="card-body bg-secondary ">
                                <div className="row gy-4 mb-10">
                                    <div className="col-sm-6">
                                        <label htmlFor="nombre" className="required form-label">Tipo Documento</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tipo Documento"
                                            name="tipoDocumento"
                                            value={formData.tipoDocumento}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="unidad" className="required form-label">Nomenclatura</label>
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
                                                <th>Tipo Documento</th>
                                                <th>Nomenclatura</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {combinedTableData?.length > 0 ? (
                                                combinedTableData.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{data.tipoDocumento}</td>
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

export default TipoDocumentoModal;
