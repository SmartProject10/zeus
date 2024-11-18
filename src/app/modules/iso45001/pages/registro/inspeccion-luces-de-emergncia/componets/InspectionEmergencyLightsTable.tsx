import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { KTCardBody } from "../../../../../../../_zeus/helpers";
import { appStateService } from "../../../../../../services/appState.service";
import { dayMonthYear } from "../../../../../../utils/dateFormat";
// import { EmployeeRequest, EmployeeResponse } from "../../core/_models";
// import { getFilteredEmployees, putEmployeeService } from "../../core/_requests";
// import ModalTrabajador from "./ModalTrabajador";
import { InspeccionResponse, EmergencyLightsForm, Sede, AreaResponsable, LuzEmergencia, InspeccionadoPor, Cargo, Trabajador, optionType, EmergencyLightsResponse } from '../core/_models';
import { getAreaResponsable, getCargo, getInspeccionadoPor, getLuzEmergencia, getSede, getTrabajador } from "../core/_requests";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import {
	EmployeeRequest,
	EmployeeResponse,
} from "@zeus/app/modules/human-resources/tools/calendar/core/_models";
import {
	getFilteredEmployees,
	putEmployeeService,
} from "@zeus/app/modules/human-resources/tools/calendar/core/_requests";
import { ModalInspectionEmergencyLightsForm } from "./ModalInspectionEmergencyLightsForm";

interface InspectionEmergencylightsTableProps {
	dataList: any[];
	onDataUpdate: (newData: any, mode: "create" | "edit" | "delete" | "view") => void;
}

