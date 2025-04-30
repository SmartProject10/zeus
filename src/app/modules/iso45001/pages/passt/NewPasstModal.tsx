import * as Yup from "yup";
import { useFormik } from "formik";
import { dateInput } from "@zeus/app/utils/dateFormat";
import Swal from "sweetalert2";
import clsx from "clsx";
import { useState, useEffect } from "react";

const passtSchema = Yup.object().shape({
	objetivoGeneral: Yup.string().required("Objetivo general requerido"),
	meta: Yup.string().required("Meta requerida"),
	indicador: Yup.string().required("Indicador requerido"),
	presupuesto: Yup.number()
		.min(1, "Presupuesto debe ser mayor a 0")
		.required("Presupuesto requerido"),
	recursos: Yup.string().required("Recursos requeridos"),
});

const initialValues = {
	objetivoGeneral: "",
	meta: "",
	indicador: "",
	presupuesto: "",
	recursos: "",
};

function NewPasstModal({ setNewData }: any) {
	const {
		handleSubmit,
		getFieldProps,
		touched,
		errors,
		setFieldValue,
		values,
	} = useFormik({
		initialValues,
		validationSchema: passtSchema,
		onSubmit: (values) => {
			// Include all meta and indicador items from tableData
			const metaItems = tableData
				.filter((item) => item.meta !== undefined)
				.map((item) => item.meta);
			const indicadorItems = tableData
				.filter((item) => item.indicador !== undefined)
				.map((item) => item.indicador);

			// Create final data to submit
			const finalData = {
				...values,
				metaItems,
				indicadorItems,
				tableData: tableData.filter((item) => item.actividad !== undefined),
			};

			setNewData(finalData);

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
				title: "¡Passt creado correctamente!",
			});

			const closeButton = document.getElementById("closeButton");
			if (closeButton) {
				closeButton.click();
			}
		},
	});

	//#region Formulario y Contenido tabla
	interface TableDataItem {
		meta?: string;
		indicador?: string;
		presupuesto?: string | number;
		recursos?: string;
		herramientaGestion?: string;
		actividad?: string;
		cargo?: string;
		area?: string;
		fechaVerificacion?: string;
		areaDestinada?: string[]; // Added property
		fechasEjecucion?: string[]; // Changed from boolean to string array
		febreroDiciembre?: boolean; // Added property
		responsable?: string; // Added property
		observaciones?: string; // Added property
		objetivoEspecifico?: string; // Added property
	}

	const [tableData, setTableData] = useState<TableDataItem[]>([]);
	const [actividad, setActividad] = useState<string | string[]>("");
	const [responsable, setResponsable] = useState("");
	const [areaDestinada, setAreaDestinada] = useState<string[]>([]);
	const [fechaVerificacion, setFechaVerificacion] = useState(
		dateInput(new Date().toISOString())
	);
	const [observaciones, setObservaciones] = useState("");
	const [isEditTableData, setIsEditTableData] = useState<{
		index: number | undefined;
		edit: boolean;
	}>({
		index: undefined,
		edit: false,
	});
	const [uneditableModal, setUneditableModal] = useState(false);

	useEffect(() => {
		///(si el botón por el cual se llamó al modal tiene el atributo "data-uneditable" se mostrará el modal de forma ineditable)
		const handleShow = (event: any) => {
			if (event.relatedTarget) {
				setUneditableModal(event.relatedTarget.hasAttribute("data-uneditable"));
			}
		};
		//(se agrega el evento handleShow)
		const modal = document.getElementById("staticBackdrop");
		if (modal) {
			modal.addEventListener("show.bs.modal", handleShow);
		}
		//(se remueve el evento handleShow)
		return () => {
			if (modal) {
				modal.removeEventListener("show.bs.modal", handleShow);
			}
		};
	}, []);

	const handleAddEditTableData = () => {
		if (!actividad || !responsable || !areaDestinada || !fechaVerificacion) {
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
				title: "Por favor rellene todos los campos",
			});

			return;
		}

		const data = {
			actividad,
			responsable,
			areaDestinada,
			fechaVerificacion,
			observaciones,
		};

		if (!isEditTableData.edit) {
			setTableData((currData: any) => [...currData, data]);
		} else {
			const indice = isEditTableData.index;
			setTableData((currentData: any) => {
				return currentData.map((row: any, index: any) => {
					if (index === indice) {
						return { ...row, ...data };
					}

					return row;
				});
			});
		}

		setActividad("");
		setResponsable("");
		setAreaDestinada([]);
		setFechaVerificacion(dateInput(new Date().toISOString()));
		setObservaciones("");
		setIsEditTableData({ index: undefined, edit: false });
	};

	const handleDeleteData = (indice: number) => {
		const Toast = Swal.mixin({
			toast: true,
			position: "top",
			showCancelButton: true,
			showConfirmButton: true,
			timer: undefined,
		});

		Toast.fire({
			title: "¿Está seguro que desea eliminar el registro?",
			icon: "error",
			cancelButtonText: "Cancelar",
			confirmButtonText: "Eliminar",
		}).then((result) => {
			if (result.isConfirmed) {
				console.log(typeof indice);
				const newArr = tableData.filter(
					(_: any, index: any) => index !== indice
				);
				setTableData(newArr);
			}
		});
	};

	function handleEditData(index: number, data: TableDataItem): void {
		setActividad(data.actividad || "");
		setResponsable(data.responsable || "");
		setAreaDestinada(data.areaDestinada || []);
		setFechaVerificacion(
			data.fechaVerificacion || dateInput(new Date().toISOString())
		);
		setObservaciones(data.observaciones || "");

		setIsEditTableData({ index, edit: true });
	}

	// Handle adding new meta item
	const handleAddMeta = () => {
		setTableData((prev) => [...prev, { meta: "" }]);
	};

	// Handle adding new indicador item
	const handleAddIndicador = () => {
		setTableData((prev) => [...prev, { indicador: "" }]);
	};
	//#endregion

	return (
		////////////////(MODAL EDITABLE)

		!uneditableModal ? (
			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-scrollable modal-xl">
					<form onSubmit={handleSubmit} className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title" id="staticBackdropLabel">
								Objetivos
							</h1>
							<button
								type="button"
								id="closeButton"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div className="card shadow-none mb-10">
								<div className="card-body bg-secondary card-blank">
									<div className="row gy-4 ">
										<div className="col-12">
											<label
												htmlFor="objetivoGeneral"
												className="required form-label"
											>
												Objetivo General
											</label>
											<textarea
												className="form-control"
												placeholder="Escriba el objetivo general"
												id="objetivoGeneral"
												rows={3}
												{...getFieldProps("objetivoGeneral")}
												required
											/>
											{touched.objetivoGeneral && errors.objetivoGeneral && (
												<div className="text-danger small">
													<span role="alert">{errors.objetivoGeneral}</span>
												</div>
											)}
										</div>
										<div className="col-12">
											<label htmlFor="meta" className="required form-label">
												Meta
											</label>
											<div className="d-flex align-items-center gap-2">
												<input
													type="text"
													className={clsx(
														"form-control",
														{ "is-invalid": touched.meta && errors.meta },
														{ "is-valid": touched.meta && !errors.meta }
													)}
													placeholder="Meta"
													id="meta"
													{...getFieldProps("meta")}
													required
												/>
												<button
													type="button"
													className="btn btn-sm btn-primary"
													onClick={handleAddMeta}
												>
													<i className="fas fa-plus"></i>
												</button>
											</div>
											{touched.meta && errors.meta && (
												<div className="text-danger small">
													<span role="alert">{errors.meta}</span>
												</div>
											)}
											{tableData.map(
												(item, index) =>
													item.meta !== undefined && (
														<div key={index} className="col-12 mt-2">
															<label
																htmlFor={`meta-${index}`}
																className="form-label"
															>
																Meta {index + 2}
															</label>
															<div className="d-flex align-items-center gap-2">
																<input
																	type="text"
																	className="form-control"
																	placeholder={`Meta ${index + 2}`}
																	id={`meta-${index}`}
																	value={item.meta}
																	onChange={(e) => {
																		const updatedData = [...tableData];
																		updatedData[index].meta = e.target.value;
																		setTableData(updatedData);
																	}}
																	required
																/>
																<button
																	type="button"
																	className="btn btn-sm btn-danger"
																	onClick={() => {
																		const updatedData = [...tableData];
																		updatedData.splice(index, 1);
																		setTableData(
																			updatedData.filter(
																				(item) => item.meta !== undefined
																			)
																		);
																	}}
																>
																	<i className="fas fa-minus"></i>
																</button>
															</div>
														</div>
													)
											)}
										</div>
										<div className="col-12">
											<label
												htmlFor="indicador"
												className="required form-label"
											>
												Indicador
											</label>
											<div className="d-flex align-items-center gap-2">
												<input
													type="text"
													className={clsx(
														"form-control",
														{
															"is-invalid":
																touched.indicador && errors.indicador,
														},
														{
															"is-valid":
																touched.indicador && !errors.indicador,
														}
													)}
													placeholder="Indicador"
													id="indicador"
													{...getFieldProps("indicador")}
													required
												/>
												<button
													type="button"
													className="btn btn-sm btn-primary"
													onClick={handleAddIndicador}
												>
													<i className="fas fa-plus"></i>
												</button>
											</div>
											{touched.indicador && errors.indicador && (
												<div className="text-danger small">
													<span role="alert">{errors.indicador}</span>
												</div>
											)}
											{tableData.map(
												(item, index) =>
													item.indicador !== undefined && (
														<div key={index} className="col-12 mt-2">
															<label
																htmlFor={`indicador-${index}`}
																className="form-label"
															>
																Indicador {index + 2}
															</label>
															<div className="d-flex align-items-center gap-2">
																<input
																	type="text"
																	className="form-control"
																	placeholder={`Indicador ${index + 2}`}
																	id={`indicador-${index}`}
																	value={item.indicador}
																	onChange={(e) => {
																		const updatedData = [...tableData];
																		updatedData[index].indicador =
																			e.target.value;
																		setTableData(updatedData);
																	}}
																	required
																/>
																<button
																	type="button"
																	className="btn btn-sm btn-danger"
																	onClick={() => {
																		const updatedData = [...tableData];
																		updatedData.splice(index, 1);
																		setTableData(
																			updatedData.filter(
																				(item) => item.indicador !== undefined
																			)
																		);
																	}}
																>
																	<i className="fas fa-minus"></i>
																</button>
															</div>
														</div>
													)
											)}
										</div>
										<div className="col-sm-6">
											<label
												htmlFor="presupuesto"
												className="required form-label"
											>
												Presupuesto
											</label>
											<input
												type="number"
												className={clsx(
													"form-control ",
													{
														"is-invalid":
															touched.presupuesto && errors.presupuesto,
													},
													{
														"is-valid":
															touched.presupuesto && !errors.presupuesto,
													}
												)}
												placeholder="$ Presupuesto"
												id="presupuesto"
												{...getFieldProps("presupuesto")}
												required
											/>
											{touched.presupuesto && errors.presupuesto && (
												<div className="text-danger small">
													<span role="alert">{errors.presupuesto}</span>
												</div>
											)}
										</div>
										<div className="col-sm-6">
											<label htmlFor="recursos" className="required form-label">
												Recursos
											</label>
											<input
												type="text"
												className={clsx(
													"form-control ",
													{ "is-invalid": touched.recursos && errors.recursos },
													{
														"is-valid": touched.recursos && !errors.recursos,
													}
												)}
												placeholder="Recursos"
												id="recursos"
												{...getFieldProps("recursos")}
												required
											/>
											{touched.recursos && errors.recursos && (
												<div className="text-danger small">
													<span role="alert">{errors.recursos}</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className="card shadow-none mb-0">
								<div className="card-body bg-secondary ">
									<div className="row gy-4 mb-10">
										<h5 className="text-dark fw-bold mb-8">
											Objetivos Específicos
										</h5>
										<div className="col-12">
											<label
												htmlFor="objetivoEspecifico"
												className="required form-label"
											>
												Objetivos Específicos
											</label>
											<div className="d-flex align-items-center gap-2">
												<input
													type="text"
													className="form-control"
													placeholder="Objetivo específico"
													id="objetivoEspecifico"
													value={tableData[0]?.objetivoEspecifico || ""}
													onChange={(e) => {
														const updatedData = [...tableData];
														updatedData[0] = {
															...updatedData[0],
															objetivoEspecifico: e.target.value,
														};
														setTableData(updatedData);
													}}
													required
												/>
												<button
													type="button"
													className="btn btn-sm btn-primary"
													onClick={() => {
														setTableData((prev) => [
															...prev,
															{ objetivoEspecifico: "" },
														]);
													}}
												>
													<i className="fas fa-plus"></i>
												</button>
											</div>
											{tableData
												.filter(
													(item, idx) =>
														idx > 0 && item.objetivoEspecifico !== undefined
												)
												.map((item, index) => (
													<div key={index} className="col-12 mt-2">
														<label
															htmlFor={`objetivoEspecifico-${index}`}
															className="form-label"
														>
															Objetivo Específico {index + 2}
														</label>
														<div className="d-flex align-items-center gap-2">
															<input
																type="text"
																className="form-control"
																placeholder={`Objetivo Específico ${index + 2}`}
																id={`objetivoEspecifico-${index}`}
																value={item.objetivoEspecifico}
																onChange={(e) => {
																	const updatedData = [...tableData];
																	const actualIndex = tableData.findIndex(
																		(i, idx) =>
																			idx > 0 &&
																			i.objetivoEspecifico !== undefined
																	);
																	updatedData[actualIndex].objetivoEspecifico =
																		e.target.value;
																	setTableData(updatedData);
																}}
																required
															/>
															<button
																type="button"
																className="btn btn-sm btn-danger"
																onClick={() => {
																	const updatedData = [...tableData];
																	const actualIndex = tableData.findIndex(
																		(i, idx) =>
																			idx > 0 &&
																			i.objetivoEspecifico !== undefined &&
																			i === item
																	);
																	updatedData.splice(actualIndex, 1);
																	setTableData(updatedData);
																}}
															>
																<i className="fas fa-minus"></i>
															</button>
														</div>
													</div>
												))}
										</div>
										<div className="col-sm-6">
											<label
												htmlFor="herramientaGestion"
												className="required form-label"
											>
												Herramienta de gestión
											</label>
											<select
												className="form-select"
												id="herramientaGestion"
												aria-label="Default select example"
												value={tableData[0]?.herramientaGestion || ""}
												onChange={(e) => {
													const updatedData = [...tableData];
													updatedData[0] = {
														...updatedData[0],
														herramientaGestion: e.target.value,
													};
													setTableData(updatedData);
												}}
												required
											>
												<option value="">Seleccione una herramienta</option>
												<option value="">SELECCIONE UNA HERRAMIENTA</option>
												<option value="liderazgo">LIDERAZGO</option>
												<option value="comite-seguridad">COMITÉ DE SEGURIDAD</option>
												<option value="mejora-continua">MEJORA CONTINUA</option>
												<option value="inspecciones-areas-trabajo">INSPECCIONES (AREAS DE TRABAJO)</option>
												<option value="inspecciones-vehiculos-equipos">INSPECCIONES (VEHÍCULOS Y EQUIPOS)</option>
												<option value="inspecciones-sistema-electrico">INSPECCIONES DE SISTEMA ELÉCTRICO Y EQUIPOS</option>
												<option value="inspecciones-herramientas-epps">INSPECCIONES (HERRAMIENTAS Y EPPS)</option>
												<option value="inspecciones-elementos-emergencia">INSPECCIONES (ELEMENTOS DE EMERGENCIA)</option>
												<option value="monitoreos">MONITOREOS</option>
												<option value="capacitacion">CAPACITACIÓN</option>
												<option value="investigacion-accidentes">INVESTIGACIÓN DE ACCIDENTES E INCIDENTES</option>
												<option value="requisitos-legales">REQUISITOS LEGALES</option>
												<option value="auditorias-sgsst">AUDITORÍAS DEL SGSST</option>
												<option value="gestion-contratistas">GESTIÓN DE CONTRATISTAS</option>
												<option value="plan-emergencia">PLAN DE EMERGENCIA</option>
												<option value="iperc-gestion-riesgos">IPERC Y GESTIÓN DE RIESGOS</option>
												<option value="procedimientos-trabajo">PROCEDIMIENTOS DE TRABAJO</option>
											</select>
										</div>
										<div className="col-sm-6">
											<label
												htmlFor="actividad"
												className="required form-label"
											>
												Actividad(es)
											</label>
											<div className="position-relative">
												<select
													className="form-select form-select-solid"
													id="actividad"
													multiple
													size={8}
													value={Array.isArray(actividad) ? actividad : actividad ? [actividad] : []}
													onChange={(e) => {
														const selectedOptions = Array.from(
															e.target.selectedOptions,
															(option) => option.value
														);

														// Handle the "otro" option if it exists in the selection
														if (selectedOptions.includes("otro")) {
															const nuevaActividad = prompt("Escriba la nueva actividad:");
															if (nuevaActividad) {
																setTableData((prev) => [
																	...prev,
																	{ actividad: nuevaActividad },
																]);
																// Replace "otro" with the new custom activity
																const updatedSelection = selectedOptions.filter(opt => opt !== "otro");
																updatedSelection.push(nuevaActividad);
																setActividad(updatedSelection);
															} else {
																// If prompt was cancelled, remove "otro" from selection
																setActividad(selectedOptions.filter(opt => opt !== "otro"));
															}
														} else {
															setActividad(selectedOptions);
														}
													}}
													disabled={!tableData[0]?.herramientaGestion}
													required
													style={{ maxHeight: '200px' }}
												>
													<option value="otro" className="fw-bold bg-light">➕ Agregar nueva actividad</option>

													<optgroup label="📋 LIDERAZGO Y POLÍTICAS">
														<option value="revisar-politicas-seguridad">Revisar las políticas en materia de Seguridad</option>
														<option value="difundir-politica-alcohol-drogas">Difundir la política de Alcohol y drogas</option>
														<option value="difundir-politica-tolerancia-cero">Difundir la política de Tolerancia cero</option>
														<option value="publicar-politicas-frentes-trabajo">Publicar las Políticas en los frentes de trabajo</option>
														<option value="implementar-programa-liderazgo">Implementar el Programa de Liderazgo visible</option>
													</optgroup>

													<optgroup label="👥 COMITÉ DE SEGURIDAD">
														<option value="conformacion-comite-sst-2022">Conformación del Comité SST Periodo 2022</option>
														<option value="elecciones-comite-sst-2023">Realizar elecciones del Comité SST Periodo 2023</option>
														<option value="reuniones-ordinarias-comite">Realizar Reuniones ordinarias del Comité SST</option>
														<option value="inspeccion-mensual-comite">Realizar Inspección mensual por el Comité de Seguridad</option>
														<option value="capacitar-miembros-comite">Capacitar a los miembros del Comité de Seguridad</option>
														<option value="reportes-trimestrales-comite">Realizar Reportes trimestrales del Comité</option>
														<option value="informe-anual-comite">Realizar Informe Anual de Actividades del Comité</option>
													</optgroup>

													<optgroup label="🔍 INSPECCIONES - ÁREAS DE TRABAJO">
														<option value="inspeccion-frentes-trabajo">Inspecciones de frentes de trabajo</option>
														<option value="inspeccion-talleres">Inspección de talleres</option>
														<option value="inspeccion-campamentos">Inspección de campamentos</option>
														<option value="inspeccion-polvorin">Inspección de polvorín de explosivos</option>
														<option value="inspeccion-almacenes">Inspección de almacenes</option>
														<option value="inspeccion-oficinas">Inspección de oficinas</option>
													</optgroup>

													<optgroup label="🚗 INSPECCIONES - VEHÍCULOS Y EQUIPOS">
														<option value="inspeccion-vehiculos-equipos">Inspección General de Vehículos y equipos</option>
														<option value="inspeccion-gruas">Inspección de grúas</option>
														<option value="inspeccion-cisterna-combustible">Inspección de cisterna de combustible</option>
													</optgroup>

													<optgroup label="⚡ INSPECCIONES - SISTEMAS ELÉCTRICOS">
														<option value="inspeccion-grupo-electrogeno">Grupo eléctrogeno / Generador eléctrico</option>
														<option value="inspeccion-luminarias">Luminarias / Torres de iluminación</option>
														<option value="inspeccion-tableros-electricos">Inspección de tableros Eléctricos</option>
													</optgroup>

													<optgroup label="🛠️ INSPECCIONES - HERRAMIENTAS Y EPPS">
														<option value="inspeccion-herramientas">Inspección de Herramientas Manuales y eléctricas</option>
														<option value="inspeccion-escaleras">Inspección de Escaleras Pórtatiles</option>
														<option value="inspeccion-bombas-sumergibles">Inspección de Bombas sumergibles</option>
														<option value="inspeccion-andamios">Inspección de andamios</option>
														<option value="inspeccion-epps">Inspección de EPPs</option>
														<option value="inspeccion-arnes">Inspección de arnés y línea de vida</option>
														<option value="inspeccion-sistema-izaje">Inspección de Sistema de Izaje</option>
													</optgroup>

													<optgroup label="🧯 INSPECCIONES - ELEMENTOS DE EMERGENCIA">
														<option value="inspeccion-extintores">Inspección de Extintores</option>
														<option value="inspeccion-sistemas-incendios">Inspección de Sistemas contra incendios</option>
													</optgroup>

													<optgroup label="📊 MONITOREOS">
														<option value="monitoreo-velocidad-vehiculos">Monitoreo de velocidad de vehículos</option>
														<option value="monitoreo-iluminacion">Monitoreo de Control de Iluminación</option>
														<option value="monitoreo-gases">Monitoreo de Control de Gases</option>
														<option value="monitoreo-gases-vehiculos">Monitoreo de Gases de vehículos y equipos</option>
														<option value="monitoreo-velocidad-viento">Monitoreo de velocidad de viento en labores subterráneas</option>
													</optgroup>

													<optgroup label="📚 CAPACITACIÓN">
														<option value="elaborar-programa-capacitacion">Elaborar programa de Capacitación por puesto</option>
														<option value="cumplir-programa-capacitacion">Cumplir con el programa de Capacitación</option>
														<option value="charlas-integrales">Desarrollar las charlas integrales</option>
														<option value="campanas-sensibilizacion">Realizar campañas de sensibilización</option>
													</optgroup>

													<optgroup label="🚨 OTRAS ACTIVIDADES">
														<option value="acciones-correctivas-incidentes">Acciones correctivas de incidentes</option>
														<option value="acciones-correctivas-accidentes">Acciones correctivas de accidentes</option>
														<option value="difundir-lecciones-aprendidas">Difundir Lecciones aprendidas</option>
														<option value="identificacion-requisitos-legales">Identificación de Requisitos legales</option>
														<option value="evaluacion-requisitos-legales">Evaluación de requisitos legales</option>
														<option value="auditoria-interna-seguridad">Realizar auditoría interna</option>
														<option value="actualizar-plan-emergencias">Actualizar Plan de Emergencias</option>
														<option value="actualizar-pets">Actualizar los PETS</option>
													</optgroup>

													{tableData
														.filter(item => item.actividad &&
															!document.getElementById('actividad')?.querySelector(`option[value="${item.actividad}"]`))
														.map((item, index) => (
															<option key={`custom-${index}`} value={item.actividad}>
																{item.actividad}
															</option>
														))}
												</select>

												<div className="position-absolute top-0 end-0 mt-1 me-2">
													<span className="badge bg-primary" title="Total opciones seleccionadas">
														{Array.isArray(actividad) ? actividad.length : (actividad ? 1 : 0)}
													</span>
												</div>
											</div>

											{(!actividad || (Array.isArray(actividad) && actividad.length === 0)) && (
												<div className="text-danger small">
													<span role="alert">Debe seleccionar al menos una actividad</span>
												</div>
											)}

											<div className="form-text mt-1 d-flex justify-content-between align-items-center">
												<span>
													<i className="fas fa-keyboard me-1"></i>
													Ctrl/Cmd + clic para selección múltiple
												</span>

												<div>
													<button
														type="button"
														className="btn btn-sm btn-light-primary me-1"
														disabled={!tableData[0]?.herramientaGestion}
														onClick={() => {
															// Filter options based on herramienta seleccionada
															const filteredActivities = Array.from(
																document.querySelectorAll('#actividad option')
															)
																.filter(opt => {
																	// Check if parentElement is an optgroup and use its label attribute
																	const optgroup = opt.parentElement as HTMLOptGroupElement;
																	return optgroup && optgroup.tagName === 'OPTGROUP' &&
																		optgroup.getAttribute('label')?.toLowerCase().includes(tableData[0]?.herramientaGestion?.toLowerCase() || '');
																})
																.map(opt => (opt as HTMLOptionElement).value);

															setActividad(filteredActivities);
														}}
													>
														<i className="fas fa-filter"></i> Filtrar
													</button>

													<button
														type="button"
														className="btn btn-sm btn-light-danger"
														onClick={() => setActividad([])}
													>
														<i className="fas fa-times"></i> Limpiar
													</button>
												</div>
											</div>

											{Array.isArray(actividad) && actividad.length > 0 && (
												<div className="selected-activities mt-2 border-top pt-2">
													<div className="text-muted fs-7 mb-1">Actividades seleccionadas:</div>
													<div className="d-flex flex-wrap gap-1">
														{actividad.map((act, i) => (
															<span key={i} className="badge bg-light-primary text-primary">
																{act}
																<i
																	className="fas fa-times ms-1 cursor-pointer"
																	onClick={() => setActividad(actividad.filter(a => a !== act))}
																></i>
															</span>
														))}
													</div>
												</div>
											)}
										</div>
										<div className="col-sm-6">
											<label className="form-label required d-flex justify-content-between align-items-center">
												<span>Responsable de cumplimiento</span>
												<button
													type="button"
													className="btn btn-sm btn-icon btn-primary"
													onClick={() => {
														const updatedData = [...tableData];
														// Add a new empty responsible entry
														updatedData.push({
															area: "",
															cargo: "",
														});
														setTableData(updatedData);
													}}
													title="Agregar otro responsable"
												>
													<i className="fas fa-plus"></i>
												</button>
											</label>
											<div className="d-flex gap-2">
												<select
													className="form-select form-select-sm"
													id="area"
													value={tableData[0]?.area || ""}
													onChange={(e) => {
														const updatedData = [...tableData];
														updatedData[0] = {
															...updatedData[0],
															area: e.target.value,
															cargo: "", // Reset cargo when area changes
														};
														setTableData(updatedData);
													}}
													required
												>
													<option value="">Área</option>
													<option value="area1">Área 1</option>
													<option value="area2">Área 2</option>
													<option value="area3">Área 3</option>
												</select>

												<select
													className="form-select form-select-sm"
													id="cargo"
													value={tableData[0]?.cargo || ""}
													onChange={(e) => {
														const updatedData = [...tableData];
														updatedData[0] = {
															...updatedData[0],
															cargo: e.target.value,
															responsable: `${tableData[0]?.area} - ${e.target.value}`, // Set combined value to responsable
														};
														setTableData(updatedData);
														setResponsable(
															`${tableData[0]?.area} - ${e.target.value}`
														);
													}}
													disabled={!tableData[0]?.area}
													required
												>
													<option value="">Cargo</option>
													<option value="cargo1">Cargo 1</option>
													<option value="cargo2">Cargo 2</option>
													<option value="cargo3">Cargo 3</option>
												</select>
											</div>
											{(!tableData[0]?.area || !tableData[0]?.cargo) && (
												<div className="text-danger small">
													<span role="alert">Área y Cargo son requeridos</span>
												</div>
											)}

											{/* Additional responsible people */}
											{tableData
												.filter(
													(item) =>
														item.area !== undefined || item.cargo !== undefined
												)
												.slice(1)
												.map((item, index) => (
													<div key={index + 1} className="mt-2">
														<div className="d-flex gap-2 align-items-center">
															<select
																className="form-select form-select-sm"
																value={item.area || ""}
																onChange={(e) => {
																	const updatedData = [...tableData];
																	const actualIndex = tableData.findIndex(
																		(i, idx) =>
																			idx > 0 &&
																			(i.area !== undefined ||
																				i.cargo !== undefined) &&
																			i === item
																	);
																	updatedData[actualIndex] = {
																		...updatedData[actualIndex],
																		area: e.target.value,
																		cargo: "",
																	};
																	setTableData(updatedData);
																}}
															>
																<option value="">Área</option>
																<option value="area1">Área 1</option>
																<option value="area2">Área 2</option>
																<option value="area3">Área 3</option>
															</select>

															<select
																className="form-select form-select-sm"
																value={item.cargo || ""}
																onChange={(e) => {
																	const updatedData = [...tableData];
																	const actualIndex = tableData.findIndex(
																		(i, idx) =>
																			idx > 0 &&
																			(i.area !== undefined ||
																				i.cargo !== undefined) &&
																			i === item
																	);
																	updatedData[actualIndex] = {
																		...updatedData[actualIndex],
																		cargo: e.target.value,
																		responsable: `${item.area} - ${e.target.value}`,
																	};
																	setTableData(updatedData);
																}}
																disabled={!item.area}
															>
																<option value="">Cargo</option>
																<option value="cargo1">Cargo 1</option>
																<option value="cargo2">Cargo 2</option>
																<option value="cargo3">Cargo 3</option>
															</select>

															<button
																type="button"
																className="btn btn-sm btn-icon btn-danger"
																onClick={() => {
																	const updatedData = [...tableData];
																	const actualIndex = tableData.findIndex(
																		(i, idx) =>
																			idx > 0 &&
																			(i.area !== undefined ||
																				i.cargo !== undefined) &&
																			i === item
																	);
																	updatedData.splice(actualIndex, 1);
																	setTableData(updatedData);
																}}
															>
																<i className="fas fa-minus"></i>
															</button>
														</div>
													</div>
												))}
										</div>
										<div className="col-12">
											<label
												htmlFor="areaDestinada"
												className="required form-label"
											>
												Área(s) destinada
											</label>
											<div className="row gx-2">
												{["area1", "area2", "area3", "area4"].map(
													(area, idx) => (
														<div className="col-3" key={idx}>
															<div className="form-check">
																<input
																	className="form-check-input"
																	type="checkbox"
																	id={`area-${area}`}
																	value={area}
																	checked={areaDestinada.includes(area)}
																	onChange={(e) => {
																		const value = e.target.value;
																		if (e.target.checked) {
																			setAreaDestinada([
																				...areaDestinada,
																				value,
																			]);
																		} else {
																			setAreaDestinada(
																				areaDestinada.filter(
																					(item) => item !== value
																				)
																			);
																		}
																	}}
																/>
																<label
																	className="form-check-label"
																	htmlFor={`area-${area}`}
																>
																	{area === "area1"
																		? "Área 1"
																		: area === "area2"
																			? "Área 2"
																			: area === "area3"
																				? "Área 3"
																				: "Área 4"}
																</label>
															</div>
														</div>
													)
												)}
											</div>
											{(!areaDestinada || areaDestinada.length === 0) && (
												<div className="text-danger small">
													<span role="alert">
														Debe seleccionar al menos una opción
													</span>
												</div>
											)}
										</div>
										<div className="col-12">
											<label
												htmlFor="fechasEjecucion"
												className="form-label required"
											>
												Fechas de ejecución
											</label>
											<div className="row gx-2">
												{[
													"Enero",
													"Febrero",
													"Marzo",
													"Abril",
													"Mayo",
													"Junio",
													"Julio",
													"Agosto",
													"Septiembre",
													"Octubre",
													"Noviembre",
													"Diciembre",
												].map((month, idx) => (
													<div className="col-3 mb-2" key={idx}>
														<div className="form-check">
															<input
																className="form-check-input"
																type="checkbox"
																id={`month-${month}`}
																value={month.toLowerCase()}
																checked={(
																	tableData[0]?.fechasEjecucion || []
																).includes(month.toLowerCase())}
																onChange={(e) => {
																	const value = e.target.value;
																	const updatedData = [...tableData];
																	const currentMonths =
																		updatedData[0]?.fechasEjecucion || [];

																	if (e.target.checked) {
																		// Add month if checked
																		updatedData[0] = {
																			...updatedData[0],
																			fechasEjecucion: [
																				...currentMonths,
																				value,
																			],
																		};
																	} else {
																		// Remove month if unchecked
																		updatedData[0] = {
																			...updatedData[0],
																			fechasEjecucion: currentMonths.filter(
																				(month) => month !== value
																			),
																		};
																	}
																	setTableData(updatedData);
																}}
															/>
															<label
																className="form-check-label"
																htmlFor={`month-${month}`}
															>
																{month}
															</label>
														</div>
													</div>
												))}
											</div>
											{(!tableData[0]?.fechasEjecucion ||
												tableData[0]?.fechasEjecucion.length === 0) && (
													<div className="text-danger small">
														<span role="alert">
															Debe seleccionar al menos un mes
														</span>
													</div>
												)}
										</div>
										<div className="col-sm-6">
											<label
												htmlFor="observaciones"
												className="required form-label"
											>
												Observaciones
											</label>
											<textarea
												className="form-control"
												placeholder="Escriba sus observaciones"
												id="observaciones"
												value={observaciones}
												onChange={(e) => setObservaciones(e.target.value)}
											/>
										</div>
										<div className="col-sm-6">
											<label
												htmlFor="fechaVerificación"
												className="required form-label"
											>
												Fecha de verificación
											</label>
											<input
												type="date"
												className="form-control"
												placeholder="Fecha verificacion"
												id="fechaVerificacion"
												value={fechaVerificacion}
												onChange={(e) => setFechaVerificacion(e.target.value)}
											/>
										</div>
										<div className="col-12 text-end">
											<button
												type="button"
												onClick={handleAddEditTableData}
												className="btn btn-sm btn-primary"
											>
												{isEditTableData.edit ? "Guardar" : "Agregar"}
											</button>
										</div>
									</div>
									<hr />
									<div className="table-responsive mt-10">
										<table className="table table-secondary table-row-gray-300 align-middle gs-7">
											<thead>
												<tr className="fw-bold border-bottom-2 border-gray-200">
													<th>Nro</th>
													<th>Actividad</th>
													<th>Responsable</th>
													<th>Área destinada</th>
													<th>Fecha de vencimiento</th>
													<th>Acciones</th>
												</tr>
											</thead>
											<tbody>
												{tableData.filter((data) => data.actividad).length >
													0 ? (
													<>
														{tableData
															.filter((data) => data.actividad)
															.map((data: any, index: any) => (
																<tr key={index}>
																	<td>{index + 1}</td>
																	<td>{data.actividad}</td>
																	<td>{data.responsable}</td>
																	<td>
																		{Array.isArray(data.areaDestinada)
																			? data.areaDestinada.join(", ")
																			: data.areaDestinada}
																	</td>
																	<td>{data.fechaVerificacion}</td>
																	<td>
																		<div className="d-flex gap-2">
																			<button
																				type="button"
																				onClick={() =>
																					handleEditData(index, data)
																				}
																				className="btn btn-sm btn-icon btn-active-icon-primary btn-active-light-primary"
																				data-bs-toggle="tooltip"
																				title="Editar"
																			>
																				<i className="fas fa-edit fs-4"></i>
																			</button>
																			<button
																				type="button"
																				onClick={() => handleDeleteData(index)}
																				className="btn btn-sm btn-icon btn-active-icon-danger btn-active-light-danger"
																				data-bs-toggle="tooltip"
																				title="Eliminar"
																			>
																				<i className="fas fa-trash fs-4"></i>
																			</button>
																		</div>
																	</td>
																</tr>
															))}
													</>
												) : (
													<tr className="text-center">
														<td colSpan={6}>Sin datos</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								id="closeButton"
								data-bs-dismiss="modal"
							>
								Cerrar
							</button>
							<button
								type="submit"
								className="btn btn-success"
							// disabled={isSubmitting || !isValid}
							>
								Guardar
							</button>
						</div>
					</form>
				</div>
			</div>
		) : (
			////////////////(MODAL INEDITABLE)

			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-scrollable modal-lg">
					<form className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title" id="staticBackdropLabel">
								Nuevo botiquin
							</h1>
							<button
								type="button"
								id="closeButton"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div className="card shadow-none mb-10">
								<div className="card-body bg-secondary card-blank">
									<div className="row gy-4 ">
										<div className="col-12">
											<label
												htmlFor="objetivoGeneral"
												className="required form-label"
											>
												Objetivo General
											</label>
											<textarea
												className="form-control"
												placeholder="Escriba el objetivo general"
												id="objetivoGeneral"
												rows={3}
												{...getFieldProps("objetivoGeneral")}
												required
											/>
											{touched.objetivoGeneral && errors.objetivoGeneral && (
												<div className="text-danger small">
													<span role="alert">{errors.objetivoGeneral}</span>
												</div>
											)}
										</div>
										<div className="col-12">
											<label htmlFor="meta" className="required form-label">
												Meta
											</label>
											<div className="d-flex align-items-center gap-2">
												<input
													type="text"
													className={clsx(
														"form-control",
														{ "is-invalid": touched.meta && errors.meta },
														{ "is-valid": touched.meta && !errors.meta }
													)}
													placeholder="Meta"
													id="meta"
													{...getFieldProps("meta")}
													required
												/>
												<button
													type="button"
													className="btn btn-sm btn-primary"
													onClick={handleAddMeta}
												>
													<i className="fas fa-plus"></i>
												</button>
											</div>
											{touched.meta && errors.meta && (
												<div className="text-danger small">
													<span role="alert">{errors.meta}</span>
												</div>
											)}
											{tableData.map(
												(item, index) =>
													item.meta !== undefined && (
														<div key={index} className="col-12 mt-2">
															<label
																htmlFor={`meta-${index}`}
																className="form-label"
															>
																Meta {index + 2}
															</label>
															<div className="d-flex align-items-center gap-2">
																<input
																	type="text"
																	className="form-control"
																	placeholder={`Meta ${index + 2}`}
																	id={`meta-${index}`}
																	value={item.meta}
																	onChange={(e) => {
																		const updatedData = [...tableData];
																		updatedData[index].meta = e.target.value;
																		setTableData(updatedData);
																	}}
																	required
																/>
																<button
																	type="button"
																	className="btn btn-sm btn-danger"
																	onClick={() => {
																		const updatedData = [...tableData];
																		updatedData.splice(index, 1);
																		setTableData(
																			updatedData.filter(
																				(item) => item.meta !== undefined
																			)
																		);
																	}}
																>
																	<i className="fas fa-minus"></i>
																</button>
															</div>
														</div>
													)
											)}
										</div>
										<div className="col-12">
											<label
												htmlFor="indicador"
												className="required form-label"
											>
												Indicador
											</label>
											<div className="d-flex align-items-center gap-2">
												<input
													type="text"
													className={clsx(
														"form-control",
														{
															"is-invalid":
																touched.indicador && errors.indicador,
														},
														{
															"is-valid":
																touched.indicador && !errors.indicador,
														}
													)}
													placeholder="Indicador"
													id="indicador"
													{...getFieldProps("indicador")}
													required
												/>
												<button
													type="button"
													className="btn btn-sm btn-primary"
													onClick={handleAddIndicador}
												>
													<i className="fas fa-plus"></i>
												</button>
											</div>
											{touched.indicador && errors.indicador && (
												<div className="text-danger small">
													<span role="alert">{errors.indicador}</span>
												</div>
											)}
											{tableData.map(
												(item, index) =>
													item.indicador !== undefined && (
														<div key={index} className="col-12 mt-2">
															<label
																htmlFor={`indicador-${index}`}
																className="form-label"
															>
																Indicador {index + 2}
															</label>
															<div className="d-flex align-items-center gap-2">
																<input
																	type="text"
																	className="form-control"
																	placeholder={`Indicador ${index + 2}`}
																	id={`indicador-${index}`}
																	value={item.indicador}
																	onChange={(e) => {
																		const updatedData = [...tableData];
																		updatedData[index].indicador =
																			e.target.value;
																		setTableData(updatedData);
																	}}
																	required
																/>
																<button
																	type="button"
																	className="btn btn-sm btn-danger"
																	onClick={() => {
																		const updatedData = [...tableData];
																		updatedData.splice(index, 1);
																		setTableData(
																			updatedData.filter(
																				(item) => item.indicador !== undefined
																			)
																		);
																	}}
																>
																	<i className="fas fa-minus"></i>
																</button>
															</div>
														</div>
													)
											)}
										</div>
										<div className="col-sm-6">
											<label
												htmlFor="presupuesto"
												className="required form-label"
											>
												Presupuesto
											</label>
											<input
												type="number"
												className={clsx(
													"form-control ",
													{
														"is-invalid":
															touched.presupuesto && errors.presupuesto,
													},
													{
														"is-valid":
															touched.presupuesto && !errors.presupuesto,
													}
												)}
												placeholder="$ Presupuesto"
												id="presupuesto"
												{...getFieldProps("presupuesto")}
												required
											/>
											{touched.presupuesto && errors.presupuesto && (
												<div className="text-danger small">
													<span role="alert">{errors.presupuesto}</span>
												</div>
											)}
										</div>
										<div className="col-sm-6">
											<label htmlFor="recursos" className="required form-label">
												Recursos
											</label>
											<input
												type="text"
												className={clsx(
													"form-control ",
													{ "is-invalid": touched.recursos && errors.recursos },
													{
														"is-valid": touched.recursos && !errors.recursos,
													}
												)}
												placeholder="Recursos"
												id="recursos"
												{...getFieldProps("recursos")}
												required
											/>
											{touched.recursos && errors.recursos && (
												<div className="text-danger small">
													<span role="alert">{errors.recursos}</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="card shadow-none mb-0">
								<div className="card-body bg-secondary ">
									<div className="row gy-4 mb-10">
										<h5 className="text-dark fw-bold mb-8">
											Objetivos Específicos
										</h5>
										<div className="col-sm-6">
											<label
												htmlFor="herramientaGestion"
												className="required form-label"
											>
												Herramienta de gestión
											</label>
											<select
												className="form-select"
												id="herramientaGestion"
												aria-label="Default select example"
												value={tableData[0]?.herramientaGestion || ""}
												onChange={(e) => {
													const updatedData = [...tableData];
													updatedData[0] = {
														...updatedData[0],
														herramientaGestion: e.target.value,
													};
													setTableData(updatedData);
												}}
												required
											>
												<option value="">SELECCIONE UNA HERRAMIENTA</option>
												<option value="liderazgo">LIDERAZGO</option>
												<option value="comite-seguridad">COMITÉ DE SEGURIDAD</option>
												<option value="mejora-continua">MEJORA CONTINUA</option>
												<option value="inspecciones-areas-trabajo">INSPECCIONES (AREAS DE TRABAJO)</option>
												<option value="inspecciones-vehiculos-equipos">INSPECCIONES (VEHÍCULOS Y EQUIPOS)</option>
												<option value="inspecciones-sistema-electrico">INSPECCIONES DE SISTEMA ELÉCTRICO Y EQUIPOS</option>
												<option value="inspecciones-herramientas-epps">INSPECCIONES (HERRAMIENTAS Y EPPS)</option>
												<option value="inspecciones-elementos-emergencia">INSPECCIONES (ELEMENTOS DE EMERGENCIA)</option>
												<option value="monitoreos">MONITOREOS</option>
												<option value="capacitacion">CAPACITACIÓN</option>
												<option value="investigacion-accidentes">INVESTIGACIÓN DE ACCIDENTES E INCIDENTES</option>
												<option value="requisitos-legales">REQUISITOS LEGALES</option>
												<option value="auditorias-sgsst">AUDITORÍAS DEL SGSST</option>
												<option value="gestion-contratistas">GESTIÓN DE CONTRATISTAS</option>
												<option value="plan-emergencia">PLAN DE EMERGENCIA</option>
												<option value="iperc-gestion-riesgos">IPERC Y GESTIÓN DE RIESGOS</option>
												<option value="procedimientos-trabajo">PROCEDIMIENTOS DE TRABAJO</option>
											</select>
										</div>
										<div className="col-sm-6">
											<label
												htmlFor="actividad"
												className="required form-label"
											>
												Actividad(es)
											</label>
											<div className="position-relative">
												<select
													className="form-select form-select-solid"
													id="actividad"
													multiple
													size={8}
													value={Array.isArray(actividad) ? actividad : actividad ? [actividad] : []}
													onChange={(e) => {
														const selectedOptions = Array.from(
															e.target.selectedOptions,
															(option) => option.value
														);

														// Handle the "otro" option if it exists in the selection
														if (selectedOptions.includes("otro")) {
															const nuevaActividad = prompt("Escriba la nueva actividad:");
															if (nuevaActividad) {
																setTableData((prev) => [
																	...prev,
																	{ actividad: nuevaActividad },
																]);
																// Replace "otro" with the new custom activity
																const updatedSelection = selectedOptions.filter(opt => opt !== "otro");
																updatedSelection.push(nuevaActividad);
																setActividad(updatedSelection);
															} else {
																// If prompt was cancelled, remove "otro" from selection
																setActividad(selectedOptions.filter(opt => opt !== "otro"));
															}
														} else {
															setActividad(selectedOptions);
														}
													}}
													disabled={!tableData[0]?.herramientaGestion}
													required
													style={{ maxHeight: '200px' }}
												>
													<option value="otro" className="fw-bold bg-light">➕ Agregar nueva actividad</option>

													<optgroup label="📋 LIDERAZGO Y POLÍTICAS">
														<option value="revisar-politicas-seguridad">Revisar las políticas en materia de Seguridad</option>
														<option value="difundir-politica-alcohol-drogas">Difundir la política de Alcohol y drogas</option>
														<option value="difundir-politica-tolerancia-cero">Difundir la política de Tolerancia cero</option>
														<option value="publicar-politicas-frentes-trabajo">Publicar las Políticas en los frentes de trabajo</option>
														<option value="implementar-programa-liderazgo">Implementar el Programa de Liderazgo visible</option>
													</optgroup>

													<optgroup label="👥 COMITÉ DE SEGURIDAD">
														<option value="conformacion-comite-sst-2022">Conformación del Comité SST Periodo 2022</option>
														<option value="elecciones-comite-sst-2023">Realizar elecciones del Comité SST Periodo 2023</option>
														<option value="reuniones-ordinarias-comite">Realizar Reuniones ordinarias del Comité SST</option>
														<option value="inspeccion-mensual-comite">Realizar Inspección mensual por el Comité de Seguridad</option>
														<option value="capacitar-miembros-comite">Capacitar a los miembros del Comité de Seguridad</option>
														<option value="reportes-trimestrales-comite">Realizar Reportes trimestrales del Comité</option>
														<option value="informe-anual-comite">Realizar Informe Anual de Actividades del Comité</option>
													</optgroup>

													<optgroup label="🔍 INSPECCIONES - ÁREAS DE TRABAJO">
														<option value="inspeccion-frentes-trabajo">Inspecciones de frentes de trabajo</option>
														<option value="inspeccion-talleres">Inspección de talleres</option>
														<option value="inspeccion-campamentos">Inspección de campamentos</option>
														<option value="inspeccion-polvorin">Inspección de polvorín de explosivos</option>
														<option value="inspeccion-almacenes">Inspección de almacenes</option>
														<option value="inspeccion-oficinas">Inspección de oficinas</option>
													</optgroup>

													<optgroup label="🚗 INSPECCIONES - VEHÍCULOS Y EQUIPOS">
														<option value="inspeccion-vehiculos-equipos">Inspección General de Vehículos y equipos</option>
														<option value="inspeccion-gruas">Inspección de grúas</option>
														<option value="inspeccion-cisterna-combustible">Inspección de cisterna de combustible</option>
													</optgroup>

													<optgroup label="⚡ INSPECCIONES - SISTEMAS ELÉCTRICOS">
														<option value="inspeccion-grupo-electrogeno">Grupo eléctrogeno / Generador eléctrico</option>
														<option value="inspeccion-luminarias">Luminarias / Torres de iluminación</option>
														<option value="inspeccion-tableros-electricos">Inspección de tableros Eléctricos</option>
													</optgroup>

													<optgroup label="🛠️ INSPECCIONES - HERRAMIENTAS Y EPPS">
														<option value="inspeccion-herramientas">Inspección de Herramientas Manuales y eléctricas</option>
														<option value="inspeccion-escaleras">Inspección de Escaleras Pórtatiles</option>
														<option value="inspeccion-bombas-sumergibles">Inspección de Bombas sumergibles</option>
														<option value="inspeccion-andamios">Inspección de andamios</option>
														<option value="inspeccion-epps">Inspección de EPPs</option>
														<option value="inspeccion-arnes">Inspección de arnés y línea de vida</option>
														<option value="inspeccion-sistema-izaje">Inspección de Sistema de Izaje</option>
													</optgroup>

													<optgroup label="🧯 INSPECCIONES - ELEMENTOS DE EMERGENCIA">
														<option value="inspeccion-extintores">Inspección de Extintores</option>
														<option value="inspeccion-sistemas-incendios">Inspección de Sistemas contra incendios</option>
													</optgroup>

													<optgroup label="📊 MONITOREOS">
														<option value="monitoreo-velocidad-vehiculos">Monitoreo de velocidad de vehículos</option>
														<option value="monitoreo-iluminacion">Monitoreo de Control de Iluminación</option>
														<option value="monitoreo-gases">Monitoreo de Control de Gases</option>
														<option value="monitoreo-gases-vehiculos">Monitoreo de Gases de vehículos y equipos</option>
														<option value="monitoreo-velocidad-viento">Monitoreo de velocidad de viento en labores subterráneas</option>
													</optgroup>

													<optgroup label="📚 CAPACITACIÓN">
														<option value="elaborar-programa-capacitacion">Elaborar programa de Capacitación por puesto</option>
														<option value="cumplir-programa-capacitacion">Cumplir con el programa de Capacitación</option>
														<option value="charlas-integrales">Desarrollar las charlas integrales</option>
														<option value="campanas-sensibilizacion">Realizar campañas de sensibilización</option>
													</optgroup>

													<optgroup label="🚨 OTRAS ACTIVIDADES">
														<option value="acciones-correctivas-incidentes">Acciones correctivas de incidentes</option>
														<option value="acciones-correctivas-accidentes">Acciones correctivas de accidentes</option>
														<option value="difundir-lecciones-aprendidas">Difundir Lecciones aprendidas</option>
														<option value="identificacion-requisitos-legales">Identificación de Requisitos legales</option>
														<option value="evaluacion-requisitos-legales">Evaluación de requisitos legales</option>
														<option value="auditoria-interna-seguridad">Realizar auditoría interna</option>
														<option value="actualizar-plan-emergencias">Actualizar Plan de Emergencias</option>
														<option value="actualizar-pets">Actualizar los PETS</option>
													</optgroup>

													{tableData
														.filter(item => item.actividad &&
															!document.getElementById('actividad')?.querySelector(`option[value="${item.actividad}"]`))
														.map((item, index) => (
															<option key={`custom-${index}`} value={item.actividad}>
																{item.actividad}
															</option>
														))}
												</select>

												<div className="position-absolute top-0 end-0 mt-1 me-2">
													<span className="badge bg-primary" title="Total opciones seleccionadas">
														{Array.isArray(actividad) ? actividad.length : (actividad ? 1 : 0)}
													</span>
												</div>
											</div>

											{(!actividad || (Array.isArray(actividad) && actividad.length === 0)) && (
												<div className="text-danger small">
													<span role="alert">Debe seleccionar al menos una actividad</span>
												</div>
											)}

											<div className="form-text mt-1 d-flex justify-content-between align-items-center">
												<span>
													<i className="fas fa-keyboard me-1"></i>
													Ctrl/Cmd + clic para selección múltiple
												</span>

												<div>
													<button
														type="button"
														className="btn btn-sm btn-light-primary me-1"
														disabled={!tableData[0]?.herramientaGestion}
														onClick={() => {
															// Filter options based on herramienta seleccionada
															const filteredActivities = Array.from(
																document.querySelectorAll('#actividad option')
															)
																.filter(opt => {
																	// Check if parentElement is an optgroup and use its label attribute
																	const optgroup = opt.parentElement as HTMLOptGroupElement;
																	return optgroup && optgroup.tagName === 'OPTGROUP' &&
																		optgroup.getAttribute('label')?.toLowerCase().includes(tableData[0]?.herramientaGestion?.toLowerCase() || '');
																})
																.map(opt => (opt as HTMLOptionElement).value);

															setActividad(filteredActivities);
														}}
													>
														<i className="fas fa-filter"></i> Filtrar
													</button>

													<button
														type="button"
														className="btn btn-sm btn-light-danger"
														onClick={() => setActividad([])}
													>
														<i className="fas fa-times"></i> Limpiar
													</button>
												</div>
											</div>

											{Array.isArray(actividad) && actividad.length > 0 && (
												<div className="selected-activities mt-2 border-top pt-2">
													<div className="text-muted fs-7 mb-1">Actividades seleccionadas:</div>
													<div className="d-flex flex-wrap gap-1">
														{actividad.map((act, i) => (
															<span key={i} className="badge bg-light-primary text-primary">
																{act}
																<i
																	className="fas fa-times ms-1 cursor-pointer"
																	onClick={() => setActividad(actividad.filter(a => a !== act))}
																></i>
															</span>
														))}
													</div>
												</div>
											)}
										</div>
										<div className="col-sm-6">
											<label className="form-label required d-flex justify-content-between align-items-center">
												<span>Responsable de cumplimiento</span>
												<button
													type="button"
													className="btn btn-sm btn-icon btn-primary"
													onClick={() => {
														const updatedData = [...tableData];
														// Add a new empty responsible entry
														updatedData.push({
															area: "",
															cargo: "",
														});
														setTableData(updatedData);
													}}
													title="Agregar otro responsable"
												>
													<i className="fas fa-plus"></i>
												</button>
											</label>
											<div className="d-flex gap-2">
												<select
													className="form-select form-select-sm"
													id="area"
													value={tableData[0]?.area || ""}
													onChange={(e) => {
														const updatedData = [...tableData];
														updatedData[0] = {
															...updatedData[0],
															area: e.target.value,
															cargo: "", // Reset cargo when area changes
														};
														setTableData(updatedData);
													}}
													required
												>
													<option value="">Área</option>
													<option value="area1">Área 1</option>
													<option value="area2">Área 2</option>
													<option value="area3">Área 3</option>
												</select>

												<select
													className="form-select form-select-sm"
													id="cargo"
													value={tableData[0]?.cargo || ""}
													onChange={(e) => {
														const updatedData = [...tableData];
														updatedData[0] = {
															...updatedData[0],
															cargo: e.target.value,
															responsable: `${tableData[0]?.area} - ${e.target.value}`, // Set combined value to responsable
														};
														setTableData(updatedData);
														setResponsable(
															`${tableData[0]?.area} - ${e.target.value}`
														);
													}}
													disabled={!tableData[0]?.area}
													required
												>
													<option value="">Cargo</option>
													<option value="cargo1">Cargo 1</option>
													<option value="cargo2">Cargo 2</option>
													<option value="cargo3">Cargo 3</option>
												</select>
											</div>
											{(!tableData[0]?.area || !tableData[0]?.cargo) && (
												<div className="text-danger small">
													<span role="alert">Área y Cargo son requeridos</span>
												</div>
											)}

											{/* Additional responsible people */}
											{tableData
												.filter(
													(item) =>
														item.area !== undefined || item.cargo !== undefined
												)
												.slice(1)
												.map((item, index) => (
													<div key={index + 1} className="mt-2">
														<div className="d-flex gap-2 align-items-center">
															<select
																className="form-select form-select-sm"
																value={item.area || ""}
																onChange={(e) => {
																	const updatedData = [...tableData];
																	const actualIndex = tableData.findIndex(
																		(i, idx) =>
																			idx > 0 &&
																			(i.area !== undefined ||
																				i.cargo !== undefined) &&
																			i === item
																	);
																	updatedData[actualIndex] = {
																		...updatedData[actualIndex],
																		area: e.target.value,
																		cargo: "",
																	};
																	setTableData(updatedData);
																}}
															>
																<option value="">Área</option>
																<option value="area1">Área 1</option>
																<option value="area2">Área 2</option>
																<option value="area3">Área 3</option>
															</select>

															<select
																className="form-select form-select-sm"
																value={item.cargo || ""}
																onChange={(e) => {
																	const updatedData = [...tableData];
																	const actualIndex = tableData.findIndex(
																		(i, idx) =>
																			idx > 0 &&
																			(i.area !== undefined ||
																				i.cargo !== undefined) &&
																			i === item
																	);
																	updatedData[actualIndex] = {
																		...updatedData[actualIndex],
																		cargo: e.target.value,
																		responsable: `${item.area} - ${e.target.value}`,
																	};
																	setTableData(updatedData);
																}}
																disabled={!item.area}
															>
																<option value="">Cargo</option>
																<option value="cargo1">Cargo 1</option>
																<option value="cargo2">Cargo 2</option>
																<option value="cargo3">Cargo 3</option>
															</select>

															<button
																type="button"
																className="btn btn-sm btn-icon btn-danger"
																onClick={() => {
																	const updatedData = [...tableData];
																	const actualIndex = tableData.findIndex(
																		(i, idx) =>
																			idx > 0 &&
																			(i.area !== undefined ||
																				i.cargo !== undefined) &&
																			i === item
																	);
																	updatedData.splice(actualIndex, 1);
																	setTableData(updatedData);
																}}
															>
																<i className="fas fa-minus"></i>
															</button>
														</div>
													</div>
												))}
										</div>
										<div className="col-sm-6">
											<label
												htmlFor="areaDestinada"
												className="required form-label"
											>
												Área destinada
											</label>
											<select
												className="form-select"
												id="areaDestinada"
												multiple
												value={tableData[0]?.areaDestinada || []}
												onChange={(e) => {
													const selectedOptions = Array.from(
														e.target.selectedOptions,
														(option) => option.value
													);
													const updatedData = [...tableData];
													updatedData[0] = {
														...updatedData[0],
														areaDestinada: selectedOptions,
													};
													setTableData(updatedData);
												}}
												required
											>
												<option value="area1">Área 1</option>
												<option value="area2">Área 2</option>
												<option value="area3">Área 3</option>
												<option value="area4">Área 4</option>
											</select>
											{(!tableData[0]?.areaDestinada ||
												tableData[0]?.areaDestinada.length === 0) && (
													<div className="text-danger small">
														<span role="alert">
															Debe seleccionar al menos una opción
														</span>
													</div>
												)}
										</div>
										<div className="col-12">
											<label
												htmlFor="fechasEjecucion"
												className="form-label required"
											>
												Fechas de ejecución
											</label>
											<div className="row gx-2">
												{[
													"Enero",
													"Febrero",
													"Marzo",
													"Abril",
													"Mayo",
													"Junio",
													"Julio",
													"Agosto",
													"Septiembre",
													"Octubre",
													"Noviembre",
													"Diciembre",
												].map((month, idx) => (
													<div className="col-3 mb-2" key={idx}>
														<div className="form-check">
															<input
																className="form-check-input"
																type="checkbox"
																id={`month-${month}`}
																value={month.toLowerCase()}
																checked={(
																	tableData[0]?.fechasEjecucion || []
																).includes(month.toLowerCase())}
																onChange={(e) => {
																	const value = e.target.value;
																	const updatedData = [...tableData];
																	const currentMonths =
																		updatedData[0]?.fechasEjecucion || [];

																	if (e.target.checked) {
																		// Add month if checked
																		updatedData[0] = {
																			...updatedData[0],
																			fechasEjecucion: [
																				...currentMonths,
																				value,
																			],
																		};
																	} else {
																		// Remove month if unchecked
																		updatedData[0] = {
																			...updatedData[0],
																			fechasEjecucion: currentMonths.filter(
																				(month) => month !== value
																			),
																		};
																	}
																	setTableData(updatedData);
																}}
															/>
															<label
																className="form-check-label"
																htmlFor={`month-${month}`}
															>
																{month}
															</label>
														</div>
													</div>
												))}
											</div>
											{(!tableData[0]?.fechasEjecucion ||
												tableData[0]?.fechasEjecucion.length === 0) && (
													<div className="text-danger small">
														<span role="alert">
															Debe seleccionar al menos un mes
														</span>
													</div>
												)}
										</div>
										<div className="col-sm-12">
											<label
												htmlFor="observaciones"
												className="required form-label"
											>
												Observaciones
											</label>
											<textarea
												className="form-control"
												placeholder="Escriba sus observaciones"
												id="observaciones"
											/>
										</div>
										<div className="col-sm-6">
											<label
												htmlFor="fechaVerificación"
												className="required form-label"
											>
												Fecha de verificación
											</label>
											<input
												type="date"
												className="form-control"
												placeholder="Fecha verificacion"
												id="fechaVerificacion"
												value={fechaVerificacion}
												onChange={(e) => setFechaVerificacion(e.target.value)}
											/>
										</div>
										<div className="col-12 text-end">
											<button
												type="button"
												onClick={handleAddEditTableData}
												className="btn btn-sm btn-primary"
											>
												{isEditTableData.edit ? "Guardar" : "Agregar"}
											</button>
										</div>
									</div>
									<hr />
									<div className="table-responsive mt-10">
										<table className="table table-secondary table-row-gray-300 align-middle gs-7">
											<thead>
												<tr className="fw-bold border-bottom-2 border-gray-200">
													<th>Nro</th>
													<th>Actividad</th>
													<th>Responsable</th>
													<th>Área destinada</th>
													<th>Fecha de vencimiento</th>
													<th>Acciones</th>
												</tr>
											</thead>
											<tbody>
												{tableData.filter((data) => data.actividad).length >
													0 ? (
													<>
														{tableData
															.filter((data) => data.actividad)
															.map((data: any, index: any) => (
																<tr key={index}>
																	<td>{index + 1}</td>
																	<td>{data.actividad}</td>
																	<td>{data.responsable}</td>
																	<td>
																		{Array.isArray(data.areaDestinada)
																			? data.areaDestinada.join(", ")
																			: data.areaDestinada}
																	</td>
																	<td>{data.fechaVerificacion}</td>
																	<td>
																		<div className="d-flex gap-2"></div>
																	</td>
																</tr>
															))}
													</>
												) : (
													<tr className="text-center">
														<td colSpan={6}>Sin datos</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								id="closeButton"
								data-bs-dismiss="modal"
							>
								Cerrar
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
}

export default NewPasstModal;
