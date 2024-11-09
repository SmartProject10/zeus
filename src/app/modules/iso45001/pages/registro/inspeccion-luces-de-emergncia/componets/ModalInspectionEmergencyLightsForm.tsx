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
import './InspectionEmergencyStyle.scss';
import { InspeccionResponse } from '../core/_models';
import CheckboxSwitch from './CheckboxSwitch';
import ConditionalFields from './ConditionalFields';

interface MyComponentProps {
	idEmployee: string;
	onClose: () => void;
	children?: ReactNode;
}

//Variable titulo del modal
const tituloModal = 'Luz de emergencia';

//Variable titulos campos formulario
const fechaInspeccion = 'Fecha de inspección';
const inspeccionadoPor = 'Inspeccionado por';
const sede = 'Sede';

//Variables titulos campos numeral
const numeral1 = '1. Se encunetra enumerado';
const numeral2 = '2. Tiene ubicación adecuada';
const numeral3 = '3. Se encuentra en su lugar';
const numeral4 = '4. Se encuentra libre de obstáculos';
const numeral5 = '5. Conectado al tomacorriente';
const numeral6 = '6. Enciende con el swich de prueba';
const numeral7 = '7. Tiene buena iluminación';
const numeral8 = '8. Se encuentra en buen estado';
const numeral9 = '9. Se mantiene encendida mas de 15 minutos';

//Variables campos adicionales
const areaResponsable = 'Área responsable';
const recomendacion = 'Recomendación';
const observacion = 'Observación';

//Se reutiliza response de accidentes
const initialValues: InspeccionResponse = {
	_id: '',
	fecha: '',
	hora: '',
	inspeccionadoPor: '',
	cargo: '',
	trabajador: '',
	dni: '',
	name: '',
	descripcion: '',
	imagenes: [],
	fotoTrabajador: '',
	reportadoPor: '',
	elaboradoPor: '',
	estadoRegistro: '',
	registroAccidente: [],
	createdAt: '',
	updatedAt: ''
};

// Opciones fake de áreas, cargos y trabajadores
const inspeccionadoPorOptions = [
	{ id: "1", name: 'Gerencia' },
	{ id: "2", name: 'Seguridad industrial' }
];

const cargoOptions = [
	{ id: "1", name: 'Gerente', area: "1" },
	{ id: "2", name: 'Jefe', area: "2" }
];

const trabajadorOptions = [
	{ id: 1, name: 'Juan Pérez', cargo: '1', dni: '12345678', foto: '/man1.jpg' },
	{ id: 2, name: 'María Gómez', cargo: '2', dni: '87654321', foto: '/woman1.jpg' },
	{ id: 3, name: 'Carlos Rodriguez', cargo: '2', dni: '11223344', foto: '/man2.jpg' },
];

export interface EmergencyLightsForm {
	fechaInspeccion: string;
	sede: string;
	//enumerado
	enumerado: boolean;
	areaEnumerado: string;
	observacionEnumerado: string;
	recomendacionEnumerado: string;
	//ubicacionAdecuada
	ubicacionAdecuada: boolean;
	areaUbicacionAdecuada: string;
	observacionUbicacionAdecuada: string;
	recomendacionUbicacionAdecuada: string;
	//enSuLugar
	enSuLugar: boolean;
	areaEnSuLugar: string;
	observacionEnSuLugar: string;
	recomendacionEnSuLugar: string;
	//libreDeObstaculos
	libreDeObstaculos: boolean;
	areaLibreDeObstaculos: string;
	observacionLibreDeObstaculos: string;
	recomendacionLibreDeObstaculos: string;
	//conectadoTomacorriente
	conectadoTomacorriente: boolean;
	areaConectadoTomacorriente: string;
	observacionConectadoTomacorriente: string;
	recomendacionConectadoTomacorriente: string;
	//enciendeSwitchPrueba
	enciendeSwitchPrueba: boolean;
	areaEnciendeSwitchPrueba: string;
	observacionEnciendeSwitchPrueba: string;
	recomendacionEnciendeSwitchPrueba: string;
	//buenaIluminacion
	buenaIluminacion: boolean;
	areaBuenaIluminacion: string;
	observacionBuenaIluminacion: string;
	recomendacionBuenaIluminacion: string;
	//buenaEstado
	buenaEstado: boolean;
	areaBuenaEstado: string;
	observacionBuenaEstado: string;
	recomendacionBuenaEstado: string;
	//encendidoQuinceMin
	encendidoQuinceMin: boolean;
	areaEncendidoQuinceMin: string;
	observacionEncendidoQuinceMin: string;
	recomendacionEncendidoQuinceMin: string;

