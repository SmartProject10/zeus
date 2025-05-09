import { useEffect, useState } from 'react';
import { KTCardBody } from '../../../../../../../_zeus/helpers';
import { getFilteredCompanies } from '../../core/_requests';
import ModalSubEm from './ModalSubEm';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const RegisterSubEm = () => {
    const [companies, setCompanies] = useState<any[]>([]);
    const [filteredCompanies, setFilteredCompanies] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        ruc: '',
        razonSocial: '',
        pais: 'Perú',
        provincia: '',
        ciudad: '',
        direccion: '',
        actividadEconomica: '',
        sectorEconomico: '',
        tamanoEmpresa: '',
    });
    const [activeModal, setActiveModal] = useState<boolean>(false);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await getFilteredCompanies('');
            if (response.status === 200) {
                setCompanies(response.data);
                setFilteredCompanies(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        const filtered = companies.filter((company) => {
            return (
                (formData.ruc ? company.ruc.includes(formData.ruc) : true) &&
                (formData.razonSocial ? company.razonSocial.includes(formData.razonSocial) : true) &&
                (formData.provincia ? company.provincia.includes(formData.provincia) : true) &&
                (formData.ciudad ? company.ciudad.includes(formData.ciudad) : true) &&
                (formData.direccion ? company.direccion.includes(formData.direccion) : true) &&
                (formData.actividadEconomica ? company.actividadEconomica.includes(formData.actividadEconomica) : true) &&
                (formData.sectorEconomico ? company.sectorEconomico.includes(formData.sectorEconomico) : true) &&
                (formData.tamanoEmpresa ? company.tamanoEmpresa === formData.tamanoEmpresa : true)
            );
        });
        setFilteredCompanies(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [formData]);

    const handleModalClose = () => {
        setActiveModal(false);
        fetchCompanies();
    };

    const exportFilteredEmployeesToExcel = () => {

        // Crear una hoja de trabajo a partir de los datos
        const worksheet = XLSX.utils.json_to_sheet(filteredCompanies)

        // Crear un libro de trabajo y agregar la hoja de trabajo
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Trabajadores')

        // Generar un archivo de Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

        // Guardar el archivo usando file-saver
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' })

        saveAs(data, 'reporteSubEmpresa.xlsx')
    }

    const exportEmployeeToExcel = (employee: { ruc: string; razonSocial: string; pais: string; provincia: string; ciudad: string; direccion: string; actividadEconomica: string; sectorEconomico: string; tamanoEmpresa: string; }) => {

        // Define the EmployeeResponse type
        type EmployeeResponse = {
            ruc: string;
            razonSocial: string;
            pais: string;
            provincia: string;
            ciudad: string;
            direccion: string;
            actividadEconomica: string;
            sectorEconomico: string;
            tamanoEmpresa: string;
        };

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

        saveAs(data, 'reporteSubEmpresa.xlsx')
    }
    return (
        <KTCardBody className="py-4 card card-grid min-w-full">
            {activeModal && <ModalSubEm onClose={handleModalClose} />}
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveModal(true)}
                >
                    <i className="bi bi-plus-circle-fill"></i> Nueva Sub-Empresa
                </button>
            </div>
            <h2 className="mb-4">Registro de Sub-Empresas</h2>
            <div className="alert alert-info" role="alert">
                Aquí puede registrar y buscar sub-empresas utilizando los filtros proporcionados.
            </div>
            <hr />
            <p>Filtros de búsqueda</p>
            <form>
                <div className="row g-1">
                    <div className="col-2">
                        <label htmlFor="ruc" className="form-label-sm d-block mb-1">RUC</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="ruc"
                            name="ruc"
                            placeholder='Ej. 12345678901'
                            value={formData.ruc}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="razonSocial" className="form-label-sm d-block mb-1">Razón Social</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="razonSocial"
                            name="razonSocial"
                            placeholder='Ej. Empresa S.A.C.'
                            value={formData.razonSocial}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="provincia" className="form-label-sm d-block mb-1">Provincia</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="provincia"
                            name="provincia"
                            placeholder='Ej. Limon'
                            value={formData.provincia}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="ciudad" className="form-label-sm d-block mb-1">Ciudad</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="ciudad"
                            name="ciudad"
                            placeholder='Ej. Lima'
                            value={formData.ciudad}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="direccion" className="form-label-sm d-block mb-1">Dirección</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="direccion"
                            name="direccion"
                            placeholder='Ej. Av. Principal 123'
                            value={formData.direccion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="actividadEconomica" className="form-label-sm d-block mb-1">Actividad Económica</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="actividadEconomica"
                            name="actividadEconomica"
                            placeholder='Ej. Comercio al por mayor'
                            value={formData.actividadEconomica}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="sectorEconomico" className="form-label-sm d-block mb-1">Sector Económico</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="sectorEconomico"
                            name="sectorEconomico"
                            placeholder='Ej. Servicios'
                            value={formData.sectorEconomico}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="tamanoEmpresa" className="form-label-sm d-block mb-1">Tamaño Empresa</label>
                        <select
                            className="form-select form-select-sm"
                            id="tamanoEmpresa"
                            name="tamanoEmpresa"
                            value={formData.tamanoEmpresa}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccione</option>
                            <option value="Pequeña">Pequeña</option>
                            <option value="Mediana">Mediana</option>
                            <option value="Grande">Grande</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <label htmlFor="pais" className="form-label-sm d-block mb-1">País</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="pais"
                            name="pais"
                            value={formData.pais}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </form>
            <hr />
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
            <p>{'Coincidencias: ' + filteredCompanies.length}</p>
            <div className="table-responsive">
                <table className="table table-striped gy-7 gs-7">
                    <thead>
                        <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200 text-center">
                            <th className="min-w-50px">Nro</th>
                            <th className="min-w-200px">RUC</th>
                            <th className="min-w-200px">Razón Social</th>
                            <th className="min-w-200px">País</th>
                            <th className="min-w-200px">Provincia</th>
                            <th className="min-w-200px">Ciudad</th>
                            <th className="min-w-200px">Dirección</th>
                            <th className="min-w-200px">Actividad Económica</th>
                            <th className="min-w-200px">Sector Económico</th>
                            <th className="min-w-200px">Tamaño Empresa</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredCompanies.length > 0 &&
                            filteredCompanies.map((company, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{company.ruc}</td>
                                    <td>{company.razonSocial}</td>
                                    <td>{company.pais}</td>
                                    <td>{company.provincia}</td>
                                    <td>{company.ciudad}</td>
                                    <td>{company.direccion}</td>
                                    <td>{company.actividadEconomica}</td>
                                    <td>{company.sectorEconomico}</td>
                                    <td>{company.tamanoEmpresa}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => exportEmployeeToExcel(company)}
                                        >
                                            Exportar a Excel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {filteredCompanies.length === 0 && <p className="text-center mb-5">No se encontraron empresas</p>}
        </KTCardBody>
    );
};

export { RegisterSubEm };