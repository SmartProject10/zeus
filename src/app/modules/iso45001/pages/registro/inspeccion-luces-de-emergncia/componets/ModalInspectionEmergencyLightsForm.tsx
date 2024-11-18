import { ReactNode, useEffect, useState } from "react";
import Swal from "sweetalert2";
import './InspectionEmergencyStyle.scss';
import { InspeccionResponse, EmergencyLightsForm, EmergencyLightsResponse, Sede, AreaResponsable, LuzEmergencia, InspeccionadoPor, Cargo, Trabajador, Inspection, validateForm } from '../core/_models';
import CheckboxSwitch from './CheckboxSwitch';
import ConditionalFields from './ConditionalFields';
import { getAreaResponsable, getCargo, getInspeccionadoPor, getLuzEmergencia, getSede, getTrabajador } from "../core/_requests";
import { accionValidacionGuardar } from "@zeus/app/utils/mensajesPredeterminados";

interface MyComponentProps {
	idEmployee: string;
	onClose: () => void;
	children?: ReactNode;
	onSubmit: (newData: EmergencyLightsForm) => void;
	mode: 'create' | 'edit' | 'view' | "delete";
	formData: EmergencyLightsForm;
}


//Variable titulo del modal
const tituloModal = 'Luz de emergencia';

//Variable titulos campos formulario
const fechaInspeccion = 'Fecha de inspección';
const inspeccionadoPor = 'Inspeccionado por';
const sede = 'Sede';
const luzEmergencia = 'Número luz de emergencia';

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
const fechaVencimiento = 'Fecha vencimiento';