	observacion: string;
	recomendacion: string;
	foto: string;
	nuevoEquipo: boolean;
	PDF: string;
}

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
export const ModalInspectionEmergencyLightsForm: React.FC<MyComponentProps> = ({
	idEmployee,
	onClose,
	children,
}) => {


	const [formData, setFormData] = useState(
		initialValues
	);

	// Filtrar cargos según el área seleccionada
	const filteredCargos = cargoOptions.filter((cargo) => cargo.area === formData.inspeccionadoPor);
	// Filtrar trabajadores según el cargo seleccionado
	const filteredTrabajadores = trabajadorOptions.filter((trabajador) => trabajador.cargo === formData.cargo);

	const [form, setForm] = useState<EmergencyLightsForm>({
		fechaInspeccion: "",
		sede: "",
		//Enumerado
		enumerado: false,
		areaEnumerado: "",
		observacionEnumerado: "",
		recomendacionEnumerado: "",
		//UbicacionAdecuada
		ubicacionAdecuada: false,
		areaUbicacionAdecuada: "",
		observacionUbicacionAdecuada: "",
		recomendacionUbicacionAdecuada: "",
		//EnSuLugar
		enSuLugar: false,
		areaEnSuLugar: "",
		observacionEnSuLugar: "",
		recomendacionEnSuLugar: "",
		//LibreDeObstaculos
		libreDeObstaculos: false,
		areaLibreDeObstaculos: "",
		observacionLibreDeObstaculos: "",
		recomendacionLibreDeObstaculos: "",
		//ConectadoTomacorriente
		conectadoTomacorriente: false,
		areaConectadoTomacorriente: "",
		observacionConectadoTomacorriente: "",
		recomendacionConectadoTomacorriente: "",
		//EnciendeSwitchPrueba
		enciendeSwitchPrueba: false,
		areaEnciendeSwitchPrueba: "",
		observacionEnciendeSwitchPrueba: "",
		recomendacionEnciendeSwitchPrueba: "",
		//BuenaIluminacion
		buenaIluminacion: false,
		areaBuenaIluminacion: "",
		observacionBuenaIluminacion: "",
		recomendacionBuenaIluminacion: "",
		//BuenaEstado
		buenaEstado: false,
		areaBuenaEstado: "",
		observacionBuenaEstado: "",
		recomendacionBuenaEstado: "",
		//EncendidoQuinceMin
		encendidoQuinceMin: false,
		areaEncendidoQuinceMin: "",
		observacionEncendidoQuinceMin: "",
		recomendacionEncendidoQuinceMin: "",

		observacion: "",
		recomendacion: "",
		foto: "",
		nuevoEquipo: false,
		PDF: "",
	});

	useEffect(() => {
		const initEmployee = async () => {
			try {
				const response = await getEmergencyLightById(idEmployee);
				setFormData({ ...initialValues, _id: undefined });
				if (response.status == 200) {
					const employee: EmergencyLightsResponse = response.data;

					// setForm({
					// 	numero: employee.area,
					// 	sede: employee.sede,
					// 	area: employee.area,
					// 	ubicacionEspecifica: employee.ubicacionEspecifica,
					// 	codigo: employee.codigo,
					// 	marca: employee.marca,
					// 	fechaIngresoEmpresa: dateInput(employee.fechaIngresoEmpresa),
					// });
				}
			} catch (error: any) {
				console.error(error);
			}
		};

		initEmployee();
	}, []);

	const handleFieldChange = (field: string, value: any) => {
		setFormData({
			...formData,
			[field]: value,
		});
	};

	const handleSwitchChange = (fieldName: string, checked: boolean) => {
		setForm({
			...form,
			[fieldName]: checked, // Actualiza solo el campo especificado
		});
	};


	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
		setFormData({ ...formData, [name]: value });

		// Manejo de selects en cascada
		if (name === 'inspeccionadoPor') {
			setFormData({ ...formData, inspeccionadoPor: value, cargo: '', trabajador: '', name: '' });
		}

		if (name === 'cargo') {
			setFormData({ ...formData, cargo: value, trabajador: '' });
		}

		// Manejo de trabajador seleccionado
		if (name === 'trabajador') {
			const trabajador = trabajadorOptions.find(t => t.id.toString() === value);
			setFormData({ ...formData, trabajador: value, name: trabajador?.name || '' });
		}

		// Manejo del campo name seleccionado
		if (name === 'name') {
			const trabajador = trabajadorOptions.find(t => t.name === value);
			if (trabajador) {
				const cargo = cargoOptions.find(c => c.id.toString() === trabajador.cargo);
				const area = inspeccionadoPorOptions.find(a => a.id === cargo?.area);

				setFormData({
					...formData,
					name: value,
					inspeccionadoPor: area?.id || '',
					cargo: cargo?.id || '',
					trabajador: trabajador.id.toString(),
				});
			} else {
				setFormData({ ...formData, name: value, inspeccionadoPor: '', cargo: '', trabajador: '' });
			}
		}
	};

	function deleteEmployee(id: string) {
		Swal.fire({
			icon: "question",
			title: "¿Estas segur@ de realizar esta acción?",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			confirmButtonText: "Si",
			confirmButtonColor: "#1b84ff",
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					const deleteEmployee = async () => {
						const response = await deleteEmergencyLightService(id);

						if (response.status == 200) {
							// nesesario agregar estado global para estas entidades (luces de emergencia)
							// appStateService.deleteEmployeeSubject(id);
							// appStateService.setActiveModalSubject();

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
								icon: "success",
								title: "luz de emergencia eliminada correctamente",
							});
						}
					};

					deleteEmployee();
				} catch (e: any) {
					console.error(e);
				}
			} else if (result.isDenied) {
				// Swal.fire('Changes are not saved', '', 'info')
			}
		});
	}

	function putEmployee(id: string) {
		if (
			!form.fechaInspeccion ||
			!form.sede ||
			!form.areaEnumerado ||
			!form.enumerado ||
			!form.buenaEstado ||
			!form.buenaIluminacion ||
			!form.conectadoTomacorriente ||
			!form.enSuLugar ||
			!form.encendidoQuinceMin ||
			!form.enciendeSwitchPrueba ||
			!form.libreDeObstaculos ||
			!form.ubicacionAdecuada
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
				title: "Porfavor, rellenar todos los campos.",
			});

			return;
		}

		Swal.fire({
			icon: "question",
			title: "¿Estas segur@ de realizar esta acción?",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			confirmButtonText: "Si",
			confirmButtonColor: "#1b84ff",
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					// const editEmployee = async () => {
					// 	const request: EmergencyLightsRequest = {
					// 		numero: form.numero,
					// 		sede: form.sede,
					// 		area: form.area,
					// 		ubicacionEspecifica: form.ubicacionEspecifica,
					// 		codigo: form.codigo,
					// 		marca: form.marca,
					// 		fechaIngresoEmpresa: form.fechaIngresoEmpresa,
					// 	};

					// 	const response = await putEmergencyLightService(id, request);

					// 	if (response.status == 200) {
					// 		// nesesario agregar estado global para estas entidades (luces de emergencia)
					// 		// appStateService.putEmployeeSubject(id, request);
					// 		// appStateService.setActiveModalSubject();

					// 		const Toast = Swal.mixin({
					// 			toast: true,
					// 			position: "top-end",
					// 			showConfirmButton: false,
					// 			timer: 3000,
					// 			timerProgressBar: true,
					// 			didOpen: (toast) => {
					// 				toast.onmouseenter = Swal.stopTimer;
					// 				toast.onmouseleave = Swal.resumeTimer;
					// 			},
					// 		});
					// 		Toast.fire({
					// 			icon: "success",
					// 			title: "Luz de emergencia editada correctamente",
					// 		});
					// 	}
					// };

					// editEmployee();
				} catch (e: any) {
					console.error(e);
				}
			} else if (result.isDenied) {
				// Swal.fire('Changes are not saved', '', 'info')
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
			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
				<div className="modal-content">
					{/* Titulo modal */}
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="staticBackdropLabel">
							{tituloModal}
						</h1>
						<button
							type="button"
							onClick={onClose}
							className="btn-close"
						></button>
					</div>
					{/* Formulario */}
					<div className="modal-body">
						<form className="row g-6">
							<div className="col-12 sombreado-fondo">
								<div className="d-flex row">
									<div className="col-6 p-1">
										<label htmlFor="sedeInput" className="form-label required">
											{sede}
										</label>
										<select
											className="form-select select-sm"
											id="sedeInput"
											name="sede"
											value={form.sede}
											onChange={handleChange}
											aria-label="Default select example"
										>
											<option value="">Seleccione</option>
											<option value="Sede 1">Sede 1</option>
											<option value="Sede 2">Sede 2</option>
										</select>
									</div>
									<div className="col-6 p-1">
										<label htmlFor="fechaInspeccionInput" className="form-label required">
											{fechaInspeccion}
										</label>
										<input
											type="date"
											id="fechaInspeccionInput"
											name="fechaInspeccion"
											value={form.fechaInspeccion}
											onChange={handleChange}
											className="form-control input-sm"
										/>
									</div>
								</div>
								{/* Select cascada */}
								<div className="col-12 mt-4">
									<div className="row">
										<div className="col-6 p-1">
											<label className="required form-label">{inspeccionadoPor}</label>
											<select
												name="inspeccionadoPor"
												className="form-select"
												value={formData.inspeccionadoPor}
												onChange={handleChange}
											>
												<option value="">Seleccione</option>
												{inspeccionadoPorOptions.map((inspeccionadoPor) => (
													<option key={inspeccionadoPor.id} value={inspeccionadoPor.id}>{inspeccionadoPor.name}</option>
												))}
											</select>
										</div>
										{formData.inspeccionadoPor && (
											<div className="col-6 p-1 mt-2">
												<label className="form-label">{/*Cargo*/}</label>
												<select
													name="cargo"
													className="form-select"
													value={formData.cargo}
													onChange={handleChange}
												>
													<option value="">Seleccione</option>
													{filteredCargos.map((cargo) => (
														<option key={cargo.id} value={cargo.id}>{cargo.name}</option>
													))}
												</select>
											</div>
										)}
									</div>
								</div>
								<div className="col-12">
									<div className="row">
										{formData.cargo && (
											<div className="col-6 p-1">
												<label className="form-label">{/*Trabajador*/}</label>
												<select
													name="trabajador"
													className="form-select"
													value={formData.trabajador}
													onChange={handleChange}
												>
													<option value="">Seleccione</option>
													{filteredTrabajadores.map((trabajador) => (
														<option key={trabajador.id} value={trabajador.id.toString()}>{trabajador.name}</option>
													))}
												</select>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Card select numéricos */}
							<div className="card">
								<div className="card-body">
									{/* Enumerado */}
									<div className="col-12 row">
										<div className="row g-3 align-items-center justify-content-evenly mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label">{numeral1}</label>
											</div>
											<div className="col-2">
												<CheckboxSwitch
													label="Enumerado"
													checked={form.enumerado}
													onChange={(checked) => handleSwitchChange('enumerado', checked)}
												/>
											</div>
											<div className="col-6">
												<ConditionalFields visible={!form.enumerado}>
													<div className="row g-3 align-items-start justify-content-evenly">
														<div className="col-4">
															<label htmlFor="areaEnumeradoInput" className="required col-form-label">
																{areaResponsable}
															</label>
														</div>
														<div className="col-8">
															<select
																className="form-select select-sm"
																id="areaEnumeradoInput"
																name="areaEnumerado"
																value={form.areaEnumerado}
																onChange={handleChange}
															>
																<option value="">Seleccione</option>
																<option value="Área 1">Área 1</option>
																<option value="Área 2">Área 2</option>
															</select>
														</div>
													</div>
												</ConditionalFields>
											</div>
										</div>
										<ConditionalFields visible={form.enumerado === false && form.areaEnumerado !== ''}>
											<div className="row g-3 align-items-start justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="observacionEnumeradoInput" className="required col-form-label">
														{observacion}
													</label>
													<textarea
														id="observacionEnumeradoInput"
														name="observacionEnumerado"
														value={form.observacionEnumerado}
														onChange={handleChange}
														placeholder="Observación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="recomendacionEnumeradoInput" className="required col-form-label">
														{recomendacion}
													</label>
													<textarea
														id="recomendacionEnumeradoInput"
														name="recomendacionEnumerado"
														value={form.recomendacionEnumerado}
														onChange={handleChange}
														placeholder="Recomendación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* UbicacionAdecuada */}
									<div className="col-12 row">
										<div className="row g-3 align-items-center justify-content-evenly mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral2} </label>
											</div>
											<div className="col-2">
												<CheckboxSwitch
													label="Ubicación adecuada"
													checked={form.ubicacionAdecuada}
													onChange={(checked) => handleSwitchChange('ubicacionAdecuada', checked)}
												/>
											</div>
											<div className="col-6">
												<ConditionalFields visible={!form.ubicacionAdecuada}>
													<div className="row g-3 align-items-start justify-content-evenly">
														<div className="col-4">
															<label htmlFor="areaUbicacionAdecuadaInput" className="required col-form-label">
																{areaResponsable}
															</label>
														</div>
														<div className="col-8">
															<select
																className="form-select select-sm"
																id="areaUbicacionAdecuadaInput"
																name="areaUbicacionAdecuada"
																value={form.areaUbicacionAdecuada}
																onChange={handleChange}
															>
																<option value="">Seleccione</option>
																<option value="Área 1">Área 1</option>
																<option value="Área 2">Área 2</option>
															</select>
														</div>
													</div>
												</ConditionalFields>
											</div>
										</div>
										<ConditionalFields visible={form.ubicacionAdecuada === false && form.areaUbicacionAdecuada !== ''}>
											<div className="row g-3 align-items-start justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="observacionUbicacionAdecuadaInput" className="required col-form-label">
														{observacion}
													</label>
													<textarea
														id="observacionUbicacionAdecuadaInput"
														name="observacionUbicacionAdecuada"
														value={form.observacionUbicacionAdecuada}
														onChange={handleChange}
														placeholder="Ubicación específica"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="recomendacionUbicacionAdecuadaInput" className="required col-form-label">
														{recomendacion}
													</label>
													<textarea
														id="recomendacionUbicacionAdecuadaInput"
														name="recomendacionUbicacionAdecuada"
														value={form.recomendacionUbicacionAdecuada}
														onChange={handleChange}
														placeholder="Ubicación específica"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* EnSuLugar */}
									<div className="col-12 row">
										<div className="row g-3 align-items-center justify-content-evenly mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral3} </label>
											</div>
											<div className="col-2">
												<CheckboxSwitch
													label="En su lugar"
													checked={form.enSuLugar}
													onChange={(checked) => handleSwitchChange('enSuLugar', checked)}
												/>
											</div>
											<div className="col-6">
												<ConditionalFields visible={!form.enSuLugar}>
													<div className="row g-3 align-items-start justify-content-evenly">
														<div className="col-4">
															<label htmlFor="areaEnSuLugarInput" className="required col-form-label">
																{areaResponsable}
															</label>
														</div>
														<div className="col-8">
															<select
																className="form-select select-sm"
																id="areaEnSuLugarInput"
																name="areaEnSuLugar"
																value={form.areaEnSuLugar}
																onChange={handleChange}
															>
																<option value="">Seleccione</option>
																<option value="Área 1">Área 1</option>
																<option value="Área 2">Área 2</option>
															</select>
														</div>
													</div>
												</ConditionalFields>
											</div>
										</div>
										<ConditionalFields visible={form.enSuLugar === false && form.areaEnSuLugar !== ''}>
											<div className="row g-3 align-items-start justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="observacionEnSuLugarInput" className="required col-form-label">
														{observacion}
													</label>
													<textarea
														id="observacionEnSuLugarInput"
														name="observacionEnSuLugar"
														value={form.observacionEnSuLugar}
														onChange={handleChange}
														placeholder="Observación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="recomendacionEnSuLugarInput" className="required col-form-label">
														{recomendacion}
													</label>
													<textarea
														id="recomendacionEnSuLugarInput"
														name="recomendacionEnSuLugar"
														value={form.recomendacionEnSuLugar}
														onChange={handleChange}
														placeholder="Recomendación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* LibreDeObstaculos */}
									<div className="col-12 row">
										<div className="row g-3 align-items-center justify-content-evenly mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral4} </label>
											</div>
											<div className="col-2">
												<CheckboxSwitch
													label="Libre de obstaculos"
													checked={form.libreDeObstaculos}
													onChange={(checked) => handleSwitchChange('libreDeObstaculos', checked)}
												/>
											</div>
											<div className="col-6">
												<ConditionalFields visible={!form.libreDeObstaculos}>
													<div className="row g-3 align-items-start justify-content-evenly">
														<div className="col-4">
															<label htmlFor="areaLibreDeObstaculos" className="required col-form-label">
																{areaResponsable}
															</label>
														</div>
														<div className="col-8">
															<select
																className="form-select select-sm"
																id="areaLibreDeObstaculosInput"
																name="areaLibreDeObstaculos"
																value={form.areaLibreDeObstaculos}
																onChange={handleChange}
															>
																<option value="">Seleccione</option>
																<option value="Área 1">Área 1</option>
																<option value="Área 2">Área 2</option>
															</select>
														</div>
													</div>
												</ConditionalFields>
											</div>
										</div>
										<ConditionalFields visible={form.libreDeObstaculos === false && form.areaLibreDeObstaculos !== ''}>
											<div className="row g-3 align-items-start justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="observacionLibreDeObstaculosInput" className="required col-form-label">
														{observacion}
													</label>
													<textarea
														id="observacionLibreDeObstaculosInput"
														name="observacionLibreDeObstaculos"
														value={form.observacionLibreDeObstaculos}
														onChange={handleChange}
														placeholder="Observación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="recomendacionLibreDeObstaculosInput" className="required col-form-label">
														{recomendacion}
													</label>
													<textarea
														id="recomendacionLibreDeObstaculosInput"
														name="recomendacionLibreDeObstaculos"
														value={form.recomendacionLibreDeObstaculos}
														onChange={handleChange}
														placeholder="Recomendación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
												<div className="row g-3 align-items-start justify-content-evenly mt-2">
													<div className="col-6">
														<label
															htmlFor="fotoInput"
															className="required col-form-label"
														>
															Foto
														</label>
													</div>
													<div className="col-6">
														<input
															type="file"
															id="fotoInput"
															name="foto"
															value={form.foto}
															onChange={handleChange}
															placeholder="Ubicación especifica"
															className="form-control input-sm"
														/>
													</div>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* ConectadoTomacorriente */}
									<div className="col-12 row">
										<div className="row g-3 align-items-center justify-content-evenly mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral5} </label>
											</div>
											<div className="col-2">
												<CheckboxSwitch
													label="Conectado a toma corriente"
													checked={form.conectadoTomacorriente}
													onChange={(checked) => handleSwitchChange('conectadoTomacorriente', checked)}
												/>
											</div>
											<div className="col-6">
												<ConditionalFields visible={!form.conectadoTomacorriente}>
													<div className="row g-3 align-items-start justify-content-evenly">
														<div className="col-4">
															<label htmlFor="areaConectadoTomacorriente" className="required col-form-label">
																{areaResponsable}
															</label>
														</div>
														<div className="col-8">
															<select
																className="form-select select-sm"
																id="areaConectadoTomacorrienteInput"
																name="areaConectadoTomacorriente"
																value={form.areaConectadoTomacorriente}
																onChange={handleChange}
															>
																<option value="">Seleccione</option>
																<option value="Área 1">Área 1</option>
																<option value="Área 2">Área 2</option>
															</select>
														</div>
													</div>
												</ConditionalFields>
											</div>
										</div>
										<ConditionalFields visible={form.conectadoTomacorriente === false && form.areaConectadoTomacorriente !== ''}>
											<div className="row g-3 align-items-start justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="observacionConectadoTomacorrienteInput" className="required col-form-label">
														{observacion}
													</label>
													<textarea
														id="observacionConectadoTomacorrienteInput"
														name="observacionConectadoTomacorriente"
														value={form.observacionConectadoTomacorriente}
														onChange={handleChange}
														placeholder="Observación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="recomendacionConectadoTomacorrienteInput" className="required col-form-label">
														{recomendacion}
													</label>
													<textarea
														id="recomendacionConectadoTomacorrienteInput"
														name="recomendacionConectadoTomacorriente"
														value={form.recomendacionConectadoTomacorriente}
														onChange={handleChange}
														placeholder="Recomendación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* EnciendeSwitchPrueba */}
									<div className="col-12 row">
										<div className="row g-3 align-items-center justify-content-evenly mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral6} </label>
											</div>
											<div className="col-2">
												<CheckboxSwitch
													label="Enciende switch prueba"
													checked={form.enciendeSwitchPrueba}
													onChange={(checked) => handleSwitchChange('enciendeSwitchPrueba', checked)}
												/>
											</div>
											<div className="col-6">
												<ConditionalFields visible={!form.enciendeSwitchPrueba}>
													<div className="row g-3 align-items-start justify-content-evenly">
														<div className="col-4">
															<label htmlFor="areaEnciendeSwitchPrueba" className="required col-form-label">
																{areaResponsable}
															</label>
														</div>
														<div className="col-8">
															<select
																className="form-select select-sm"
																id="areaEnciendeSwitchPruebaInput"
																name="areaEnciendeSwitchPrueba"
																value={form.areaEnciendeSwitchPrueba}
																onChange={handleChange}
															>
																<option value="">Seleccione</option>
																<option value="Área 1">Área 1</option>
																<option value="Área 2">Área 2</option>
															</select>
														</div>
													</div>
												</ConditionalFields>
											</div>
										</div>
										<ConditionalFields visible={form.enciendeSwitchPrueba === false && form.areaEnciendeSwitchPrueba !== ''}>
											<div className="row g-3 align-items-start justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="observacionEnciendeSwitchPruebaInput" className="required col-form-label">
														{observacion}
													</label>
													<textarea
														id="observacionEnciendeSwitchPruebaInput"
														name="observacionEnciendeSwitchPrueba"
														value={form.observacionEnciendeSwitchPrueba}
														onChange={handleChange}
														placeholder="Observación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="recomendacionEnciendeSwitchPruebaInput" className="required col-form-label">
														{recomendacion}
													</label>
													<textarea
														id="recomendacionEnciendeSwitchPruebaInput"
														name="recomendacionEnciendeSwitchPrueba"
														value={form.recomendacionEnciendeSwitchPrueba}
														onChange={handleChange}
														placeholder="Recomendación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* BuenaIluminacion */}
									<div className="col-12 row">
										<div className="row g-3 align-items-center justify-content-evenly mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral7} </label>
											</div>
											<div className="col-2">
												<CheckboxSwitch
													label="Buena iluminación"
													checked={form.buenaIluminacion}
													onChange={(checked) => handleSwitchChange('buenaIluminacion', checked)}
												/>
											</div>
											<div className="col-6">
												<ConditionalFields visible={!form.buenaIluminacion}>
													<div className="row g-3 align-items-start justify-content-evenly">
														<div className="col-4">
															<label htmlFor="areaBuenaIluminacion" className="required col-form-label">
																{areaResponsable}
															</label>
														</div>
														<div className="col-8">
															<select
																className="form-select select-sm"
																id="areaBuenaIluminacionInput"
																name="areaBuenaIluminacion"
																value={form.areaBuenaIluminacion}
																onChange={handleChange}
															>
																<option value="">Seleccione</option>
																<option value="Área 1">Área 1</option>
																<option value="Área 2">Área 2</option>
															</select>
														</div>
													</div>
												</ConditionalFields>
											</div>
										</div>
										<ConditionalFields visible={form.buenaIluminacion === false && form.areaBuenaIluminacion !== ''}>
											<div className="row g-3 align-items-start justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="observacionBuenaIluminacionInput" className="required col-form-label">
														{observacion}
													</label>
													<textarea
														id="observacionBuenaIluminacionInput"
														name="observacionBuenaIluminacion"
														value={form.observacionBuenaIluminacion}
														onChange={handleChange}
														placeholder="Observación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="recomendacionBuenaIluminacionInput" className="required col-form-label">
														{recomendacion}
													</label>
													<textarea
														id="recomendacionBuenaIluminacionInput"
														name="recomendacionBuenaIluminacion"
														value={form.recomendacionBuenaIluminacion}
														onChange={handleChange}
														placeholder="Recomendación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* BuenaEstado */}
									<div className="col-12 row">
										<div className="row g-3 align-items-center justify-content-evenly mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral8} </label>
											</div>
											<div className="col-2">
												<CheckboxSwitch
													label="Buena iluminación"
													checked={form.buenaIluminacion}
													onChange={(checked) => handleSwitchChange('buenaIluminacion', checked)}
												/>
											</div>
											<div className="col-6">
												<ConditionalFields visible={!form.buenaIluminacion}>
													<div className="row g-3 align-items-start justify-content-evenly">
														<div className="col-4">
															<label htmlFor="areaBuenaIluminacion" className="required col-form-label">
																{areaResponsable}
															</label>
														</div>
														<div className="col-8">
															<select
																className="form-select select-sm"
																id="areaBuenaIluminacionInput"
																name="areaBuenaIluminacion"
																value={form.areaBuenaIluminacion}
																onChange={handleChange}
															>
																<option value="">Seleccione</option>
																<option value="Área 1">Área 1</option>
																<option value="Área 2">Área 2</option>
															</select>
														</div>
													</div>
												</ConditionalFields>
											</div>
										</div>
										<ConditionalFields visible={form.buenaEstado === false && form.areaBuenaEstado !== ''}>
											<div className="row g-3 align-items-start justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="observacionBuenaEstadoInput" className="required col-form-label">
														{observacion}
													</label>
													<textarea
														id="observacionBuenaEstadoInput"
														name="observacionBuenaEstado"
														value={form.observacionBuenaEstado}
														onChange={handleChange}
														placeholder="Observación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="recomendacionBuenaEstadoInput" className="required col-form-label">
														{recomendacion}
													</label>
													<textarea
														id="recomendacionBuenaEstadoInput"
														name="recomendacionBuenaEstado"
														value={form.recomendacionBuenaEstado}
														onChange={handleChange}
														placeholder="Recomendación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
												<div className="row g-3 align-items-start justify-content-evenly mt-2">
													<div className="col-6">
														<label
															htmlFor="fotoInput"
															className="required col-form-label"
														>
															Foto
														</label>
													</div>
													<div className="col-6">
														<input
															type="file"
															id="fotoInput"
															name="foto"
															value={form.foto}
															onChange={handleChange}
															placeholder="Ubicación especifica"
															className="form-control input-sm"
														/>
													</div>
												</div>
												<div className="row g-3 align-items-center justify-content-evenly mt-2">
													<div className="col-6">
														<label htmlFor="" className="col-form-label">
															Solicitar nuevo equipo
														</label>
													</div>
													<div className="col-6">
														<div className="form-check form-switch form-check-custom form-check-solid">
															<input
																className="form-check-input h-20px w-30px"
																type="checkbox"
																value=""
																id="statusSwitch9"
																onChange={(e: any) =>
																	setForm({
																		...form,
																		nuevoEquipo: e.target.checked,
																	})
																}
																checked={form.nuevoEquipo}
															/>
															<label
																className="form-label-sm ms-2"
																htmlFor="statusSwitch9"
															>
																{form.nuevoEquipo ? "Si" : "No"}
															</label>
														</div>
													</div>
												</div>
												<div className="row g-3 align-items-start justify-content-evenly mt-2">
													<div className="col-6">
														<label
															htmlFor="PDFInput"
															className="col-form-label"
														>
															Subir PDF
														</label>
													</div>
													<div className="col-6">
														<input
															type="file"
															id="PDFInput"
															name="PDF"
															value={form.PDF}
															onChange={handleChange}
															placeholder="Ubicación especifica"
															className="form-control input-sm"
														/>
													</div>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* EncendidoQuinceMin */}
									<div className="col-12 row">
										<div className="row g-3 align-items-center justify-content-evenly mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral9} </label>
											</div>
											<div className="col-2">
												<CheckboxSwitch
													label="Encendido quince minutos"
													checked={form.encendidoQuinceMin}
													onChange={(checked) => handleSwitchChange('encendidoQuinceMin', checked)}
												/>
											</div>
											<div className="col-6">
												<ConditionalFields visible={!form.encendidoQuinceMin}>
													<div className="row g-3 align-items-start justify-content-evenly">
														<div className="col-4">
															<label htmlFor="areaEncendidoQuinceMin" className="required col-form-label">
																{areaResponsable}
															</label>
														</div>
														<div className="col-8">
															<select
																className="form-select select-sm"
																id="areaEncendidoQuinceMinInput"
																name="areaEncendidoQuinceMin"
																value={form.areaEncendidoQuinceMin}
																onChange={handleChange}
															>
																<option value="">Seleccione</option>
																<option value="Área 1">Área 1</option>
																<option value="Área 2">Área 2</option>
															</select>
														</div>
													</div>
												</ConditionalFields>
											</div>
										</div>
										<ConditionalFields visible={form.encendidoQuinceMin === false && form.areaEncendidoQuinceMin !== ''}>
											<div className="row g-3 align-items-start justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="observacionEncendidoQuinceMinInput" className="required col-form-label">
														{observacion}
													</label>
													<textarea
														id="observacionEncendidoQuinceMinInput"
														name="observacionEncendidoQuinceMin"
														value={form.observacionEncendidoQuinceMin}
														onChange={handleChange}
														placeholder="Observación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="recomendacionEncendidoQuinceMinInput" className="required col-form-label">
														{recomendacion}
													</label>
													<textarea
														id="recomendacionEncendidoQuinceMinInput"
														name="recomendacionEncendidoQuinceMin"
														value={form.recomendacionEncendidoQuinceMin}
														onChange={handleChange}
														placeholder="Recomendación"
														className="form-control input-sm"
														maxLength={500}
														rows={3}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>
								</div>
							</div>

							{/* <div className="form-check form-switch form-check-custom form-check-solid">
										<input
											className="form-check-input h-20px w-30px"
											type="checkbox"
											value=""
											id="statusSwitch"
											onChange={handleChange}
											checked={form.enumerado}
										/>
										<label
											className="form-label-sm ms-2"
											htmlFor="statusSwitch"
										>
											{form.libreDeObstaculos ? "Si" : "No"}
										</label>
									</div> */}

							<div className="d-flex justify-content-center gap-10 modal-footer">
								<button
									type="button"
									onClick={() => putEmployee(idEmployee)}
									className="btn btn-primary"
								>
									Guardar
								</button>
								<button
									type="button"
									onClick={() => deleteEmployee(idEmployee)}
									className="btn btn-danger"
								>
									Eliminar
								</button>
							</div>
						</form>
					</div>
				</div>
			</div >
		</div >
	);
};