export const InspectionEmergencylightsTable: React.FC<InspectionEmergencylightsTableProps> = ({ dataList, onDataUpdate }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	console.log("Datos recibidos del modal 3:", dataList);
	const [employees, setEmployees] = useState<EmergencyLightsResponse[]>([]);
	const [filteredEmployees, setFilteredEmployees] = useState<
		any[]
	>([]);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [limitPerPage, setLimitPerPage] = useState<number>(10);
	const [idEmployee, setIdEmployee] = useState("");
	const [formData, setFormData] = useState<EmergencyLightsForm>({
		id: "",
		fechaInspeccion: "",
		inspeccionadoPor: "",
		cargo: "",
		trabajador: "",
		sede: "",
		luzEmergencia: "",
		//Enumerado
		enumerado: false,
		areaEnumerado: "",
		fechaVencimientoEnumerado: "",
		observacionEnumerado: "",
		recomendacionEnumerado: "",
		//UbicacionAdecuada
		ubicacionAdecuada: false,
		areaUbicacionAdecuada: "",
		fechaVencimientoUbicacionAdecuada: "",
		observacionUbicacionAdecuada: "",
		recomendacionUbicacionAdecuada: "",
		//EnSuLugar
		enSuLugar: false,
		areaEnSuLugar: "",
		fechaVencimientoEnSuLugar: "",
		observacionEnSuLugar: "",
		recomendacionEnSuLugar: "",
		//LibreDeObstaculos
		libreDeObstaculos: false,
		areaLibreDeObstaculos: "",
		fechaVencimientoLibreDeObstaculos: "",
		observacionLibreDeObstaculos: "",
		recomendacionLibreDeObstaculos: "",
		//ConectadoTomacorriente
		conectadoTomacorriente: false,
		areaConectadoTomacorriente: "",
		fechaVencimientoConectadoTomacorriente: "",
		observacionConectadoTomacorriente: "",
		recomendacionConectadoTomacorriente: "",
		//EnciendeSwitchPrueba
		enciendeSwitchPrueba: false,
		areaEnciendeSwitchPrueba: "",
		fechaVencimientoEnciendeSwitchPrueba: "",
		observacionEnciendeSwitchPrueba: "",
		recomendacionEnciendeSwitchPrueba: "",
		//BuenaIluminacion
		buenaIluminacion: false,
		areaBuenaIluminacion: "",
		fechaVencimientoBuenaIluminacion: "",
		observacionBuenaIluminacion: "",
		recomendacionBuenaIluminacion: "",
		//BuenaEstado
		buenaEstado: false,
		areaBuenaEstado: "",
		fechaVencimientoBuenaEstado: "",
		observacionBuenaEstado: "",
		recomendacionBuenaEstado: "",
		//EncendidoQuinceMin
		encendidoQuinceMin: false,
		areaEncendidoQuinceMin: "",
		fechaVencimientoEncendidoQuinceMin: "",
		observacionEncendidoQuinceMin: "",
		recomendacionEncendidoQuinceMin: "",

		observacion: "",
		recomendacion: "",
		foto: "",
		nuevoEquipo: false,
		PDF: "",
	});

	const [mode, setMode] = useState<"create" | "edit" | "view" | "delete">("create");
	const [activeModal, setActiveModal] = useState<boolean>(false);
	const [sedeOptions, setSedeOptions] = useState<Sede[]>([]);
	const [luzEmergenciaOptions, setluzEmergenciaOptions] = useState<LuzEmergencia[]>([]);
	const [areaResponsableOptions, setAreaResponsableOptions] = useState<AreaResponsable[]>([]);
	const [inspeccionadoPorOptions, setInspeccionadoPorOptions] = useState<InspeccionadoPor[]>([]);
	const [cargoOptions, setCargoOptions] = useState<Cargo[]>([]);
	const [trabajadorOptions, setTrabajadorOptions] = useState<Trabajador[]>([]);

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

		const fetchOptions = async () => {
			try {
				const sedeResponse = await getSede();
				console.log("Datos recibidos:", sedeResponse.data);
				setSedeOptions(sedeResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de sede:", error);
			}

			try {
				const luzEmergenciaResponse = await getLuzEmergencia();
				console.log("Datos recibidos:", luzEmergenciaResponse.data);
				setluzEmergenciaOptions(luzEmergenciaResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de luz de emergencia:", error);
			}

			try {
				const areaResponsableResponse = await getAreaResponsable();
				console.log("Datos recibidos:", areaResponsableResponse.data);
				setAreaResponsableOptions(areaResponsableResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de área responsable:", error);
			}

			try {
				const inspeccionadoPorResponse = await getInspeccionadoPor();
				console.log("Datos recibidos:", inspeccionadoPorResponse.data);
				setInspeccionadoPorOptions(inspeccionadoPorResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de inspeccionado por:", error);
			}

			try {
				const cargoResponse = await getCargo();
				console.log("Datos recibidos:", cargoResponse.data);
				setCargoOptions(cargoResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de cardo:", error);
			}

			try {
				const trabajadorResponse = await getTrabajador();
				console.log("Datos recibidos:", trabajadorResponse.data);
				setTrabajadorOptions(trabajadorResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de trabajador:", error);
			}
		};

		fetchOptions();
		employeesInit();

		const employeesSubj = appStateService
			.getEmployeesSubject()
			.subscribe((employees: any) => {
				setEmployees(employees);
				setFilteredEmployees(employees);
			});

		const activeModalSubj = appStateService
			.getActiveModalSubject()
			.subscribe((state: boolean) => {
				setActiveModal(state);
			});

		return () => {
			employeesSubj.unsubscribe();
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
	};

	async function applyFilters() {
		// eslint-disable-next-line max-len
		const filters = `?fechaInspeccion=${formData.fechaInspeccion}&area=${formData.inspeccionadoPor}&sede=${formData.sede}&enumerado=${formData.enumerado}&ubicacionAdecuada=${formData.ubicacionAdecuada}&enSuLugar=${formData.enSuLugar}&libreDeObstaculos=${formData.libreDeObstaculos}&conectadoTomacorriente=${formData.conectadoTomacorriente}&enciendeSwitchPrueba=${formData.enciendeSwitchPrueba}&buenaIluminacion=${formData.buenaIluminacion}&buenaEstado=${formData.buenaEstado}&encendidoQuinceMin=${formData.encendidoQuinceMin}&limit=${limitPerPage}`;

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
		// eslint-disable-next-line max-len
		const filters = `?fechaInspeccion=${formData.fechaInspeccion}&area=${formData.inspeccionadoPor}&sede=${formData.sede}&enumerado=${formData.enumerado}&ubicacionAdecuada=${formData.ubicacionAdecuada}&enSuLugar=${formData.enSuLugar}&libreDeObstaculos=${formData.libreDeObstaculos}&conectadoTomacorriente=${formData.conectadoTomacorriente}&enciendeSwitchPrueba=${formData.enciendeSwitchPrueba}&buenaIluminacion=${formData.buenaIluminacion}&buenaEstado=${formData.buenaEstado}&encendidoQuinceMin=${formData.encendidoQuinceMin}&limit=${limitPerPage}`;

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
			// eslint-disable-next-line max-len
			const filters = `?fechaInspeccion=${formData.fechaInspeccion}&area=${formData.inspeccionadoPor}&sede=${formData.sede}&enumerado=${formData.enumerado}&ubicacionAdecuada=${formData.ubicacionAdecuada}&enSuLugar=${formData.enSuLugar}&libreDeObstaculos=${formData.libreDeObstaculos}&conectadoTomacorriente=${formData.conectadoTomacorriente}&enciendeSwitchPrueba=${formData.enciendeSwitchPrueba}&buenaIluminacion=${formData.buenaIluminacion}&buenaEstado=${formData.buenaEstado}&encendidoQuinceMin=${formData.encendidoQuinceMin}&limit=${limitPerPage}`;

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
			// eslint-disable-next-line max-len
			const filters = `?fechaInspeccion=${formData.fechaInspeccion}&area=${formData.inspeccionadoPor}&sede=${formData.sede}&enumerado=${formData.enumerado}&ubicacionAdecuada=${formData.ubicacionAdecuada}&enSuLugar=${formData.enSuLugar}&libreDeObstaculos=${formData.libreDeObstaculos}&conectadoTomacorriente=${formData.conectadoTomacorriente}&enciendeSwitchPrueba=${formData.enciendeSwitchPrueba}&buenaIluminacion=${formData.buenaIluminacion}&buenaEstado=${formData.buenaEstado}&encendidoQuinceMin=${formData.encendidoQuinceMin}&limit=${limitPerPage}`;

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

	const exportEmployeeToExcel = (employee: EmergencyLightsResponse) => {
		const employeeArray: EmergencyLightsResponse[] = [];
		employeeArray.push(employee);

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

	// Obtener el nombre en base al ID
	const getNameById = (options: optionType[], id: string | number): string => {
		const option = options.find((item) => item.id === id);
		return option ? option.name : 'Desconocido';
	};

	//Dar formato de fecha dd/mm/yyyy
	const formatFecha = (fechaString: string) => {
		const date = new Date(fechaString);
		return date.toLocaleDateString("es-ES");
	};

	const handleActionClick = (action: "create" | "edit" | "view" | "delete", data: any) => {
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
		} else if (mode === "edit") {
			onDataUpdate(data, mode);
		} else if (mode === "delete") {
			onDataUpdate(data, mode);
		}
		setActiveModal(false);
	};

	return (
		<KTCardBody className="py-4 card card-grid min-w-full">
			{activeModal ? (
				<ModalInspectionEmergencyLightsForm
					idEmployee={idEmployee}
					onClose={() => setActiveModal(false)}
					onSubmit={handleFormSubmit}
					mode={mode}
					formData={formData}
				></ModalInspectionEmergencyLightsForm>
			) : (
				""
			)}

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
							<th className="min-w-200px">Número</th>
							<th className="min-w-200px">Fecha de inspección</th>
							<th className="min-w-200px">Inspeccionado por</th>
							<th className="min-w-200px">Observaciones</th>
							<th className="min-w-200px">Acciones</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{dataList.length > 0 &&
							dataList.map((data, index) => (
								<tr key={index}>
									<td>{getNameById(luzEmergenciaOptions, data.luzEmergencia)}</td>
									<td>{formatFecha(data.fechaInspeccion)}</td>
									<td>{getNameById(inspeccionadoPorOptions, data.inspeccionadoPor)}</td>
									<td>{data.observacion}</td>
									<td>
										<div className="d-flex gap-2">
											<button
												className="btn  btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
												type="button"
												data-bs-toggle="modal"
												title="Ver"
												data-bs-target="#staticBackdrop"
												data-uneditable
												onClick={() => handleActionClick('view', data)}>
												<i className="fas fa-eye fs-4"></i>
											</button>
											<button
												className="btn  btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
												type="button"
												data-bs-toggle="modal"
												title="Editar"
												data-bs-target="#staticBackdrop"
												onClick={() => handleActionClick('edit', data)}>
												<i className="fas fa-edit fs-4"></i>
											</button>
											<button
												type="button"
												onClick={() => handleActionClick('delete', data)}
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

			{dataList.length == 0 && (
				<p className="text-center mb-5">
					No se encontraron luces de emergencia
				</p>
			)}

			{dataList.length != 0 && (
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
