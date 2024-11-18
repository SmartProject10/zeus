import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { KTCardBody } from "../../../../../../../_zeus/helpers";
import { appStateService } from "../../../../../../services/appState.service";
import { dayMonthYear } from "../../../../../../utils/dateFormat";
// import { EmployeeRequest, EmployeeResponse } from "../../core/_models";
// import { getFilteredEmployees, putEmployeeService } from "../../core/_requests";
// import ModalTrabajador from "./ModalTrabajador";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import {
	EmergencyLightsResponse,
	EmployeeRequest,
	EmployeeResponse,
} from "@zeus/app/modules/human-resources/tools/calendar/core/_models";
import {
	getFilteredEmployees,
	putEmployeeService,
} from "@zeus/app/modules/human-resources/tools/calendar/core/_requests";
import { ModalEmergencyLightsForm } from "./ModalEmergencyLightsForm";
import { EmergencyLightsRequest } from "../core/_models";


interface EmployeeForm {
	id: string;
	numero: string;
	sede: string;
	area: string;
	ubicacionEspecifica: string;
	codigo: string;
	marca: string;
	fechaIngresoEmpresaInicial: string;
	fechaIngresoEmpresaFinal: string;
	fechaIngresoEmpresa: string;
}

interface InspectionEmergencylightsTableProps {
	data: EmergencyLightsRequest[];
	onDataUpdate: (newData: any, mode: "create" | "edit" | "delete" | "view" | "change") => void;
}

