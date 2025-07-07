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
	const [actividad, setActividad] = useState("");
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
				<div className="modal-dialog modal-dialog-scrollable modal-lg">
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
												<option value="matriz">Matriz</option>
												<option value="plan">Plan</option>
												<option value="programa">Programa</option>
												<option value="procedimiento">Procedimiento</option>
											</select>
										</div>
										<div className="col-sm-6">
											<label
												htmlFor="actividad"
												className="required form-label"
											>
												Actividad
											</label>
											<select
												className="form-select"
												id="actividad"
												value={actividad}
												onChange={(e) => {
													if (e.target.value === "otro") {
														const nuevaActividad = prompt(
															"Escriba la nueva actividad:"
														);
														if (nuevaActividad) {
															setTableData((prev) => [
																...prev,
																{ actividad: nuevaActividad },
															]);
															setActividad(nuevaActividad);
														}
													} else {
														setActividad(e.target.value);
													}
												}}
												disabled={!tableData[0]?.herramientaGestion}
												required
											>
												<option value="">Seleccione una actividad</option>
												<option value="otro">Otro</option>
												<option value="actividad1">Actividad 1</option>
												<option value="actividad2">Actividad 2</option>
												<option value="actividad3">Actividad 3</option>
												{tableData
													.filter((item) => item.actividad)
													.map((item, index) => (
														<option key={index} value={item.actividad}>
															{item.actividad}
														</option>
													))}
											</select>
											{!actividad && (
												<div className="text-danger small">
													<span role="alert">Actividad es requerido</span>
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
												<option value="">Seleccione una herramienta</option>
												<option value="matriz">Matriz</option>
												<option value="plan">Plan</option>
												<option value="programa">Programa</option>
												<option value="procedimiento">Procedimiento</option>
											</select>
										</div>
										<div className="col-sm-6">
											<label
												htmlFor="actividad"
												className="required form-label"
											>
												Actividad
											</label>
											<select
												className="form-select"
												id="actividad"
												value={actividad}
												onChange={(e) => setActividad(e.target.value)}
												disabled={!tableData[0]?.herramientaGestion}
												required
											>
												<option value="">Seleccione una actividad</option>
												<option value="actividad1">Actividad 1</option>
												<option value="actividad2">Actividad 2</option>
												<option value="actividad3">Actividad 3</option>
											</select>
											{!actividad && (
												<div className="text-danger small">
													<span role="alert">Actividad es requerido</span>
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
