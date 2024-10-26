import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { LogoCorporativoResponse } from './core/_models';
import { BASE_URL } from '@zeus/app/modules/iso45001/pages/accidentes/core/_requests';

interface LogoCorporativoModalProps {
    saveLogoCorporativo: (proyecto: LogoCorporativoResponse[]) => void; // Pasar arreglo completo
}

const LogoCorporativoModal = ({ saveLogoCorporativo }: LogoCorporativoModalProps) => {

    const initialValues: LogoCorporativoResponse = {
        nombre: '',
        logo: [],
        nomenclatura: ''
    };

    let apiUrl = `${BASE_URL}/api/control-documentos`

    const [formData, setFormData] = useState(initialValues);
    const [tableData, setTableData] = useState<LogoCorporativoResponse[]>([]); // Nuevos datos
    const [dataSourceLogoCorporativo, setDataSourceLogoCorporativo] = useState<LogoCorporativoResponse[]>([]); // Datos del backend
    const [fileList, setFileList] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false); // Estado para el modal

    const closeModalButtonRef = React.createRef<HTMLButtonElement>();

    // Obtener los proyectos desde el backend
    const fetchLogosCorporativos = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/getLogosCorporativos`);
            const data = await response.json();

            if (Array.isArray(data)) {
                setDataSourceLogoCorporativo(data); // Guardar los datos del backend
            } else {
                setDataSourceLogoCorporativo([]);
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los logos corporativos.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddTableData = () => {
        const { nombre, logo } = formData;

        if (!nombre || !logo) {
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
    const handleDeleteTableData = async (data: LogoCorporativoResponse, index: number) => {
        if (data._id) {
            // Si el documento tiene un ID, significa que está guardado en la base de datos, así que lo eliminamos del servidor.
            Swal.fire({
                title: '¿Está seguro que desea eliminar el logo corporativo?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        // Llamar al backend para eliminar
                        const response = await fetch(`${apiUrl}/deleteLogoCorporativo/${data._id}`, { method: 'DELETE' });
                        if (!response.ok) {
                            throw new Error('Error al eliminar el logo corporativo');
                        }

                        // Eliminar del estado
                        setDataSourceLogoCorporativo((prevData) => prevData.filter((doc) => doc._id !== data._id));
                        Swal.fire('Eliminado', 'El logo corporativo ha sido eliminado', 'success');
                    } catch (error) {
                        Swal.fire('Error', 'No se pudo eliminar el logo corporativo', 'error');
                    }
                }
            });
        } else {
            // Si no tiene ID, es un documento nuevo que aún no se ha guardado
            const newArr = tableData.filter((d, i) => i === index)
            if (index > 0) {
                setTableData(newArr); // Solo afecta los nuevos datos
            } else setTableData([]);
            // console.log(newArr)
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setFileList(files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setFormData({ ...formData, logo: [...formData.logo, ...newImages] });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Combinar los datos nuevos y los existentes
        const allDocuments = [...dataSourceLogoCorporativo, ...tableData];

        try {
            saveLogoCorporativo(allDocuments); // Guardar todos los datos
            closeModalButtonRef.current?.click(); // Cerrar modal si el guardado fue exitoso
            setTableData([]); // Limpiar los nuevos datos
        } catch (error) {
            Swal.fire('Error', 'No se pudo guardar el logo corporativo', 'error');
        }
    };

    useEffect(() => {
        const modal = document.getElementById('staticBackdropLogoCorporativo');

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

    // Ejecutar fetchLogosCorporativos cuando el modal se abre
    useEffect(() => {
        if (modalOpen) {
            fetchLogosCorporativos();
        }
    }, [modalOpen]);

    // Combinar los datos de la base de datos con los datos del formulario
    const combinedTableData = [...dataSourceLogoCorporativo, ...tableData];

    return (
        <div className="modal fade" id="staticBackdropLogoCorporativo" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title">Nuevo Logo Corporativo</h1>
                        <button ref={closeModalButtonRef} type="button" className="btn-close" id="closeModalButton" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card shadow-none mb-0">
                            <div className="card-body bg-secondary ">
                                <div className="row gy-4 mb-10">
                                    <div className="col-sm-6">
                                        <label htmlFor="nombre" className="required form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tipo Documento"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="nombre" className="required form-label">Nomenclatura</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nomenclatura"
                                            name="nomenclatura"
                                            value={formData.nomenclatura}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="unidad" className="required form-label">Subir Logo</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="fileUpload"
                                            accept="image/*"
                                            onChange={handleFileUpload} />
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
                                                <th>Nombre</th>
                                                <th>Logo</th>
                                                <th>Nomenclatura</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {combinedTableData?.length > 0 ? (
                                                combinedTableData.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{data.nombre}</td>
                                                        <td>{data.logo.length > 0 ? (
                                                            <img src={data.logo[0]} alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                                        ) : (
                                                            'No Image'
                                                        )}
                                                        </td>
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
}

export default LogoCorporativoModal