const initialValues: EmergencyLightsForm = {
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
};

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
export const ModalInspectionEmergencyLightsForm: React.FC<MyComponentProps & { mode: 'view' | 'edit' | 'create' | "delete", formData?: EmergencyLightsForm }> = ({
	idEmployee,
	onClose,
	onSubmit,
	children,
	mode,
	formData
}) => {

	const [inspections, setInspections] = useState<Inspection[]>([]);
	const [sedeOptions, setSedeOptions] = useState<Sede[]>([]);
	const [luzEmergenciaOptions, setluzEmergenciaOptions] = useState<LuzEmergencia[]>([]);
	const [areaResponsableOptions, setAreaResponsableOptions] = useState<AreaResponsable[]>([]);
	const [inspeccionadoPorOptions, setInspeccionadoPorOptions] = useState<InspeccionadoPor[]>([]);
	const [cargoOptions, setCargoOptions] = useState<Cargo[]>([]);
	const [trabajadorOptions, setTrabajadorOptions] = useState<Trabajador[]>([]);
	const [localFormData, setLocalFormData] = useState(initialValues);
	const [initialData, setInitialData] = useState<EmergencyLightsForm>(formData);


	const [form, setForm] = useState<EmergencyLightsForm>(
		initialData || {
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
	// Filtrar cargos según el área seleccionada
	const filteredCargos = cargoOptions.filter((cargo) => cargo.area === form.inspeccionadoPor);
	// Filtrar trabajadores según el cargo seleccionado
	const filteredTrabajadores = trabajadorOptions.filter((trabajador) => trabajador.cargo === form.cargo);

	useEffect(() => {
		const fetchOptions = async () => {
			try {
				const sedeResponse = await getSede();
				setSedeOptions(sedeResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de sede:", error);
			}

			try {
				const luzEmergenciaResponse = await getLuzEmergencia();
				setluzEmergenciaOptions(luzEmergenciaResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de luz de emergencia:", error);
			}

			try {
				const areaResponsableResponse = await getAreaResponsable();
				setAreaResponsableOptions(areaResponsableResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de área responsable:", error);
			}

			try {
				const inspeccionadoPorResponse = await getInspeccionadoPor();
				setInspeccionadoPorOptions(inspeccionadoPorResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de inspeccionado por:", error);
			}

			try {
				const cargoResponse = await getCargo();
				setCargoOptions(cargoResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de cardo:", error);
			}

			try {
				const trabajadorResponse = await getTrabajador();
				setTrabajadorOptions(trabajadorResponse.data);
			} catch (error) {
				console.error("Error al obtener las opciones de trabajador:", error);
			}
		};

		fetchOptions();

		// Función para cargar los datos de inspección si el modo es 'edit' o 'view'
		if (mode === 'edit' || mode === 'view') {
			const inspectionToEdit = inspections.find((inspection) => inspection.id === idEmployee);
			if (inspectionToEdit) {
				// Copiamos la inspección encontrada en 'form' y llenamos valores faltantes con valores por defecto
				setForm({
					...initialValues, // Mantén los valores predeterminados para campos faltantes
					...inspectionToEdit, // Sobrescribe solo los campos presentes en inspectionToEdit
				});
			}
		} else {
			// En modo 'create', limpiar el formulario
			setForm({ ...initialValues, id: Date.now().toString() });
		}
	}, [mode, idEmployee, inspections]);

	const handleSwitchChange = (fieldName: string, checked: boolean) => {
		setForm({
			...form,
			[fieldName]: checked,
			// Limpiar los campos si el switch está activado
			...(fieldName === 'enumerado' && checked && {
				areaEnumerado: "",
				fechaVencimientoEnumerado: "",
				observacionEnumerado: "",
				recomendacionEnumerado: "",
			}),
			...(fieldName === 'ubicacionAdecuada' && checked && {
				areaUbicacionAdecuada: "",
				fechaVencimientoUbicacionAdecuada: "",
				observacionUbicacionAdecuada: "",
				recomendacionUbicacionAdecuada: "",
			}),
			...(fieldName === 'enSuLugar' && checked && {
				areaEnSuLugar: "",
				fechaVencimientoEnSuLugar: "",
				observacionEnSuLugar: "",
				recomendacionEnSuLugar: "",
			}),
			...(fieldName === 'libreDeObstaculos' && checked && {
				areaLibreDeObstaculos: "",
				fechaVencimientoLibreDeObstaculos: "",
				observacionLibreDeObstaculos: "",
				recomendacionLibreDeObstaculos: "",
			}),
			...(fieldName === 'conectadoTomacorriente' && checked && {
				areaConectadoTomacorriente: "",
				fechaVencimientoConectadoTomacorriente: "",
				observacionConectadoTomacorriente: "",
				recomendacionConectadoTomacorriente: "",
			}),
			...(fieldName === 'enciendeSwitchPrueba' && checked && {
				areaEnciendeSwitchPrueba: "",
				fechaVencimientoEnciendeSwitchPrueba: "",
				observacionEnciendeSwitchPrueba: "",
				recomendacionEnciendeSwitchPrueba: "",
			}),
			...(fieldName === 'buenaIluminacion' && checked && {
				areaBuenaIluminacion: "",
				fechaVencimientoBuenaIluminacion: "",
				observacionBuenaIluminacion: "",
				recomendacionBuenaIluminacion: "",
			}),
			...(fieldName === 'buenaEstado' && checked && {
				areaBuenaEstado: "",
				fechaVencimientoBuenaEstado: "",
				observacionBuenaEstado: "",
				recomendacionBuenaEstado: "",
			}),
			...(fieldName === 'encendidoQuinceMin' && checked && {
				areaEncendidoQuinceMin: "",
				fechaVencimientoEncendidoQuinceMin: "",
				observacionEncendidoQuinceMin: "",
				recomendacionEncendidoQuinceMin: "",
			})
		});
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
		setLocalFormData({ ...form, [name]: value });

		// Manejo de selects en cascada
		if (name === 'inspeccionadoPor') {
			setLocalFormData({ ...form, inspeccionadoPor: value, cargo: '', trabajador: '' });
		}

		if (name === 'cargo') {
			setLocalFormData({ ...form, cargo: value, trabajador: '' });
		}

		// Manejo de trabajador seleccionado
		if (name === 'trabajador') {
			const trabajador = trabajadorOptions.find(t => t.id.toString() === value);
			setLocalFormData({ ...form, trabajador: value });
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		// Primero, validar el formulario antes de proceder
		console.log(form, 'localFormData')
		if (validateForm(form)) {
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
				// Crear nuevo objeto con los datos del formulario
				const newData: EmergencyLightsForm = {
					id: mode === 'edit' ? form.id : Date.now().toString(),
					fechaInspeccion: form.fechaInspeccion,
					inspeccionadoPor: form.inspeccionadoPor,
					cargo: form.cargo,
					trabajador: form.trabajador,
					sede: form.sede,
					luzEmergencia: form.luzEmergencia,
					enumerado: form.enumerado,
					areaEnumerado: form.areaEnumerado,
					fechaVencimientoEnumerado: form.fechaVencimientoEnumerado,
					observacionEnumerado: form.observacionEnumerado,
					recomendacionEnumerado: form.recomendacionEnumerado,
					// Campos adicionales
					ubicacionAdecuada: form.ubicacionAdecuada,
					areaUbicacionAdecuada: form.areaUbicacionAdecuada,
					fechaVencimientoUbicacionAdecuada: form.fechaVencimientoUbicacionAdecuada,
					observacionUbicacionAdecuada: form.observacionUbicacionAdecuada,
					recomendacionUbicacionAdecuada: form.recomendacionUbicacionAdecuada,
					enSuLugar: form.enSuLugar,
					areaEnSuLugar: form.areaEnSuLugar,
					fechaVencimientoEnSuLugar: form.fechaVencimientoEnSuLugar,
					observacionEnSuLugar: form.observacionEnSuLugar,
					recomendacionEnSuLugar: form.recomendacionEnSuLugar,
					libreDeObstaculos: form.libreDeObstaculos,
					areaLibreDeObstaculos: form.areaLibreDeObstaculos,
					fechaVencimientoLibreDeObstaculos: form.fechaVencimientoLibreDeObstaculos,
					observacionLibreDeObstaculos: form.observacionLibreDeObstaculos,
					recomendacionLibreDeObstaculos: form.recomendacionLibreDeObstaculos,
					conectadoTomacorriente: form.conectadoTomacorriente,
					areaConectadoTomacorriente: form.areaConectadoTomacorriente,
					fechaVencimientoConectadoTomacorriente: form.fechaVencimientoConectadoTomacorriente,
					observacionConectadoTomacorriente: form.observacionConectadoTomacorriente,
					recomendacionConectadoTomacorriente: form.recomendacionConectadoTomacorriente,
					enciendeSwitchPrueba: form.enciendeSwitchPrueba,
					areaEnciendeSwitchPrueba: form.areaEnciendeSwitchPrueba,
					fechaVencimientoEnciendeSwitchPrueba: form.fechaVencimientoEnciendeSwitchPrueba,
					observacionEnciendeSwitchPrueba: form.observacionEnciendeSwitchPrueba,
					recomendacionEnciendeSwitchPrueba: form.recomendacionEnciendeSwitchPrueba,
					buenaIluminacion: form.buenaIluminacion,
					areaBuenaIluminacion: form.areaBuenaIluminacion,
					fechaVencimientoBuenaIluminacion: form.fechaVencimientoBuenaIluminacion,
					observacionBuenaIluminacion: form.observacionBuenaIluminacion,
					recomendacionBuenaIluminacion: form.recomendacionBuenaIluminacion,
					buenaEstado: form.buenaEstado,
					areaBuenaEstado: form.areaBuenaEstado,
					fechaVencimientoBuenaEstado: form.fechaVencimientoBuenaEstado,
					observacionBuenaEstado: form.observacionBuenaEstado,
					recomendacionBuenaEstado: form.recomendacionBuenaEstado,
					encendidoQuinceMin: form.encendidoQuinceMin,
					areaEncendidoQuinceMin: form.areaEncendidoQuinceMin,
					fechaVencimientoEncendidoQuinceMin: form.fechaVencimientoEncendidoQuinceMin,
					observacionEncendidoQuinceMin: form.observacionEncendidoQuinceMin,
					recomendacionEncendidoQuinceMin: form.recomendacionEncendidoQuinceMin,
					observacion: form.observacion,
					recomendacion: form.recomendacion,
					foto: form.foto || "",
					nuevoEquipo: form.nuevoEquipo,
					PDF: form.PDF || "",
				};

				try {
					onSubmit(newData);
					setForm({ ...form });
					onClose();
				} catch (e: any) {
					console.error(e);
				}
			}
		});
	};

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
											disabled={mode === "view"}
										>
											<option value="">Seleccione</option>
											{sedeOptions.map((sede) => (
												<option key={sede.id} value={sede.id}>{sede.name}</option>
											))}
										</select>
									</div>
									<div className="col-6 p-1">
										<label htmlFor="luzEmergenciaInput" className="form-label required">
											{luzEmergencia}
										</label>
										<select
											className="form-select select-sm"
											id="luzEmergenciaInput"
											name="luzEmergencia"
											value={form.luzEmergencia}
											onChange={handleChange}
											aria-label="Default select example"
											disabled={mode === "view"}
										>
											<option value="">Seleccione</option>
											{luzEmergenciaOptions.map((luzEmergencia) => (
												<option key={luzEmergencia.id} value={luzEmergencia.id}>{luzEmergencia.name}</option>
											))}
										</select>
									</div>
								</div>
								{/* Select cascada */}
								<div className="col-12 mt-4">
									<div className="row">
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
												disabled={mode === "view"}
											/>
										</div>
										<div className="col-6 p-1">
											<label className="required form-label">{inspeccionadoPor}</label>
											<select
												name="inspeccionadoPor"
												className="form-select"
												value={form.inspeccionadoPor}
												onChange={handleChange}
												disabled={mode === "view"}
											>
												<option value="">Seleccione</option>
												{inspeccionadoPorOptions.map((inspeccionadoPor) => (
													<option key={inspeccionadoPor.id} value={inspeccionadoPor.id}>{inspeccionadoPor.name}</option>
												))}
											</select>
										</div>
									</div>
								</div>
								<div className="col-12">
									<div className="row">
										{form.inspeccionadoPor && (
											<div className="col-6 p-1 mt-2">
												<label className="form-label">{/*Cargo*/}</label>
												<select
													name="cargo"
													className="form-select"
													value={form.cargo}
													onChange={handleChange}
													disabled={mode === "view"}
												>
													<option value="">Seleccione cargo</option>
													{filteredCargos.map((cargo) => (
														<option key={cargo.id} value={cargo.id}>{cargo.name}</option>
													))}
												</select>
											</div>
										)}
										{form.cargo && (
											<div className="col-6 p-1 mt-2">
												<label className="form-label">{/*Trabajador*/}</label>
												<select
													name="trabajador"
													className="form-select"
													value={form.trabajador}
													onChange={handleChange}
													disabled={mode === "view"}
												>
													<option value="">Seleccione trabajador</option>
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
										<div className="row g-3 align-items-center mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label">{numeral1}</label>
											</div>
											<div className="col-1">
												<CheckboxSwitch
													label="Enumerado"
													checked={form.enumerado}
													onChange={(checked) => handleSwitchChange('enumerado', checked)}
													mode={mode}
												/>
											</div>
											<div className="col-7">
												<ConditionalFields visible={!form.enumerado}>
													<div className="row g-3 align-items-start">
														<div className="col-6">
															<label htmlFor="areaEnumeradoInput" className="form-label required">
																{areaResponsable}
															</label>
															<select
																className="form-select select-sm"
																id="areaEnumeradoInput"
																name="areaEnumerado"
																value={form.areaEnumerado}
																onChange={handleChange}
																disabled={mode === "view"}
															>
																<option value="">Seleccione</option>
																{areaResponsableOptions.map((areaResponsable) => (
																	<option key={areaResponsable.id} value={areaResponsable.id}>{areaResponsable.name}</option>
																))}
															</select>
														</div>
														<div className="col-6">
															<label htmlFor="fechaVencimientoEnumeradoInput" className="form-label required">
																{fechaVencimiento}
															</label>
															<input
																type="date"
																id="fechaVencimientoEnumeradoInput"
																name="fechaVencimientoEnumerado"
																value={form.fechaVencimientoEnumerado}
																onChange={handleChange}
																className="form-control input-sm"
																disabled={mode === "view"}
															/>
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
														disabled={mode === "view"}
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
														disabled={mode === "view"}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* UbicacionAdecuada */}
									<div className="col-12 row mt-2">
										<div className="row g-3 align-items-center mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral2} </label>
											</div>
											<div className="col-1">
												<CheckboxSwitch
													label="Ubicación adecuada"
													checked={form.ubicacionAdecuada}
													onChange={(checked) => handleSwitchChange('ubicacionAdecuada', checked)}
													mode={mode}
												/>
											</div>
											<div className="col-7">
												<ConditionalFields visible={!form.ubicacionAdecuada}>
													<div className="row g-3 align-items-start">
														<div className="col-6">
															<label htmlFor="areaUbicacionAdecuadaInput" className="form-label required">
																{areaResponsable}
															</label>
															<select
																className="form-select select-sm"
																id="areaUbicacionAdecuadaInput"
																name="areaUbicacionAdecuada"
																value={form.areaUbicacionAdecuada}
																onChange={handleChange}
																disabled={mode === "view"}
															>
																<option value="">Seleccione</option>
																{areaResponsableOptions.map((areaResponsable) => (
																	<option key={areaResponsable.id} value={areaResponsable.id}>{areaResponsable.name}</option>
																))}
															</select>
														</div>
														<div className="col-6">
															<label htmlFor="fechaVencimientoUbicacionAdecuadaInput" className="form-label required">
																{fechaVencimiento}
															</label>
															<input
																type="date"
																id="fechaVencimientoUbicacionAdecuadaInput"
																name="fechaVencimientoUbicacionAdecuada"
																value={form.fechaVencimientoUbicacionAdecuada}
																onChange={handleChange}
																className="form-control input-sm"
																disabled={mode === "view"}
															/>
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
														disabled={mode === "view"}
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
														disabled={mode === "view"}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* EnSuLugar */}
									<div className="col-12 row mt-2">
										<div className="row g-3 align-items-center mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral3} </label>
											</div>
											<div className="col-1">
												<CheckboxSwitch
													label="En su lugar"
													checked={form.enSuLugar}
													onChange={(checked) => handleSwitchChange('enSuLugar', checked)}
													mode={mode}
												/>
											</div>
											<div className="col-7">
												<ConditionalFields visible={!form.enSuLugar}>
													<div className="row g-3 align-items-start">
														<div className="col-6">
															<label htmlFor="areaEnSuLugarInput" className="form-label required">
																{areaResponsable}
															</label>
															<select
																className="form-select select-sm"
																id="areaEnSuLugarInput"
																name="areaEnSuLugar"
																value={form.areaEnSuLugar}
																onChange={handleChange}
																disabled={mode === "view"}
															>
																<option value="">Seleccione</option>
																{areaResponsableOptions.map((areaResponsable) => (
																	<option key={areaResponsable.id} value={areaResponsable.id}>{areaResponsable.name}</option>
																))}
															</select>
														</div>
														<div className="col-6">
															<label htmlFor="fechaVencimientoEnSuLugarInput" className="form-label required">
																{fechaVencimiento}
															</label>
															<input
																type="date"
																id="fechaVencimientoEnSuLugarInput"
																name="fechaVencimientoEnSuLugar"
																value={form.fechaVencimientoEnSuLugar}
																onChange={handleChange}
																className="form-control input-sm"
																disabled={mode === "view"}
															/>
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
														disabled={mode === "view"}
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
														disabled={mode === "view"}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* LibreDeObstaculos */}
									<div className="col-12 row mt-2">
										<div className="row g-3 align-items-center mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral4} </label>
											</div>
											<div className="col-1">
												<CheckboxSwitch
													label="Libre de obstaculos"
													checked={form.libreDeObstaculos}
													onChange={(checked) => handleSwitchChange('libreDeObstaculos', checked)}
													mode={mode}
												/>
											</div>
											<div className="col-7">
												<ConditionalFields visible={!form.libreDeObstaculos}>
													<div className="row g-3 align-items-start justify-content-evenly">
														<div className="col-6">
															<label htmlFor="areaLibreDeObstaculos" className="form-label required">
																{areaResponsable}
															</label>
															<select
																className="form-select select-sm"
																id="areaLibreDeObstaculosInput"
																name="areaLibreDeObstaculos"
																value={form.areaLibreDeObstaculos}
																onChange={handleChange}
																disabled={mode === "view"}
															>
																<option value="">Seleccione</option>
																{areaResponsableOptions.map((areaResponsable) => (
																	<option key={areaResponsable.id} value={areaResponsable.id}>{areaResponsable.name}</option>
																))}
															</select>
														</div>
														<div className="col-6">
															<label htmlFor="fechaVencimientoLibreDeObstaculosInput" className="form-label required">
																{fechaVencimiento}
															</label>
															<input
																type="date"
																id="fechaVencimientoLibreDeObstaculosInput"
																name="fechaVencimientoLibreDeObstaculos"
																value={form.fechaVencimientoLibreDeObstaculos}
																onChange={handleChange}
																className="form-control input-sm"
																disabled={mode === "view"}
															/>
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
														disabled={mode === "view"}
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
														disabled={mode === "view"}
													/>
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
															disabled={mode === "view"}
														/>
													</div>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* ConectadoTomacorriente */}
									<div className="col-12 row mt-2">
										<div className="row g-3 align-items-center mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral5} </label>
											</div>
											<div className="col-1">
												<CheckboxSwitch
													label="Conectado a toma corriente"
													checked={form.conectadoTomacorriente}
													onChange={(checked) => handleSwitchChange('conectadoTomacorriente', checked)}
													mode={mode}
												/>
											</div>
											<div className="col-7">
												<ConditionalFields visible={!form.conectadoTomacorriente}>
													<div className="row g-3 align-items-start justify-content-evenly">
														<div className="col-6">
															<label htmlFor="areaConectadoTomacorriente" className="form-label required">
																{areaResponsable}
															</label>
															<select
																className="form-select select-sm"
																id="areaConectadoTomacorrienteInput"
																name="areaConectadoTomacorriente"
																value={form.areaConectadoTomacorriente}
																onChange={handleChange}
																disabled={mode === "view"}
															>
																<option value="">Seleccione</option>
																{areaResponsableOptions.map((areaResponsable) => (
																	<option key={areaResponsable.id} value={areaResponsable.id}>{areaResponsable.name}</option>
																))}
															</select>
														</div>
														<div className="col-6">
															<label htmlFor="fechaVencimientoConectadoTomacorrienteInput" className="form-label required">
																{fechaVencimiento}
															</label>
															<input
																type="date"
																id="fechaVencimientoConectadoTomacorrienteInput"
																name="fechaVencimientoConectadoTomacorriente"
																value={form.fechaVencimientoConectadoTomacorriente}
																onChange={handleChange}
																className="form-control input-sm"
																disabled={mode === "view"}
															/>
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
														disabled={mode === "view"}
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
														disabled={mode === "view"}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* EnciendeSwitchPrueba */}
									<div className="col-12 row mt-2">
										<div className="row g-3 align-items-center mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral6} </label>
											</div>
											<div className="col-1">
												<CheckboxSwitch
													label="Enciende switch prueba"
													checked={form.enciendeSwitchPrueba}
													onChange={(checked) => handleSwitchChange('enciendeSwitchPrueba', checked)}
													mode={mode}
												/>
											</div>
											<div className="col-7">
												<ConditionalFields visible={!form.enciendeSwitchPrueba}>
													<div className="row g-3 align-items-start">
														<div className="col-6">
															<label htmlFor="areaEnciendeSwitchPrueba" className="form-label required">
																{areaResponsable}
															</label>
															<select
																className="form-select select-sm"
																id="areaEnciendeSwitchPruebaInput"
																name="areaEnciendeSwitchPrueba"
																value={form.areaEnciendeSwitchPrueba}
																onChange={handleChange}
																disabled={mode === "view"}
															>
																<option value="">Seleccione</option>
																{areaResponsableOptions.map((areaResponsable) => (
																	<option key={areaResponsable.id} value={areaResponsable.id}>{areaResponsable.name}</option>
																))}
															</select>
														</div>
														<div className="col-6">
															<label htmlFor="fechaVencimientoEnciendeSwitchPruebaInput" className="form-label required">
																{fechaVencimiento}
															</label>
															<input
																type="date"
																id="fechaVencimientoEnciendeSwitchPruebaInput"
																name="fechaVencimientoEnciendeSwitchPrueba"
																value={form.fechaVencimientoEnciendeSwitchPrueba}
																onChange={handleChange}
																className="form-control input-sm"
																disabled={mode === "view"}
															/>
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
														disabled={mode === "view"}
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
														disabled={mode === "view"}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* BuenaIluminacion */}
									<div className="col-12 row mt-2">
										<div className="row g-3 align-items-center mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral7} </label>
											</div>
											<div className="col-1">
												<CheckboxSwitch
													label="Buena iluminación"
													checked={form.buenaIluminacion}
													onChange={(checked) => handleSwitchChange('buenaIluminacion', checked)}
													mode={mode}
												/>
											</div>
											<div className="col-7">
												<ConditionalFields visible={!form.buenaIluminacion}>
													<div className="row g-3 align-items-start">
														<div className="col-6">
															<label htmlFor="areaBuenaIluminacion" className="form-label required">
																{areaResponsable}
															</label>
															<select
																className="form-select select-sm"
																id="areaBuenaIluminacionInput"
																name="areaBuenaIluminacion"
																value={form.areaBuenaIluminacion}
																onChange={handleChange}
																disabled={mode === "view"}
															>
																<option value="">Seleccione</option>
																{areaResponsableOptions.map((areaResponsable) => (
																	<option key={areaResponsable.id} value={areaResponsable.id}>{areaResponsable.name}</option>
																))}
															</select>
														</div>
														<div className="col-6">
															<label htmlFor="fechaVencimientoBuenaIluminacionInput" className="form-label required">
																{fechaVencimiento}
															</label>
															<input
																type="date"
																id="fechaVencimientoBuenaIluminacionInput"
																name="fechaVencimientoBuenaIluminacion"
																value={form.fechaVencimientoBuenaIluminacion}
																onChange={handleChange}
																className="form-control input-sm"
																disabled={mode === "view"}
															/>
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
														disabled={mode === "view"}
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
														disabled={mode === "view"}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* BuenaEstado */}
									<div className="col-12 row mt-2">
										<div className="row g-3 align-items-center mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral8} </label>
											</div>
											<div className="col-1">
												<CheckboxSwitch
													label="Buen estado"
													checked={form.buenaEstado}
													onChange={(checked) => handleSwitchChange('buenaEstado', checked)}
													mode={mode}
												/>
											</div>
											<div className="col-7">
												<ConditionalFields visible={!form.buenaEstado}>
													<div className="row g-3 align-items-start">
														<div className="col-6">
															<label htmlFor="areaBuenaEstado" className="form-label required">
																{areaResponsable}
															</label>
															<select
																className="form-select select-sm"
																id="areaBuenaEstadoInput"
																name="areaBuenaEstado"
																value={form.areaBuenaEstado}
																onChange={handleChange}
																disabled={mode === "view"}
															>
																<option value="">Seleccione</option>
																{areaResponsableOptions.map((areaResponsable) => (
																	<option key={areaResponsable.id} value={areaResponsable.id}>{areaResponsable.name}</option>
																))}
															</select>
														</div>
														<div className="col-6">
															<label htmlFor="fechaVencimientoBuenaEstadoInput" className="form-label required">
																{fechaVencimiento}
															</label>
															<input
																type="date"
																id="fechaVencimientoBuenaEstadoInput"
																name="fechaVencimientoBuenaEstado"
																value={form.fechaVencimientoBuenaEstado}
																onChange={handleChange}
																className="form-control input-sm"
																disabled={mode === "view"}
															/>
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
														disabled={mode === "view"}
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
														disabled={mode === "view"}
													/>
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
															disabled={mode === "view"}
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
																disabled={mode === "view"}
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
															disabled={mode === "view"}
														/>
													</div>
												</div>
											</div>
										</ConditionalFields>
									</div>

									{/* EncendidoQuinceMin */}
									<div className="col-12 row mt-2">
										<div className="row g-3 align-items-center mt-2">
											<div className="col-4">
												<label htmlFor="" className="col-form-label"> {numeral9} </label>
											</div>
											<div className="col-1">
												<CheckboxSwitch
													label="Encendido quince minutos"
													checked={form.encendidoQuinceMin}
													onChange={(checked) => handleSwitchChange('encendidoQuinceMin', checked)}
													mode={mode}
												/>
											</div>
											<div className="col-7">
												<ConditionalFields visible={!form.encendidoQuinceMin}>
													<div className="row g-3 align-items-start">
														<div className="col-6">
															<label htmlFor="areaEncendidoQuinceMin" className="form-label required">
																{areaResponsable}
															</label>
															<select
																className="form-select select-sm"
																id="areaEncendidoQuinceMinInput"
																name="areaEncendidoQuinceMin"
																value={form.areaEncendidoQuinceMin}
																onChange={handleChange}
																disabled={mode === "view"}
															>
																<option value="">Seleccione</option>
																{areaResponsableOptions.map((areaResponsable) => (
																	<option key={areaResponsable.id} value={areaResponsable.id}>{areaResponsable.name}</option>
																))}
															</select>
														</div>
														<div className="col-6">
															<label htmlFor="fechaVencimientoEncendidoQuinceMinInput" className="form-label required">
																{fechaVencimiento}
															</label>
															<input
																type="date"
																id="fechaVencimientoEncendidoQuinceMinInput"
																name="fechaVencimientoEncendidoQuinceMin"
																value={form.fechaVencimientoEncendidoQuinceMin}
																onChange={handleChange}
																className="form-control input-sm"
																disabled={mode === "view"}
															/>
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
														disabled={mode === "view"}
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
														disabled={mode === "view"}
													/>
												</div>
											</div>
										</ConditionalFields>
									</div>
								</div>
							</div>
							{/* Buttons footer */}
							<div className="d-flex justify-content-center gap-10 modal-footer">
								{mode !== 'view' && (
									<button type="button" className="btn btn-primary"
										onClick={handleSubmit}>
										{mode === 'edit' ? 'Actualizar' : 'Crear'}
									</button>
								)}
								<button type="button" className="btn btn-danger" onClick={onClose}>Cancelar</button>
							</div>
						</form>
					</div>
				</div>
			</div >
		</div >
	);
};
