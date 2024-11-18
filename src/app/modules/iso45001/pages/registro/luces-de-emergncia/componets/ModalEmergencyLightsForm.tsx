import { ReactNode, useEffect, useState } from "react";
// import { EmployeeResponse, EmployeeRequest } from "../../core/_models";
import Swal from "sweetalert2";
// import {
// 	deleteEmployeeService,
// 	getEmployeeById,
// 	putEmployeeService,
// } from "../../core/_requests";
import { appStateService } from "../../../../../../services/appState.service";
import { dateInput } from "../../../../../../utils/dateFormat";
import {
	deleteEmergencyLightService,
	deleteEmployeeService,
	getEmergencyLightById,
	getEmployeeById,
	putEmergencyLightService,
	putEmployeeService,
} from "@zeus/app/modules/human-resources/tools/calendar/core/_requests";
import {
	EmergencyLightsRequest,
	EmergencyLightsResponse,
	EmployeeRequest,
	EmployeeResponse,
} from "@zeus/app/modules/human-resources/tools/calendar/core/_models";
import { accionValidacionGuardar } from "@zeus/app/utils/mensajesPredeterminados";

interface MyComponentProps {
	idEmployee: string;
	children?: ReactNode;
	mode: 'create' | 'edit' | 'view' | "delete" | "change";
	formData: any;
	onClose: () => void;
	onSubmit: (newData: any) => void;
}

