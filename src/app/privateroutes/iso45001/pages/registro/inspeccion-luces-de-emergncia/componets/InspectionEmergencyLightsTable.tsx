import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { KTCardBody } from "../../../../../../../app/_zeus/helpers";
import { appStateService } from "../../../../../../services/appState.service";
import { dayMonthYear } from "../../../../../../generalcomponents/utils/dateformat/dateFormat";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { EmergencyLightsResponse } from "@zeus/app/@services/api/dtos/EmergencyLightsModel";
import { Employee } from "@zeus/models/apimodels/Employee";
import { ModalInspectionEmergencyLightsForm } from "./ModalInspectionEmergencyLightsForm";
import { backyService } from "@zeus/app/@services/api";

interface EmployeeForm {
	fechaInspeccion: string;
	sede: string;
	area: string;
	enumerado: boolean;
	ubicacionAdecuada: boolean;
	enSuLugar: boolean;
	libreDeObstaculos: boolean;
	conectadoTomacorriente: boolean;
	enciendeSwitchPrueba: boolean;
	buenaIluminacion: boolean;
	buenaEstado: boolean;
	encendidoQuinceMin: boolean;
}

export const InspectionEmergencylightsTable = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [employees, setEmployees] = useState<EmergencyLightsResponse[]>([]);
	const [filteredEmployees, setFilteredEmployees] = useState<
		any[]
	>([]);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [limitPerPage, setLimitPerPage] = useState<number>(10);
	const [idEmployee, setIdEmployee] = useState("");
	const [formData, setFormData] = useState<EmployeeForm>({
		fechaInspeccion: "",
		sede: "",
		area: "",
		enumerado: false,
		ubicacionAdecuada: false,
		enSuLugar: false,
		libreDeObstaculos: false,
		conectadoTomacorriente: false,
		enciendeSwitchPrueba: false,
		buenaIluminacion: false,
		buenaEstado: false,
		encendidoQuinceMin: false,
	});
	const [activeModal, setActiveModal] = useState<boolean>(false);

	useEffect(() => {
		const employeesInit = async () => {
			// try {
			// 	//const response = await get();
			// 	const filters = `?limit=${limitPerPage}`;
			// 	const response = await backyService.employee.getFiltered(filters);

			// 	if (response.status == 200) {
			// 		setTotalPages(response.data.totalPages);
			// 		setCurrentPage(response.data.currentPage);
			// 		const employees: Employee[] = response.data.trabajadores;
			// 		appStateService.setEmployeeSubject(employees);
			// 	}
			// } catch (error: any) {
			// 	console.error(error);
			// }
		};
		employeesInit();

		// const employeesSubj = appStateService
		// 	.getSubject()
		// 	.subscribe((employees: any) => {
		// 		setEmployees(employees);
		// 		setFilteredEmployees(employees);
		// 	});

		const activeModalSubj = appStateService
			.getActiveModalSubject()
			.subscribe((state: boolean) => {
				setActiveModal(state);
			});

		return () => {
			//employeesSubj.unsubscribe();
			activeModalSubj.unsubscribe();
		};
	}, []);

	useEffect(() => {
		applyFilters();
	}, [formData]);

	const handleInputChange = async (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));

		// let filters:string = "?";
		// for(const key in formData){
		//   if(formData.hasOwnProperty(key)){
		//     if(formData[key as keyof EmployeeForm] != "" && formData[key as keyof EmployeeForm] != null){
		//       filters=filters+`${key}=${formData[key as keyof EmployeeForm]}&`
		//     }
		//   }
		// }
	};

	function showModalEmployee(id: string) {
		setIdEmployee(id);
		appStateService.setActiveModalSubject();
	}

	async function applyFilters() {
		// eslint-disable-next-line max-len
		const filters = `?fechaInspeccion=${formData.fechaInspeccion}&area=${formData.area}&sede=${formData.sede}&enumerado=${formData.enumerado}&ubicacionAdecuada=${formData.ubicacionAdecuada}&enSuLugar=${formData.enSuLugar}&libreDeObstaculos=${formData.libreDeObstaculos}&conectadoTomacorriente=${formData.conectadoTomacorriente}&enciendeSwitchPrueba=${formData.enciendeSwitchPrueba}&buenaIluminacion=${formData.buenaIluminacion}&buenaEstado=${formData.buenaEstado}&encendidoQuinceMin=${formData.encendidoQuinceMin}&limit=${limitPerPage}`;

		// try {
		// 	const response = await backyService.employee.getFiltered(filters);
		// 	console.log(response);

		// 	if (response.status == 200) {
		// 		setTotalPages(response.data.totalPages);
		// 		setCurrentPage(response.data.currentPage);
		// 		setFilteredEmployees(response.data.trabajadores);
		// 	}
		// } catch (e: any) {
		// 	console.error(e);
		// }
	}

	async function selectPageNavigate(page: number) {
		// eslint-disable-next-line max-len
		const filters = `?fechaInspeccion=${formData.fechaInspeccion}&area=${formData.area}&sede=${formData.sede}&enumerado=${formData.enumerado}&ubicacionAdecuada=${formData.ubicacionAdecuada}&enSuLugar=${formData.enSuLugar}&libreDeObstaculos=${formData.libreDeObstaculos}&conectadoTomacorriente=${formData.conectadoTomacorriente}&enciendeSwitchPrueba=${formData.enciendeSwitchPrueba}&buenaIluminacion=${formData.buenaIluminacion}&buenaEstado=${formData.buenaEstado}&encendidoQuinceMin=${formData.encendidoQuinceMin}&limit=${limitPerPage}`;

		// try {
		// 	const response: any = await backyService.employee.getFiltered(filters);

		// 	if (response.status == 200) {
		// 		setCurrentPage(response.data.currentPage);
		// 		setTotalPages(response.data.totalPages);
		// 		setFilteredEmployees(response.data.trabajadores);
		// 	}
		// } catch (e: any) {
		// 	console.error(e);
		// }
	}

	async function navigatePage(action: string) {
		if (action == "next") {
			// eslint-disable-next-line max-len
			const filters = `?fechaInspeccion=${formData.fechaInspeccion}&area=${formData.area}&sede=${formData.sede}&enumerado=${formData.enumerado}&ubicacionAdecuada=${formData.ubicacionAdecuada}&enSuLugar=${formData.enSuLugar}&libreDeObstaculos=${formData.libreDeObstaculos}&conectadoTomacorriente=${formData.conectadoTomacorriente}&enciendeSwitchPrueba=${formData.enciendeSwitchPrueba}&buenaIluminacion=${formData.buenaIluminacion}&buenaEstado=${formData.buenaEstado}&encendidoQuinceMin=${formData.encendidoQuinceMin}&limit=${limitPerPage}`;

			// try {
			// 	const response: any = await backyService.employee.getFiltered(filters);

			// 	if (response.status == 200) {
			// 		setCurrentPage(response.data.currentPage);
			// 		setTotalPages(response.data.totalPages);
			// 		setFilteredEmployees(response.data.trabajadores);
			// 	}
			// } catch (e: any) {
			// 	console.error(e);
			// }
		} else if (action == "previous") {
			// eslint-disable-next-line max-len
			const filters = `?fechaInspeccion=${formData.fechaInspeccion}&area=${formData.area}&sede=${formData.sede}&enumerado=${formData.enumerado}&ubicacionAdecuada=${formData.ubicacionAdecuada}&enSuLugar=${formData.enSuLugar}&libreDeObstaculos=${formData.libreDeObstaculos}&conectadoTomacorriente=${formData.conectadoTomacorriente}&enciendeSwitchPrueba=${formData.enciendeSwitchPrueba}&buenaIluminacion=${formData.buenaIluminacion}&buenaEstado=${formData.buenaEstado}&encendidoQuinceMin=${formData.encendidoQuinceMin}&limit=${limitPerPage}`;

			// try {
			// 	const response: any = await backyService.employee.getFiltered(filters);

			// 	if (response.status == 200) {
			// 		setCurrentPage(response.data.currentPage);
			// 		setTotalPages(response.data.totalPages);
			// 		setFilteredEmployees(response.data.trabajadores);
			// 	}
			// } catch (e: any) {
			// 	console.error(e);
			// }
		}
	}

	const exportFilteredEmployeesToExcel = () => {
		// Crear una hoja de trabajo a partir de los datos
		const worksheet = XLSX.utils.json_to_sheet(filteredEmployees);

		// Crear un libro de trabajo y agregar la hoja de trabajo
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Trabajadores");

		// Generar un archivo de Excel
		const excelBuffer = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});

		// Guardar el archivo usando file-saver
		const data = new Blob([excelBuffer], { type: "application/octet-stream" });

		saveAs(data, "reporteEmpleadosFiltrados.xlsx");
	};

	const exportEmployeeToExcel = (Employee: EmergencyLightsResponse) => {
		const employeeArray: EmergencyLightsResponse[] = [];
		employeeArray.push(Employee);

		// Crear una hoja de trabajo a partir de los datos
		const worksheet = XLSX.utils.json_to_sheet(employeeArray);

		// Crear un libro de trabajo y agregar la hoja de trabajo
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Trabajadores");

		// Generar un archivo de Excel
		const excelBuffer = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});

		// Guardar el archivo usando file-saver
		const data = new Blob([excelBuffer], { type: "application/octet-stream" });

		saveAs(data, "reporteEmpleado.xlsx");
	};

	return (
		<KTCardBody className="py-4 card card-grid min-w-full">
			{activeModal ? (
				<ModalInspectionEmergencyLightsForm
					idEmployee={idEmployee}
				></ModalInspectionEmergencyLightsForm>
			) : (
				""
			)}

			{/* <p>Filtros de búsqueda</p> */}

			{/* <form>
				<div className="row g-1">
					<div className="col-2">
						<label className="form-label-sm d-block mb-1" htmlFor="numeroInput">
							Numero
						</label>
						<input
							type="text"
							className="form-control form-control-sm"
							id="numeroInput"
							name="numero"
							placeholder="Numero"
							value={formData.numero}
							onChange={handleInputChange}
						/>
					</div>
					<div className="col-2">
						<label htmlFor="sedeSelect" className="form-label-sm d-block mb-1">
							Sede
						</label>
						<select
							className="form-select form-select-sm"
							id="sedeSelect"
							name="sede"
							value={formData.sede}
							onChange={handleInputChange}
						>
							<option value="">Seleccione</option>
							<option value="Sede 1">Sede 1</option>
							<option value="Sede 1">Sede 2</option>
						</select>
					</div>
					<div className="col-2">
						<label htmlFor="areaSelect" className="form-label-sm d-block mb-1">
							Área
						</label>
						<select
							className="form-select form-select-sm"
							id="areaSelect"
							name="area"
							value={formData.area}
							onChange={handleInputChange}
						>
							<option value="">Seleccione</option>
							<option value="Area 1">Area 1</option>
							<option value="Area 1">Area 2</option>
						</select>
					</div>

					<div className="col-2">
						<label htmlFor="marcaSelect" className="form-label-sm d-block mb-1">
							Marca
						</label>
						<select
							className="form-select form-select-sm"
							id="marcaSelect"
							name="marca"
							value={formData.marca}
							onChange={handleInputChange}
						>
							<option value="">Seleccione</option>
							<option value="Adidas">Adidas</option>
							<option value="Samsung">Samsung</option>
							<option value="LG">LG</option>
							<option value="Huawei">Huawei</option>
							<option value="Toyota">Toyota</option>
							<option value="Tesla">Tesla</option>
						</select>
					</div>

					<div className="col-4">
						<label htmlFor="" className="form-label-sm d-block mb-1">
							Intervalo fechas de ingreso a la empresa
						</label>
						<div className="row">
							<div className="col-12">
								<div className="d-flex flex-row justify-content-between gap-1">
									<input
										type="date"
										className="form-control form-control-sm"
										id="fechaIngresoEmpresaInicial"
										name="fechaIngresoEmpresaInicial"
										value={formData.fechaIngresoEmpresaInicial}
										onChange={handleInputChange}
									/>
									<input
										type="date"
										className="form-control form-control-sm"
										id="fechaIngresoEmpresaFinal"
										name="fechaIngresoEmpresaFinal"
										value={formData.fechaIngresoEmpresaFinal}
										onChange={handleInputChange}
									/>
								</div>
							</div>
						</div>
					</div> */}

			{/* Otros campos del formulario */}
			{/* </div>
			</form> */}

			{/* <hr />

			<p>{"Coincidencias" + ": " + filteredEmployees.length}</p> */}

			<div className="d-grid gap-2 d-md-flex justify-content-md-end">
				{/* <button className="btn btn-success btn-sm disabled" type="button">
					<i className="bi bi-file-earmark-spreadsheet-fill"></i>
					Importar a Excel
				</button> */}
				<button
					onClick={exportFilteredEmployeesToExcel}
					className="btn btn-success btn-sm"
					type="button"
				>
					<i className="bi bi-file-earmark-spreadsheet-fill"></i>
					Exportar a Excel
				</button>
			</div>

			<div className="table-responsive">
				<table className="table table-striped gy-7 gs-7">
					<thead>
						<tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200 text-center">
							<th className="min-w-200px">Nro</th>
							<th className="min-w-200px">Fecha de inspección</th>
							<th className="min-w-200px">Inspeccionado por</th>
							<th className="min-w-200px">Observaciones</th>
							<th className="min-w-200px">Recomendaciones</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{filteredEmployees.length > 0 &&
							filteredEmployees.map((Employee, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{Employee.fechaInspeccion}</td>
									<td>{Employee.inspeccionadoPor}</td>
									<td>{Employee.observaciones}</td>
									<td>{Employee.recomendaciones}</td>
									<td>
										<div className="d-grid gap-2 d-md-flex">
											{/* <button className="btn btn-sm btn-bg-light btn-active-color-primary">
                      Editar/modificar/actualizar
                    </button> */}
											<button
												className="btn btn-sm btn-bg-light btn-active-color-primary"
												onClick={() => showModalEmployee(Employee._id)}
											>
												Ver detalle
											</button>
											<button className="btn btn-sm btn-bg-light btn-active-color-primary">
												Historial
											</button>
											<button
												className="btn btn-sm btn-bg-light btn-active-color-primary disabled"
												type="button"
											>
												<i className="bi bi-file-earmark-spreadsheet-fill"></i>
												Importar a Excel
											</button>
											<button
												onClick={() => exportEmployeeToExcel(Employee)}
												className="btn btn-sm btn-bg-light btn-active-color-primary"
												type="button"
											>
												<i className="bi bi-file-earmark-spreadsheet-fill"></i>
												Exportar a Excel
											</button>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			{filteredEmployees.length == 0 && (
				<p className="text-center mb-5">
					No se encontraron luces de emergencia
				</p>
			)}

			{filteredEmployees.length != 0 && (
				<div className="mt-2">
					<ul className="pagination">
						<li
							className={
								currentPage == 1
									? "page-item previous disabled"
									: "page-item previous"
							}
						>
							<button
								onClick={() => navigatePage("previous")}
								className="page-link"
							>
								<i className="previous"></i>
							</button>
						</li>
						{[...Array(totalPages)].map((page, i) => (
							<li
								key={i}
								className={
									currentPage == i + 1 ? "page-item active" : "page-item"
								}
							>
								<button
									onClick={() => selectPageNavigate(i + 1)}
									className="page-link "
								>
									{i + 1}
								</button>
							</li>
						))}
						<li
							className={
								currentPage == totalPages
									? "page-item next disabled"
									: "page-item next"
							}
						>
							<button
								onClick={() => navigatePage("next")}
								className="page-link"
							>
								<i className="next"></i>
							</button>
						</li>
					</ul>
				</div>
			)}

			<hr />

			{/* <button
				className="btn btn-sm btn-bg-light btn-active-color-primary"
				onClick={() => showModalEmployee("")}
			>
				ejemplo modal
			</button> */}
		</KTCardBody>
	);
};