export const EmergencylightsTable: React.FC<InspectionEmergencylightsTableProps> = ({ data, onDataUpdate }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	console.log(data, 'data')
	const [employees, setEmployees] = useState<EmergencyLightsResponse[]>([]);
	const [filteredEmployees, setFilteredEmployees] = useState<
		EmergencyLightsResponse[]
	>([]);
	const [mode, setMode] = useState<"create" | "edit" | "view" | "delete" | "change">("create");
	const [totalPages, setTotalPages] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [limitPerPage, setLimitPerPage] = useState<number>(10);
	const [idEmployee, setIdEmployee] = useState("");
	const [formData, setFormData] = useState<any>({
		id: "",
		numero: "",
		sede: "",
		area: "",
		ubicacionEspecifica: "",
		codigo: "",
		marca: "",
		fechaIngresoEmpresaInicial: "",
		fechaIngresoEmpresaFinal: "",
		fechaIngresoEmpresa: ""
	});
	const [activeModal, setActiveModal] = useState<boolean>(false);

	useEffect(() => {
		const employeesInit = async () => {
			try {
				//const response = await getEmployees();
				const filters = `?limit=${limitPerPage}`;
				const response = await getFilteredEmployees(filters);

				if (response.status == 200) {
					setTotalPages(response.data.totalPages);
					setCurrentPage(response.data.currentPage);
					const employees: EmployeeResponse[] = response.data.trabajadores;
					appStateService.setEmployeesSubject(employees);
				}
			} catch (error: any) {
				console.error(error);
			}
		};
		employeesInit();

		// const employeesSubj = appStateService
		// 	.getEmployeesSubject()
		// 	.subscribe((employees: any) => {
		// 		setEmployees(employees);
		// 		setFilteredEmployees(employees);
		// 	});

		// const activeModalSubj = appStateService
		// 	.getActiveModalSubject()
		// 	.subscribe((state: boolean) => {
		// 		setActiveModal(state);
		// 	});

		// return () => {
		// 	employeesSubj.unsubscribe();
		// 	activeModalSubj.unsubscribe();
		// };
	}, []);

	useEffect(() => {
		applyFilters();
	}, [formData]);

	const handleInputChange = async (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setFormData((prevState: any) => ({
			...prevState,
			[name]: value,
		}));
	};

	function showModalEmployee(id: string) {
		setIdEmployee(id);
		appStateService.setActiveModalSubject();
	}

	async function applyFilters() {
		const filters = `?numero=${formData.numero}&sede=${formData.sede}&area=${formData.area}&ubicacionEspecifica=${formData.ubicacionEspecifica}&codigo=${formData.codigo}&marca=${formData.marca}&fechaIngresoEmpresaInicial=${formData.fechaIngresoEmpresaInicial}&fechaIngresoEmpresaFinal=${formData.fechaIngresoEmpresaFinal}&limit=${limitPerPage}`;

		try {
			const response = await getFilteredEmployees(filters);
			console.log(response);

			if (response.status == 200) {
				setTotalPages(response.data.totalPages);
				setCurrentPage(response.data.currentPage);
				setFilteredEmployees(response.data.trabajadores);
			}
		} catch (e: any) {
			console.error(e);
		}
	}

	async function selectPageNavigate(page: number) {
		const filters = `?numero=${formData.numero}&sede=${formData.sede}&area=${formData.area}&ubicacionEspecifica=${formData.ubicacionEspecifica}&codigo=${formData.codigo}&marca=${formData.marca}&fechaIngresoEmpresaInicial=${formData.fechaIngresoEmpresaInicial}&fechaIngresoEmpresaFinal=${formData.fechaIngresoEmpresaFinal}&page=${page}&limit=${limitPerPage}`;

		try {
			const response: any = await getFilteredEmployees(filters);

			if (response.status == 200) {
				setCurrentPage(response.data.currentPage);
				setTotalPages(response.data.totalPages);
				setFilteredEmployees(response.data.trabajadores);
			}
		} catch (e: any) {
			console.error(e);
		}
	}

	async function navigatePage(action: string) {
		if (action == "next") {
			const filters = `?numero=${formData.numero}&sede=${formData.sede}&area=${formData.area
				}&ubicacionEspecifica=${formData.ubicacionEspecifica}&codigo=${formData.codigo
				}&marca=${formData.marca}&fechaIngresoEmpresaInicial=${formData.fechaIngresoEmpresaInicial
				}&fechaIngresoEmpresaFinal=${formData.fechaIngresoEmpresaFinal}&page=${currentPage + 1
				}&limit=${limitPerPage}`;

			try {
				const response: any = await getFilteredEmployees(filters);

				if (response.status == 200) {
					setCurrentPage(response.data.currentPage);
					setTotalPages(response.data.totalPages);
					setFilteredEmployees(response.data.trabajadores);
				}
			} catch (e: any) {
				console.error(e);
			}
		} else if (action == "previous") {
			const filters = `?numero=${formData.numero}&sede=${formData.sede}&area=${formData.area
				}&ubicacionEspecifica=${formData.ubicacionEspecifica}&codigo=${formData.codigo
				}&marca=${formData.marca}&fechaIngresoEmpresaInicial=${formData.fechaIngresoEmpresaInicial
				}&fechaIngresoEmpresaFinal=${formData.fechaIngresoEmpresaFinal}&page=${currentPage - 1
				}&limit=${limitPerPage}`;

			try {
				const response: any = await getFilteredEmployees(filters);

				if (response.status == 200) {
					setCurrentPage(response.data.currentPage);
					setTotalPages(response.data.totalPages);
					setFilteredEmployees(response.data.trabajadores);
				}
			} catch (e: any) {
				console.error(e);
			}
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

	const handleActionClick = (action: "create" | "edit" | "view" | "delete" | "change", data: any) => {
		console.log("Acción seleccionada:", action, "Datos:", data); // Depuración
		setMode(action); // 'view', 'edit', 'change'
		setFormData(data); // Asegúrate de tener una función setFormData para manejar los datos
		if (action != "delete") {
			setActiveModal(true); // Abre el modal
		}

		if (action === "delete") {
			console.log("Acción seleccionada:", action, "Datos:", data); // Depuración
			Swal.fire({
				icon: "question",
				title: "¿Estás segur@ de realizar esta acción?",
				showCancelButton: true,
				cancelButtonText: "Cancelar",
				confirmButtonText: "Sí",
				confirmButtonColor: "#1b84ff",
			}).then((result) => {
				if (result.isConfirmed) {
					console.log('Data enviada (Editar):', data);
					onDataUpdate(data, mode);
				}
			});
		}
	};

	// Lógica para agregar o editar datos
	const handleFormSubmit = (data: any) => {
		if (mode === "create") {
			setEmployees((prevData) => [...prevData, data]);
		} else if (mode === "edit" || mode === "delete" || mode === "change") {
			onDataUpdate(data, mode);
		}
		setActiveModal(false);
	};

	return (
		<KTCardBody className="py-4 card card-grid min-w-full">
			{activeModal ? (
				<ModalEmergencyLightsForm
					idEmployee={''}
					children={null}
					onClose={() => setActiveModal(false)}
					onSubmit={handleFormSubmit}
					mode={mode} // Pasar el mode al modal
					formData={formData} // Pasar los datos al modal
				></ModalEmergencyLightsForm>
			) : (
				""
			)}

			<p>Filtros de búsqueda</p>

			<form>
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
					</div>

					{/* Otros campos del formulario */}
				</div>
			</form>

			<hr />

			<p>{"Coincidencias" + ": " + data.length}</p>

			<div className="d-grid gap-2 d-md-flex justify-content-md-end">
				<button className="btn btn-success btn-sm disabled" type="button">
					<i className="bi bi-file-earmark-spreadsheet-fill"></i>
					Importar a Excel
				</button>
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
							<th className="min-w-200px">Numero</th>
							<th className="min-w-200px">Sede</th>
							<th className="min-w-200px">Área</th>
							<th className="min-w-200px">Ubicacion especifica</th>
							<th className="min-w-200px">Marca</th>
							<th className="min-w-200px">Fecha de Ingreso Empresa</th>
							<th className="min-w-200px">Acciones</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{data.length > 0 &&
							data.map((light, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{light.numero}</td>
									<td>{light.sede}</td>
									<td>{light.area}</td>
									<td>{light.ubicacionEspecifica}</td>
									<td>{light.marca}</td>
									<td>{dayMonthYear(light.fechaIngresoEmpresa)}</td>
									<td>
										<div className="d-grid gap-2 d-md-flex">
											<button
												className="btn  btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
												type="button"
												data-bs-toggle="modal"
												title="Ver"
												data-bs-target="#staticBackdrop"
												data-uneditable
												onClick={() => handleActionClick('view', light)}>
												<i className="fas fa-eye fs-4"></i>
											</button>
											<button
												className="btn  btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
												type="button"
												data-bs-toggle="modal"
												title="Editar"
												data-bs-target="#staticBackdrop"
												onClick={() => handleActionClick('edit', light)}>
												<i className="fas fa-edit fs-4"></i>
											</button>
											<button
												className="btn  btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
												type="button"
												data-bs-toggle="modal"
												title="Cambiar"
												onClick={() => handleActionClick('change', light)}
												data-bs-target="#staticBackdrop">
												<i className="fas fa-rotate fs-4"></i>
											</button>
											<button
												type="button"
												onClick={() => handleActionClick('delete', light)}
												className="btn btn-sm btn-icon btn-active-icon-danger btn-active-light-danger"
												title="Eliminar">
												<i className="fas fa-trash fs-4"></i>
											</button>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			{data.length == 0 && (
				<p className="text-center mb-5">
					No se encontraron luces de emergencia
				</p>
			)}

			{data.length != 0 && (
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
		</KTCardBody>
	);
};
