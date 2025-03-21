import { ReactNode, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { appStateService } from "../../../../../../services/appState.service";
import { dateInput } from "../../../../../../utils/dateFormat";
import { backyService } from "@zeus/app/@services/api";
import { EmergencyLightsResponse } from "@zeus/app/@services/api/dtos/EmergencyLightsModel";

interface MyComponentProps {
	idEmployee: string;
	children?: ReactNode;
}

export interface EmergencyLightsForm {
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
	observacion: string;
	recomendacion: string;
	foto: string;
	nuevoEquipo: boolean;
	PDF: string;
}

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
export const ModalInspectionEmergencyLightsForm: React.FC<MyComponentProps> = ({
	idEmployee,
	children,
}) => {
	const [form, setForm] = useState<EmergencyLightsForm>({
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
		observacion: "",
		recomendacion: "",
		foto: "",
		nuevoEquipo: false,
		PDF: "",
	});

	useEffect(() => {
		const initEmployee = async () => {
			try {
				const response = await backyService.emergencyLights.getById(idEmployee);

				if (response.status == 200) {
					const Employee: EmergencyLightsResponse = response.data;

					// setForm({
					// 	numero: Employee.area,
					// 	sede: Employee.sede,
					// 	area: Employee.area,
					// 	ubicacionEspecifica: Employee.ubicacionEspecifica,
					// 	codigo: Employee.codigo,
					// 	marca: Employee.marca,
					// 	fechaIngresoEmpresa: dateInput(Employee.fechaIngresoEmpresa),
					// });
				}
			} catch (error: any) {
				console.error(error);
			}
		};

		initEmployee();
	}, []);

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
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
						const response = await backyService.emergencyLights.delete(id);

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
			!form.area ||
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

					// 	const response = await put(id, request);

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

	function closeModal() {
		appStateService.setActiveModalSubject();
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
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="staticBackdropLabel">
							Luz de emergencia
						</h1>
						<button
							type="button"
							onClick={closeModal}
							className="btn-close"
						></button>
					</div>
					<div className="modal-body">
						<div className="card">
							<div className="card-body">
								<form className="row g-6">
									<div className="col-12">
										<div className="row g-3 align-items-start justify-content-evenly mt-2">
											<div className="col-6">
												<label
													htmlFor="fechaIngresoInput"
													className="required col-form-label"
												>
													1. Fecha de inspección
												</label>
											</div>
											<div className="col-6">
												<input
													type="date"
													id="fechaIngresoInput"
													name="fechaIngreso"
													value={form.fechaInspeccion}
													onChange={handleChange}
													className="form-control input-sm"
												/>
											</div>
										</div>

										<div className="row g-3 align-items-start justify-content-evenly mt-2">
											<div className="col-6">
												<label
													htmlFor="areaInput"
													className="required col-form-label"
												>
													2. Área
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
													htmlFor="sedeInput"
													className="required col-form-label"
												>
													3. Sede
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
												>
													<option value="">Seleccione</option>
													<option value="Sede 1">Sede 1</option>
													<option value="Sede 2">Sede 2</option>
												</select>
											</div>
										</div>
									</div>

									<div className="col-12 row">
										<div className="col-md-6 col-12">
											<div className="row g-3 align-items-center justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="" className="col-form-label">
														4. Se encunetra enumerado
													</label>
												</div>
												<div className="col-6">
													<div className="form-check form-switch form-check-custom form-check-solid">
														<input
															className="form-check-input h-20px w-30px"
															type="checkbox"
															value=""
															id="statusSwitch1"
															onChange={(e: any) =>
																setForm({
																	...form,
																	enumerado: e.target.checked,
																})
															}
															checked={form.enumerado}
														/>
														<label
															className="form-label-sm ms-2"
															htmlFor="statusSwitch1"
														>
															{form.enumerado ? "Si" : "No"}
														</label>
													</div>
												</div>
											</div>
											{!form.enumerado && (
												<>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="areaInput"
																className="required col-form-label"
															>
																Área responsable
															</label>
														</div>
														<div className="col-6">
															<select
																className="form-select select-sm"
																id="areaInput"
																name="area"
																value={""}
																onChange={handleChange}
																aria-label="Default select example"
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
																htmlFor="observacionInput"
																className="required col-form-label"
															>
																Observación
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="observacionInput"
																name="observacion"
																value={form.observacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="recomendacionInput"
																className="required col-form-label"
															>
																recomendacion
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="recomendacionInput"
																name="recomendacion"
																value={form.recomendacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
												</>
											)}
										</div>
										<div className="col-md-6 col-12">
											<div className="row g-3 align-items-center justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="" className="col-form-label">
														5. Tiene ubicación adecuada
													</label>
												</div>
												<div className="col-6">
													<div className="form-check form-switch form-check-custom form-check-solid">
														<input
															className="form-check-input h-20px w-30px"
															type="checkbox"
															value=""
															id="statusSwitch2"
															onChange={(e: any) =>
																setForm({
																	...form,
																	ubicacionAdecuada: e.target.checked,
																})
															}
															checked={form.ubicacionAdecuada}
														/>
														<label
															className="form-label-sm ms-2"
															htmlFor="statusSwitch2"
														>
															{form.ubicacionAdecuada ? "Si" : "No"}
														</label>
													</div>
												</div>
											</div>
											{!form.ubicacionAdecuada && (
												<>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="areaInput"
																className="required col-form-label"
															>
																Área responsable
															</label>
														</div>
														<div className="col-6">
															<select
																className="form-select select-sm"
																id="areaInput"
																name="area"
																value={""}
																onChange={handleChange}
																aria-label="Default select example"
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
																htmlFor="observacionInput"
																className="required col-form-label"
															>
																Observación
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="observacionInput"
																name="observacion"
																value={form.observacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="recomendacionInput"
																className="required col-form-label"
															>
																recomendacion
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="recomendacionInput"
																name="recomendacion"
																value={form.recomendacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
												</>
											)}
										</div>
									</div>

									<div className="col-12 row">
										<div className="col-md-6 col-12">
											<div className="row g-3 align-items-center justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="" className="col-form-label">
														6. Se encuentra en su lugar
													</label>
												</div>
												<div className="col-6">
													<div className="form-check form-switch form-check-custom form-check-solid">
														<input
															className="form-check-input h-20px w-30px"
															type="checkbox"
															value=""
															id="statusSwitch3"
															onChange={(e: any) =>
																setForm({
																	...form,
																	enSuLugar: e.target.checked,
																})
															}
															checked={form.enSuLugar}
														/>
														<label
															className="form-label-sm ms-2"
															htmlFor="statusSwitch3"
														>
															{form.enSuLugar ? "Si" : "No"}
														</label>
													</div>
												</div>
											</div>
											{!form.enSuLugar && (
												<>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="areaInput"
																className="required col-form-label"
															>
																Área responsable
															</label>
														</div>
														<div className="col-6">
															<select
																className="form-select select-sm"
																id="areaInput"
																name="area"
																value={""}
																onChange={handleChange}
																aria-label="Default select example"
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
																htmlFor="observacionInput"
																className="required col-form-label"
															>
																Observación
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="observacionInput"
																name="observacion"
																value={form.observacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="recomendacionInput"
																className="required col-form-label"
															>
																recomendacion
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="recomendacionInput"
																name="recomendacion"
																value={form.recomendacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
												</>
											)}
										</div>
										<div className="col-md-6 col-12">
											<div className="row g-3 align-items-center justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="" className="col-form-label">
														7. Se encuentra libre de obstáculos
													</label>
												</div>
												<div className="col-6">
													<div className="form-check form-switch form-check-custom form-check-solid">
														<input
															className="form-check-input h-20px w-30px"
															type="checkbox"
															value=""
															id="statusSwitch4"
															onChange={(e: any) =>
																setForm({
																	...form,
																	libreDeObstaculos: e.target.checked,
																})
															}
															checked={form.libreDeObstaculos}
														/>
														<label
															className="form-label-sm ms-2"
															htmlFor="statusSwitch4"
														>
															{form.libreDeObstaculos ? "Si" : "No"}
														</label>
													</div>
												</div>
											</div>
											{!form.libreDeObstaculos && (
												<>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="areaInput"
																className="required col-form-label"
															>
																Área responsable
															</label>
														</div>
														<div className="col-6">
															<select
																className="form-select select-sm"
																id="areaInput"
																name="area"
																value={""}
																onChange={handleChange}
																aria-label="Default select example"
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
																htmlFor="observacionInput"
																className="required col-form-label"
															>
																Observación
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="observacionInput"
																name="observacion"
																value={form.observacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="recomendacionInput"
																className="required col-form-label"
															>
																recomendacion
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="recomendacionInput"
																name="recomendacion"
																value={form.recomendacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
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
												</>
											)}
										</div>
									</div>

									<div className="col-12 row">
										<div className="col-md-6 col-12">
											<div className="row g-3 align-items-center justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="" className="col-form-label">
														8. Conectado al tomacorriente
													</label>
												</div>
												<div className="col-6">
													<div className="form-check form-switch form-check-custom form-check-solid">
														<input
															className="form-check-input h-20px w-30px"
															type="checkbox"
															value=""
															id="statusSwitch5"
															onChange={(e: any) =>
																setForm({
																	...form,
																	conectadoTomacorriente: e.target.checked,
																})
															}
															checked={form.conectadoTomacorriente}
														/>
														<label
															className="form-label-sm ms-2"
															htmlFor="statusSwitch5"
														>
															{form.conectadoTomacorriente ? "Si" : "No"}
														</label>
													</div>
												</div>
											</div>
											{!form.conectadoTomacorriente && (
												<>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="areaInput"
																className="required col-form-label"
															>
																Área responsable
															</label>
														</div>
														<div className="col-6">
															<select
																className="form-select select-sm"
																id="areaInput"
																name="area"
																value={""}
																onChange={handleChange}
																aria-label="Default select example"
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
																htmlFor="observacionInput"
																className="required col-form-label"
															>
																Observación
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="observacionInput"
																name="observacion"
																value={form.observacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="recomendacionInput"
																className="required col-form-label"
															>
																recomendacion
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="recomendacionInput"
																name="recomendacion"
																value={form.recomendacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
												</>
											)}
										</div>
										<div className="col-md-6 col-12">
											<div className="row g-3 align-items-center justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="" className="col-form-label">
														9. Enciende con el swich de prueba
													</label>
												</div>
												<div className="col-6">
													<div className="form-check form-switch form-check-custom form-check-solid">
														<input
															className="form-check-input h-20px w-30px"
															type="checkbox"
															value=""
															id="statusSwitch6"
															onChange={(e: any) =>
																setForm({
																	...form,
																	enciendeSwitchPrueba: e.target.checked,
																})
															}
															checked={form.enciendeSwitchPrueba}
														/>
														<label
															className="form-label-sm ms-2"
															htmlFor="statusSwitch6"
														>
															{form.enciendeSwitchPrueba ? "Si" : "No"}
														</label>
													</div>
												</div>
											</div>
											{!form.enciendeSwitchPrueba && (
												<>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="areaInput"
																className="required col-form-label"
															>
																Área responsable
															</label>
														</div>
														<div className="col-6">
															<select
																className="form-select select-sm"
																id="areaInput"
																name="area"
																value={""}
																onChange={handleChange}
																aria-label="Default select example"
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
																htmlFor="observacionInput"
																className="required col-form-label"
															>
																Observación
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="observacionInput"
																name="observacion"
																value={form.observacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="recomendacionInput"
																className="required col-form-label"
															>
																recomendacion
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="recomendacionInput"
																name="recomendacion"
																value={form.recomendacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
												</>
											)}
										</div>
									</div>
									<div className="col-12 row">
										<div className="col-md-6 col-12">
											<div className="row g-3 align-items-center justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="" className="col-form-label">
														10. Tiene buena iluminación
													</label>
												</div>
												<div className="col-6">
													<div className="form-check form-switch form-check-custom form-check-solid">
														<input
															className="form-check-input h-20px w-30px"
															type="checkbox"
															value=""
															id="statusSwitch7"
															onChange={(e: any) =>
																setForm({
																	...form,
																	buenaIluminacion: e.target.checked,
																})
															}
															checked={form.buenaIluminacion}
														/>
														<label
															className="form-label-sm ms-2"
															htmlFor="statusSwitch7"
														>
															{form.buenaIluminacion ? "Si" : "No"}
														</label>
													</div>
												</div>
											</div>
											{!form.buenaIluminacion && (
												<>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="areaInput"
																className="required col-form-label"
															>
																Área responsable
															</label>
														</div>
														<div className="col-6">
															<select
																className="form-select select-sm"
																id="areaInput"
																name="area"
																value={""}
																onChange={handleChange}
																aria-label="Default select example"
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
																htmlFor="observacionInput"
																className="required col-form-label"
															>
																Observación
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="observacionInput"
																name="observacion"
																value={form.observacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="recomendacionInput"
																className="required col-form-label"
															>
																recomendacion
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="recomendacionInput"
																name="recomendacion"
																value={form.recomendacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
												</>
											)}
										</div>
										<div className="col-md-6 col-12">
											<div className="row g-3 align-items-center justify-content-evenly mt-2">
												<div className="col-6">
													<label htmlFor="" className="col-form-label">
														11. Se encuentra en buen estado
													</label>
												</div>
												<div className="col-6">
													<div className="form-check form-switch form-check-custom form-check-solid">
														<input
															className="form-check-input h-20px w-30px"
															type="checkbox"
															value=""
															id="statusSwitch8"
															onChange={(e: any) =>
																setForm({
																	...form,
																	buenaEstado: e.target.checked,
																})
															}
															checked={form.buenaEstado}
														/>
														<label
															className="form-label-sm ms-2"
															htmlFor="statusSwitch8"
														>
															{form.buenaEstado ? "Si" : "No"}
														</label>
													</div>
												</div>
											</div>
											{!form.buenaEstado && (
												<>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="areaInput"
																className="required col-form-label"
															>
																Área responsable
															</label>
														</div>
														<div className="col-6">
															<select
																className="form-select select-sm"
																id="areaInput"
																name="area"
																value={""}
																onChange={handleChange}
																aria-label="Default select example"
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
																htmlFor="observacionInput"
																className="required col-form-label"
															>
																Observación
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="observacionInput"
																name="observacion"
																value={form.observacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="recomendacionInput"
																className="required col-form-label"
															>
																recomendacion
															</label>
														</div>
														<div className="col-6">
															<input
																type="text"
																id="recomendacionInput"
																name="recomendacion"
																value={form.recomendacion}
																onChange={handleChange}
																placeholder="Ubicación especifica"
																className="form-control input-sm"
															/>
														</div>
													</div>
													<div className="row g-3 align-items-start justify-content-evenly mt-2">
														<div className="col-6">
															<label
																htmlFor="fotoInput"
																className="col-form-label"
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
												</>
											)}
										</div>
										<div className="col-12 row">
											<div className="col-md-6 col-12">
												<div className="row g-3 align-items-center justify-content-evenly mt-2">
													<div className="col-6">
														<label htmlFor="" className="col-form-label">
															12. Se mantiene encendida mas de 15 minutos
														</label>
													</div>
													<div className="col-6">
														<div className="form-check form-switch form-check-custom form-check-solid">
															<input
																className="form-check-input h-20px w-30px"
																type="checkbox"
																value=""
																id="statusSwitch"
																onChange={(e: any) =>
																	setForm({
																		...form,
																		encendidoQuinceMin: e.target.checked,
																	})
																}
																checked={form.encendidoQuinceMin}
															/>
															<label
																className="form-label-sm ms-2"
																htmlFor="statusSwitch"
															>
																{form.encendidoQuinceMin ? "Si" : "No"}
															</label>
														</div>
													</div>
												</div>
												{!form.encendidoQuinceMin && (
													<>
														<div className="row g-3 align-items-start justify-content-evenly mt-2">
															<div className="col-6">
																<label
																	htmlFor="areaInput"
																	className="required col-form-label"
																>
																	Área responsable
																</label>
															</div>
															<div className="col-6">
																<select
																	className="form-select select-sm"
																	id="areaInput"
																	name="area"
																	value={""}
																	onChange={handleChange}
																	aria-label="Default select example"
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
																	htmlFor="observacionInput"
																	className="required col-form-label"
																>
																	Observación
																</label>
															</div>
															<div className="col-6">
																<input
																	type="text"
																	id="observacionInput"
																	name="observacion"
																	value={form.observacion}
																	onChange={handleChange}
																	placeholder="Ubicación especifica"
																	className="form-control input-sm"
																/>
															</div>
														</div>
														<div className="row g-3 align-items-start justify-content-evenly mt-2">
															<div className="col-6">
																<label
																	htmlFor="recomendacionInput"
																	className="required col-form-label"
																>
																	recomendacion
																</label>
															</div>
															<div className="col-6">
																<input
																	type="text"
																	id="recomendacionInput"
																	name="recomendacion"
																	value={form.recomendacion}
																	onChange={handleChange}
																	placeholder="Ubicación especifica"
																	className="form-control input-sm"
																/>
															</div>
														</div>
													</>
												)}
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
											Editar
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
					</div>
				</div>
			</div>
		</div>
	);
};
