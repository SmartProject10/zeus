import { useEffect, useState } from 'react';
import { KTCardBody } from '../../../../../../../_zeus/helpers';
import ModalSede from './ModalSede';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface SedeForm {
    nombreSede: string;
    direccionSede: string;
    ciudad: string;
    provincia: string;
}

const RegisterSede = () => {
    const [sedes, setSedes] = useState<any[]>([]);
    const [filteredSedes, setFilteredSedes] = useState<any[]>([]);
    const [formData, setFormData] = useState<SedeForm>({
        nombreSede: '',
        direccionSede: '',
        ciudad: '',
        provincia: '',
    });
    const [activeModal, setActiveModal] = useState<boolean>(false);

    useEffect(() => {
        fetchSedes();
    }, []);

    const fetchSedes = async () => {
        // Simulación de una llamada a la API para obtener las sedes
        try {
            const response = [
                { nombreSede: 'Sede 1', direccionSede: 'Dirección 1', ciudad: 'Ciudad 1', provincia: 'Provincia 1' },
                { nombreSede: 'Sede 2', direccionSede: 'Dirección 2', ciudad: 'Ciudad 2', provincia: 'Provincia 2' },
            ];
            setSedes(response);
            setFilteredSedes(response);
        } catch (error) {
            console.error('Error al obtener las sedes:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        const filtered = sedes.filter((sede) => {
            return (
                (formData.nombreSede ? sede.nombreSede.includes(formData.nombreSede) : true) &&
                (formData.direccionSede ? sede.direccionSede.includes(formData.direccionSede) : true) &&
                (formData.ciudad ? sede.ciudad.includes(formData.ciudad) : true) &&
                (formData.provincia ? sede.provincia.includes(formData.provincia) : true)
            );
        });
        setFilteredSedes(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [formData]);

    const handleModalClose = () => {
        setActiveModal(false);
        fetchSedes(); // Actualiza la tabla después de cerrar el modal
    };

    const exportFilteredEmployeesToExcel = () => {

        // Crear una hoja de trabajo a partir de los datos
        const worksheet = XLSX.utils.json_to_sheet(filteredSedes)

        // Crear un libro de trabajo y agregar la hoja de trabajo
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Trabajadores')

        // Generar un archivo de Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

        // Guardar el archivo usando file-saver
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' })

        saveAs(data, 'reporteSede.xlsx')
    }

    interface EmployeeResponse {
        nombreSede: string;
        direccionSede: string;
        ciudad: string;
        provincia: string;
    }

    const exportEmployeeToExcel = (employee: EmployeeResponse) => {

        const employeeArray: EmployeeResponse[] = []
        employeeArray.push(employee)

        // Crear una hoja de trabajo a partir de los datos
        const worksheet = XLSX.utils.json_to_sheet(employeeArray)

        // Crear un libro de trabajo y agregar la hoja de trabajo
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Trabajadores')

        // Generar un archivo de Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

        // Guardar el archivo usando file-saver
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' })

        saveAs(data, 'reporteSede.xlsx')
    }

    return (
        <KTCardBody className="py-4 card card-grid min-w-full">
            {activeModal && <ModalSede onClose={handleModalClose} />}
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveModal(true)}
                >
                    <i className="bi bi-plus-circle-fill"></i> Nueva Sede
                </button>
            </div>
            <h2 className="mb-4">Registro de Sedes</h2>
            <div className="alert alert-info" role="alert">
                <strong>Nota:</strong> Para registrar una nueva sede, haga clic en el botón "Nueva Sede" y complete el formulario.
            </div>
            <hr />
            <p>Filtros de búsqueda</p>
            <form>
                <div className="row g-1">
                    <div className="col-3">
                        <label htmlFor="nombreSedeInput" className="form-label-sm d-block mb-1">
                            Nombre de la Sede
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="nombreSedeInput"
                            name="nombreSede"
                            placeholder="Nombre de la Sede"
                            value={formData.nombreSede}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="direccionSedeInput" className="form-label-sm d-block mb-1">
                            Dirección de la Sede
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="direccionSedeInput"
                            name="direccionSede"
                            placeholder="Dirección de la Sede"
                            value={formData.direccionSede}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="ciudadInput" className="form-label-sm d-block mb-1">
                            Ciudad
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="ciudadInput"
                            name="ciudad"
                            placeholder="Ciudad"
                            value={formData.ciudad}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="provinciaInput" className="form-label-sm d-block mb-1">
                            Provincia
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="provinciaInput"
                            name="provincia"
                            placeholder="Provincia"
                            value={formData.provincia}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </form>
            <hr />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                <button
                    className="btn btn-success btn-sm disabled"
                    type="button"
                >
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i> Importar a Excel
                </button>
                <button
                    onClick={exportFilteredEmployeesToExcel}
                    className="btn btn-success btn-sm"
                    type="button"
                >
                    <i className="bi bi-file-earmark-spreadsheet-fill"></i> Exportar a Excel
                </button>
            </div>
            <p>{'Coincidencias: ' + filteredSedes.length}</p>
            <div className="table-responsive">
                <table className="table table-striped gy-7 gs-7">
                    <thead>
                        <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200 text-center">
                            <th className="min-w-50px">Nro</th>
                            <th className="min-w-200px">Nombre de la Sede</th>
                            <th className="min-w-200px">Dirección de la Sede</th>
                            <th className="min-w-200px">Ciudad</th>
                            <th className="min-w-200px">Provincia</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredSedes.length > 0 &&
                            filteredSedes.map((sede, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{sede.nombreSede}</td>
                                    <td>{sede.direccionSede}</td>
                                    <td>{sede.ciudad}</td>
                                    <td>{sede.provincia}</td>
                                    <td>
                                        <button
                                            onClick={() => exportEmployeeToExcel(sede)}
                                            className="btn btn-success btn-sm"
                                            type="button"
                                        >
                                            <i className="bi bi-file-earmark-spreadsheet-fill"></i> Exportar a Excel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {filteredSedes.length === 0 && <p className="text-center mb-5">No se encontraron sedes</p>}
        </KTCardBody>
    );
};

export { RegisterSede };