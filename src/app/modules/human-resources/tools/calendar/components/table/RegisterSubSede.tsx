import { useEffect, useState } from 'react';
import { KTCardBody } from '../../../../../../../_zeus/helpers';
import ModalSubSede from './ModalSubSede';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface SubSedeForm {
    nombreSubSede: string;
    direccionSubSede: string;
    ciudad: string;
    provincia: string;
}

interface EmployeeResponse {
    nombreSubSede: string;
    direccionSubSede: string;
    ciudad: string;
    provincia: string;
}

const RegisterSubSede = () => {
    const [subSedes, setSubSedes] = useState<any[]>([]);
    const [filteredSubSedes, setFilteredSubSedes] = useState<any[]>([]);
    const [formData, setFormData] = useState<SubSedeForm>({
        nombreSubSede: '',
        direccionSubSede: '',
        ciudad: '',
        provincia: '',
    });
    const [activeModal, setActiveModal] = useState<boolean>(false);

    useEffect(() => {
        fetchSubSedes();
    }, []);

    const fetchSubSedes = async () => {
        // Simulación de una llamada a la API para obtener las subsedes
        try {
            const response = [
                { nombreSubSede: 'SubSede 1', direccionSubSede: 'Dirección 1', ciudad: 'Ciudad 1', provincia: 'Provincia 1' },
                { nombreSubSede: 'SubSede 2', direccionSubSede: 'Dirección 2', ciudad: 'Ciudad 2', provincia: 'Provincia 2' },
            ];
            setSubSedes(response);
            setFilteredSubSedes(response);
        } catch (error) {
            console.error('Error al obtener las subsedes:', error);
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
        const filtered = subSedes.filter((subSede) => {
            return (
                (formData.nombreSubSede ? subSede.nombreSubSede.includes(formData.nombreSubSede) : true) &&
                (formData.direccionSubSede ? subSede.direccionSubSede.includes(formData.direccionSubSede) : true) &&
                (formData.ciudad ? subSede.ciudad.includes(formData.ciudad) : true) &&
                (formData.provincia ? subSede.provincia.includes(formData.provincia) : true)
            );
        });
        setFilteredSubSedes(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [formData]);

    const handleModalClose = () => {
        setActiveModal(false);
        fetchSubSedes(); // Actualiza la tabla después de cerrar el modal
    };

    const exportFilteredEmployeesToExcel = () => {

        // Crear una hoja de trabajo a partir de los datos
        const worksheet = XLSX.utils.json_to_sheet(filteredSubSedes)

        // Crear un libro de trabajo y agregar la hoja de trabajo
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Trabajadores')

        // Generar un archivo de Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

        // Guardar el archivo usando file-saver
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' })

        saveAs(data, 'reporteEmpleadosFiltrados.xlsx')
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

        saveAs(data, 'reporteEmpleado.xlsx')
    }

    return (
        <KTCardBody className="py-4 card card-grid min-w-full">
            {activeModal && <ModalSubSede onClose={handleModalClose} />}
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveModal(true)}
                >
                    <i className="bi bi-plus-circle-fill"></i> Nueva SubSede
                </button>
            </div>
            <h2 className="mb-4">Registro de SubSedes</h2>
            <div className="alert alert-info" role="alert">
                <strong>Nota:</strong> Para registrar una nueva subsede, haga clic en el botón "Nueva SubSede" y complete el formulario.
            </div>
            <hr />
            <p>Filtros de búsqueda</p>
            <form>
                <div className="row g-1">
                    <div className="col-3">
                        <label htmlFor="nombreSubSedeInput" className="form-label-sm d-block mb-1">
                            Nombre de la SubSede
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="nombreSubSedeInput"
                            name="nombreSubSede"
                            placeholder="Nombre de la SubSede"
                            value={formData.nombreSubSede}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="direccionSubSedeInput" className="form-label-sm d-block mb-1">
                            Dirección de la SubSede
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="direccionSubSedeInput"
                            name="direccionSubSede"
                            placeholder="Dirección de la SubSede"
                            value={formData.direccionSubSede}
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
            <p>{'Coincidencias: ' + filteredSubSedes.length}</p>
            <div
                className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                    className="btn btn-success btn-sm disabled"
                    type="button">
                    <i
                        className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Importar a Excel
                </button>
                <button
                    onClick={exportFilteredEmployeesToExcel}
                    className="btn btn-success btn-sm"
                    type="button">
                    <i
                        className="bi bi-file-earmark-spreadsheet-fill"></i>
                    Exportar a Excel
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped gy-7 gs-7">
                    <thead>
                        <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200 text-center">
                            <th className="min-w-50px">Nro</th>
                            <th className="min-w-200px">Nombre de la SubSede</th>
                            <th className="min-w-200px">Dirección de la SubSede</th>
                            <th className="min-w-200px">Ciudad</th>
                            <th className="min-w-200px">Provincia</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredSubSedes.length > 0 &&
                            filteredSubSedes.map((subSede, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{subSede.nombreSubSede}</td>
                                    <td>{subSede.direccionSubSede}</td>
                                    <td>{subSede.ciudad}</td>
                                    <td>{subSede.provincia}</td>
                                    <td>
                                        <button
                                            onClick={() => exportEmployeeToExcel(subSede)}
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
            {filteredSubSedes.length === 0 && <p className="text-center mb-5">No se encontraron subsedes</p>}
        </KTCardBody>
    );
};

export { RegisterSubSede };