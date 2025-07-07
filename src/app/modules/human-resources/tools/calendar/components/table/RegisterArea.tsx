import { useEffect, useState } from 'react';
import { KTCardBody } from '../../../../../../../_zeus/helpers';
import ModalArea from './ModalArea';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface AreaForm {
    nombreArea: string;
    cargosArea: string;
}

const RegisterArea = () => {
    const [areas, setAreas] = useState<any[]>([]);
    const [filteredAreas, setFilteredAreas] = useState<any[]>([]);
    const [formData, setFormData] = useState<AreaForm>({
        nombreArea: '',
        cargosArea: '',
    });
    const [activeModal, setActiveModal] = useState<boolean>(false);

    useEffect(() => {
        fetchAreas();
    }, []);

    const fetchAreas = async () => {
        // Simulación
        try {
            const response = [
                { nombreArea: 'Área 1', cargosArea: 'Cargo 1, Cargo 2' },
                { nombreArea: 'Área 2', cargosArea: 'Cargo 3, Cargo 4' },
            ];
            setAreas(response);
            setFilteredAreas(response);
        } catch (error) {
            console.error('Error al obtener las áreas:', error);
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
        const filtered = areas.filter((area) => {
            return (
                (formData.nombreArea ? area.nombreArea.includes(formData.nombreArea) : true) &&
                (formData.cargosArea ? area.cargosArea.includes(formData.cargosArea) : true)
            );
        });
        setFilteredAreas(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [formData]);

    const handleModalClose = () => {
        setActiveModal(false);
        fetchAreas(); // Actualiza la tabla después de cerrar el modal
    };

    const exportFilteredEmployeesToExcel = () => {

        // Crear una hoja de trabajo a partir de los datos
        const worksheet = XLSX.utils.json_to_sheet(filteredAreas)

        // Crear un libro de trabajo y agregar la hoja de trabajo
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Trabajadores')

        // Generar un archivo de Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

        // Guardar el archivo usando file-saver
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' })

        saveAs(data, 'reporteArea.xlsx')
    }

    interface EmployeeResponse {
        nombreArea: string;
        cargosArea: string;
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

        saveAs(data, 'reporteArea.xlsx')
    }

    return (
        <KTCardBody className="py-4 card card-grid min-w-full">
            {activeModal && <ModalArea onClose={handleModalClose} />}
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveModal(true)}
                >
                    <i className="bi bi-plus-circle-fill"></i> Nueva Área
                </button>
            </div>
            <h2 className="mb-4">Registro de Áreas y Cargos</h2>
            <div className="alert alert-info" role="alert">
                <strong>Nota:</strong> Para registrar un nuevo área, haga clic en el botón "Nueva Área".
                Complete el formulario y haga clic en "Registrar". Puede agregar tantos cargos como desee.
            </div>
            <hr />
            <p>Filtros de búsqueda</p>
            <form>
                <div className="row g-1">
                    <div className="col-6">
                        <label htmlFor="nombreAreaInput" className="form-label-sm d-block mb-1">
                            Nombre del Área
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="nombreAreaInput"
                            name="nombreArea"
                            placeholder="Nombre del Área"
                            value={formData.nombreArea}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="cargosAreaInput" className="form-label-sm d-block mb-1">
                            Cargos del Área
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="cargosAreaInput"
                            name="cargosArea"
                            placeholder="Cargos del Área"
                            value={formData.cargosArea}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </form>
            <hr />
            <p>{'Coincidencias: ' + filteredAreas.length}</p>
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
                            <th className="min-w-200px">Nombre del Área</th>
                            <th className="min-w-200px">Cargos del Área</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredAreas.length > 0 &&
                            filteredAreas.map((area, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{area.nombreArea}</td>
                                    <td>{area.cargosArea}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => exportEmployeeToExcel(area)}
                                        >
                                            Exportar a Excel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {filteredAreas.length === 0 && <p className="text-center mb-5">No se encontraron áreas</p>}
        </KTCardBody>
    );
};

export { RegisterArea };