export interface EmergencyLightsForm {
	id?: string;
	numero: string;
	sede: string;
	area: string;
	ubicacionEspecifica: string;
	codigo: string;
	marca: string;
	fechaIngresoEmpresa: string;
}

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
export const ModalEmergencyLightsForm: React.FC<MyComponentProps & { mode: 'view' | 'edit' | 'create' | "delete" | "change", formData?: EmergencyLightsForm }> = ({
	idEmployee,
	children,
	mode,
	onClose,
	onSubmit,
	formData
}) => {

	const [initialData, setInitialData] = useState<EmergencyLightsForm>(formData);
	const [dataLight, setDataLight] = useState<EmergencyLightsForm[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(true);
	const [form, setForm] = useState<EmergencyLightsForm>(
		initialData || {
			id: "",
			numero: "",
			sede: "",
			area: "",
			ubicacionEspecifica: "",
			codigo: "",
			marca: "",
			fechaIngresoEmpresa: "",
		});

	useEffect(() => {
		const initEmployee = async () => {
			try {
				const response = await getEmergencyLightById(idEmployee);

				if (response.status == 200) {
					const employee: EmergencyLightsResponse = response.data;

					setForm({
						id: employee._id,
						numero: employee.area,
						sede: employee.sede,
						area: employee.area,
						ubicacionEspecifica: employee.ubicacionEspecifica,
						codigo: employee.codigo,
						marca: employee.marca,
						fechaIngresoEmpresa: dateInput(employee.fechaIngresoEmpresa),
					});
				}
			} catch (error: any) {
				console.error(error);
			}
		};

		// Función para cargar los datos de inspección si el modo es 'edit' o 'view'
		if (mode === 'edit' || mode === 'view') {
			const lightEdit = dataLight.find((light) => light.id === idEmployee);
			if (lightEdit) {
				// Copiamos la inspección encontrada en 'form' y llenamos valores faltantes con valores por defecto
				setForm({
					...form, // Mantén los valores predeterminados para campos faltantes
					...lightEdit, // Sobrescribe solo los campos presentes en inspectionToEdit
				});
			}
		} else {
			// En modo 'create', limpiar el formulario
			setForm({ ...form, id: Date.now().toString() });
		}

		initEmployee();
	}, [mode, idEmployee, dataLight]);

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Primero, validar el formulario antes de proceder
		console.log(form, 'form')
		if (
			!form.numero ||
			!form.sede ||
			!form.area ||
			!form.ubicacionEspecifica ||
			!form.codigo ||
			!form.marca
			|| !form.fechaIngresoEmpresa
		) {
			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer;
					toast.onmouseleave = Swal.resumeTimer;
				},
			});
			Toast.fire({
				icon: "error",
				title: accionValidacionGuardar(),
			});

			return;
		}

		// Mostrar el modal de confirmación solo si la validación es exitosa
		Swal.fire({
			icon: "question",
			title: "¿Estás segur@ de realizar esta acción?",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			confirmButtonText: "Sí",
			confirmButtonColor: "#1b84ff",
		}).then((result) => {
			if (result.isConfirmed) {
				// Crear nuevo objeto
				const newLight: EmergencyLightsRequest = { ...form };

				// Llamar al callback con el nuevo objeto
				try {
					onSubmit(newLight);
					setForm({ ...form });
					onClose();
				} catch (e: any) {
					console.error(e);
				}
				// Limpiar el formulario
				setForm({
					numero: "",
					sede: "",
					area: "",
					ubicacionEspecifica: "",
					codigo: "",
					marca: "",
					fechaIngresoEmpresa: "",
				});
				// Cerrar el modal
				const closeButton = document.getElementById("closeButton");
				closeButton?.click();

				Swal.fire({
					icon: "success",
					title: "Luz de emergencia creada correctamente",
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 3000,
				});
			}
		});
	}

	return (
		<div
			className="modal fade show"
			id="modal"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true"
			style={{
				display: "block",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				backdropFilter: "blur(1px)",
			}}
		>
			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="staticBackdropLabel">
							Luz de emergencia
						</h1>
						<button
							type="button"
							onClick={onClose}
							className="btn-close"
						></button>
					</div>
					<div className="modal-body">
						<div className="card">
							<div className="card-body">
								<form>
									<div className="row g-3 align-items-start justify-content-evenly mt-2">
										<div className="col-6">
											<label
												htmlFor="numeroInput"
												className="required col-form-label"
											>
												Numero
											</label>
										</div>
										<div className="col-6">
											<input
												type="text"
												id="numeroInput"
												name="numero"
												value={form.numero}
												onChange={handleChange}
												placeholder="Numero"
												className="form-control input-sm"
												disabled={mode === "view" || mode === "change"}
											/>
										</div>
									</div>

									<div className="row g-3 align-items-start justify-content-evenly mt-2">
										<div className="col-6">
											<label
												htmlFor="sedeInput"
												className="required col-form-label"
											>
												Sede
											</label>
										</div>
										<div className="col-6">
											<select
												className="form-select select-sm"
												id="sedeInput"
												name="sede"
												value={form.sede}
												onChange={handleChange}
												aria-label="Default select example"
												disabled={mode === "view" || mode === "change"}
											>
												<option value="">Seleccione</option>
												<option value="Sede 1">Sede 1</option>
												<option value="Sede 2">Sede 2</option>
											</select>
										</div>
									</div>

									<div className="row g-3 align-items-start justify-content-evenly mt-2">
										<div className="col-6">
											<label
												htmlFor="areaInput"
												className="required col-form-label"
											>
												Área
											</label>
										</div>
										<div className="col-6">
											<select
												className="form-select select-sm"
												id="areaInput"
												name="area"
												value={form.area}
												onChange={handleChange}
												aria-label="Default select example"
												disabled={mode === "view"}
											>
												<option value="">Seleccione</option>
												<option value="Área 1">Área 1</option>
												<option value="Área 2">Área 2</option>
											</select>
										</div>
									</div>

									<div className="row g-3 align-items-start justify-content-evenly mt-2">
										<div className="col-6">
											<label
												htmlFor="ubicacionEspecificaInput"
												className="required col-form-label"
											>
												Ubicación especifica
											</label>
										</div>
										<div className="col-6">
											<input
												type="text"
												id="ubicacionEspecificaInput"
												name="ubicacionEspecifica"
												value={form.ubicacionEspecifica}
												onChange={handleChange}
												placeholder="Ubicación especifica"
												className="form-control input-sm"
												disabled={mode === "view"}
											/>
										</div>
									</div>

									<div className="row g-3 align-items-start justify-content-evenly mt-2">
										<div className="col-6">
											<label
												htmlFor="codigoInput"
												className="required col-form-label"
											>
												Código
											</label>
										</div>
										<div className="col-6">
											<input
												type="text"
												pattern="[a-zA-Z0-9]+"
												id="codigoInput"
												name="codigo"
												value={form.codigo}
												onChange={handleChange}
												placeholder="Código"
												className="form-control input-sm"
												disabled={mode === "view"}
											/>
										</div>
									</div>

									<div className="row g-3 align-items-start justify-content-evenly mt-2">
										<div className="col-6">
											<label
												htmlFor="marcaInput"
												className="required col-form-label"
											>
												Marca
											</label>
										</div>
										<div className="col-6">
											<input
												placeholder="Ej. Marca"
												name="marca"
												type="text"
												list="marcasExistentes"
												id="marcaInput"
												value={form.marca}
												onChange={handleChange}
												className="form-control input-sm"
												required
												disabled={mode === "view"}
											/>
											<datalist id="marcasExistentes">
												<option value="Adidas">Adidas</option>
												<option value="Samsung">Samsung</option>
												<option value="LG">LG</option>
												<option value="Huawei">Huawei</option>
												<option value="Toyota">Toyota</option>
												<option value="Tesla">Tesla</option>
											</datalist>
										</div>
									</div>

									<div className="row g-3 align-items-start justify-content-evenly mt-2">
										<div className="col-6">
											<label
												htmlFor="fechaIngresoEmpresaInput"
												className="required col-form-label"
											>
												Fecha de ingreso a la empresa
											</label>
										</div>
										<div className="col-6">
											<input
												type="date"
												id="fechaIngresoEmpresaInput"
												name="fechaIngresoEmpresa"
												value={form.fechaIngresoEmpresa}
												onChange={handleChange}
												className="form-control input-sm"
												disabled={mode === "view"}
											/>
										</div>
									</div>

									<div className="d-flex justify-content-center gap-10 modal-footer">
										{mode !== 'view' && (
											<button type="button" className="btn btn-primary"
												onClick={handleSubmit}>
												{mode === 'edit' ? 'Actualizar' : mode === 'change' ? 'Cambiar' : 'Crear'}
											</button>
										)}
										<button type="button" className="btn btn-danger" onClick={onClose}>Cancelar</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
