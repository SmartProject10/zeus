import { useEffect, useState } from 'react';
import { KTCardBody } from '../../../../../_zeus/helpers';
import * as XLSX from 'xlsx';
import { useAuth } from '@zeus/@hooks/auth/useAuth.tsx';
import { saveAs } from 'file-saver';
import CorporativoButton from '../buttons/corporatButton';

interface CorporativoForm {
    nombre: string;
    nomenclatura: string;
    subirLogo: File | null;
    fechaElaboracion: string;
    subidoPor: string;
}

const Corporativo = () => {
    const [corporativos, setCorporativos] = useState<any[]>([]);
    const [filteredCorporativos, setFilteredCorporativos] = useState<any[]>([]);
    const [formData, setFormData] = useState<CorporativoForm>({
        nombre: '',
        nomenclatura: '',
        subirLogo: null,
        fechaElaboracion: '',
        subidoPor: '',
    });
    const { currentUser } = useAuth();
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [newCorporativoData, setNewCorporativoData] = useState<{
        nombre: string;
        nomenclatura: string;
        subirLogo: File | null;
    }>({
        nombre: '',
        nomenclatura: '',
        subirLogo: null,
    });

    useEffect(() => {
        fetchCorporativos();
    }, []);

    const fetchCorporativos = async () => {
        try {
            const response = [
                { nombre: 'Corporativo A', nomenclatura: 'CA', subirLogo: null, fechaElaboracion: '2023-01-15', subidoPor: 'Admin' },
                { nombre: 'Corporativo B', nomenclatura: 'CB', subirLogo: null, fechaElaboracion: '2023-02-20', subidoPor: 'Usuario1' },
            ];
            setCorporativos(response);
            setFilteredCorporativos(response);
        } catch (error) {
            console.error('Error al obtener los corporativos:', error);
            alert('Error al cargar los corporativos. Por favor, intente nuevamente.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prevState) => ({
            ...prevState,
            subirLogo: file,
        }));
    };

    const handleNewCorporativoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCorporativoData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNewCorporativoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setNewCorporativoData((prevState) => ({
            ...prevState,
            subirLogo: file,
        }));
    };

    const applyFilters = () => {
        const filtered = corporativos.filter((corp) => {
            return (
                (formData.nombre ? corp.nombre.toLowerCase().includes(formData.nombre.toLowerCase()) : true) &&
                (formData.nomenclatura ? corp.nomenclatura.toLowerCase().includes(formData.nomenclatura.toLowerCase()) : true) &&
                (formData.fechaElaboracion ? corp.fechaElaboracion.includes(formData.fechaElaboracion) : true) &&
                (formData.subidoPor ? corp.subidoPor.toLowerCase().includes(formData.subidoPor.toLowerCase()) : true)
            );
        });
        setFilteredCorporativos(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [formData]);

    const handleModalOpen = () => {
        setActiveModal(true);
        setNewCorporativoData({
            nombre: '',
            nomenclatura: '',
            subirLogo: null,
        });
    };

    const handleModalClose = () => {
        setActiveModal(false);
    };

    const handleSaveNewCorporativo = () => {
        const newCorporativo = {
            nombre: newCorporativoData.nombre,
            nomenclatura: newCorporativoData.nomenclatura,
            subirLogo: newCorporativoData.subirLogo,
            fechaElaboracion: new Date().toISOString().split('T')[0],
            subidoPor: `${currentUser?.firstname} ${currentUser?.lastname}`,
        };

        setCorporativos([...corporativos, newCorporativo]);
        setFilteredCorporativos([...corporativos, newCorporativo]);

        handleModalClose();
    };

    const exportFilteredToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredCorporativos);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Corporativos');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'reporteCorporativos.xlsx');
    };

    return (
        <KTCardBody className="py-4 card card-grid min-w-full">
            <div className="d-flex justify-content-end mb-3">
                <CorporativoButton onOpen={handleModalOpen} />
            </div>
            <h2 className="mb-4">Registro de Corporativos</h2>
            <div className="alert alert-info" role="alert">
                <strong>Nota:</strong> Para registrar un nuevo corporativo, haga clic en el botón "Nuevo Corporativo".
            </div>
            <hr />
            <p>Filtros de búsqueda</p>
            <form>
                <div className="row g-1">
                    <div className="col-md-3">
                        <label htmlFor="nombreInput" className="form-label-sm d-block mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="nombreInput"
                            name="nombre"
                            placeholder="Nombre del corporativo"
                            value={formData.nombre}
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
            <p>{'Coincidencias: ' + filteredCorporativos.length}</p>
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
                            <th className="min-w-200px">Nombre</th>
                            <th className="min-w-200px">Nomenclatura</th>
                            <th className="min-w-200px">Logo</th>
                            <th className="min-w-200px">Fecha de Elaboración</th>
                            <th className="min-w-200px">Subido Por</th>
                            <th className="min-w-200px">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredCorporativos.length > 0 &&
                            filteredCorporativos.map((corp, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{corp.nombre}</td>
                                    <td>{corp.nomenclatura}</td>
                                    <td>
                                        {corp.subirLogo ? (
                                            <img src={URL.createObjectURL(corp.subirLogo)} alt="Logo" width="50" />
                                        ) : (
                                            'No disponible'
                                        )}
                                    </td>
                                    <td>{corp.fechaElaboracion}</td>
                                    <td>{corp.subidoPor}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => {
                                                setNewCorporativoData({
                                                    nombre: corp.nombre,
                                                    nomenclatura: corp.nomenclatura,
                                                    subirLogo: corp.subirLogo,
                                                });
                                                setActiveModal(true);
                                            }}
                                        >
                                            <i className="bi bi-pencil-fill"></i> Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                const newCorporativos = corporativos.filter((_, i) => i !== index);
                                                setCorporativos(newCorporativos);
                                                setFilteredCorporativos(
                                                    filteredCorporativos.filter((_, i) => i !== index)
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
            {filteredCorporativos.length === 0 && <p className="text-center mb-5">No se encontraron corporativos</p>}

            {activeModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nuevo Corporativo</h5>
                                <button type="button" className="btn-close" onClick={handleModalClose}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="newNombreInput" className="form-label">Nombre del Corporativo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="newNombreInput"
                                            name="nombre"
                                            value={newCorporativoData.nombre}
                                            onChange={handleNewCorporativoInputChange}
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
                                            value={newCorporativoData.nomenclatura}
                                            onChange={handleNewCorporativoInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newLogoInput" className="form-label">Subir Logo</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="newLogoInput"
                                            name="subirLogo"
                                            onChange={handleNewCorporativoFileChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancelar</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSaveNewCorporativo}
                                    disabled={!newCorporativoData.nombre || !newCorporativoData.nomenclatura}
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

export { Corporativo };